<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import FileDropzone from 'svelte-file-dropzone';
	import UploadIcon from 'svelte-material-icons/TrayArrowUp.svelte';
	import FileErrorIcon from 'svelte-material-icons/FileDocumentRemoveOutline.svelte';
	import Text from '$lib/Components/Text/Text.svelte';

	export let type: 'image' | 'file' = 'file';
	export let placeholder = 'Click or drag and drop to upload a file...';
	export let id: string = '';
	export let accepted: string = '';
	export let invalid: boolean = false;

	const dispatch = createEventDispatcher();

	let mounted = false;
	let fileError = false;
	let hovering = false;

	onMount(() => {
		mounted = true;
	});

	const handleDrop = (files: File[]) => {
		dispatch('drop', { files });
		hovering = false;
		files = files.detail;
		if (files.acceptedFiles.length < 1 && files.fileRejections.length > 0){
			fileError = true;
			setTimeout(() => {
				fileError = false;
			}, 3000);
		}
	};
</script>

{#if mounted}
	<div class="relative h-full w-full" id={id}>
		{#if type === 'image'}
			<FileDropzone
				accept="image/*"
				on:drop={handleDrop}
				on:dragenter = {() => hovering = true}
				on:dragleave = {() => hovering = false}
				containerStyles="background: transparent; border-radius: 0.5rem; width: 100%; height: 100%;">
				<div class="{hovering ? '' : 'hidden'} content-center bg-placeholderGray absolute inset-0 rounded-lg">
					<UploadIcon class="mb-2 text-placeholderGrayText w-full h-8" />
					<Text class="smallText text-placeholderGrayText text-center {invalid ? 'text-altTextBrown' : ''}">Upload...</Text>
				</div>
				<div class="{invalid ? 'bg-tagYellow border-dashed border-2 border-altTextBrown' : 'bg-transparent'} {hovering ? 'opacity-50' : ''} absolute inset-0 rounded-lg"></div>
				<div class="flex items-center justify-between relative h-full">
					<Text class="smallText italic p-4 {invalid ? 'text-altTextBrown' : ''} {hovering ? 'opacity-0' : ''}">{placeholder}</Text>
				</div>
			</FileDropzone>
		{:else}
			<FileDropzone
				accept={accepted}
				on:drop={handleDrop}
				on:dragenter = {() => hovering = true}
				on:dragleave = {() => hovering = false}
				containerStyles="background: transparent; border-radius: 0.5rem; width: 100%; height: 100%;">
				<div class="{hovering ? '' : 'hidden'} content-center bg-placeholderGray absolute inset-0 rounded-lg">
					<UploadIcon class="mb-2 text-placeholderGrayText w-full h-8" />
					<Text class="smallText text-placeholderGrayText text-center {invalid ? 'text-altTextBrown' : ''}">Upload...</Text>
				</div>
				<div class="{invalid ? 'bg-tagYellow border-dashed border-2 border-altTextBrown' : 'bg-transparent'} {hovering ? 'opacity-50' : ''} absolute inset-0 rounded-lg"></div>
				<div class="flex items-center justify-between h-full">
					<Text class="smallText italic absolute left-4 p-4 {invalid ? 'text-altTextBrown' : ''} {hovering ? 'opacity-0' : ''}">{placeholder}</Text>
					<UploadIcon class="ml-2 w-8 h-8 absolute right-8 {invalid ? 'text-altTextBrown' : ' text-primaryYellow'} {hovering ? 'opacity-0' : ''}"/>
				</div>
			</FileDropzone>
		{/if}
		<div class="{fileError ? '' : 'hidden'} content-center bg-red-100 border-dashed border-2 border-red-500 absolute inset-0 rounded-lg">
			<FileErrorIcon class="mb-2 text-red-500 w-full h-8" />
			<Text class="smallText text-red-500 text-center {invalid ? 'text-altTextBrown' : ''}">Sorry! You can't upload that file here...</Text>
		</div>
	</div>
{/if}
