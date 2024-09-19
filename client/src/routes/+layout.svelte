<script>
	import '../tailwind.css';
</script>

<slot />

<style>
	:global(html, body) {
		overflow-x: hidden;
	}
	:global(body) {
		position: relative;
	}
</style>
