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
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({ message: "Invalid user id" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const currentDate = new Date();
        const futureEvents = await Event.find({
            _id: { $in: user.registeredEvents },
            startDate: { $gt: currentDate }
        });

        return res.status(200).json(futureEvents);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching future events", error });
    }
}

// GET all events a user has ever registered for (past and present)
export async function getUserAllEvents(req: Request, res: Response) {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({ message: "Invalid user id" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const currentDate = new Date();
        const pastAndPresentEvents = await Event.find({
            _id: { $in: user.registeredEvents },
            endDate: { $lte: currentDate }
        });
        return res.status(200).json(pastAndPresentEvents);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching events", error });
    }
}

// GET all events an organization has created
export async function getOrganizationEvents(req: Request, res: Response) {
    const organizationId = req.params.id;

    if (!organizationId) {
        return res.status(400).json({ message: "Invalid organization id" });
    }

    try {
        const events = await Event.find({ organizationId: organizationId });
        return res.status(200).json(events);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching organization events", error });
    }
}

// POST API to register for an event
export async function registerForEvent(req: Request, res: Response) {
    const { userId, eventId } = req.body as { userId: string, eventId: string };

    if (!userId || !eventId) {
        return res.status(400).json({ message: "User ID and Event ID are required" });
    }

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

        // Update event's registered volunteers
        if (!event.registeredVolunteers) {
            event.registeredVolunteers = [];
        }
        event.registeredVolunteers.push(userObjectId);

        await user.save();
        await event.save();

        return res.status(200).json({ message: "Registration successful" });
    } catch (error) {
        return res.status(500).json({ message: "Error registering for event", error });
    }
}
// deregister for an event
export async function deregisterForEvent(req: Request, res: Response) {
    const { userId, eventId } = req.body as { userId: string, eventId: string };

    if (!userId || !eventId) {
        return res.status(400).json({ message: "User ID and Event ID are required" });
    }

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

        const volunteerIndex = event.registeredVolunteers.indexOf(userObjectId);
        if (volunteerIndex > -1) {
            event.registeredVolunteers.splice(volunteerIndex, 1);
        } else {
            return res.status(400).json({ message: "Event does not have this user registered" });
        }

        await user.save();
        await event.save();

        return res.status(200).json({ message: "Registration removed successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deregistering event", error });
    }
}
