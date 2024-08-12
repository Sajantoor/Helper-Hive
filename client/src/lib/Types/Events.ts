export interface Event {
    id: number;
    title: string;
    location: string;
    date: Date;
    organization: Organization;
    img: string;
}

export interface Organization {
    id: number;
    name: string;
    logo: string;
}
