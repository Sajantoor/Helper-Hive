import type { EventResponse } from '$common/types/eventResponse.js';
import { PUBLIC_SERVER_HOST } from '$env/static/public';

export async function load({ cookies, params }) {
    const slug = params.slug;
    const response = await fetch(`${PUBLIC_SERVER_HOST}/api/events/${slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `id=${cookies.get("id")}; rid=${cookies.get("rid")}`,
        },
        credentials: 'include',
    });

    if (!response.ok) {
        console.log(response.status);
        throw new Error('Failed to load events');
    }

    const event = await response.json() as EventResponse;
    event.date.startDay = new Date(event.date.startDay);
    event.date.endDay = new Date(event.date.endDay);
    event.date.startTime = new Date(event.date.startTime);
    event.date.endTime = new Date(event.date.endTime);

    return event;
} 
