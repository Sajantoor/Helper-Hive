<script lang="ts">
	import MapMarkerOutline from 'svelte-material-icons/MapMarkerOutline.svelte';
	import CalendarMonth from 'svelte-material-icons/CalendarMonth.svelte';

	export let img: string = '';
	export let title: string = '';
	export let location: string = '';
	export let date: Date = new Date();
	export let organization: string = '';
	export let organizationLogo: string = '';

	const iconSize = 25;
</script>

<div class="eventCard max-w-80 w-full h-1/4 m-5 rounded-xl overflow-hidden border-white border-2">
	<img src={img} alt={title} class="h-36 w-full object-cover" />
	<div class="p-2">
		<h1 class="text-xl font-semibold mb-2 mt-1">{title}</h1>
		<div class="items">
			<MapMarkerOutline size={iconSize} />
			<p>{location}</p>
		</div>
		<div class="items">
			<CalendarMonth size={iconSize} />
			<p>{date.toDateString()}</p>
		</div>
		<div class="items">
			<img src={organizationLogo} alt={organization} class="rounded-full h-6" />
			<p>{organization}</p>
		</div>
	</div>
</div>

<style lang="postcss">
	.items {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.eventCard {
		border-color: #f4f4f4;
	}
</style>
