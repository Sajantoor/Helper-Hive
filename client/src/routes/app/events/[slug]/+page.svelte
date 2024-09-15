<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import EventPage from '$lib/Components/EventPage/EventPage.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<BackButton />

<EventPage eventData={data} />
