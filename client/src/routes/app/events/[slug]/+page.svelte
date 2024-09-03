<script lang="ts">
	import EventPage from '$lib/Components/EventPage/EventPage.svelte';
	import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';

	export let data;
</script>

<button class="absolute" on:click={() => window.history.back()}>
	<ArrowLeft size={20} class="ml-10 mt-10 absolute" />
</button>

<EventPage eventData={data} />
