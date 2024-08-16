export interface Event extends CalendarElementData {
    id: number;
    organization: Organization;
}

export interface CalendarElementData {
    img: string;
    title: string;
    location: string;
    date: Date;
}

export interface Organization {
    id: number;
    name: string;
    logo: string;
}
