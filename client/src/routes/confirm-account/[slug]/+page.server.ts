import { PUBLIC_SERVER_HOST } from "$env/static/public";
import { handleErrors } from "$lib/Utils/handleErrors";
import { splitCookiesString, parseString } from "set-cookie-parser";

export async function load({ params, cookies }) {
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

    // TODO: this is hacky fix and should be fixed later
    // this is a hack to get the response cookies to propagate to the client 
    const setCookieHeader = response.headers.get('set-cookie');

    if (setCookieHeader) {
        for (const str of splitCookiesString(setCookieHeader)) {
            const { name, value, ...options } = parseString(str);

            const parsedOptions = {
                ...options,
                path: options.path || '/',
                sameSite: options.sameSite as "lax" | "strict" | "none" | undefined,
            };

            cookies.set(name, value, parsedOptions);
        }
    }

    return;
} 
