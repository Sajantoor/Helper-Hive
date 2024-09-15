export interface EventFormData {
    name: string | undefined;
    description: string | undefined;
    preShift: string | undefined;
    startDate: Date | null;
    endDate: Date | null;
    startTime: string | undefined;
    endTime: string | undefined;
    tagValues: string[];
    shiftOpenings: number | undefined;
    location: string | undefined;
    image: File | undefined;
    imageUrl?: string;
    files: File[];
    uploadedFiles?: UploadedFiles[];
    id?: string;
}

export interface UploadedFiles {
    name: string;
    url: string;
}