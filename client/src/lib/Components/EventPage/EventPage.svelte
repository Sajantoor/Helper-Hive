<script lang="ts">
	import HostInfo from './HostInfo.svelte';
	import EventDetails from './EventDetails.svelte';
	import Location from './Location.svelte';
	import Text from '../Text/Text.svelte';
	import Heading from '../Text/Heading.svelte';
	import type { EventResponse } from '$common/types/eventResponse';
	import Files from './Files.svelte';

	export let eventData: EventResponse;
</script>

<div class="event-page w-[90vw] desktop:w-[70vw]">
	<img
		class="eventImg rounded-3xl w-[94%] desktop:w-full max-desktop:ml-auto"
		src={eventData.details.photo}
		alt={eventData.name}
	/>

	<EventDetails event={eventData} />

	<div>
		<HostInfo organization={eventData.organization} />
		<Files files={eventData.details.files} />

		<!-- <Text class="text-altTextGray mb-4">Contact the host</Text>
		<Text class="text-altTextGray">Report this event</Text> -->

		{#if eventData.details.location}
			<Location location={eventData.details.location.formattedAddress} />
		{/if}
	</div>

	<div class="max-desktop:mt-2">
		{#if eventData.details.description}
			<div>
				<Heading class="mb-4">About this event</Heading>
				<Text class="leading-relaxed mb-4">{eventData.details.description}</Text>
			</div>
		{/if}

		{#if eventData.details.preShiftInfo}
			<div class="pre-shift-info">
				<Heading class="mb-4">Pre-Shift Important Information</Heading>
				<Text>{eventData.details.preShiftInfo}</Text>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.event-page {
		margin: auto;
		margin-top: 2rem;
		margin-bottom: 2rem;
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

	@media (max-width: 550px) {
		.event-page {
			grid-gap: 1.25rem 5rem;
		}
	}
</style>
