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
	export let preShiftInfo: string = '';
</script>

<div class="event-page">
	<img class="rounded-3xl" style="width: 100%; height: auto" src={eventImage} alt={eventTitle} />

	<EventDetails {eventTitle} {tags} {startDate} {endDate} {hours} {location} />

	<div>
		<HostInfo {hostImage} {hostName} />
		<Location {location} />
	</div>

	<div>
		<Heading class="mb-4">About this event</Heading>
		<Text class="test leading-relaxed">{eventDescription}</Text>
	</div>

	<div class="pre-shift-info">
		<Heading class="mb-4">Pre-Shift Important Information</Heading>
		<Text>{preShiftInfo}</Text>
	</div>
</div>

<style>
	.event-page {
		margin: auto;
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

	@media (max-width: 768px) {
		.event-page {
			display: flex;
			flex-direction: column;
		}
	}
</style>
