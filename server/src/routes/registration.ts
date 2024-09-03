import { Request, Response } from "express";
import User from "../database/models/user";
import Event from "../database/models/event";
import mongoose from "mongoose";


interface RegisterForEventBody {
    userId: string;
    eventId: string;
}

// GET all the events a user is currently registered for (in the future)
export async function getUserFutureEvents(req: Request, res: Response) {
    const user = res.locals.user;
    const userId = user.userId;
    const userRole = user.userRole;

    if (!userId) {
        return res.status(400).json({ message: "Invalid user id" });
    }

    const currentDate = new Date();
    let events;

    try {
        if (userRole === "volunteer") {
            events = await Event.find({
                'date.endDay': { $gte: currentDate },
                "registration.registeredVolunteers": userId,
            });
        } else if (userRole === "organization") {
            events = await Event.find({
                'date.endDay': { $gte: currentDate },
                organization: userId
            });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error fetching future events", error });
    }

    return res.status(200).json(events);
}

// GET all events a user has ever registered for (past and present)
export async function getUserPastEvents(req: Request, res: Response) {
    const user = res.locals.user;
    const userId = user.userId;
    const userRole = user.userRole;

    if (!userId) {
        return res.status(400).json({ message: "Invalid user id" });
    }

    const currentDate = new Date();
    let events;

    try {
        if (userRole === "volunteer") {
            events = await Event.find({
                'date.endDay': { $lt: currentDate },
                "registration.registeredVolunteers": userId,
            });
        } else if (userRole === "organization") {
            events = await Event.find({
                'date.endDay': { $lt: currentDate },
                organization: userId
            });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error fetching past events", error });
    }

    return res.status(200).json(events);
}

// GET all events an organization has created
export async function getOrganizationEvents(req: Request, res: Response) {
    const organizationId = req.params.id;

    if (!organizationId) {
        return res.status(400).json({ message: "Invalid organization id" });
    }

    try {
        const events = await Event.find({ organization: organizationId });
        return res.status(200).json(events);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching organization events", error });
    }
}

// POST API to register for an event
export async function registerForEvent(req: Request, res: Response) {
    const userId = res.locals.user.userId as string;
    const eventId = req.params.id;

    if (!userId || !eventId) {
        return res.status(400).json({ message: "User ID and Event ID are required" });
    }

    // TODO: Check if already registered for this event

    try {
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const eventObjectId = new mongoose.Types.ObjectId(eventId);

        const user = await User.findById(userObjectId);
        const event = await Event.findById(eventObjectId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Update user's registered events
        if (!user.registeredEvents) {
            user.registeredEvents = [];
        }
        user.registeredEvents.push(eventObjectId);

        event.registration.registeredVolunteers.push(userObjectId);
        event.registration.totalRegistered += 1;

        await user.save();
        await event.save();

        return res.status(200).json({ message: "Registration successful" });
    } catch (error) {
        return res.status(500).json({ message: "Error registering for event", error });
    }
}
// deregister for an event
export async function deregisterForEvent(req: Request, res: Response) {
    const userId = res.locals.user.userId as string;
    const eventId = req.params.id;

    if (!userId || !eventId) {
        return res.status(400).json({ message: "User ID and Event ID are required" });
    }
    // TODO: Check if not registerd for this event

    try {
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const eventObjectId = new mongoose.Types.ObjectId(eventId);

        const user = await User.findById(userObjectId);
        const event = await Event.findById(eventObjectId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        const eventIndex = user.registeredEvents.indexOf(eventObjectId);
        if (eventIndex > -1) {
            user.registeredEvents.splice(eventIndex, 1);
        } else {
            return res.status(400).json({ message: "User is not registered for this event" });
        }

        const volunteerIndex = event.registration.registeredVolunteers.indexOf(userObjectId);
        if (volunteerIndex > -1) {
            event.registration.registeredVolunteers.splice(volunteerIndex, 1);
        } else {
            return res.status(400).json({ message: "Event does not have this user registered" });
        }

        event.registration.totalRegistered -= 1;
        await user.save();
        await event.save();
        return res.status(200).json({ message: "Registration removed successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deregistering event", error });
    }
}
