<script lang="ts">
	import EventScroller from '$lib/Components/EventScroller.svelte';
	import CalendarView from '$lib/Components/CalendarView.svelte';
	import Searchbar from '$lib/Components/Searchbar.svelte';
	import Text from '$lib/Components/Text/Text.svelte';

	export let data;

	let events = data.events;

	let tags: string[] = [];
</script>

<div class="dashboard mb-8">
	<Text class="text-2xl font-bold ml-4 desktop:ml-[5%] mt-4 desktop:mt-[1%] mb-[1%]">Events</Text>

	{#if tags && tags.length > 0}
		<div class="tags-section mb-4 ml-[5%]">
			<div class="tag-list mt-2">
				{#each tags as tag}
					<div class="tag bg-tagYellow">
						<Text>{tag}</Text>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	<Text class="text-2xl font-bold ml-[5%] mt-[1%] mb-[1%]">Upcoming Events</Text>

	<!-- limit to 12 events -->
	<EventScroller events={events.slice(0, 12)} />	
	<CalendarView {events} />
</div>

<style lang="postcss">
	.dashboard {
		display: flex;
		flex-direction: column;
		gap: 1rem;
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
