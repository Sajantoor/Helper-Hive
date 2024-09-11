import { PUBLIC_SERVER_HOST } from "$env/static/public"

export async function uploadFile(file: File) {
    const s3SecureURLResponse = await fetch(`${PUBLIC_SERVER_HOST}/api/upload`);
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
