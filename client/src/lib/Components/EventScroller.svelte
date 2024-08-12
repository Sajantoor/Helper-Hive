<script lang="ts">
	import EventCard from '$lib/Components/EventCard.svelte';
	import type { Event } from '$lib/Types/Events';

	import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';
	import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';

	export let events: Event[] = [];
	let currentSlide = 0;

	const NUM_CARDS_PER_SLIDE = 4;
	const totalSlides = Math.ceil(events.length / NUM_CARDS_PER_SLIDE); // Assuming 4 cards per view

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

<div class="carouselContainer">
	{#if currentSlide > 0}
		<button class="prevButton" on:click={prevSlide}>
			<ArrowLeft />
		</button>
	{/if}
	<div class="eventScroller" style="transform: translateX(calc(-100% * {currentSlide}));">
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

	{#if currentSlide < totalSlides - 1}
		<button class="nextButton" on:click={nextSlide}>
			<ArrowRight />
		</button>
	{/if}
</div>

<div class="indicatorDots">
	{#each Array.from({ length: totalSlides }) as _, i}
		<button class="dot" class:active={i === currentSlide} on:click={() => (currentSlide = i)} />
	{/each}
</div>

<style>
	.carouselContainer {
		display: flex;
		align-items: center;
		position: relative;
	}

	.eventScroller {
		display: flex;
		scroll-behavior: smooth;
		width: 100%;
		transition: transform 0.3s ease-in-out;
	}

	.prevButton,
	.nextButton {
		border: none;
		padding: 10px;
		position: absolute;
		top: 50%;
		border-radius: 50%;
		transform: translateY(-50%);
		z-index: 1;
		transition:
			background-color 0.3s,
			box-shadow 0.3s;
	}

	.prevButton:hover,
	.nextButton:hover {
		background-color: rgba(255, 255, 255, 1);
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	}

	.prevButton {
		left: 0;
	}

	.nextButton {
		right: 0;
	}

	.indicatorDots {
		display: flex;
		justify-content: center;
	}

	.dot {
		background-color: #ffe6a6;
		border-radius: 50%;
		width: 10px;
		height: 10px;
		margin: 0 5px;
		transition: background-color 0.3s;
	}

	.active.dot {
		background-color: #fabd22;
	}
</style>
