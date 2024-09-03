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
        files: string[];
    };
    registration: {
        totalSpots: number;
        totalRegistered: number;
        isRegistered?: boolean;
    }
    organization: {
        _id: string,
        name: string,
        logo: string;
    }
}
