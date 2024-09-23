<script lang="ts">
	import Flatpickr, { type HookProps } from 'svelte-flatpickr';
	import flatpickr from 'flatpickr';
	import 'flatpickr/dist/flatpickr.css';
	import SmallText from '../Text/SmallText.svelte';

	export let label = '';
	export let placeholder = '';
	export let value: Date | null = null;
	export let valid = false;
	export let touched = false;

	export let minDate = '01/01/1900';
	export let maxDate = '31/12/2100';

	export let errorMessage = 'Enter a valid date';

	// Datetime functions
	const flatpickrOptions: flatpickr.Options.Options = {
		dateFormat: 'd/m/Y',
		minDate,
		maxDate,
		allowInput: true,
		disableMobile: true
	};

	function handleChange(event: CustomEvent<HookProps>) {
		if (event.detail[0].length === 0) {
			return;
		}

		touched = true;
		const [date] = event.detail;
		value = date[0];
		valid = value ? true : false;
	}

	function handleInput() {
		valid = value ? true : false;
	}
</script>

<div>
	<label for="div">
		<SmallText>{label}</SmallText>
	</label>
	<div class="relative inline-block w-full mb-2">
		<Flatpickr
			on:close={handleInput}
			on:change={handleChange}
			bind:value
			{placeholder}
			options={flatpickrOptions}
			class="mt-1 pl-3 p-2 w-full bg-placeholderGray border-none rounded-lg  placeholder:italic max-desktop:pt-3 max-desktop:pb-3
			{touched && !valid && 'bg-tagYellow text-altTextBrown placeholder-altTextBrown'}"
		/>
	</div>
	{#if touched && !valid && errorMessage}
		<SmallText class="text-altTextBrown">{errorMessage}</SmallText>
	{/if}
</div>
