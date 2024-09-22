import { PUBLIC_SERVER_HOST } from '$env/static/public';
import type { Cookies } from '@sveltejs/kit';

export async function fetchProfile(cookies: Cookies): Promise<Response> {
    const response = await fetch(`${PUBLIC_SERVER_HOST}/api/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `id=${cookies.get("id")}; rid=${cookies.get("rid")}`,
        },
        credentials: 'include',
    });

    return response;
}
