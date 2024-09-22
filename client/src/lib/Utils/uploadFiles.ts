import { PUBLIC_SERVER_HOST } from "$env/static/public"

export async function uploadFile(file: File) {
    const s3SecureURLResponse = await fetch(`${PUBLIC_SERVER_HOST}/api/upload/${file.name}`);
    const { uploadUrl } = await s3SecureURLResponse.json();

    const response = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: file,
    });

    if (!response.ok) {
        throw new Error("Failed to upload file");
    }

    const url = uploadUrl.split("?")[0];
    return url;
}

export const createBase64Image = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};
