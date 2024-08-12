<script lang="ts">
	import EventCard from '$lib/Components/EventCard.svelte';
	import type { Event } from '$lib/Types/Events';

	export let events: Event[] = [];
	let currentSlide = 0;

	function nextSlide() {
		const totalSlides = Math.ceil(events.length / 4); // Assuming 4 cards per view

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
	<button class="prevButton" on:click={prevSlide}>&lt;</button>
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
	<button class="nextButton" on:click={nextSlide}>&gt;</button>
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
		transition: transform 0.3s ease-in-out; /* Smooth transition */
	}

	.prevButton,
	.nextButton {
		background-color: #fff;
		border: none;
		cursor: pointer;
		font-size: 2rem;
		padding: 10px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 1;
	}

	.prevButton {
		left: 0;
	}

	.nextButton {
		right: 0;
	}
</style>
