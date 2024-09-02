<script lang="ts">
	import NavBar from '$lib/Components/NavBar.svelte';
	import EventScroller from '$lib/Components/EventScroller.svelte';
	import CalendarView from '$lib/Components/CalendarView.svelte';
	import Searchbar from '$lib/Components/Searchbar.svelte';
	import Text from '$lib/Components/Text/Text.svelte';

	import type { Event } from '$lib/Types/Events';

	let events: Event[] = [
		{
			id: 1,
			img: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg',
			title: "Science World Children's Day",
			date: new Date(),
			organization: {
				id: 1,
				name: 'The City of Vancouver',
				logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s'
			},
			location: 'Vancouver, BC 1455 Quebec St'
		},
		{
			id: 1,
			img: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg',
			title: "2 World Children's Day",
			date: new Date(),
			organization: {
				id: 1,
				name: 'The City of Vancouver',
				logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s'
			},
			location: 'Vancouver, BC 1455 Quebec St'
		},
		{
			id: 1,
			img: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg',
			title: "3 World Children's Day",
			date: new Date(),
			organization: {
				id: 1,
				name: 'The City of Vancouver',
				logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s'
			},
			location: 'Vancouver, BC 1455 Quebec St'
		},
		{
			id: 1,
			img: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg',
			title: "4 World Children's Day",
			date: new Date(),
			organization: {
				id: 1,
				name: 'The City of Vancouver',
				logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s'
			},
			location: 'Vancouver, BC 1455 Quebec St'
		},
		{
			id: 1,
			img: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg',
			title: "5 World Children's Day",
			date: new Date(),
			organization: {
				id: 1,
				name: 'The City of Vancouver',
				logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s'
			},
			location: 'Vancouver, BC 1455 Quebec St'
		}
	];

	let tags: string[] = ['Childcare', 'Education', 'Event Planning'];
</script>

<div class="dashboard mb-8">
	<NavBar />
	<Text class="text-2xl font-bold ml-[5%] mt-[1%] mb-[1%]">Events</Text>
	<Searchbar />

	{#if tags && tags.length > 0}
		<div class="tags-section mt-[2%] mb-4 ml-[5%]">
			<div class="tag-list mt-2">
				{#each tags as tag}
					<div class="tag bg-tagYellow">
						<Text>{tag}</Text>
					</div>
				{/each}
			</div>
		</div>
	{/if}
	<Text class="text-2xl font-bold ml-[5%] mt-[1%] mb-[1%]">Featured Events</Text>

	<div class="w-full overflow-hidden">
		<EventScroller {events} />
	</div>
	<CalendarView />
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
	
	:global(html, body) {
		overflow-x: hidden;
	}
	:global(body) {
		position: relative;
	}
</style>
