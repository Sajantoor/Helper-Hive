<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import EventPage from '$lib/Components/EventPage/EventPage.svelte';

	export let data;
</script>

<BackButton />

<EventPage eventData={data} />
