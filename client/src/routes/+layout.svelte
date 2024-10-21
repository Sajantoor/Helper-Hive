<script>
	import '../tailwind.css';
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=0.875"/>
</svelte:head>

<slot />

<style>
	:global(html, body) {
		overflow-x: hidden;
	}
	:global(body) {
		position: relative;
	}
</style>
