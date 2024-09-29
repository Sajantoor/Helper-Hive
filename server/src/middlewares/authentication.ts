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
    // Clear cookies cannot have maxAge property
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
} as const;


/**
 * Generates an access token for the given data.
 *
 * @param {TokenData} data - The data to be encoded in the token.
 * @returns {string | null} The generated access token, or null if token generation fails.
 */
export function generateAccessToken(data: TokenData): string | null {
    return generateToken(data, access_code_secret, "15m");
}


/**
 * Generates an account confirmation token.
 *
 * @param data - The data to be included in the token.
 * @returns A string representing the generated token, or null if the token could not be generated.
 */
export function generateAccountConfirmationToken(data: TokenData): string | null {
    return generateToken(data, account_confirmation_secret, "7d");
}

/**
 * Generates a token with the given data and secret.
 *
 * @param data - The data to be included in the token.
 * @param secret - The secret to be used to sign the token.
 * @param validity - The validity period of the token.
 * @returns A string representing the generated token, or null if the token could not be generated.
 */
function generateToken(data: TokenData, secret: string, validity: string): string | null {
    try {
        return jwt.sign(data, secret, { expiresIn: validity });
    } catch (err) {
        return null;
    }
}

/**
 * Validates the given access token.
 *
 * @param token - The token to be validated.
 * @returns The decoded token data if the token is valid, or null if the token is invalid.
 */
export function validateAccessToken(token: string): TokenData | null {
    try {
        const data = jwt.verify(token, access_code_secret) as TokenData;
        return data;
    } catch (err) {
        return null;
    }
}

/**
 * Validates the given account confirmation token.
 *
 * @param token - The token to be validated.
 * @returns The decoded token data if the token is valid, or throws an error if the token is invalid.
 */
export function validateAccountConfirmationToken(token: string): TokenData {
    const data = jwt.verify(token, account_confirmation_secret) as TokenData;
    return data;
}

/**
 * Resends the account confirmation email to the user if the provided token is valid and the account is not already confirmed.
 * 
 * @param res - The response object to send the HTTP response.
 * @param token - The token string used to decode user information.
 * 
 * @returns A JSON response with a status code and message indicating the result of the operation.
 * 
 * @throws Will return a 400 status code with an appropriate message if:
 * - The token is invalid.
 * - The user does not exist.
 * - The account is already confirmed.
 * 
 * @async
 */
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

/**
 * Generates a pair of refresh and access tokens for the given data.
 *
 * @param data - The data to be encoded in the tokens.
 * @returns An object containing the refresh and access tokens, or null if token generation fails.
 */
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

/**
 * Sets the authentication cookies in the response object.
 *
 * @param res - The response object to set the cookies in.
 * @param data - The token data to be encoded in the cookies.
 */
export async function setAuthCookies(res: Response, data: TokenData) {
    const tokens = await generateAuthTokens(data);
    if (!tokens) {
        return res.status(500).json({ message: "Internal server error" });
    }

    res.cookie("id", tokens.accessToken, cookieOptions);
    res.cookie("rid", tokens.refreshToken, cookieOptions);
}

/**
 * Clears the authentication cookies in the response object. Deletes an existing 
 * refresh token from the database if it exists.
 *
 * @param req - The request object to get the refresh token from.
 * @param res - The response object to clear the cookies in.
 */
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


/**
 * Middleware function to authorize a user based on the provided token.
 * 
 * This function validates the token from the request, checks if the account is confirmed,
 * and attaches the user data to the response locals if the authorization is successful.
 * 
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next middleware function in the stack.
 * 
 * @returns If the token is invalid or the account is not confirmed, it sends an appropriate
 *          response and does not call the next middleware. Otherwise, it calls the next middleware.
 */
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

/**
 * Middleware to authorize an organization.
 * 
 * This function checks if the request is made by an organization. If not, it responds with a forbidden error.
 * If the request is authorized, it calls the next middleware in the stack.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * 
 * @returns A forbidden error response if the request is not authorized.
 */
export async function authorizeOrganization(req: Request, res: Response, next: NextFunction) {
    if (!isOrganization(res)) {
        return forbiddenError(res);
    }

    next();
}

/**
 * Middleware to authorize requests from verified organizations.
 * 
 * This middleware should be used after the authorized middleware. It checks if the user
 * associated with the request has a verified organization status. If the organization is
 * not verified, it responds with a forbidden error. Otherwise, it passes control to the
 * next middleware in the stack.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * 
 * @returns A forbidden error response if the organization is not verified, otherwise calls the next middleware.
 */
export async function authorizeVerifiedOrganization(req: Request, res: Response, next: NextFunction) {
    // run after authorized middleware
    if (!res.locals.user.isOrganizationVerified) {
        return forbiddenError(res);
    }

    next();
}

/**
 * Middleware function to authorize a user.
 * 
 * This function checks if the user is a volunteer.
 * If the user is not a volunteer, it sends a forbidden error response using the `forbiddenError` function.
 * Otherwise, it calls the `next` middleware function.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * 
 * @returns A promise that resolves to void.
 */
export async function authorizeUser(req: Request, res: Response, next: NextFunction) {
    if (!isVolunteer(res)) {
        return forbiddenError(res);
    }

    next();
}

/**
 * Middleware function to renew the access token using a refresh token.
 * 
 * This function extracts the refresh token from the request cookies, verifies it,
 * and generates a new access token if the refresh token is valid. It also handles
 * organization verification if the user is an organization.
 * 
 * @param req - The request object containing the refresh token in cookies.
 * @param res - The response object used to send back the new access token or error messages.
 * @param next - The next middleware function in the stack.
 * 
 * @returns A response with the new access token or an error message.
 * 
 * @throws UnauthorizedError - If the refresh token is missing, invalid, or not found in the database.
 * @throws InternalServerError - If there is an error generating the new access token.
 */
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
