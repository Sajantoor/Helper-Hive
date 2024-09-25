<script lang="ts">
	import EventScroller from '$lib/Components/EventScroller.svelte';
	import CalendarView from '$lib/Components/CalendarView.svelte';
	import Text from '$lib/Components/Text/Text.svelte';
	import Heading from '$lib/Components/Text/Heading.svelte';
	import logoSrc from '$lib/assets/Logo.png';

	export let data;

	let events = data.events;

	let tags: string[] = [];
</script>

<div class="dashboard mb-8">
	<!-- <Text class="text-2xl font-bold ml-4 desktop:ml-[5%] mt-4 desktop:mt-[1%] mb-[1%]">Events</Text> -->

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

<!-- Experimenting with gradient footer, in case we even wanna do one here in the future
<div class="footer-container">
	<!-- Container for gradient -- >
	<div class="flex justify-center pt-4 pb-20 desktop:pt-8 desktop:pb-16"></div>
	<div class="footer">
		<div>
			<Heading class="mb-4">Got Questions?</Heading>

			<a href="mailto:helperhivevolunteer@gmail.com">
				<Text class="text-orange-800">helperhivevolunteer@gmail.com</Text>
			</a>

			<a href="https://instagram.com/helper.hive">
				<Text class="text-orange-800">@helper.hive</Text>
			</a>
			<a href="https://github.com/Sajantoor/Helper-Hive/issues">
				<!-- make the it a blue color -- >

				<Text class="text-orange-800">Report a Bug</Text>
			</a>
		</div>

		<div class="flex items-end desktop:items-center">
			<Text class="text-right desktop:text-center">Helper Hive Volunteer Network</Text>
			<img src={logoSrc} alt="Logo" class="h-16 ml-2 max-desktop:mr-1 desktop:ml-5" />
		</div>
	</div>
</div>-->

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
	
	.footer {
		margin: 0 auto;
		display: flex;
		width: 90%;
		justify-content: space-between;
	}

	.footer-container {
		padding-bottom: 2rem;
		margin-bottom: 0;
		background: linear-gradient(to bottom, white 12%, #FAC336 44%, #FAC336 44%);
	}

	@media (max-width: 550px) {
		.footer {
			margin: 0 auto;
			display: flex;
			margin-left: 5%;
			width: 94%;
			justify-content: space-between;
		}
	}
</style>
