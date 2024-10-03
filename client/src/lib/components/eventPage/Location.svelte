<script lang="ts">
	import Heading from '../text/Heading.svelte';
	import Text from '../text/Text.svelte';

	export let location = '';

	$: mapUrl = `https://maps.google.com/maps?q=${location}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
	$: mapsLink = `https://maps.google.com/maps?q=${location}`;
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
