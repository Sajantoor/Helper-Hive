import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserRole } from "../utils/types";
import { __prod__ } from "../utils/constants";
import RefreshToken from "../database/models/refreshToken";

const access_code_secret = process.env.ACCESS_CODE_SECRET!;
const refresh_code_secret = process.env.REFRESH_CODE_SECRET!;

export type TokenData = {
    userId: string;
    userRole: UserRole;
    accountConfirmed: boolean,
}

const cookieOptions = {
    httpOnly: true,
    secure: __prod__,
    sameSite: "lax",
    path: "/",
    domain: __prod__ ? `.${process.env.DOMAIN}` : "",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
} as const;

export function generateAccessToken(data: TokenData, validaity = "15m"): string {
    return jwt.sign(data, access_code_secret, { expiresIn: validaity });
}

export function validateAccessToken(token: string) {
    try {
        const data = jwt.verify(token, access_code_secret) as TokenData;
        return data;
    } catch (err) {
        return null;
    }
}

async function generateAuthTokens(data: TokenData): Promise<{ refreshToken: string; accessToken: string; } | null> {
    const refreshToken = jwt.sign(data, refresh_code_secret, { expiresIn: "7d" });
    const accessToken = jwt.sign(data, access_code_secret, { expiresIn: "15m" });

    const refreshTokenEntry = new RefreshToken({ token: refreshToken });
    try {
        await refreshTokenEntry.save();
    } catch (err) {
        return null;
    }

    return { refreshToken, accessToken };
}

export async function setAuthCookies(res: Response, data: TokenData) {
    const tokens = await generateAuthTokens(data);
    if (!tokens) {
        return res.status(500).json({ error: "Internal server error" });
    }

    res.cookie("id", tokens.accessToken, cookieOptions);
    res.cookie("rid", tokens.refreshToken, cookieOptions);
}

export function clearCookies(res: Response) {
    res.clearCookie("id", cookieOptions);
    res.clearCookie("rid", cookieOptions);
}

function validateToken(req: Request, res: Response): TokenData | null {
    const accessToken = req.cookies.id;
    if (!accessToken) {
        return null;
    }

    return validateAccessToken(accessToken);
}

export async function authorize(req: Request, res: Response, next: NextFunction) {
    const data = validateToken(req, res);
    if (!data) {
        return unauthorizedError(res);
    }

    if (!data.accountConfirmed) {
        return res.status(403).json({ error: "Account not confirmed" });
    }

    res.locals.user = data;
    next();
}

export async function authorizeOrganization(req: Request, res: Response, next: NextFunction) {
    if (res.locals.user.userRole !== "organization") {
        return forbiddenError(res);
    }

    next();
}

export async function authorizeUser(req: Request, res: Response, next: NextFunction) {
    if (res.locals.user.userRole !== "volunteer") {
        return forbiddenError(res);
    }

    next();
}

export async function renewToken(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies.rid;
    if (!refreshToken) {
        return unauthorizedError(res);
    }

    let data;

    try {
        data = jwt.verify(refreshToken, refresh_code_secret) as TokenData;
    } catch (err) {
        return unauthorizedError(res);
    }


    const refreshTokenEntry = await RefreshToken.findOne({ token: refreshToken });
    if (!refreshTokenEntry) {
        return unauthorizedError(res);
    }

    if (!data) {
        return unauthorizedError(res);
    }

    const tokens = await generateAuthTokens(data);
    if (!tokens) {
        return res.status(500).json({ error: "Internal server error" });
    }

    res.cookie("id", tokens.accessToken, cookieOptions);
    res.json({ accessToken: tokens.accessToken });
}

function unauthorizedError(res: Response): void {
    res.status(401).json({ error: "Unauthorized" });
}

function forbiddenError(res: Response): void {
    res.status(403).json({ error: "Forbidden" });
}

export async function hashPassword(password: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hash(password, salt);
}
