import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { __prod__ } from "../utils/constants";
import RefreshToken from "../database/models/refreshToken";
import { getUser } from "../utils/user";
import { createConfirmRegistrationEmail } from "../utils/email";
import { isOrganization, isVolunteer } from "../utils/checkUserRole";
import Organization from "../database/models/organization";

const access_code_secret = process.env.ACCESS_CODE_SECRET!;
const refresh_code_secret = process.env.REFRESH_CODE_SECRET!;
const account_confirmation_secret = process.env.ACCOUNT_CONFIRMATION_SECRET!;

export type TokenData = {
    userId: string;
    isOrganization: boolean;
    accountConfirmed: boolean,
    isOrganizationVerified?: boolean;
}

const clearCookieOptions = {
    httpOnly: true,
    secure: __prod__,
    sameSite: __prod__ ? "none" : "lax",
    path: "/",
    domain: __prod__ ? process.env.DOMAIN : "",
} as const;

const cookieOptions = {
    ...clearCookieOptions,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
} as const;

export function generateAccessToken(data: TokenData): string | null {
    return generateToken(data, access_code_secret, "15m");
}

export function generateAccountConfirmationToken(data: TokenData): string | null {
    return generateToken(data, account_confirmation_secret, "7d");
}

function generateToken(data: TokenData, secret: string, validity: string): string | null {
    try {
        return jwt.sign(data, secret, { expiresIn: validity });
    } catch (err) {
        return null;
    }
}

export function validateAccessToken(token: string) {
    try {
        const data = jwt.verify(token, access_code_secret) as TokenData;
        return data;
    } catch (err) {
        return null;
    }
}

export function validateAccountConfirmationToken(token: string) {
    const data = jwt.verify(token, account_confirmation_secret) as TokenData;
    return data;
}

export async function resendAccountConfirmationEmail(res: Response, token: string) {
    let data: TokenData;
    try {
        data = jwt.decode(token) as TokenData;
    } catch (err) {
        return res.status(400).json({ message: "Invalid token" });
    }

    if (!data) {
        return res.status(400).json({ message: "Invalid token" });
    }

    const user = await getUser(data);

    if (!user) {
        return res.status(400).json({ message: "Invalid token" });
    }

    if (user.emailConfirmed) {
        return res.status(400).json({ message: "Account already confirmed" });
    }

    const tokenData: TokenData = {
        userId: data.userId,
        isOrganization: data.isOrganization,
        accountConfirmed: false,
    }

    await createConfirmRegistrationEmail(tokenData, user.email);
    res.status(400).json({ message: "Token expired, check your inbox for a new confirmation email." });
}

async function generateAuthTokens(data: TokenData): Promise<{ refreshToken: string; accessToken: string; } | null> {
    const refreshToken = generateToken(data, refresh_code_secret, "7d");
    const accessToken = generateAccessToken(data);

    if (!refreshToken || !accessToken) {
        return null;
    }

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
        return res.status(500).json({ message: "Internal server error" });
    }

    res.cookie("id", tokens.accessToken, cookieOptions);
    res.cookie("rid", tokens.refreshToken, cookieOptions);
}

export async function clearCookies(req: Request, res: Response) {
    const refreshToken = req.cookies.rid;

    if (refreshToken) {
        try {
            await RefreshToken.deleteOne({
                token: refreshToken,
            });
        } catch (error) {
            console.error("Error deleting refresh token", error);
        }
    }

    res.clearCookie("id", clearCookieOptions);
    res.clearCookie("rid", clearCookieOptions);
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
        return res.status(403).json({ message: "Account not confirmed" });
    }

    res.locals.user = data;
    next();
}

export async function authorizeOrganization(req: Request, res: Response, next: NextFunction) {
    if (!isOrganization(res)) {
        return forbiddenError(res);
    }

    next();
}

export async function authorizeVerifiedOrganization(req: Request, res: Response, next: NextFunction) {
    // run after authorized middleware
    if (!res.locals.user.isOrganizationVerified) {
        return forbiddenError(res);
    }

    next();
}

export async function authorizeUser(req: Request, res: Response, next: NextFunction) {
    if (!isVolunteer(res)) {
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

    if (!data) {
        return unauthorizedError(res);
    }

    const refreshTokenEntry = await RefreshToken.findOne({ token: refreshToken });
    if (!refreshTokenEntry) {
        return unauthorizedError(res);
    }

    const payload: TokenData = {
        userId: data.userId,
        isOrganization: data.isOrganization,
        accountConfirmed: data.accountConfirmed,
        isOrganizationVerified: data.isOrganizationVerified,
    }

    if (data.isOrganization && !data.isOrganizationVerified) {
        const organization = await Organization.findById(data.userId);
        if (!organization) {
            return unauthorizedError(res);
        }

        payload.isOrganizationVerified = organization.verified;
    }

    const accessToken = generateAccessToken(payload);
    if (!accessToken) {
        return res.status(500).json({ message: "Internal server error" });
    }

    res.clearCookie("id", clearCookieOptions);
    res.cookie("id", accessToken, cookieOptions);
    return res.status(200).json({ accessToken: accessToken });
}

function unauthorizedError(res: Response): void {
    res.status(401).json({ message: "You must be logged in to view this content." });
}

function forbiddenError(res: Response): void {
    res.status(403).json({ message: "You do not have permissions to view or edit this content." });
}

export async function hashPassword(password: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hash(password, salt);
}
