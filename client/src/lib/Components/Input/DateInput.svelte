<script lang="ts">
	import Flatpickr from 'svelte-flatpickr';
	import flatpickr from 'flatpickr';
	import 'flatpickr/dist/flatpickr.css';
	import SmallText from '../Text/SmallText.svelte';

	export let id = '';
	export let label = '';
	export let placeholder = '';
	export let value: Date;
	export let invalid = false;

	export let minDate = '01/01/1900';
	export let maxDate = '31/12/2100';

	let fieldActive = false;
	export let errorMessage = '';

	const handleInput = (event: any) => {
		fieldActive = true;
		value = event.target.value;
	};

	// Datetime functions
	const flatpickrOptions: flatpickr.Options.Options = {
		dateFormat: 'd/m/Y',
		minDate,
		maxDate,
		allowInput: true,
		disableMobile: true
	};
</script>

<div>
	<label for={id}>
		<SmallText>{label}</SmallText>
	</label>
	<div class="relative inline-block w-full mb-2">
		<Flatpickr
			{id}
			bind:value
			{placeholder}
			options={flatpickrOptions}
			class="mt-1 pl-3 p-2 w-full bg-placeholderGray border-none rounded-lg {invalid
				? 'bg-tagYellow text-altTextBrown placeholder-altTextBrown'
				: ''} placeholder:italic"
		/>
	</div>
	{#if errorMessage}
		<SmallText class="text-altTextBrown">{errorMessage}</SmallText>
	{/if}
</div>
