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
        location: LocationData;
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
    avatar: string
    instagram?: string;
}

export interface LocationData {
    formattedAddress: string;
    geoLocation: {
        lat: number;
        lng: number;
    }
    addressComponents: [
        {
            long_name: string;
            short_name: string;
            types: string[];
        }
    ]
    name: string;
}
