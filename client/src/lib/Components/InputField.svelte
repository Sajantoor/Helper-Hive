<!--
Usage in page:

let myValue = '';
let phoneValid = false; // optional, needed for phone

const myFunc = () => {
	//optional function for on:input
};

...

<InputField
	id="id"
	label="Text"
	placeholder="Text"
	bind:value={myValue}
	invalid={ boolean check for invalid input } // highlights the field when true
  
	// Optional:
	onInput={myFunc} // event for on:input, on:change, onChange
	type="phone, date, or password" // default is text 
	bind:valid={phoneValid} // boolean variable needed for phone
/>
-->

<script lang="ts">
	import Text from '$lib/Components/Text/Text.svelte';
	import EyeOutline from 'svelte-material-icons/EyeOutline.svelte';
	import EyeOffOutline from 'svelte-material-icons/EyeOffOutline.svelte';
	import Flatpickr from 'svelte-flatpickr';
	import 'flatpickr/dist/flatpickr.css';
	import { TelInput, normalizedCountries } from 'svelte-tel-input';
	import type { CountryCode } from 'svelte-tel-input/types';

	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let invalid = false;
	export let onInput = () => {};
	export let showPassword = false;
	export let type = 'text';
	export let id = '';
	export let eyePosY = -40; // Pwd eye position, default -40%

	export let valid = false;
	let selectedCountry: CountryCode | null | undefined = 'CA';

	const handleInput = (event: any) => {
		if (type === 'phone') {
			// TODO: We should improve the typing here
			value = event.target.value;
			// @ts-ignore
			const countryCode = normalizedCountries.find(
				(country) => country.iso2 === selectedCountry
			).dialCode;
			value = `+${countryCode}${value}`;
		} else {
			if (id.toLowerCase().includes('email')) {
				event.target.value = value.replace(/\s/g, '');
			}
			value = event.target.value;
		}

		// @ts-ignore
		onInput(event);
	};

	const flatpickrOptions = {
		dateFormat: 'd/m/Y',
		minDate: '01/01/1900',
		onChange: (selectedDates: any, dateStr: string, instance: any) => {
			value = dateStr;
			handleInput({ target: { value: dateStr } });
		}
	};
</script>

<div class="mb-4">
	<label for={id}>
		<Text class="smallText">{label}</Text>
	</label>
	<div class="relative inline-block w-full">
		{#if type === 'password'}
			{#if showPassword}
				<input
					{id}
					type="text"
					bind:value
					{placeholder}
					class="mt-1 p-2 w-full bg-placeholderGray border-none rounded {invalid
						? 'bg-tagYellow text-altTextBrown placeholder-altTextBrown'
						: ''}"
					on:input={handleInput}
					on:change={handleInput}
				/>
			{:else}
				<input
					{id}
					type="password"
					bind:value
					{placeholder}
					class="mt-1 p-2 w-full bg-placeholderGray border-none rounded {invalid
						? 'bg-tagYellow text-altTextBrown placeholder-altTextBrown'
						: ''}"
					on:input={handleInput}
					on:change={handleInput}
				/>
			{/if}
			<button
				type="button"
				class="absolute top-1/2 right-4 transform -translate-y-1/2 border-none bg-none cursor-pointer"
				tabindex="-1"
				on:mousedown={() => (showPassword = true)}
				on:mouseup={() => (showPassword = false)}
				on:mouseleave={() => (showPassword = false)}
				style="--eye-pos-y: {eyePosY}%"
			>
				{#if showPassword}
					<EyeOutline class="text-altTextGray" />
				{:else}
					<EyeOffOutline class="text-altTextGray" />
				{/if}
			</button>
		{:else if type === 'phone'}
			<div class="flex">
				<select
					{id}
					class="h-9 pl-3 rounded-l bg-placeholderGray text-placeholderGrayText cursor-pointer {invalid
						? 'bg-tagYellow text-altTextBrown'
						: ''}"
					aria-label="Default select example"
					name="Country"
					bind:value={selectedCountry}
					tabindex="-1"
				>
					<option value={null} hidden={selectedCountry !== null}>--</option>
					{#each normalizedCountries as currentCountry (currentCountry.id)}
						<option
							value={currentCountry.iso2}
							selected={currentCountry.iso2 === selectedCountry}
							aria-selected={currentCountry.iso2 === selectedCountry}
						>
							{currentCountry.iso2} (+{currentCountry.dialCode})
						</option>
					{/each}
				</select>
				<TelInput
					bind:country={selectedCountry}
					bind:value
					bind:valid
					class="h-9 pl-3 pr-3 rounded-r grow bg-placeholderGray {invalid
						? 'bg-tagYellow placeholder-altTextBrown text-altTextBrown'
						: ''}"
					on:input={handleInput}
					options={{ autoPlaceholder: false }}
					{placeholder}
				/>
			</div>
		{:else if type === 'date'}
			<Flatpickr
				{id}
				bind:value
				{placeholder}
				options={flatpickrOptions}
				class="mt-1 p-2 w-full bg-placeholderGray border-none rounded {invalid
					? 'bg-tagYellow text-altTextBrown placeholder-altTextBrown'
					: ''}"
			/>
		{:else}
			<input
				{id}
				type="text"
				bind:value
				{placeholder}
				class="mt-1 p-2 w-full bg-placeholderGray border-none rounded {invalid
					? 'bg-tagYellow text-altTextBrown placeholder-altTextBrown'
					: ''}"
				on:input={handleInput}
				on:change={handleInput}
			/>
		{/if}
	</div>
</div>
