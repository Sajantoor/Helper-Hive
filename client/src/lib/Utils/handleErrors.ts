import { error } from '@sveltejs/kit';

export async function handleErrors(response: Response) {
    const code = response.status;

    let errorResponse: {
        message: string;
    } = {
        message: "Internal Server Error"
    }

    try {
        errorResponse = await response.json();
        console.log(errorResponse);
    } catch (e) {
        console.error(e);
    }

    error(code, {
        message: errorResponse.message,
        code: code
    });
}