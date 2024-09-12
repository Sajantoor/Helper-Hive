<script lang="ts">
	import EventCard from '$lib/Components/EventCard.svelte';
	import type { EventResponse } from '$common/types/eventResponse';

	export let events: EventResponse[] = [];
	let showAll = false;
</script>

<div class="container">
	<div class="items">
		{#each events as event, i}
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
</style>
