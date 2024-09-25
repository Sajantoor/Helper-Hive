import { Response } from "express";

export function isVolunteer(res: Response) {
    return !res.locals.user.isOrganization;
}

export function isOrganization(res: Response) {
    return res.locals.user.isOrganization;
}

export function isUser(res: Response, userId: string) {
    return res.locals.user.userId === userId;
}
