import { PUBLIC_SERVER_HOST } from "$env/static/public";
import type { HandleFetch, RequestEvent } from "@sveltejs/kit";
import { splitCookiesString, parseString } from "set-cookie-parser";

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
    let response = await fetch(request);

    if (!request.url.startsWith(PUBLIC_SERVER_HOST)) {
        return response;
    }

    // If we're making a request to the server and it's a 401, we may need to 
    // refresh the token. Refresh the token and retry the request. 
    if (response.status === 401 && event.cookies.get("rid") === null) {
        const tokenFetch = await fetch(`${PUBLIC_SERVER_HOST}/api/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `rid=${event.cookies.get("rid")}`,
            },
            credentials: 'include',
        });

        if (!tokenFetch.ok) {
            return response;
        }

        response = await fetch(request);
    }

    setCookies(response, event);
    return response;
}

const setCookies = (response: Response, event: RequestEvent<Partial<Record<string, string>>, string | null>) => {
    const setCookieHeader = response.headers.get('set-cookie');

    if (setCookieHeader) {
        for (const str of splitCookiesString(setCookieHeader)) {
            const { name, value, ...options } = parseString(str);

            const parsedOptions = {
                ...options,
                path: options.path || '/',
                sameSite: options.sameSite as "lax" | "strict" | "none" | undefined,
            };

            event.cookies.set(name, value, parsedOptions);
        }
    }
}
