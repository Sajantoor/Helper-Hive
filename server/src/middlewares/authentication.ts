import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserRole } from "../utils/types";
import { __prod__ } from "../utils/constants";

const access_code_secret = process.env.ACCESS_CODE_SECRET!;
const refresh_code_secret = process.env.REFRESH_CODE_SECRET!;

export type TokenData = {
    userId: string;
    userRole: UserRole;
}

const cookieOptions = {
    httpOnly: true,
    secure: __prod__,
    sameSite: "lax",
    path: "/",
    domain: __prod__ ? `.${process.env.DOMAIN}` : "",
    maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
} as const;

function generateAuthTokens(data: TokenData): { refreshToken: string, accessToken: string } {
    const refreshToken = jwt.sign(data, refresh_code_secret, { expiresIn: "7d" });
    const accessToken = jwt.sign(data, access_code_secret, { expiresIn: "15m" });
    return { refreshToken, accessToken };
}

export function setAuthCookies(res: Response, data: TokenData) {
    const { accessToken, refreshToken } = generateAuthTokens(data);
    // TODO: Save refresh token in database
    res.cookie("id", accessToken, cookieOptions);
    res.cookie("rid", refreshToken, cookieOptions);
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

    try {
        const data = jwt.verify(accessToken, access_code_secret) as TokenData;
        return data;
    } catch (err) {
        return null;
    }
}

export async function authorize(req: Request, res: Response, next: NextFunction) {
    const data = validateToken(req, res);
    if (!data) {
        return unauthorizedError(res);
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

export async function authorizeVolunteer(req: Request, res: Response, next: NextFunction) {
    if (res.locals.user.userRole !== "volunteer") {
        return forbiddenError(res);
    }

    next();
}

export function renewToken(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies.rid;
    if (!refreshToken) {
        return unauthorizedError(res);
    }

    let data;

    try {
        data = jwt.verify(refreshToken, refresh_code_secret) as TokenData;
        // TODO: Make database call to check if refresh token is valid;
    } catch (err) {
        return unauthorizedError(res);
    }

    if (!data) {
        return unauthorizedError(res);
    }

    const { accessToken } = generateAuthTokens(data);
    res.cookie("id", accessToken, cookieOptions);
    res.json({ accessToken });
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
