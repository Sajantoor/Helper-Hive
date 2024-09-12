import { PUBLIC_SERVER_HOST } from '$env/static/public';
import type { EventContent } from '$lib/Types/Events';
import { handleErrors } from '$lib/Utils/handleErrors';

export async function load({ cookies }) {
    const fetchOptions: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `id=${cookies.get("id")}; rid=${cookies.get("rid")}`,
        },
        credentials: 'include',
    };

    const profileResponse = await fetch(`${PUBLIC_SERVER_HOST}/api/profile`, fetchOptions);

    if (!profileResponse.ok) {
        await handleErrors(profileResponse);
    }

    const profile = await profileResponse.json() as {
        id: string;
        email: string;
        name: string;
        profilePicture?: string | null;
    };

    const futureEventsResponse = await fetch(`${PUBLIC_SERVER_HOST}/api/registrations/future`, fetchOptions);

    if (!futureEventsResponse.ok) {
        await handleErrors(futureEventsResponse);
    }

    const futureEvents = await futureEventsResponse.json() as EventContent[];

    for (const event of futureEvents) {
        event.date.startDay = new Date(event.date.startDay);
        event.date.endDay = new Date(event.date.endDay);
        event.date.startTime = new Date(event.date.startTime);
        event.date.endTime = new Date(event.date.endTime);
    }

    const pastEventsResponse = await fetch(`${PUBLIC_SERVER_HOST}/api/registrations/past`, fetchOptions);

    if (!pastEventsResponse.ok) {
        await handleErrors(pastEventsResponse);
    }

    const pastEvents = await pastEventsResponse.json() as EventContent[];

    for (const event of pastEvents) {
        event.date.startDay = new Date(event.date.startDay);
        event.date.endDay = new Date(event.date.endDay);
        event.date.startTime = new Date(event.date.startTime);
        event.date.endTime = new Date(event.date.endTime);
    }

    return {
        profile,
        pastEvents,
        futureEvents
    };
} 
