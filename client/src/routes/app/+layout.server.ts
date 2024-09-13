import { PUBLIC_SERVER_HOST } from '$env/static/public';
import type { ProfileResponse } from '$common/types/ProfileResponse';
import { handleErrors } from '$lib/Utils/handleErrors';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
    // if cookies aren't there, redirect to login page 
    if (!cookies.get("id") || !cookies.get("rid")) {
        return {
            status: 302,
            redirect: '/login',
        }
    }

    const response = await fetch(`${PUBLIC_SERVER_HOST}/api/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `id=${cookies.get("id")}; rid=${cookies.get("rid")}`,
        },
        credentials: 'include',
    });

    const data = await response.json() as ProfileResponse;

    if (!response.ok) {
        handleErrors(response);
    }

    return {
        profile: data,
    }
}
