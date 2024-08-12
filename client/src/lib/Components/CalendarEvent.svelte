<script lang="ts">
	import SmallText from './Text/SmallText.svelte';
	import Text from './Text/Text.svelte';

	export let img: string = '';
	export let title: string = '';
	export let location: string = '';
	export let date: Date = new Date();
</script>

<div class="calendarEvent max-w-80 w-full h-1/4 m-5 border-white border-2">
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
				{date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
			</SmallText>
			<SmallText class="font-bold">{title}</SmallText>
		</div>
	</div>
</div>

<style lang="postcss">
	.calendarEvent {
		border-color: #f4f4f4;
	}
</style>
