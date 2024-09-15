<script lang="ts">
	import { goto } from '$app/navigation';
	import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';
</script>

<button class="absolute" on:click={() => goto('/app')}>
	<ArrowLeft size={20} class="ml-10 mt-10 absolute" />
</button>
