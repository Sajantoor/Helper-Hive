<script lang="ts">
	import { TelInput, normalizedCountries } from 'svelte-tel-input';
	import type { CountryCode } from 'svelte-tel-input/types';
	import SmallText from '../Text/SmallText.svelte';

	export let label = '';
	export let placeholder = 'Enter phone number...';
	export let value = '';
	export let touched = false;
	export let valid = true;
	// the current validation state, we don't want to show this
	// until the user has actually inputted something, else it will
	// show it's invalid while the user is typing
	let validState = false;

	let selectedCountry: CountryCode | null | undefined = 'CA';

	// update the validation state when the input is changed
	function handleChange() {
		valid = validState;
	}

	function handleCountryChange() {
		touched = false;
		valid = false;
		validState = false;
		value = '';
	}
</script>

<div class="w-full">
	<label for="div">
		<SmallText>{label}</SmallText>
	</label>
	<div class="relative inline-block w-full mb-2">
		<div class="flex">
			<select
				class="h-12 desktop:h-9 pl-3 rounded-l-lg bg-placeholderGray text-placeholderGrayText cursor-pointer
					{touched && !valid ? 'bg-tagYellow text-altTextBrown' : ''}"
				aria-label="Country"
				name="Country"
				on:change={handleCountryChange}
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
				bind:valid={validState}
				required={true}
				class="h-12 desktop:h-9 pl-3 pr-3 rounded-r-lg grow bg-placeholderGray 
				{touched && !valid && 'bg-tagYellow placeholder-altTextBrown text-altTextBrown'}"
				on:change={handleChange}
				on:blur={() => (touched = true)}
				options={{ autoPlaceholder: false }}
				{placeholder}
			/>
		</div>
	</div>
	{#if touched && !valid}
		<SmallText class=" text-altTextBrown">Invalid phone number</SmallText>
	{/if}
</div>
