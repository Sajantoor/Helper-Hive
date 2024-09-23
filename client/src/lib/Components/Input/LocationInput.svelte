<script lang="ts">
	import { onMount } from 'svelte';
	import SmallText from '../Text/SmallText.svelte';
	import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';

	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let valid = true;
	export let touched = false;
	let element: HTMLInputElement;

	const handlePlaceChanged = (place: any) => {
		touched = true;
		let address = '';

		if (place.name) {
			address = place.name + ': ';
		}

		if (place.formatted_address) {
			address += place.formatted_address;
		} else if (place.address_components) {
			place.address_components.forEach((component: any) => {
				address += component.long_name + ', ';
			});
			// remove the last comma
			address = address.slice(0, -2);
		}

		value = address;
		valid = true;
	};

	onMount(() => {
		const script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?key=${PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
		script.async = true;
		document.head.appendChild(script);

		script.onload = () => {
			// @ts-expect-error
			const autocomplete = new google.maps.places.Autocomplete(element);

			autocomplete.addListener('place_changed', () => {
				const place = autocomplete.getPlace();
				handlePlaceChanged(place);
			});

			if (value) {
				handleBlur();
			}
		};
	});

	const onInput = () => {
		touched = true;
	};

	const handleBlur = () => {
		valid = value.length > 0;
	};
</script>

<div class="w-full">
	<label for="div">
		<SmallText>{label}</SmallText>
	</label>
	<div class="relative inline-block w-full mb-2">
		<input
			type="text"
			on:input={onInput}
			on:blur={handleBlur}
			bind:this={element}
			bind:value
			{placeholder}
			class="mt-1 pl-3 p-2 w-full bg-placeholderGray border-none rounded-lg placeholder:italic max-desktop:pt-3 max-desktop:pb-3
			{touched && !valid && 'bg-tagYellow text-altTextBrown placeholder-altTextBrown'}"
		/>
	</div>
	{#if touched && !valid}
		<SmallText class=" text-altTextBrown">Invalid location</SmallText>
	{/if}
</div>
