<script lang="ts">
	let className = '';

	// creates a `class` property, even
	// though it is a reserved word
	export { className as class };
</script>

<p class={'text ' + className}>
	<slot />
</p>

<style lang="postcss">
	.text {
		font-family: 'Roboto', sans-serif;
	}

	.smallText {
		font-size: 0.9rem;
	}

	.heading {
		font-size: 1.25rem;
		font-weight: bold;
	}

	.section {
		font-size: 2rem;
		font-weight: bold;
	}
</style>
