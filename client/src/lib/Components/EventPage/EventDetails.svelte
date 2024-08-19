<script lang="ts">
	import Section from '../Text/Section.svelte';
	import Text from '../Text/Text.svelte';

	import CalendarMonth from 'svelte-material-icons/CalendarMonth.svelte';
	import MapMarkerOutline from 'svelte-material-icons/MapMarkerOutline.svelte';

	export let eventTitle: string = '';
	export let tags: string[] = [];
	export let startDate: Date = new Date();
	export let endDate: Date = new Date();
	export let hours: string = '';
	export let location = '';
	export let spotsAvailable: number = 0;

	const regex = /^(.*?),\s*(\w+)\s*(.*)$/;
	const match = location.match(regex);

	let city: string, province: string, address: string;
	if (match) {
		city = match[1];
		province = match[2];
		address = match[3];
	}

	const formatDate = (date: Date) => {
		const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
		return date.toLocaleDateString(undefined, options);
	};

	const isSameDay = startDate.toDateString() === endDate.toDateString();
	let displayDate = isSameDay
		? formatDate(startDate)
		: `${formatDate(startDate)} - ${formatDate(endDate)}`;
</script>

<div class="event-details">
	<Section>{eventTitle}</Section>

	<div class="item">
		<CalendarMonth class="text-primaryYellow" size={40} />
		<div class="ml-5">
			<Text class="font-semibold">{displayDate}</Text>
			<Text>{hours}</Text>
		</div>
	</div>

	<div class="item">
		<MapMarkerOutline class="text-primaryYellow" size={40} />
		<div class="ml-5">
			<Text class="font-semibold">{city}, {province}</Text>
			<Text>{address}</Text>
		</div>
	</div>

	<div>
		{#if tags.length > 0}
			<Text class="font-semibold">Tags</Text>
			<div class="tag-list mt-2">
				{#each tags as tag}
					<div class="tag bg-tagYellow">
						<Text>{tag}</Text>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<div class="mt-4">
		<Text class="text-altTextGray">{spotsAvailable} Spots Avaliable</Text>
		<button class={spotsAvailable > 0 ? 'bg-primaryYellow' : 'bg-placeholderGray'}>
			<Text class="font-semibold">Register</Text>
		</button>
	</div>
</div>

<style lang="postcss">
	.event-details {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.item {
		display: flex;
		align-items: center;
		margin-top: 0.5rem;
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

	button {
		width: 90%;
		border-radius: 1rem;
		padding: 0.6rem;
		margin-top: 0.5rem;
	}
</style>
