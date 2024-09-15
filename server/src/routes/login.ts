import { Request, Response } from "express";
import User from "../database/models/user";
import Organization from "../database/models/organization";
import { UserRole } from "../utils/types";
import { clearCookies, generateAccessToken, hashPassword, setAuthCookies, TokenData, validateAccessToken } from "../middlewares/authentication";
import bcrypt from "bcrypt";
import { sendPasswordResetEmail } from "../utils/email";

type LoginRequest = {
    email: string;
    password: string;
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body as LoginRequest;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    let user = await User.findOne({ email });
    let userRole: UserRole = "volunteer";

    if (!user) {
        user = await Organization.findOne({ email });
        userRole = "organization";
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
        userRole,
        accountConfirmed: user.emailConfirmed,
    }

    await setAuthCookies(res, tokenData);
    res.status(200).json({ message: "Login successful" });
}

export async function logout(req: Request, res: Response) {
    clearCookies(res);
    res.status(200).json({ message: "Logout successful" });
}

export async function forgotPassword(req: Request, res: Response) {
    const { email } = req.body as { email: string };
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email }) || await Organization.findOne({
        email,
    });

    if (!user) {
        // we don't want to expose if the user is not found
        console.log("User not found in password reset " + email);
        return res.status(200).json({ message: "Password reset email sent" });
    }

    const token = generateAccessToken({
        userId: user.id as string,
        userRole: user instanceof User ? "volunteer" : "organization",
        accountConfirmed: user.emailConfirmed,
    }, "1h");

    await sendPasswordResetEmail(user.email, token);
    res.status(200).json({ message: "Password reset email sent" });
}

export async function resetPassword(req: Request, res: Response) {
    const { password, newPassword } = req.body as { password: string, newPassword: string };
    const tokenData = res.locals.user;

    if (!password || !newPassword) {
        return res.status(400).json({ message: "Password and new password are required" });
    }

    const user = await getUser(tokenData);

    if (!user) {
        return res.status(400).json({ message: "Invalid token" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
    }

    user.password = await hashPassword(newPassword);

    try {
        await user.save();
    } catch (error) {
        return res.status(500).json({ message: "Error resetting password", error });
    }

    return res.status(200).json({ message: "Password reset successful" });
}

export async function resetForgottenPassword(req: Request, res: Response) {
    const { password } = req.body as { password: string };
    const token = req.params.id;

    if (!password || !token) {
        return res.status(400).json({ message: "Password and token are required" });
    }

    const data = validateAccessToken(token);

    if (!data) {
        return res.status(400).json({ message: "Invalid token" });
    }

    const user = await getUser(data);

    if (!user) {
        return res.status(400).json({ message: "Invalid token" });
    }

    user.password = await hashPassword(password);

    try {
        await user.save();
    } catch (error) {
        return res.status(500).json({ message: "Error resetting password", error });
    }

    return res.status(200).json({ message: "Password reset successful" });
}

export async function confirmAccount(req: Request, res: Response) {
    const token = req.params.id;

    if (!token) {
        return res.status(400).json({ message: "Token is required required" });
    }

    const data = validateAccessToken(token);

    if (!data) {
        return res.status(400).json({ message: "Invalid token" });
    }

    const user = await getUser(data);

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
        userRole: data.userRole,
        accountConfirmed: true,
    }

    await setAuthCookies(res, tokenData);
    return res.status(200).json({ message: "Account confirmed" });
}

export async function profile(req: Request, res: Response) {
    const user = res.locals.user;
    let response: {
        id: string;
        email: string;
        name: string;
        role: "volunteer" | "organization";
        profilePicture?: string | null;
    }

    if (user.userRole === "volunteer") {
        const profile = await User.findById(user.userId);

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        response = {
            id: profile.id,
            email: profile.email,
            name: profile.firstName + " " + profile.lastName,
            role: "volunteer",
            profilePicture: profile.profilePicture
        }
    } else if (user.userRole === "organization") {
        const profile = await Organization.findById(user.userId);

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        response = {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            role: "organization",
            profilePicture: profile.logo
        }
    } else {
        return res.status(500).json({ message: "Internal server error" });
    }

    return res.status(200).json(response);
}


async function getUser(data: TokenData) {
    let user;

    if (data.userRole === "volunteer") {
        user = await User.findById(data.userId);
    } else {
        user = await Organization.findById(data.userId);
    }

    return user;
}