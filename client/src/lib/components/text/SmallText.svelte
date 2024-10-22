<script lang="ts">
	import Text from './Text.svelte';

	let className = '';
	// creates a `class` property, even
	// though it is a reserved word
	export { className as class };
</script>

<Text class="smallText {className}">
	<slot />
</Text>
