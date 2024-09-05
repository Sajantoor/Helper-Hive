<script lang="ts">
	import CalendarElement from '$lib/Components/CalendarEvent.svelte';
	import { onMount } from 'svelte';
	import type { CalendarElementData } from '$lib/Types/Events';
	import Text from './Text/Text.svelte';

	let currentDate = new Date();
	export let events: CalendarElementData[] = []; // Events passed as a prop
	let calendarElements: CalendarElementData[] = [];
	let currentPage = 0;

	let displayedMonths = '';

	const daysPerPage = 10;

	const paginateCalendarElements = (page: number): CalendarElementData[] => {
		const start = page * daysPerPage;
		const end = start + daysPerPage;
		const elements = events.slice(start, end);

		updateDisplayedMonths(elements, page);
		return elements;
	};

	const updateDisplayedMonths = (elements: CalendarElementData[], page: number) => {
		const uniqueMonths = Array.from(
			new Set(
				elements.map((e) => {
					const month = e.date.startDay.toLocaleString('default', { month: 'short' });
					const year =
						e.date.startDay.getFullYear() !== currentDate.getFullYear()
							? ` ${e.startDay.getFullYear()}`
							: '';
					return `${month}${year}`;
				})
			)
		);

		if (uniqueMonths.length === 1) {
			displayedMonths = uniqueMonths[0];
		} else {
			displayedMonths = `${uniqueMonths[0]} - ${uniqueMonths[uniqueMonths.length - 1]}`;
		}
	};

	const nextPage = () => {
		if ((currentPage + 1) * daysPerPage < events.length) {
			currentPage++;
			calendarElements = paginateCalendarElements(currentPage);
		}
	};

	const firstPage = () => {
		currentPage = 0;
		calendarElements = paginateCalendarElements(currentPage);
	};

	const previousPage = () => {
		if (currentPage > 0) {
			currentPage--;
			calendarElements = paginateCalendarElements(currentPage);
		}
	};

	onMount(() => {
		calendarElements = paginateCalendarElements(currentPage);
	});
</script>

<div class="calendar-view">
	<div class="header w-full">
		<Text class="calendar-title text-2xl font-bold">Calendar</Text>
		<div class="navigation flex mt-2">
			<button on:click={previousPage} disabled={currentPage === 0}>{'<'}</button>
			<button
				on:click={nextPage}
				class="ml-2"
				disabled={(currentPage + 1) * daysPerPage >= events.length}>{'>'}</button
			>
			<div class="today_button ml-6 p-2 border rounded">
				<button on:click={firstPage}>
					<Text>Today</Text>
				</button>
			</div>

			<div class="ml-2">
				<Text class="text-xl ml-6 font-bold">{displayedMonths}</Text>
			</div>
		</div>
	</div>
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
			justify-content: center;
			width: 100%;
			margin-top: 1rem;
		}

		.today_button {
			margin-top: 1rem;
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
