<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import FileDropzone from 'svelte-file-dropzone';
	import UploadIcon from 'svelte-material-icons/TrayArrowUp.svelte';
	import Text from '$lib/Components/Text/Text.svelte';

	export let type: 'image' | 'file' = 'file';
	export let placeholder = 'Click or drag and drop to upload a file...';
	export let id: string = '';
	export let accepted: string = '';
	export let invalid: boolean = false;

	const dispatch = createEventDispatcher();

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	const handleDrop = (files: File[]) => {
		dispatch('drop', { files });
	};
</script>

{#if mounted}
	<div class="relative h-full w-full" id={id}>
		<div class="{invalid ? 'bg-tagYellow' : 'bg-transparent'} absolute inset-0 rounded-lg"></div>
		{#if type === 'image'}
			<FileDropzone
				accept="image/*"
				on:drop={handleDrop}
				containerStyles="background: transparent; border-radius: 0.5rem; width: 100%; height: 100%;">
				<div class="flex items-center justify-between relative h-full">
					<Text class="smallText italic {invalid ? 'text-altTextBrown' : ''}">{placeholder}</Text>
				</div>
			</FileDropzone>
		{:else}
			<FileDropzone
				accept={accepted}
				on:drop={handleDrop}
				containerStyles="background: transparent; border-radius: 0.5rem; width: 100%; height: 100%;">
				<div class="flex items-center justify-between h-full">
					<Text class="smallText italic absolute left-8 {invalid ? 'text-altTextBrown' : ''}">{placeholder}</Text>
					<UploadIcon class="ml-2 text-primaryYellow w-8 h-8 absolute right-8" />
				</div>
			</FileDropzone>
		{/if}
	</div>
{/if}
