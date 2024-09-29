<script lang="ts">
	import SveltyPicker from 'svelty-picker';
	import SmallText from '../text/SmallText.svelte';

	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let valid = true;
	export let touched = false;
	export let errorMessage = '';

	function handleInput() {
		touched = true;
		valid = value ? true : false;
	}
</script>

<div class="w-full">
	<label for="div">
		<SmallText>{label}</SmallText>
	</label>
	<div class="relative inline-block w-full mb-2">
		<SveltyPicker
			{placeholder}
			bind:value
			on:input={handleInput}
			mode="time"
			format="H:i P"
			displayFormat="H:i P"
			manualInput={false}
			inputClasses="mt-1 pl-3 p-2 w-full bg-placeholderGray border-none rounded-lg placeholder:italic max-desktop:pt-3 max-desktop:pb-3
			{touched && !valid && 'bg-tagYellow text-altTextBrown placeholder-altTextBrown'}"
		/>
	</div>

	{#if touched && !valid && errorMessage}
		<SmallText class="text-altTextBrown">{errorMessage}</SmallText>
	{/if}
</div>
