<script lang="ts">
	import EventCard from '$lib/Components/EventCard.svelte';
	import type { Event } from '$lib/Types/Events';

	export let events: Event[] = [];
	let showAll = false;
</script>

<div class="container" class:limited={!showAll} class:showMore={showAll}>
	<div class="items">
		{#each events as event, i}
			<EventCard
				img={event.img}
				title={event.title}
				date={event.date}
				organization={event.organization.name}
				location={event.location}
				organizationLogo={event.organization.logo}
			/>
		{/each}
	</div>

	{#if !showAll && events.length > 8}
		<button on:click={() => (showAll = true)}>Show More</button>
	{/if}
</div>

<style>
	.container {
		width: 90%;
		margin: 0 auto;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		position: relative;
	}

	.items {
		margin: 0 20px;
		width: 100%;
	}

	.limited {
		max-height: calc(25%); /* 25% is the height for event cards */
		overflow: hidden;
	}

	.showMore {
		max-height: none;
	}
</style>
