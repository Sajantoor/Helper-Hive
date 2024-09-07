<script lang="ts">
	import SmallText from '../Text/SmallText.svelte';

	export let label = '';
	export let value: number | undefined;
	export let valid = true;
	let touched = false;
	let errorMessage = '';

	const handleInput = () => {
		errorMessage = '';

		if (!value) {
			errorMessage = 'Please enter a number';
		} else if (value < 1) {
			errorMessage = 'Please enter a number greater than 0';
		} else if (!Number.isInteger(value)) {
			errorMessage = 'Please enter an integer';
		}

		if (errorMessage) {
			valid = false;
		} else {
			valid = true;
		}
	};

	const handleBlur = () => {
		touched = true;
	};
</script>

<div>
	<label for="div">
		<SmallText class="font-bold">{label}</SmallText>
	</label>
	<div class="relative inline-block w-full mb-2">
		<input
			type="number"
			bind:value
			class="mt-1 p-2 w-1/6 bg-placeholderGray border-none rounded-lg
			{touched && !valid && 'bg-tagYellow text-altTextBrown placeholder-altTextBrown'}"
			on:input={handleInput}
			on:blur={handleBlur}
			style="appearance: textfield; -webkit-appearance: none; -moz-appearance: textfield;"
		/>
	</div>
	{#if errorMessage}
		<SmallText class="text-altTextBrown">{errorMessage}</SmallText>
	{/if}
</div>
