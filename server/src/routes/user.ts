import { Request, Response } from "express";
import User from "../database/models/user";
import { generateAccessToken, hashPassword } from "../middlewares/authentication";
import { sendConfirmRegistrationEmail } from "../utils/email";

interface EmergencyContact {
    name: string;
    phoneNumber: string;
    relationship: string;
}

interface UserBody {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    dateOfBirth: Date;
    emergencyContact: EmergencyContact
    registeredEvents?: string[];
}

interface UserResponse {
    name: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
    emergencyContact: EmergencyContact;
    registeredEvents?: string[];
}

// TODO: Fix any type later
function filterUserResponse(user: any): UserResponse {
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.__v;
    return userResponse;
}

export async function getUser(req: Request, res: Response) {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ message: "Invalid user id" });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userResponse = filterUserResponse(user);
        return res.status(200).json(userResponse);
    } catch (error) {
        return res.status(400).json({ message: "Invalid user id" });
    }
}

export async function registerUser(req: Request, res: Response) {
    const userBody = req.body as UserBody;
    if (!userBody) {
        return res.status(400).json({ message: "Invalid user body" });
    }

    if (!userBody.name || !userBody.email || !userBody.phoneNumber || !userBody.password || !userBody.dateOfBirth || !userBody.emergencyContact) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    userBody.password = await hashPassword(userBody.password);

    let savedUser, userResponse;

    try {
        const newUser = new User(userBody);
        savedUser = await newUser.save();
        userResponse = filterUserResponse(savedUser);
    } catch (error) {
        return res.status(500).json({ message: "Error creating user", error });
    }

    const token = generateAccessToken({
        userId: savedUser.id as string,
        userRole: "volunteer",
        accountConfirmed: savedUser.emailConfirmed,
    }, "24h");

    sendConfirmRegistrationEmail(savedUser.email, token);
    return res.status(201).json(userResponse);
}

export async function updateUser(req: Request, res: Response) {
    const userId = res.locals.user.userId;
    const userBody = req.body as UserBody;

    if (!userId || !userBody) {
        return res.status(400).json({ message: "Invalid user id or body" });
    }

    if (userBody.password) {
        userBody.password = await hashPassword(userBody.password);
    }

    try {
        const user = await User.findByIdAndUpdate(userId, userBody, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userResponse = filterUserResponse(user);
        return res.status(200).json(userResponse);
    } catch (error) {
        return res.status(400).json({ message: "Invalid user id" });
    }
}

export async function deleteUser(res: Response) {
    const userId = res.locals.user.userId;
    if (!userId) {
        return res.status(400).json({ message: "Invalid user id" });
    }
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: "Invalid user id" });
    }
}

