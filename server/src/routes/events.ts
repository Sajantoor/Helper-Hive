import { NextFunction, Request, Response } from "express";
import Event from "../database/models/event";

interface EventBody {
    organizationId: string;
    startDate: Date;
    endDate: Date;
    name: string;
    description: string;
    spots: number;
    registeredVolunteers?: string[];
    coverPhoto: string;
    files?: Buffer[];
}

export async function getEvents(req: Request, res: Response) {
    const events = await Event.find();
    return res.status(200).json(events);
}

export async function getEvent(req: Request, res: Response) {
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

    return res.status(200).json(event);
}

export async function createEvent(req: Request, res: Response) {
    const eventBody = req.body as EventBody;

    if (!eventBody) {
        return res.status(400).json({ message: "Invalid event body" });
    }

    if (!eventBody.organizationId || !eventBody.startDate || !eventBody.endDate || !eventBody.name || !eventBody.description || !eventBody.spots) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const newEvent = new Event(eventBody);
    const savedEvent = await newEvent.save();

    return res.status(201).json(savedEvent);
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

    // return the updated event, new option is set to true
    const updatedEvent = await Event.findByIdAndUpdate(eventId, eventBody, { new: true });
    return res.status(200).json(updatedEvent);
}
