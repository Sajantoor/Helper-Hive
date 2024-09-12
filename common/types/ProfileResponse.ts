export interface ProfileResponse {
    id: string;
    email: string;
    name: string;
    role: "volunteer" | "organization";
    avatar: string;
}