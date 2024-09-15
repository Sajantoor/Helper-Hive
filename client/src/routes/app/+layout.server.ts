import { PUBLIC_SERVER_HOST } from '$env/static/public';
import type { ProfileResponse } from '$common/types/ProfileResponse';
import { handleErrors } from '$lib/Utils/handleErrors';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies }) => {
    // if cookies aren't there, redirect to login page 
    if (!cookies.get("id") || !cookies.get("rid")) {
        redirect(302, "/login")
    }

    const response = await fetch(`${PUBLIC_SERVER_HOST}/api/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `id=${cookies.get("id")}; rid=${cookies.get("rid")}`,
        },
        credentials: 'include',
    });

    if (!response.ok) {
        await handleErrors(response);
    }

    const data = await response.json() as ProfileResponse;

    return {
        profile: data,
    }
}
