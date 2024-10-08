import { Request, Response } from "express";
import Events, { IEvents } from "../database/models/events";
import { isOrganization, isUser, isVolunteer } from "../utils/checkUserRole";
import { z } from "zod";
import { ErrorResponse } from "../../../common/types/errorResponse";

const eventBodySchema = z.object({
    name: z.string(),
    date: z.object({
        startDay: z.coerce.date(),
        endDay: z.coerce.date(),
        startTime: z.coerce.date(),
        endTime: z.coerce.date(),
    }),
    details: z.object({
        description: z.string(),
        preShiftInfo: z.string(),
        tags: z.array(z.string()).optional().default([]),
        location: z.object({
            formattedAddress: z.string(),
            geoLocation: z.object({
                lat: z.number(),
                lng: z.number(),
            }),
            addressComponents: z.array(z.object({
                long_name: z.string(),
                short_name: z.string(),
                types: z.array(z.string()),
            })),
            name: z.string(),
        }),
        photo: z.string(),
        files: z.array(z.object({
            url: z.string(),
            name: z.string()
        }).optional()).default([]),
    }),
    registration: z.object({
        totalSpots: z.number().int(),
    }),
});

const updateEventBodySchema = eventBodySchema.partial();

export async function getEvents(req: Request, res: Response) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await Events.find({
        'date.startTime': { $gte: today },
    }).populate({
        path: 'organization',
        select: 'name avatar',
    }).sort({ 'date.startTime': 1 });

    // sort events by date
    events.sort((a: IEvents, b: IEvents) => {
        return a.date.startDay.getTime() - b.date.startDay.getTime();
    });

    return res.status(200).json(events);
}

export async function getEvent(req: Request, res: Response) {
    const eventId = req.params.id;

    if (!eventId) {
        const errorResponse: ErrorResponse = { message: "Invalid event id" };
        return res.status(400).json(errorResponse);
    }

    let event = null;

    try {
        // TODO: if organization is and organization id is the same, 
        // return the event's attendees 
        event = await Events.findById(eventId).populate({
            path: 'organization',
            select: 'name avatar',
        });
    } catch (error) {
        const errorResponse: ErrorResponse = { message: "Invalid event id" };
        return res.status(400).json(errorResponse);
    }

    if (event === null) {
        const errorResponse: ErrorResponse = { message: "Event not found" };
        return res.status(404).json(errorResponse);
    }

    event = event.toObject();

    if (isVolunteer(res)) {
        const isRegistered = event.registration.registeredVolunteers.map((volunteer: object) => volunteer.toString()).includes(res.locals.user.userId);
        event.registration.isRegistered = isRegistered;
    }

    if (!isOrganization(res) || (event.organization.toString() !== res.locals.user.userId)) {
        delete event.registration.registeredVolunteers;
    }

    return res.status(200).json(event);
}

export async function createEvent(req: Request, res: Response) {
    const eventBody = eventBodySchema.safeParse(req.body);

    if (!eventBody.success) {
        const errorResponse = { message: "Invalid event body", error: eventBody.error.errors };
        return res.status(400).json(errorResponse);
    }

    (eventBody.data as any).organization = res.locals.user.userId;

    try {
        const newEvent = new Events(eventBody.data);
        const savedEvent = await newEvent.save();
        return res.status(201).json(savedEvent);
    } catch (error) {
        const errorResponse: ErrorResponse = { message: "Error creating event", error };
        return res.status(500).json(errorResponse);
    }
}

export async function updateEvent(req: Request, res: Response) {
    const eventId = req.params.id;
    if (!eventId) {
        const errorResponse: ErrorResponse = { message: "Invalid event id" };
        return res.status(400).json(errorResponse);
    }

    const eventBody = updateEventBodySchema.safeParse(req.body);

    if (!eventBody.success) {
        const errorResponse = { message: "Invalid event body", error: eventBody.error.errors };
        return res.status(400).json(errorResponse);
    }

    let event = null;

    try {
        event = await Events.findById(eventId);
    } catch (error) {
        const errorResponse: ErrorResponse = { message: "Invalid event id" };
        return res.status(400).json(errorResponse);
    }

    if (event === null) {
        const errorResponse: ErrorResponse = { message: "Event not found" };
        return res.status(404).json(errorResponse);
    }

    if (!isUser(res, event.organization.toString())) {
        const errorResponse: ErrorResponse = { message: "User does not have permission to update this event" };
        return res.status(403).json(errorResponse);
    }

    if (eventBody.data.registration?.totalSpots && eventBody.data.registration.totalSpots < event.registration.registeredVolunteers.length) {
        const errorResponse: ErrorResponse = {
            message: `Cannot reduce total spots below the number of registered volunteers (${event.registration.registeredVolunteers.length})`,
        };
        return res.status(400).json(errorResponse);
    }

    // maintain the registration data for the event and update the total spots
    const totalSpots = eventBody.data.registration?.totalSpots;
    eventBody.data.registration = event.registration;

    if (totalSpots) {
        eventBody.data.registration.totalSpots = totalSpots;
    }

    let updatedEvent;

    try {
        // return the updated event, new option is set to true
        updatedEvent = await Events.findByIdAndUpdate(eventId, eventBody.data, { new: true });
    } catch (error) {
        const errorResponse: ErrorResponse = { message: "Error updating event", error };
        return res.status(500).json(errorResponse);
    }

    return res.status(200).json(updatedEvent);
}

export async function deleteEvent(req: Request, res: Response) {
    const eventId = req.params.id;

    if (!eventId) {
        const errorResponse: ErrorResponse = { message: "Invalid event id" };
        return res.status(400).json(errorResponse);
    }

    let event = null;
    try {
        event = await Events.findById(eventId);
    } catch (error) {
        const errorResponse: ErrorResponse = { message: "Invalid event id" };
        return res.status(400).json(errorResponse);
    }

    if (event === null) {
        const errorResponse: ErrorResponse = { message: "Event not found" };
        return res.status(404).json(errorResponse);
    }

    if (!isUser(res, event.organization.toString())) {
        const errorResponse: ErrorResponse = { message: "User does not have permission to delete this event" };
        return res.status(403).json(errorResponse);
    }

    try {
        await Events.findByIdAndDelete(eventId);
        return res.status(204).send();
    } catch (error) {
        const errorResponse: ErrorResponse = { message: "Error deleting event", error };
        return res.status(500).json(errorResponse);
    }
}
