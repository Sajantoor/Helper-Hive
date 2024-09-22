import { Request, Response } from "express";
import User from "../database/models/user";
import { generateAccessToken, hashPassword } from "../middlewares/authentication";
import { sendConfirmRegistrationEmail } from "../utils/email";
import z from "zod";
import Organization from "../database/models/organization";

interface EmergencyContact {
    name: string;
    phoneNumber: string;
    relationship: string;
}

const userSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    password: z.string(),
    dateOfBirth: z.coerce.date(),
    avatar: z.string().url(),
});

const updateUserSchema = userSchema.partial();

interface UserResponse {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
    // emergencyContact: EmergencyContact;
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
    const userBody = userSchema.safeParse(req.body);
    if (!userBody.success) {
        return res.status(400).json({ message: "Invalid user body", error: userBody.error });
    }

    userBody.data.email = userBody.data.email.toLowerCase();
    userBody.data.password = await hashPassword(userBody.data.password);

    let savedUser, userResponse;

    // check if there is an organization with the same email
    const organization = await Organization.findOne({
        email: userBody.data.email,
    });

    if (organization) {
        return res.status(400).json({ message: "Email already in use" });
    }

    try {
        const newUser = new User(userBody.data);
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

    if (!token) {
        return res.status(500).json({ message: "Error generating token" });
    }

    sendConfirmRegistrationEmail(savedUser.email, token);
    return res.status(201).json(userResponse);
}

export async function updateUser(req: Request, res: Response) {
    const userId = res.locals.user.userId;
    const userBody = updateUserSchema.safeParse(req.body);

    if (!userId) {
        return res.status(400).json({ message: "Invalid user id or body" });
    }

    if (!userBody.success) {
        return res.status(400).json({ message: "Invalid user body", error: userBody.error.errors });
    }

    if (userBody.data.password) {
        return res.status(400).json({ message: "Password cannot be updated using this endpoint" });
    }

    if (userBody.data.email) {
        return res.status(400).json({ message: "Email cannot be updated" });
    }

    try {
        const user = await User.findByIdAndUpdate(userId, userBody.data, { new: true });
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

