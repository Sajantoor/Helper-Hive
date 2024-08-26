import { Request, Response } from "express";
import User from "../database/models/user";
import Organization from "../database/models/organization";
import { UserRole } from "../utils/types";
import { clearCookies, setAuthCookies, TokenData } from "../middlewares/authentication";
import bcrypt from "bcrypt";

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
    }

    await setAuthCookies(res, tokenData);
    res.status(200).json({ message: "Login successful" });
}

export async function logout(res: Response) {
    clearCookies(res);
    res.status(200).json({ message: "Logout successful" });
}
