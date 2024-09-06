<script lang="ts">
	import SveltyPicker from 'svelty-picker';
	import SmallText from '../Text/SmallText.svelte';

	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let isValid = true;
</script>

<div class="w-full">
	<label for="div">
		<SmallText>{label}</SmallText>
	</label>
	<div class="relative inline-block w-full mb-2">
		<SveltyPicker
			{placeholder}
			bind:value
			mode="time"
			format="H:i P"
			displayFormat="H:i P"
			manualInput={false}
			inputClasses="mt-1 pl-3 p-2 w-full bg-placeholderGray border-none rounded-lg placeholder:italic
			{!isValid && 'bg-tagYellow text-altTextBrown placeholder-altTextBrown'}"
		/>
	</div>
</div>
