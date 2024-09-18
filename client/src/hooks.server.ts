import { PUBLIC_SERVER_HOST } from "$env/static/public";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    if (event.cookies.get("rid")) {
        // try to refresh the token 
        const tokenFetch = await fetch(`${PUBLIC_SERVER_HOST}/api/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `rid=${event.cookies.get("rid")}`,
            },
            credentials: 'include',
        });

        if (!tokenFetch.ok) {
            return resolve(event);
        }

        const token = await tokenFetch.json();

        // TODO: make sure this is the same as the server
        event.cookies.set("id", token.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            domain: "helperhive.ca",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });
    }

    return resolve(event);
}