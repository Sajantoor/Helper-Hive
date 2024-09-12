<script lang="ts">
	import Section from '../Text/Section.svelte';
	import Text from '../Text/Text.svelte';

	import CalendarMonth from 'svelte-material-icons/CalendarMonthOutline.svelte';
	import MapMarkerOutline from 'svelte-material-icons/MapMarkerOutline.svelte';
	import { PUBLIC_SERVER_HOST } from '$env/static/public';
	import type { EventResponse } from '$common/types/eventResponse';

	export let event: EventResponse;
	const id = event._id;
	const eventTitle = event.name;
	const tags = event.details.tags;
	const startDate = event.date.startDay;
	const endDate = event.date.endDay;
	const location = event.details.location;

	let spotsAvailable = event.registration.totalSpots - event.registration.totalRegistered;
	let registered = event.registration.isRegistered || false;

	export let hours: string = getTime(event.date.startTime, event.date.endTime);

	const isSameDay = startDate.toDateString() === endDate.toDateString();
	let displayDate = isSameDay
		? formatDate(startDate)
		: `${formatDate(startDate)} - ${formatDate(endDate)}`;

	let locationTitle: string, locationDescription: string;
	if (location) {
		locationTitle = location.split(':')[0].trim();
		locationDescription = location.split(':')[1].trim();
	}

	function formatDate(date: Date) {
		const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
		return date.toLocaleDateString(undefined, options);
	}

	function formatTime(hours: number, minutes: number): string {
		const period = hours >= 12 ? 'PM' : 'AM';
		const formattedHours = hours % 12 || 12; // Convert to 12-hour format
		const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure two digits for minutes
		return `${formattedHours}:${formattedMinutes} ${period}`;
	}

	function getTime(start: Date, end: Date): string {
		const startHours = start.getHours();
		const startMinutes = start.getMinutes();
		const endHours = end.getHours();
		const endMinutes = end.getMinutes();

		const formattedStart = formatTime(startHours, startMinutes);
		const formattedEnd = formatTime(endHours, endMinutes);

		return `${formattedStart} - ${formattedEnd}`;
	}

	function handleRegister() {
		if (registered) {
			deregisterForEvent();
		} else {
			registerForEvent();
		}
	}

	async function registerForEvent() {
		const response = await fetch(`${PUBLIC_SERVER_HOST}/api/registrations/register/event/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});

		if (!response.ok) {
			console.error('Failed to register for event');
			return;
		}

		registered = true;
		spotsAvailable--;
	}

	async function deregisterForEvent() {
		const response = await fetch(`${PUBLIC_SERVER_HOST}/api/registrations/deregister/event/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});

		if (!response.ok) {
			console.error('Failed to deregister for event');
			return;
		}

		// deregister for the event
		registered = false;
		spotsAvailable++;
	}
</script>

<div class="event-details">
	<Section>{eventTitle}</Section>

	<div class="item">
		<CalendarMonth class="text-primaryYellow" size={40} />
		<div class="ml-5">
			<Text class="font-semibold">{displayDate}</Text>
			<Text>{hours}</Text>
		</div>
	</div>

	<div class="item">
		<MapMarkerOutline class="text-primaryYellow" size={40} />
		<div class="ml-5">
			<Text class="font-semibold">{locationTitle}</Text>
			<Text>{locationDescription}</Text>
		</div>
	</div>

	<div>
		{#if tags.length > 0}
			<Text class="font-semibold">Tags</Text>
			<div class="tag-list mt-2">
				{#each tags as tag}
					<div class="tag bg-tagYellow">
						<Text>{tag}</Text>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<div class="mt-4">
		<Text class="text-altTextGray">{spotsAvailable} Spots Avaliable</Text>
		<button
			class={`w-full ${spotsAvailable > 0 && !registered ? 'bg-primaryYellow text-black' : 'bg-placeholderGray text-placeholderGrayText cursor-default'} py-2 px-4 mt-2 rounded-lg mx-auto text`}
			on:click={handleRegister}
		>
			<Text>Register</Text>
		</button>
	</div>
</div>

<style lang="postcss">
	.event-details {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.item {
		display: flex;
		align-items: center;
		margin-top: 0.5rem;
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
	}

	.tag {
		padding: 0.5rem 1rem;
		min-width: 6rem;
		border-radius: 4rem;
		display: inline-block;
		white-space: nowrap;
		text-align: center;
	}
</style>
