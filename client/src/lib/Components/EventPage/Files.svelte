<script lang="ts">
	import FileDocumentOutline from 'svelte-material-icons/FileDocumentOutline.svelte';
	import SmallText from '../Text/SmallText.svelte';
	let iconSize = 40;

	export let files: string[];
</script>

<div class="mb-8 mt-8">
	{#each files as file}
		<div class="inline-block mr-5 file">
			<div>
				<FileDocumentOutline class="file text-primaryYellow" size={iconSize} />
				<SmallText class="text-gray-400 ml-1 mt-1">{file}</SmallText>
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.file {
		cursor: pointer;
		margin: auto;
		display: block;
	}
</style>
