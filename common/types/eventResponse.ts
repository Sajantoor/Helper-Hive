export type EventResponse = {
    _id: string;
    name: string;
    date: {
        startDay: Date;
        endDay: Date;
        startTime: Date;
        endTime: Date;
    };
    details: {
        description: string;
        preShiftInfo: string;
        location: string;
        tags: string[];
        photo: string;
        files: {
            url: string;
            name: string;
        }[];
    };
    registration: {
        totalSpots: number;
        totalRegistered: number;
        isRegistered?: boolean;
    }
    organization: OrganizationEventData;
}

export interface OrganizationEventData {
    _id: string;
    name: string;
    avatar: string;
}