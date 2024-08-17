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

	.bioText {
		width: 70%;
		word-break: break-all;
		word-wrap: break-word;
	}
</style>
