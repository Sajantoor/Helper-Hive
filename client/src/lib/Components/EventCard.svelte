<script lang="ts">
	import MapMarkerOutline from 'svelte-material-icons/MapMarkerOutline.svelte';
	import CalendarMonth from 'svelte-material-icons/CalendarMonth.svelte';
	import SmallText from './Text/SmallText.svelte';
	import Text from './Text/Text.svelte';
	import { goto } from '$app/navigation';

	export let id: string = '';
	export let img: string = '';
	export let title: string = '';
	export let location: string = '';
	export let date: Date;
	export let organization: string = '';
	export let organizationLogo: string = '';

	const iconSize = 22;
</script>

<div
	class="eventCard max-w-80 w-full h-1/4 m-5 rounded-xl overflow-hidden border-white border-2 inline-block"
>
	<a
		on:click={() => {
			goto(`/app/events/${id}`);
		}}
	>
		<img src={img} alt={title} class="h-36 w-full object-cover" />
		<div class="p-2">
			<Text class="font-semibold mb-2 mt-1">{title}</Text>
			<div class="items">
				<MapMarkerOutline size={iconSize} />
				<SmallText>{location}</SmallText>
			</div>
			<div class="items">
				<CalendarMonth size={iconSize} />
				<SmallText>{date.toDateString()}</SmallText>
			</div>
			<div class="items">
				<img src={organizationLogo} alt={organization} class="rounded-full h-6" />
				<SmallText>{organization}</SmallText>
			</div>
		</div>
	</a>
</div>

<style lang="postcss">
	.items {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.eventCard {
		border-color: #f4f4f4;
		/* flex: 0 0 calc(25% - 2.5rem); * 4 cards per view, adjust percentage for more/less cards */
		/* max-width: calc(25% - 2.5rem); */
	}
</style>
