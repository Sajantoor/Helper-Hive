<script lang="ts">
	import EventCard from '$lib/Components/EventCard.svelte';
	import type { EventResponse } from '$common/types/eventResponse';
	import { onMount, onDestroy } from 'svelte';

	import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';
	import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';
	import Text from './Text/Text.svelte';

	export let events: EventResponse[];
	let currentSlide = 0;

	let numCardsPerSlide = 4;
	$: totalSlides = Math.ceil(events.length / numCardsPerSlide);

	function updateNumCardsPerSlide() {
		const width = window.innerWidth;
		if (width <= 600) {
			numCardsPerSlide = 1;
		} else if (width <= 900) {
			numCardsPerSlide = 2;
		} else if (width <= 1200) {
			numCardsPerSlide = 3;
		} else {
			numCardsPerSlide = 4;
		}

		if (currentSlide >= totalSlides) {
			currentSlide = totalSlides - 1;
		}
	}

	onMount(() => {
		updateNumCardsPerSlide();

		if (typeof window === 'undefined') return;
		window.addEventListener('resize', updateNumCardsPerSlide);
	});

	onDestroy(() => {
		if (typeof window === 'undefined') return;
		window.removeEventListener('resize', updateNumCardsPerSlide);
	});

	function nextSlide() {
		if (currentSlide < totalSlides - 1) {
			currentSlide++;
		}
	}

	function prevSlide() {
		if (currentSlide > 0) {
			currentSlide--;
		}
	}
</script>

<div class="w-full overflow-hidden">
	{#if events.length === 0}
		<Text class="text-center">There are no available events at this time, try again later...</Text>
	{:else}
		<div class="flex items-center mx-auto relative">
			<div class="flex-none w-12 flex justify-center bg-white z-10">
				{#if currentSlide > 0}
					<button
						class="p-2 rounded-full transition bg-white hover:bg-gray-200 shadow-md"
						on:click={prevSlide}
					>
						<ArrowLeft />
					</button>
				{/if}
			</div>
			<div class="flex-grow overflow-hidden">
				<div
					class="flex transition-transform duration-300 ease-in-out"
					style="transform: translateX(calc(-100% * {currentSlide}));"
				>
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
			<div class="flex-none w-12 flex justify-center bg-white z-10">
				{#if currentSlide < totalSlides - 1}
					<button
						class="p-2 rounded-full transition bg-white hover:bg-gray-200 shadow-md"
						on:click={nextSlide}
					>
						<ArrowRight />
					</button>
				{/if}
			</div>
		</div>

		<div class="flex justify-center mt-4">
			{#each Array.from({ length: totalSlides }) as _, i}
				<button
					class="w-2.5 h-2.5 rounded-full mx-1 transition-colors duration-300
			{i === currentSlide ? 'bg-primaryYellow' : 'bg-tagYellow'}"
					on:click={() => (currentSlide = i)}
				/>
			{/each}
		</div>
	{/if}
</div>
