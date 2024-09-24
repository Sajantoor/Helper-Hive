<script lang="ts">
	import CalendarElement from '$lib/Components/CalendarEvent.svelte';
	import { onMount } from 'svelte';
	import type { EventResponse } from '$common/types/eventResponse';
	import Text from './Text/Text.svelte';

	import LeftArrow from 'svelte-material-icons/ChevronLeft.svelte';
	import RightArrow from 'svelte-material-icons/ChevronRight.svelte';

	export let events: EventResponse[] = []; // Events passed as a prop

	let currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);
	let currentIndex = 0;

	let calendarElements: EventResponse[] = [];
	let currentKey = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;
	let eventsByMonthMap = new Map<string, EventResponse[]>();

	const nextPage = () => {
		currentDate.setMonth(currentDate.getMonth() + 1);
		currentKey = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;
		currentIndex++;
	};

	const firstPage = () => {
		currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);
		currentKey = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;
		currentIndex = 0;
	};

	const previousPage = () => {
		currentDate.setMonth(currentDate.getMonth() - 1);
		currentKey = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;
		currentIndex--;
	};

	onMount(() => {
		events.forEach((event) => {
			const month = event.date.startDay.toLocaleString('default', { month: 'short' });
			const year = event.date.startDay.getFullYear();
			const key = `${month} ${year}`;

			if (eventsByMonthMap.has(key)) {
				eventsByMonthMap.get(key)!.push(event);
			} else {
				eventsByMonthMap.set(key, [event]);
			}
		});

		calendarElements = eventsByMonthMap.get(currentKey) || [];
	});

	$: if (currentKey) {
		calendarElements = eventsByMonthMap.get(currentKey) || [];
	}
</script>

<div class="calendar-view mx-auto max-w-[3000px]">
	<div class="header w-full">
		<Text class="calendar-title text-2xl font-bold">Calendar</Text>
		<div class="navigation pr-5 flex mt-2 justify-between desktop:justify-start">
			<div class="ml-2 mr-2">
				<Text class="text-xl destop:mr-6 font-bold">{currentKey}</Text>
			</div>

			<div>
				<button on:click={previousPage} disabled={currentIndex === 0}>
					<LeftArrow />
				</button>
				<button on:click={nextPage} class="ml-2">
					<RightArrow />
				</button>
			</div>

			<div class="today_button ml-6 p-2 border rounded">
				<button on:click={firstPage} disabled={currentIndex === 0}>
					<Text>Today</Text>
				</button>
			</div>
		</div>
	</div>
	{#if calendarElements.length === 0}
		<div class="mt-20 mb-40">
			<Text class="italic text-center">No events for this month...</Text>
		</div>
	{:else}
		<div class="calendar-grid grid grid-cols-4 gap-4 mt-4">
			{#each calendarElements as element (element.date)}
				<div class="grid-element">
					<CalendarElement
						id={element._id}
						img={element.details.photo}
						title={element.name}
						location={element.details.location}
						date={element.date.startDay}
						startTime={element.date.startTime}
						endTime={element.date.endTime}
					/>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.grid-element {
		object-fit: contain;
		padding: 0;
		margin: 0;
		display: flex;
		width: 100%;
	}

	.calendar-view {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.header {
		width: 90%;
		margin-left: 2rem;
	}

	.calendar-grid {
		width: 90%;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 1rem;
	}

	.navigation {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.today_button {
		border: 1px solid #ccc;
		padding: 0 0.5rem;
		border-radius: 4px;
		margin-right: 1rem;
	}

	button {
		border: none;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Responsive Design */
	@media (max-width: 1024px) {
		.calendar-grid {
			grid-template-columns: repeat(3, 1fr); /* 3 columns on medium screens */
		}
	}

	@media (max-width: 768px) {
		.calendar-grid {
			grid-template-columns: repeat(2, 1fr); /* 2 columns on small screens */
		}

		.header {
			width: 100%;
		}

		.navigation {
			width: 100%;
			margin-top: 1rem;
		}

		.today_button {
			margin-left: 0;
			text-align: center;
		}
	}

	@media (max-width: 480px) {
		.calendar-grid {
			grid-template-columns: 1fr; /* 1 column on extra small screens */
		}
	}
</style>
