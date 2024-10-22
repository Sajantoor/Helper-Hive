import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { fetchProfile } from "$lib/utils/fetch";

export const load: LayoutServerLoad = async ({ cookies, url }) => {
    // check if it's not the app route to avoid loops
    if (url.pathname.startsWith("/app") || url.pathname.startsWith("/confirm-account")) {
        return;
    }

    // if cookies aren't there, show the unauthenticated routes
    if (!cookies.get("rid") || !cookies.get("id")) {
        return;
    }

    const response = await fetchProfile(cookies);

    if (response.ok) {
        redirect(302, "/app");
    }

    return;
}
