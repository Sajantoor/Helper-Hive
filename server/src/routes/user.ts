import { Request, Response } from "express";
import User from "../database/models/user";
import { hashPassword } from "../middlewares/authentication";

interface UserBody {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    dateOfBirth: Date;
    emergencyContact: {
        name: string;
        phoneNumber: string;
        relationship: string;
    };
    registeredEvents?: string[];
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
        return res.status(200).json(user);
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

    try {
        const newUser = new User(userBody);
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(500).json({ message: "Error creating user", error });
    }
}

export async function updateUser(req: Request, res: Response) {
    const userId = req.params.id;
    const userBody = req.body as UserBody;
    if (!userId || !userBody) {
        return res.status(400).json({ message: "Invalid user id or body" });
    }
    try {
        const user = await User.findByIdAndUpdate(userId, userBody, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: "Invalid user id" });
    }
}

export async function deleteUser(req: Request, res: Response) {
    const userId = req.params.id;
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

