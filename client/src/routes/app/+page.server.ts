import type { EventResponse } from '$common/types/eventResponse.js';
import { PUBLIC_SERVER_HOST } from '$env/static/public';
import { handleErrors } from '$lib/utils/handleErrors.js';

export async function load({ cookies }) {
    const response = await fetch(`${PUBLIC_SERVER_HOST}/api/events`, {
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

    const events = await response.json() as EventResponse[];
    events.forEach(event => {
        event.date.startDay = new Date(event.date.startDay);
        event.date.endDay = new Date(event.date.endDay);
        event.date.startTime = new Date(event.date.startTime);
        event.date.endTime = new Date(event.date.endTime);
    });

    return {
        events,
    }
} 
