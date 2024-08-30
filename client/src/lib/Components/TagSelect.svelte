<script lang="ts">
	import Text from '$lib/Components/Text/Text.svelte';
	import InputField from '$lib/Components/InputField.svelte';
	import CloseCircle from 'svelte-material-icons/CloseCircle.svelte';

	let tagValTemp: string = '';
	let tagComp: InputField;
	let showInputField: boolean = false;
	
	export let id = '';
	export let placeholder = '';
	export let onInput = () => {};
	export let invalid = false;
	export let tagLimit: number = 99;
	export let tagValues: string[] = [];
	export let options: string[] = [];

	const handleInputChange = (): void => {
		onInput(event);
	};

	const handleTagSelect = (event: any): void => {
		if (tagValTemp && !tagValues.includes(tagValTemp)) {
			tagValues = [...tagValues, tagValTemp];
			options = options.filter(option => option !== tagValTemp);
			tagValTemp = '';
			toggleInputField();
			handleInputChange();
		}
	};

	export function toggleInputField(thing: any = ''){
		tagValTemp = '';
		showInputField = !showInputField;
		if(showInputField && thing == 'clickOnly'){
			tagComp.forceClick();
		} 
		else if (showInputField){
			tagComp.forceFocus();
		}
		else {
			tagComp.handleBlur();
		}
	};

	const removeTag = (tag: string): void => {
		tagValues = tagValues.filter(t => t !== tag);
		options = [...options, tag];
		handleInputChange();
	};
</script>

<div {id} class="flex flex-wrap items-center {tagValues.length > 0 ? 'gap-6' : ''}">
	<div class="tag-list flex flex-wrap gap-6">
		{#each tagValues as tagVal}
			<div class="tag mt-1 mb-4 bg-tagYellow px-4 py-2 min-w-[6rem] rounded-full inline-block whitespace-nowrap text-center relative">
				<Text>{tagVal}</Text>
				<div class="absolute top-[-12px] right-0 cursor-pointer" on:click|preventDefault={() => removeTag(tagVal)}>
					<CloseCircle class="text-red-500" size={24} />
				</div>
			</div>
		{/each}
	</div>
	<div class="flex items-center w-1/3 {showInputField ? '' : 'hidden'}">
		<InputField
			id="{id}tagInput"
			placeholder="  {placeholder}"
			classPlaceholder="rounded-full {invalid && tagValues.length < 1 ? 'shadow-lg' : ''}"
			type="dropdown"
			bind:value={tagValTemp}
			bind:this={tagComp}
			invalid={invalid}
			onInput={handleTagSelect}
			options={options}
		/>
		<button on:click|preventDefault={toggleInputField} tabindex=-1
			class="tag ml-1 mt-1 mb-4 pb-1 pr-0.5 bg-tagYellow w-12 h-10 text-2xl font-semibold
			items-center rounded-full flex justify-center text-center
			transition-all duration-200 ease-in-out hover:w-full
			{invalid && tagValues.length < 1 ? 'pointer-events-none opacity-50 shadow-lg' : ''}">&lt;</button>
	</div>
	{#if !showInputField}
	<div class="w-1/3">
		<button on:click|preventDefault={toggleInputField} on:focus={toggleInputField}
			class="tag mt-1 mb-4 pb-1.5 pr-0 bg-tagYellow w-10 h-10 text-3xl
			rounded-full flex justify-center items-center text-center
			transition-all duration-200 ease-in-out hover:w-full
			{showInputField ? 'hidden' : ''} {tagValues.length < tagLimit ? '' : 'hidden'}">+</button>
	</div>
	{/if}
</div>