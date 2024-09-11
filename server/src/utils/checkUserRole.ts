import { Response } from "express";

export function isVolunteer(res: Response) {
    return res.locals.user.userRole === "volunteer";
}

export function isOrganization(res: Response) {
    return res.locals.user.userRole === "organization";
}

export function isUser(res: Response, userId: string) {
    return res.locals.user.userId === userId;
}