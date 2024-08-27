<!-- 
Usage in page:UPDATE COMMENTS!!

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
	export let valid = false;
	export let classLabel = '';
	export let classPlaceholder = '';
	export let rows = 0;
	export let minDate = '01/01/1900';
	export let maxDate = '31/12/2100';
	export let minTime = '00:00';
	export let maxTime = '23:59';
	export let eyePosY = -40; // Pwd eye position, default -40%
	let selectedCountry: CountryCode | null | undefined = 'CA';

	const handleInput = (event: any) => {
		if (type === 'phone') {
			value = event.target.value;
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
		onInput(event);
	};

	const flatpickrOptions = {
		dateFormat: 'd/m/Y',
		minDate,
		maxDate,
		allowInput: true,
		onChange: (selectedDates: any, dateStr: string, instance: any) => {
			value = dateStr;
			handleInput({ target: { value: dateStr } });
		}
	};

	const flatpickrTimeOptions = {
		enableTime: true,
		noCalendar: true,
		dateFormat: 'h:i K',
		minTime,
		maxTime,
		allowInput: true,
		onChange: (selectedDates: any, dateStr: string, instance: any) => {
			value = dateStr;
			handleInput({ target: { value: dateStr } });
		}
	};

	const flatpickrDateRangeOptions = {
		mode: 'range',
		enableTime: true,
		dateFormat: 'd/m/Y h:i K',
		minDate,
		maxDate,
		minTime,
		maxTime,
		allowInput: true,
		onChange: (selectedDates: any, dateStr: string, instance: any) => {
			value = dateStr;
			handleInput({ target: { value: dateStr } });
		}
	};
</script>

<div class="mb-4">
	<label for={id} class={classLabel}>
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
						: ''} {classPlaceholder}"
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
						: ''} {classPlaceholder}"
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
					: ''} {classPlaceholder}"
			/>
		{:else if type === 'number'}
			<input
				{id}
				type="number"
				bind:value
				{placeholder}
				class="mt-1 p-2 w-full bg-placeholderGray border-none rounded {invalid
					? 'bg-tagYellow text-altTextBrown placeholder-altTextBrown'
					: ''} {classPlaceholder}"
				on:input={handleInput}
				on:change={handleInput}
				style="appearance: textfield; -webkit-appearance: none; -moz-appearance: textfield;"
			/>
		{:else if type === 'time'}
			<Flatpickr
				{id}
				bind:value
				{placeholder}
				options={flatpickrTimeOptions}
				class="mt-1 p-2 w-full bg-placeholderGray border-none rounded {invalid
					? 'bg-tagYellow text-altTextBrown placeholder-altTextBrown'
					: ''} {classPlaceholder}"
			/>
		{:else if type === 'dateRange'}
			<Flatpickr
				{id}
				bind:value
				{placeholder}
				options={flatpickrDateRangeOptions}
				class="mt-1 p-2 w-full bg-placeholderGray border-none rounded {invalid
					? 'bg-tagYellow text-altTextBrown placeholder-altTextBrown'
					: ''} {classPlaceholder}"
			/>
		{:else if rows > 0}
			<textarea
				{id}
				bind:value
				{placeholder}
				rows={rows}
				class="mt-1 p-2 w-full bg-placeholderGray border-none rounded {invalid
					? 'bg-tagYellow text-altTextBrown placeholder-altTextBrown'
					: ''} {classPlaceholder}"
				on:input={handleInput}
				on:change={handleInput}
			></textarea>
		{:else}
			<input
				{id}
				type="text"
				bind:value
				{placeholder}
				class="mt-1 p-2 w-full bg-placeholderGray border-none rounded {invalid
					? 'bg-tagYellow text-altTextBrown placeholder-altTextBrown'
					: ''} {classPlaceholder}"
				on:input={handleInput}
				on:change={handleInput}
			/>
		{/if}
	</div>
</div>
