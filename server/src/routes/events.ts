import { Request, Response } from "express";
import Event from "../database/models/event";

interface EventBody {
    name: string;
    organization: string;
    date: {
        startDate: Date;
        endDate: Date;
        startTime: Date;
        endTime: Date;
    },
    details: {
        description: string;
        preShiftInfo: string;
        tags: string[];
        location: string;
        photo: string;
        files: string[];
    },
    spots: {
        total: number;
    }
}

export async function getEvents(req: Request, res: Response) {
    const events = await Event.find().populate({
        path: 'organization',
        select: 'name logo',
    });

    return res.status(200).json(events);
}

export async function getEvent(req: Request, res: Response) {
    const eventId = req.params.id;

    if (!eventId) {
        return res.status(400).json({ message: "Invalid event id" });
    }

    let event = null;

    try {
        // TODO: if organization is and organization id is the same, 
        // return the event's attendees 
        event = await Event.findById(eventId).populate({
            path: 'organization',
            select: 'name logo',
        });
    } catch (error) {
        return res.status(400).json({ message: "Invalid event id" });
    }

    if (event === null) {
        return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json(event);
}

export async function createEvent(req: Request, res: Response) {
    const eventBody = req.body as EventBody;
    eventBody.organization = res.locals.user.userId;

    if (!eventBody) {
        return res.status(400).json({ message: "Invalid event body" });
    }

    // validate fields exist 
    // if (!eventBody.name || !eventBody.date || !eventBody.details || !eventBody.spots) {
    //     return res.status(400).json({ message: 'Missing required fields' });
    // }


    try {
        const newEvent = new Event(eventBody);
        const savedEvent = await newEvent.save();
        return res.status(201).json(savedEvent);
    } catch (error) {
        return res.status(500).json({ message: "Error creating event", error });
    }

}

export async function updateEvent(req: Request, res: Response) {
    const eventId = req.params.id;
    const eventBody = req.body as EventBody;

    if (!eventId || !eventBody) {
        return res.status(400).json({ message: "Invalid event id or body" });
    }

    let event = null;
    try {
        event = await Event.findById(eventId);
    } catch (error) {
        return res.status(400).json({ message: "Invalid event id" });
    }

    if (event === null) {
        return res.status(404).json({ message: "Event not found" });
    }

    if (event.organization.toString() !== res.locals.user.userId) {
        return res.status(403).json({
            message: "User does not have permission to update this event"
        });
    }
    // return the updated event, new option is set to true
    const updatedEvent = await Event.findByIdAndUpdate(eventId, eventBody, { new: true });
    return res.status(200).json(updatedEvent);
}

export async function deleteEvent(req: Request, res: Response) {
    const eventId = req.params.id;

    if (!eventId) {
        return res.status(400).json({ message: "Invalid event id" });
    }

    let event = null;
    try {
        event = await Event.findById(eventId);
    } catch (error) {
        return res.status(400).json({ message: "Invalid event id" });
    }

    if (event === null) {
        return res.status(404).json({ message: "Event not found" });
    }

    if (event.organization.toString() !== res.locals.user.userId) {
        return res.status(403).json({
            message: "User does not have permission to delete this event"
        });
    }

    await Event.findByIdAndDelete(eventId);
    return res.status(204).send();
}
