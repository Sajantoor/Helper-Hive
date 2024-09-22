<script lang="ts">
	import EventCard from '$lib/Components/EventCard.svelte';
	import type { EventResponse } from '$common/types/eventResponse';
	import Text from './Text/Text.svelte';

	export let events: EventResponse[] = [];

	let showAll = false;

	$: eventsToShow = showAll ? events : events.slice(0, 8);
</script>

<div class="container">
	<div class="items">
		{#if eventsToShow.length === 0}
			<Text class="mt-5 mb-5 text-center italic">Currently no events to show...</Text>
		{/if}

		{#each eventsToShow as event, i}
			<EventCard
				id={event._id}
				img={event.details.photo}
				title={event.name}
				date={event.date.startDay}
				organization={event.organization.name}
				location={event.details.location}
				organizationAvatar={event.organization.avatar}
			/>
		{/each}
	</div>
</div>

{#if events.length > 8}
	<button class="moreButton mt-4" on:click={() => (showAll = !showAll)}>
		{showAll ? 'Show Less' : 'More'}
	</button>
{/if}

<style>
	.container {
		width: 90%;
		margin: 0 auto;
		display: flex;
		flex-wrap: nowrap;
	}

	.items {
		margin: 0 20px;
		width: 100%;
	}

	.moreButton {
		background-color: #fabd22;
		border: none;
		padding: 10px 30px;
		border-radius: 20px;
		color: black;
		font-weight: bold;
		cursor: pointer;
	}
</style>
