export interface Profile {
    id: string;
    email: string;
    name: string;
    role: "volunteer" | "organization";
    profilePicture?: string | null;
}