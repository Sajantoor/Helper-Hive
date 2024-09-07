<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import FileDropzone from 'svelte-file-dropzone';
	import UploadIcon from 'svelte-material-icons/TrayArrowUp.svelte';
	import FileErrorIcon from 'svelte-material-icons/FileDocumentRemoveOutline.svelte';
	import Text from '$lib/Components/Text/Text.svelte';
	import SmallText from '../Text/SmallText.svelte';

	export let type: 'image' | 'file' = 'file';
	export let placeholder = 'Click or drag and drop to upload a file...';
	export let valid: boolean = true;
	export let disabled = false;
	export let touched = false;

	const dispatch = createEventDispatcher<{ file: { files: File[] } }>();

	let fileError = false;
	let hovering = false;

	const handleDrop = (event: CustomEvent<any>) => {
		touched = true;
		const files = event.detail;
		if (files.fileRejections.length > 0) {
			fileError = true;
			setTimeout(() => {
				fileError = false;
			}, 1500);
		}

		dispatch('file', { files: files.acceptedFiles });
	};
</script>

<div class="relative h-full w-full">
	<FileDropzone
		accept={type === 'image'
			? 'image/*'
			: 'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/plain'}
		{disabled}
		on:drop={handleDrop}
		on:dragenter={() => {
			hovering = true;
			touched = true;
		}}
		on:dragleave={() => (hovering = false)}
		containerStyles="background: transparent; border-radius: 1.5rem; border-color: silver; width: 100%; height: 100%;"
	>
		<div
			class="{touched && !valid
				? 'bg-tagYellow border-dashed border-2 border-altTextBrown/75'
				: 'bg-transparent'} absolute inset-0 rounded-3xl"
		></div>
		<div class="flex items-center justify-between relative h-full">
			<Text
				class="italic p-4 {touched && !valid ? 'text-altTextBrown' : 'text-placeholderGrayText'}"
				>{placeholder}</Text
			>
			<UploadIcon
				class="ml-2 w-8 h-8 {touched && !valid ? 'text-altTextBrown' : ' text-primaryYellow'}"
			/>
		</div>

		{#if hovering}
			<div
				class="{touched && !valid
					? 'bg-[#F7DE9C] border-altTextBrown/50'
					: 'bg-placeholderGray'} border-2 content-center absolute inset-0 rounded-3xl"
			>
				<UploadIcon
					class="mb-2 text-placeholderGrayText w-full h-8 
					{touched && !valid && 'text-altTextBrown'}"
				/>
				<SmallText
					class=" text-placeholderGrayText text-center 
						{touched && !valid && 'text-altTextBrown'}"
				>
					Upload...
				</SmallText>
			</div>
		{/if}
	</FileDropzone>

	{#if fileError}
		<div
			class="content-center bg-red-100 border-dashed border-2 border-red-500 absolute inset-0 rounded-3xl"
		>
			<FileErrorIcon class="mb-2 text-red-500 w-full h-8" />
			<SmallText
				class="smallText text-red-500 text-center {touched && !valid && 'text-altTextBrown'}"
			>
				Sorry! You can't upload that file here...
			</SmallText>
		</div>
	{/if}
</div>
