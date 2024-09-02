<!-- 
Usage in page:

let myValue = '';

const handleFileDrop = (event) => {
	// function to handle selected file(s)
	const files = event.detail.files.detail;
	if (files.acceptedFiles.length > 0) {
		...
	}
};

...

<FileUpload
	id="id"
	placeholder="Placeholder text"
	type="image or file"// Undefined assumed to be file
	
	accepted: 'files types to accept, same as vailla HTML'
		// Undefined is all files, or only images for image
	
	invalid={ boolean check for invalid input }
		// highlights the field when true
	
	on:drop={(event) => handleFileDrop(event)}
/>
-->

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
		if (files.acceptedFiles.length < 1 && files.fileRejections.length > 0) {
			fileError = true;
			setTimeout(() => {
				fileError = false;
			}, 3000);
		}
	};
</script>

{#if mounted}
	<div class="relative h-full w-full" {id}>
		{#if type === 'image'}
			<FileDropzone
				accept="image/* {accepted}"
				on:drop={handleDrop}
				on:dragenter={() => (hovering = true)}
				on:dragleave={() => (hovering = false)}
				containerStyles="background: transparent; border-radius: 1.5rem; border-color: silver; width: 100%; height: 100%;"
			>
				<div
					class="{invalid
						? 'bg-tagYellow border-dashed border-2 border-altTextBrown/75'
						: 'bg-transparent'} absolute inset-0 rounded-3xl"
				></div>
				<div class="flex items-center justify-between relative h-full">
					<Text class="italic p-4 {invalid ? 'text-altTextBrown' : 'text-placeholderGrayText'}"
						>{placeholder}</Text
					>
				</div>
				<div
					class="{hovering ? '' : 'hidden'} {invalid
						? 'bg-[#F7DE9C] border-altTextBrown/50'
						: 'bg-placeholderGray'} border-2 content-center absolute inset-0 rounded-3xl"
				>
					<UploadIcon
						class="mb-2 text-placeholderGrayText w-full h-8 {invalid ? 'text-altTextBrown' : ''}"
					/>
					<Text
						class="smallText text-placeholderGrayText text-center {invalid
							? 'text-altTextBrown'
							: ''}">Upload...</Text
					>
				</div>
			</FileDropzone>
		{:else}
			<FileDropzone
				accept={accepted}
				on:drop={handleDrop}
				on:dragenter={() => (hovering = true)}
				on:dragleave={() => (hovering = false)}
				containerStyles="background: transparent; border-radius: 1.5rem; border-color: silver; width: 100%; height: 100%;"
			>
				<div
					class="{invalid
						? 'bg-tagYellow border-dashed border-2 border-altTextBrown/75'
						: 'bg-transparent'} absolute inset-0 rounded-3xl"
				></div>
				<div class="flex items-center justify-between h-full">
					<Text
						class="italic absolute left-4 p-4 w-3/4 {invalid
							? 'text-altTextBrown'
							: 'text-placeholderGrayText'}">{placeholder}</Text
					>
					<UploadIcon
						class="ml-2 w-8 h-8 absolute right-8 {invalid
							? 'text-altTextBrown'
							: ' text-primaryYellow'}"
					/>
				</div>
				<div
					class="{hovering ? '' : 'hidden'} {invalid
						? 'bg-[#F7DE9C] border-altTextBrown/50'
						: 'bg-placeholderGray'} border-2 content-center absolute inset-0 rounded-3xl"
				>
					<UploadIcon
						class="text-placeholderGrayText w-full h-8 {invalid ? 'text-altTextBrown' : ''}"
					/>
					<Text
						class="smallText text-placeholderGrayText text-center {invalid
							? 'text-altTextBrown'
							: ''}">Upload...</Text
					>
				</div>
			</FileDropzone>
		{/if}
		<div
			class="{fileError
				? ''
				: 'hidden'} content-center bg-red-100 border-dashed border-2 border-red-500 absolute inset-0 rounded-3xl"
		>
			<FileErrorIcon class="mb-2 text-red-500 w-full h-8" />
			<Text class="smallText text-red-500 text-center {invalid ? 'text-altTextBrown' : ''}"
				>Sorry! You can't upload that file here...</Text
			>
		</div>
	</div>
{/if}
