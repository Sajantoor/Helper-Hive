<script lang="ts">
	import Text from '$lib/Components/Text/Text.svelte';
	import DropDown from '$lib/Components/Input/DropDownInput.svelte';
	import CloseCircle from 'svelte-material-icons/CloseCircle.svelte';
	import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';
	import Plus from 'svelte-material-icons/Plus.svelte';

	let showInputField: boolean = false;

	export let placeholder = '';
	export let tagLimit: number = 3;
	export let tagValues: string[] = [];
	export let options: string[] = [];

	const handleTagSelect = (event: CustomEvent<{ value: string }>) => {
		const value = event.detail.value;
		if (value && !tagValues.includes(value)) {
			tagValues = [...tagValues, value];
			options = options.filter((option) => option !== value);
		}

		showInputField = false;
	};

	const removeTag = (tag: string): void => {
		tagValues = tagValues.filter((t) => t !== tag);
		options = [...options, tag];
	};
</script>

<div class="flex flex-wrap items-center mb-4 {tagValues.length > 0 ? 'gap-6' : ''}">
	<div class="tag-list flex flex-wrap gap-4">
		{#each tagValues as tagVal}
			<div
				class="tag mt-1 mb-1 bg-tagYellow px-4 py-2 min-w-[6rem] rounded-full inline-block whitespace-nowrap text-center relative"
			>
				<Text>{tagVal}</Text>
				<div class="absolute top-[-12px] right-0 cursor-pointer" on:click={() => removeTag(tagVal)}>
					<CloseCircle class="text-red-500" size={24} />
				</div>
			</div>
		{/each}
	</div>

	{#if showInputField && tagValues.length < tagLimit}
		<div class="flex items-center w-1/3'}">
			<DropDown {placeholder} on:input={handleTagSelect} {options} />
			<button
				on:click={() => (showInputField = !showInputField)}
				tabindex="-1"
				class="tag m-1 pr-0.5 bg-tagYellow w-12 h-10
			items-center rounded-full flex justify-center text-center"
			>
				<ArrowLeft size={20} />
			</button>
		</div>
	{:else if tagValues.length < tagLimit}
		<div class="w-1/3">
			<button
				on:click={() => (showInputField = !showInputField)}
				class="tag mt-1 mb-1 pr-0 bg-tagYellow w-10 h-10
			rounded-full flex justify-center items-center text-center
			transition-all duration-200 ease-in-out hover:w-full"
			>
				<Plus size={20} />
			</button>
		</div>
	{/if}
</div>
