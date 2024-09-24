import { Request, Response } from "express";
import User from "../database/models/user";
import Event from "../database/models/events";
import mongoose from "mongoose";
import { sendEventCancellationEmail, sendEventConfirmationEmail } from "../utils/email";

// GET all the events a user is currently registered for (in the future)
export async function getUserFutureEvents(req: Request, res: Response) {
    const user = res.locals.user;
    const userId = user.userId;
    const isOrganization = user.isOrganization;

    if (!userId) {
        return res.status(400).json({ message: "Invalid user id" });
    }

    const currentDate = new Date();
    let events;

    try {
        if (!isOrganization) {
            events = await Event.find({
                'date.endDay': { $gte: currentDate },
                "registration.registeredVolunteers": userId,
            }).sort({ 'date.endTime': 1 });
        } else if (isOrganization) {
            events = await Event.find({
                'date.endDay': { $gte: currentDate },
                organization: userId
            }).sort({ 'date.endTime': 1 });
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
    const isOrganization = user.isOrganization;

    if (!userId) {
        return res.status(400).json({ message: "Invalid user id" });
    }

    const currentDate = new Date();
    let events;

    try {
        if (!isOrganization) {
            events = await Event.find({
                'date.endDay': { $lt: currentDate },
                "registration.registeredVolunteers": userId,
            }).sort({ 'date.endTime': -1 });
        } else if (isOrganization) {
            events = await Event.find({
                'date.endDay': { $lt: currentDate },
                organization: userId
            }).sort({ 'date.endTime': -1 });
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

        if (user.registeredEvents.includes(eventObjectId)) {
            return res.status(400).json({ message: "User is already registered for this event" });
        }

        if (event.registration.totalRegistered >= event.registration.totalSpots) {
            return res.status(400).json({ message: "Event is full" });
        }

        user.registeredEvents.push(eventObjectId);

        event.registration.registeredVolunteers.push(userObjectId.toString());
        event.registration.totalRegistered += 1;

        await user.save();
        await event.save();
        sendEventConfirmationEmail(user.email, event.name, event.id);
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

        const volunteerIndex = event.registration.registeredVolunteers.indexOf(userObjectId.toString());
        if (volunteerIndex > -1) {
            event.registration.registeredVolunteers.splice(volunteerIndex, 1);
        } else {
            return res.status(400).json({ message: "Event does not have this user registered" });
        }

        event.registration.totalRegistered -= 1;

        await user.save();
        await event.save();
        sendEventCancellationEmail(user.email, event.name);
        return res.status(200).json({ message: "Registration removed successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deregistering event", error });
    }
}
