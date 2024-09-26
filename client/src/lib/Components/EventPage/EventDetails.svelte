<script lang="ts">
	import Section from '../Text/Section.svelte';
	import Text from '../Text/Text.svelte';

	import CalendarMonth from 'svelte-material-icons/CalendarMonthOutline.svelte';
	import MapMarkerOutline from 'svelte-material-icons/MapMarkerOutline.svelte';
	import Checkmark from 'svelte-material-icons/CheckBold.svelte';
	import { PUBLIC_SERVER_HOST } from '$env/static/public';
	import type { EventResponse } from '$common/types/eventResponse';
	import { profileStore } from '$lib/stores/profileStore';
	import { goto } from '$app/navigation';

	export let event: EventResponse;
	const id = event._id;
	const eventTitle = event.name;
	const tags = event.details.tags;
	const startDate = event.date.startDay;
	const endDate = event.date.endDay;
	const location = event.details.location;
	let isOrganization = $profileStore?.isOrganization;
	let isOwner = isOrganization && $profileStore?.id === event.organization._id;

	let spotsAvailable = event.registration.totalSpots - event.registration.totalRegistered;
	let registered = event.registration.isRegistered || false;
	let clickedRegister = false; // Make button green for 1.25sec

	export let hours: string = getTime(event.date.startTime, event.date.endTime);

	const isSameDay = startDate.toDateString() === endDate.toDateString();
	let displayDate = isSameDay
		? formatDate(startDate)
		: `${formatDate(startDate)} - ${formatDate(endDate)}`;

	let locationTitle: string, locationDescription: string;

	if (location) {
		locationTitle = location.name;
		locationDescription = location.formattedAddress;
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
		if (!clickedRegister){
			if (registered) {
				deregisterForEvent();
			} else {
				registerForEvent();
			}
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
		
		spotsAvailable--;
		clickedRegister = true;
		
		setTimeout(() => {
			clickedRegister = false;
			registered = true;
		}, 1200);
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

	<div class="mt-1 desktop:mt-4">
		<Text class="text-altTextGray">{spotsAvailable} {spotsAvailable == 1 ? 'Spot Available' : 'Spots Available'}</Text>
		{#if !isOrganization}
			<button
				class={`w-full ${clickedRegister ?
					'bg-green-400 text-emerald-900 border border-green-500/25 shadow-sm cursor-default scale-[1.03] flex items-center justify-center' :
					spotsAvailable > 0 && !registered ? 'bg-primaryYellow text-black hoverx:scale-[1.025]' :
					'bg-placeholderGray text-placeholderGrayText cursor-default transition-scale'}
					transition-all ease-out py-2 px-4 mt-2 rounded-lg mx-auto`}
				on:click={handleRegister}
			>
				<Text>{clickedRegister ? 'Registered!' : !registered ? 'Register' : 'Unregister'}</Text>
				{#if clickedRegister}
					<Checkmark class="text-emerald-900 ml-1"/>
				{/if}
			</button>
		{/if}
		{#if isOwner}
			<button
				class="w-full bg-primaryYellow text-black py-2 px-4 mt-2 rounded-lg mx-auto text"
				on:click={() => goto(`/app/events/${id}/edit`)}
			>
				<Text>Edit Event</Text>
			</button>
		{/if}
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
