export interface ProfileResponse {
    id: string;
    email: string;
    name: string;
    isOrganization: boolean;
    avatar: string;
    isVerified?: boolean;
}