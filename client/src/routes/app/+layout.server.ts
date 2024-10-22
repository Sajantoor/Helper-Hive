import type { ProfileResponse } from '$common/types/ProfileResponse';
import { handleErrors } from '$lib/utils/handleErrors';
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { fetchProfile } from '$lib/utils/fetch';

export const load: LayoutServerLoad = async ({ cookies }) => {
    // if cookies aren't there, redirect to login page 
    if (!cookies.get("rid") || !cookies.get("id")) {
        redirect(302, "/login");
    }

    const response = await fetchProfile(cookies);

    if (!response.ok) {
        await handleErrors(response);
    }

    const data = await response.json() as ProfileResponse;

    return {
        profile: data,
    }
}
