<script lang="ts">
	import HostInfo from './HostInfo.svelte';
	import EventDetails from './EventDetails.svelte';
	import Location from './Location.svelte';
	import Text from '../Text/Text.svelte';
	import Heading from '../Text/Heading.svelte';

	export let eventTitle: string = '';
	export let eventImage: string = '';
	export let eventDescription: string = '';
	export let tags: string[] = [];
	export let startDate: Date = new Date();
	export let endDate: Date = new Date();
	export let hours: string = '';
	export let location: string = '';
	export let hostImage: string = '';
	export let hostName: string = '';
	export let hostInstagram: string = '';
	export let preShiftInfo: string = '';
	export let spotsAvailable: number = 0;
	export let files: string[] = [];
</script>

<div class="event-page">
	<img class="eventImg rounded-3xl" src={eventImage} alt={eventTitle} />

	<EventDetails {eventTitle} {tags} {startDate} {endDate} {hours} {location} {spotsAvailable} />

	<div>
		<HostInfo {hostImage} {hostName} {hostInstagram} {files} />
		{#if location}
			<Location {location} />
		{/if}
	</div>

	<div>
		{#if eventDescription}
			<div>
				<Heading class="mb-4">About this event</Heading>
				<Text class="leading-relaxed mb-4">{eventDescription}</Text>
			</div>
		{/if}

		{#if preShiftInfo}
			<div class="pre-shift-info">
				<Heading class="mb-4">Pre-Shift Important Information</Heading>
				<Text>{preShiftInfo}</Text>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.event-page {
		margin: auto;
		margin-top: 2rem;
		margin-bottom: 2rem;
		width: 70vw;
		display: grid;
		grid-template-columns: 44% 56%;
		grid-template-rows: auto;
		grid-gap: 2rem 5rem;
		justify-content: center;
	}

	.pre-shift-info {
		grid-column: span 2;
	}

	.eventImg {
		object-fit: cover;
		height: 100%;
	}

	@media (max-width: 896px) {
		.event-page {
			display: flex;
			flex-direction: column;
		}
	}
</style>
