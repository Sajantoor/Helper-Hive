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
	export let organizationAvatar: string = '';

	const iconSize = 22;
</script>

<div
	class="eventCard max-w-80 w-full m-5 rounded-xl overflow-hidden border-2 border-neutral-100 inline-block align-top flex-shrink-0 cursor-pointer"
>
	<a
		on:click={() => {
			goto(`/app/events/${id}`);
		}}
	>
		<img src={img} alt={title} class="h-36 w-full object-cover" />
		<div class="p-2">
			<Text class="font-semibold mb-2 mt-1">{title}</Text>
			<div class="flex gap-2 mb-3">
				<MapMarkerOutline size={iconSize} />
				<SmallText class="truncate">{location}</SmallText>
			</div>
			<div class="flex gap-2 mb-3">
				<CalendarMonth size={iconSize} />
				<SmallText>{date.toDateString()}</SmallText>
			</div>
			<div class="flex gap-2 mb-3">
				<img src={organizationAvatar} alt={organization} class="rounded-full h-6" />
				<SmallText>{organization}</SmallText>
			</div>
		</div>
	</a>
</div>

<style lang="postcss">
	.eventCard {
		flex: 0 0 calc(25% - 2.5rem); /** 4 cards per view */
		max-width: calc(25% - 2.5rem);
	}

	@media (max-width: 1200px) {
		.eventCard {
			flex: 0 0 calc(33.33% - 2.5rem); /** 3 cards per view */
			max-width: calc(33.33% - 2.5rem);
		}
	}

	@media (max-width: 900px) {
		.eventCard {
			flex: 0 0 calc(50% - 2.5rem); /** 2 cards per view */
			max-width: calc(50% - 2.5rem);
		}
	}

	@media (max-width: 600px) {
		.eventCard {
			flex: 0 0 calc(100% - 2.5rem); /** 1 card per view */
			max-width: calc(100% - 2.5rem);
		}
	}
</style>
