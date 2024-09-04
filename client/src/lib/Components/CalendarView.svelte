<script lang="ts">
    import CalendarElement from '$lib/Components/CalendarEvent.svelte';
    import { onMount } from 'svelte';
    import type { CalendarElementData } from '$lib/Types/Events';
    import Text from './Text/Text.svelte';
    import { PUBLIC_SERVER_HOST } from '$env/static/public';

    let currentDate = new Date();
    let calendarElements: CalendarElementData[] = [];
    let allEvents: CalendarElementData[] = []; // Store all events fetched from the backend
    let currentPage = 0;
    let displayedMonths = '';
    const daysPerPage = 10;

    // Fetch events from the backend
    const fetchEvents = async () => {
        try {
            const response = await fetch(`${PUBLIC_SERVER_HOST}/api/events`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                allEvents = data.map((event: any) => ({
                    img: event.details.photo || 'default-image-url',  // Default image if no photo provided
                    title: event.name,
                    date: new Date(event.date.startDay), 
                    location: event.details.location
                }));
                // Generate elements for the first page
                calendarElements = generateCalendarElements(currentPage);
            } else {
                console.error('Failed to fetch events');
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    // Generates calendar elements based on the page number
    const generateCalendarElements = (page: number): CalendarElementData[] => {
        const startIndex = page * daysPerPage;
        const endIndex = startIndex + daysPerPage;

        // Slice events for the current page
        const elements = allEvents.slice(startIndex, endIndex);

        updateDisplayedMonths(elements, page);
        return elements;
    };

    // Update displayed months in the navigation based on the events shown
    const updateDisplayedMonths = (elements: CalendarElementData[], page: number) => {
        const uniqueMonths = new Set(
            elements.map((e) => {
                const month = e.date.toLocaleString('default', { month: 'short' });
                const year =
                    e.date.getFullYear() !== currentDate.getFullYear() ? ` ${e.date.getFullYear()}` : '';
                return `${month}${year}`;
            })
        );

        displayedMonths = Array.from(uniqueMonths).join(' - ');
    };

    // Navigation functions
    const nextPage = () => {
        if (currentPage * daysPerPage + daysPerPage < allEvents.length) {
            currentPage++;
            calendarElements = generateCalendarElements(currentPage);
        }
    };

    const firstPage = () => {
        currentPage = 0;
        calendarElements = generateCalendarElements(currentPage);
    };

    const previousPage = () => {
        if (currentPage > 0) {
            currentPage--;
            calendarElements = generateCalendarElements(currentPage);
        }
    };

    // Fetch events when the component is mounted
    onMount(() => {
        fetchEvents();
    });
</script>

<div class="calendar-view">
    <div class="header w-full">
        <Text class="calendar-title text-2xl font-bold">Calendar</Text>
        <div class="navigation flex mt-2">
            <button on:click={previousPage} disabled={currentPage === 0}>{'<'}</button>
            <button on:click={nextPage} class="ml-2" disabled={(currentPage + 1) * daysPerPage >= allEvents.length}>{'>'}</button>
            <div class="today_button ml-6 p-2 border rounded">
                <button on:click={firstPage}>
                    <Text>Today</Text>
                </button>
            </div>

            <div class="ml-2">
                <Text class="text-xl ml-6 font-bold">{displayedMonths}</Text>
            </div>
        </div>
    </div>
    <div class="calendar-grid grid grid-cols-4 gap-4 mt-4">
        {#each calendarElements as element (element.date)}
            <div class="grid-element">
                <CalendarElement
                    img={element.img}
                    title={element.title}
                    location={element.location}
                    date={element.date}
                />
            </div>
        {/each}
    </div>
</div>

<style lang="postcss">
    .grid-element {
        object-fit: contain;
        padding: 0;
        margin: 0;
        display: flex;
        width: 100%;
    }

    .calendar-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .header {
        width: 90%;
        margin-left: 2rem;
    }

    .calendar-grid {
        width: 90%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 1rem;
    }

    .navigation {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .today_button {
        border: 1px solid #ccc;
        padding: 0 0.5rem;
        border-radius: 4px;
        margin-right: 1rem;
    }

    button {
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
        .calendar-grid {
            grid-template-columns: repeat(3, 1fr); /* 3 columns on medium screens */
        }
    }

    @media (max-width: 768px) {
        .calendar-grid {
            grid-template-columns: repeat(2, 1fr); /* 2 columns on small screens */
        }

        .header {
            width: 100%;
        }

        .navigation {
            justify-content: center;
            width: 100%;
            margin-top: 1rem;
        }

        .today_button {
            margin-top: 1rem;
            margin-left: 0;
            text-align: center;
        }
    }

    @media (max-width: 480px) {
        .calendar-grid {
            grid-template-columns: 1fr; /* 1 column on extra small screens */
        }
    }
</style>