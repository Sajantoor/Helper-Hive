<script>
	import '../tailwind.css';
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=0.6"/>
</svelte:head>

<style>
	:global(html, body) {
		overflow-x: hidden;
	}
	:global(body) {
		position: relative;
	}
</style>

<slot />
