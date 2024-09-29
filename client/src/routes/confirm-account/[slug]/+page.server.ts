import { PUBLIC_SERVER_HOST } from "$env/static/public";
import { handleErrors } from "$lib/Utils/handleErrors";

export async function load({ params }) {
    const response = await fetch(`${PUBLIC_SERVER_HOST}/api/confirm-account/${params.slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'credentials': 'include',
        }
    });

    if (!response.ok) {
        await handleErrors(response);
    }

    return;
} 
