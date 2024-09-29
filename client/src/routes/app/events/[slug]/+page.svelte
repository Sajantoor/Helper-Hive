<script lang="ts">
	import BackButton from '$lib/components/BackButton.svelte';
	import EventPage from '$lib/components/eventPage/EventPage.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<BackButton />

<EventPage eventData={data} />
