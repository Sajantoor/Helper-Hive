<script lang="ts">
	import { goto } from '$app/navigation';
	import SmallText from './Text/SmallText.svelte';
	import Text from './Text/Text.svelte';

	export let img: string = '';
	export let title: string = '';
	export let location: string = '';
	export let date: Date = new Date();
	export let startTime: Date = new Date();
	export let endTime: Date = new Date();
	export let id: string = '';
</script>

<div class="max-w-80 max-desktop:mx-auto w-full m-5 border-neutral-100 border-2 cursor-pointer">
	<a on:click={() => goto(`/app/events/${id}`)}>
		<img src={img} alt={title} class="h-36 w-full object-cover" />
		<div class="p-2 flex justify-between items-end">
			<div class="inline-block mr-6">
				<Text class="text-l"
					>{date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}</Text
				>
				<Text class="text-2xl font-bold">{date.getDate()}</Text>
			</div>
			<div class="inline-block flex-grow">
				<SmallText>{location}</SmallText>
				<SmallText>
					{startTime.toLocaleTimeString('en-US', {
						hour: '2-digit',
						minute: '2-digit',
						hour12: true
					})}
					-
					{endTime.toLocaleTimeString('en-US', {
						hour: '2-digit',
						minute: '2-digit',
						hour12: true
					})}
				</SmallText>
				<SmallText class="font-bold">{title}</SmallText>
			</div>
		</div>
	</a>
</div>
