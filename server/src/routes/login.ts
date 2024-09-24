import { Request, Response } from "express";
import User from "../database/models/user";
import Organization from "../database/models/organization";
import { clearCookies, hashPassword, resendAccountConfirmationEmail, setAuthCookies, TokenData, validateAccountConfirmationToken } from "../middlewares/authentication";
import bcrypt from "bcrypt";
import { sendPasswordResetEmail } from "../utils/email";
import { ProfileResponse } from "../../../common/types/ProfileResponse";
import RefreshToken from "../database/models/refreshToken";
import PasswordResetToken from "../database/models/passwordResetToken";
import crypto from "crypto";
import { TokenExpiredError } from "jsonwebtoken";

type LoginRequest = {
    email: string;
    password: string;
}

export async function login(req: Request, res: Response) {
    let { email, password } = req.body as LoginRequest;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    email = email.toLowerCase();

    let user = await User.findOne({ email });
    let isOrganization = false;

    if (!user) {
        user = await Organization.findOne({ email });
        isOrganization = true;
    }

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const tokenData: TokenData = {
        userId: user.id as string,
        isOrganization,
        accountConfirmed: user.emailConfirmed,
        isOrganizationVerified: user instanceof Organization ? user.verified : undefined,
    }

    await setAuthCookies(res, tokenData);
    res.status(200).json({ message: "Login successful" });
}

export async function logout(req: Request, res: Response) {
    clearCookies(req, res);
    res.status(200).json({ message: "Logout successful" });
}

export async function forgotPassword(req: Request, res: Response) {
    let { email } = req.body as { email: string };
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    email = email.toLowerCase();

    const user = await User.findOne({ email }) || await Organization.findOne({
        email,
    });

    if (!user) {
        // we don't want to expose if the user is not found
        console.log("User not found in password reset " + email);
        return res.status(200).json({ message: "Password reset email sent" });
    }

    const token = await generatePasswordResetToken(user.id, user instanceof Organization);

    if (!token) {
        return res.status(500).json({ message: "Error generating token" });
    }

    await sendPasswordResetEmail(user.email, token);
    res.status(200).json({ message: "Password reset email sent" });
}

export async function resetPassword(req: Request, res: Response) {
    const { password } = req.body as { password: string };
    const token = req.params.id;

    if (!password || !token) {
        return res.status(400).json({ message: "Password and token are required" });
    }

    const resetPasswordToken = await PasswordResetToken.findOne({ token });

    if (!resetPasswordToken) {
        return res.status(400).json({ message: "Invalid token" });
    }

    let user;

    if (!resetPasswordToken.isOrganization) {
        user = await User.findById(resetPasswordToken.id);
    } else {
        user = await Organization.findById(resetPasswordToken.id);
    }

    if (!user) {
        return res.status(400).json({ message: "Invalid token" });
    }

    user.password = await hashPassword(password);

    try {
        await user.save();
    } catch (error) {
        console.error("Error saving new password", error);
        return res.status(500).json({ message: "Error resetting password" });
    }

    await PasswordResetToken.deleteOne({ token });
    return res.status(200).json({ message: "Password reset successful" });
}

export async function confirmAccount(req: Request, res: Response) {
    const token = req.params.id;

    if (!token) {
        return res.status(400).json({ message: "Token is required required" });
    }

    let data;

    try {
        data = validateAccountConfirmationToken(token);
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return await resendAccountConfirmationEmail(res, token);
        }

        return res.status(400).json({ message: "Invalid token" });
    }

    let user;

    if (!data.isOrganization) {
        user = await User.findById(data.userId);
    } else {
        user = await Organization.findById(data.userId);
    }

    if (!user) {
        return res.status(400).json({ message: "Invalid token" });
    }

    user.emailConfirmed = true;

    try {
        await user.save();
    } catch (error) {
        return res.status(500).json({ message: "Error confirming account", error });
    }

    // give them a new token 
    const tokenData: TokenData = {
        userId: data.userId,
        isOrganization: data.isOrganization,
        accountConfirmed: true,
    }

    clearCookies(req, res);
    await setAuthCookies(res, tokenData);
    return res.status(200).json({ message: "Account confirmed" });
}

export async function profile(req: Request, res: Response) {
    const user = res.locals.user;
    let response: ProfileResponse;

    if (!user.isOrganization) {
        const profile = await User.findById(user.userId);

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        response = {
            id: profile.id,
            email: profile.email,
            name: profile.firstName + " " + profile.lastName,
            isOrganization: false,
            avatar: profile.avatar
        }
    } else {
        const profile = await Organization.findById(user.userId);

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        response = {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            isOrganization: true,
            isVerified: profile.verified,
            avatar: profile.avatar
        }
    }

    return res.status(200).json(response);
}

async function generatePasswordResetToken(userId: string, isOrganization: boolean) {
    // delete any existing tokens for this user
    try {
        await PasswordResetToken.deleteMany({ id: userId });
    } catch (error) {
        console.error("Error deleting existing password reset tokens", error);
    }

    // generate a unique token
    const token = crypto.randomBytes(32).toString("hex");

    try {
        const passwordResetToken = new PasswordResetToken({
            id: userId,
            token,
            isOrganization,
        });

        await passwordResetToken.save();
    } catch (error) {
        console.error("Error saving password reset token", error);
        return null;
    }

    return token;
}