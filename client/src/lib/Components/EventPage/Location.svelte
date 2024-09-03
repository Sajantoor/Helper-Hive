<script lang="ts">
	import { PUBLIC_GOOGLE_MAPS_API_KEY, PUBLIC_SERVER_HOST } from '$env/static/public';
	import Heading from '../Text/Heading.svelte';
	import Text from '../Text/Text.svelte';

	export let location = '';
	export let locationAddress = '';

	$: mapUrl = `https://maps.google.com/maps?q=${location}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
	$: mapsLink = `https://maps.google.com/maps?q=${location}`;

	$: getFullAddress(location);

	async function getFullAddress(input: string) {
		const GOOGLE_MAPS_API_KEY = PUBLIC_GOOGLE_MAPS_API_KEY;
		try {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${input}&key=${GOOGLE_MAPS_API_KEY}`
			);
			const data = await response.json();
			if (data.results && data.results.length > 0) {
				locationAddress = data.results[0].formatted_address;
			} else {
				locationAddress = 'Address not found';
			}
		} catch (error) {
			console.error('Error fetching address:', error);
			locationAddress = 'Error fetching address';
		}
	}
</script>

<div class="location mt-6">
	<Heading class="mb-4">Location</Heading>
	<iframe src={mapUrl} title="" allowfullscreen></iframe>
	<a href={mapsLink} target="_blank">
		<button class="bg-primaryYellow text-black py-2 px-4 mt-4 w-full rounded-lg"
			><Text>Open in Google Maps</Text></button
		>
	</a>
</div>

<style lang="postcss">
	iframe {
		width: 100%;
		aspect-ratio: 1 / 0.75;
		border-radius: 2rem;
	}
</style>
