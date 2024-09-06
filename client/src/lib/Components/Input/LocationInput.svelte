<script lang="ts">
	import { onMount } from 'svelte';
	import SmallText from '../Text/SmallText.svelte';
	import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';

	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let isValid = true;
	let element: HTMLInputElement;

	const handlePlaceChanged = (place: any) => {
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
		};
	});
</script>

<div class="w-full">
	<label for="div">
		<SmallText>{label}</SmallText>
	</label>
	<div class="relative inline-block w-full mb-2">
		<input
			type="text"
			bind:this={element}
			{placeholder}
			class="mt-1 pl-3 p-2 w-full bg-placeholderGray border-none rounded-lg {!isValid &&
				'bg-tagYellow text-altTextBrown placeholder-altTextBrown'} placeholder:italic"
		/>
	</div>
	{#if !isValid}
		<SmallText class=" text-altTextBrown">Invalid phone number</SmallText>
	{/if}
</div>
