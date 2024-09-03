<!-- 
Usage in page:

let myValue = '';
let dropOptions = []

const myFunc = () => {
	//optional function for on:input/on:change
};

...

<InputField
	id="id"
	label="Text"
	placeholder="Text"
	bind:value={myValue}
	options = dropOptions
	
	classLabel = 'classes to add to label'
	classText = 'classes to add to input/placeholder'
	classDiv = 'override div style'
	classField = 'override input field spacing/size'
	
	onInput={myFunc} // event for on:input, on:change, onChangeBlur
	onBlur={myFunc} // event for on:blur
	invalid={ boolean check for invalid input }
		// highlights the field when true
		
	errorMsgs = [] // Error messages
	errorBools = [] // Corresponding conditions to show them
	errorStyles = [] // Styles to add, leave '' for default
	keepErrorSpacing = {true/false}
		// true allocates extra space for error to show up
		// false pushes down rest of page upon error
	keepErrorsOnBlur = {true/false}
		// false shows errors only while typing/invalid
		// true keeps errors visible until resolved
	showErrorsOnlyWhen = {conditional, like invalid}
		// add extra conditions/variables
		// errors will only be visible while true
/>
-->

<script lang="ts">
	import Text from '$lib/Components/Text/Text.svelte';
	import { onMount } from 'svelte';

	export let id = '';
	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let invalid = false;
	export let onInput = () => {};
	export let onBlur = () => {};
	
	export let classLabel = '';
	export let classText = 'rounded-lg';
	export let classDiv = 'mb-4 w-full';
	export let classField = 'mt-1 pl-3 p-2 w-full';
	export let options: string[] = [];
	
	export let errorMsgs = [];
	export let errorBools = [];
	export let errorStyles = [];
	export let keepErrorSpacing = true;
	export let keepErrorsOnBlur= false;
	export let showErrorsOnlyWhen = true;
	
	let fieldActive = false;
	let errorToShow = null;
	$: {
		const minLength = Math.min(errorMsgs.length, errorBools.length);
		errorMsgs = errorMsgs.slice(0, minLength);
		errorBools = errorBools.slice(0, minLength);
		errorStyles = errorStyles.concat(Array(Math.max(0, minLength - errorStyles.length)).fill("text-altTextBrown"));
	}
	
	let filteredOptions: string[] = [];
	let searchQuery = '';
	let isOpen = false;
	let highlightedIndex = -1;
	let inputElement: HTMLInputElement;

	const handleInput = (event: any) => {
		fieldActive = true;
		updateError();
		onInput(event);
	};

	const handleFieldBlur = (event: any) => {
		onInput(event);
		fieldActive = false;
		onBlur(event);
		updateError();
	};
	
	export function updateError() {
		setTimeout(() => {
			errorToShow = null;
			for (let i = 0; i < errorMsgs.length; i++) {
				if (errorBools[i] && showErrorsOnlyWhen && (keepErrorsOnBlur || fieldActive || invalid)) {
					errorToShow = { msg: errorMsgs[i], style: errorStyles[i] };
				}
			}
		}, 1); // 1 tick delay for vars to update
	}
	
	// Dropdown functions

	const handleSearch = (event: any) => {
		searchQuery = event.target.value.toLowerCase();
		filteredOptions = options.filter((option) => option.toLowerCase().includes(searchQuery)).sort();
		if (searchQuery == '') {
			highlightedIndex = -1;
		} else {
			highlightedIndex = 0;
		}
	};

	const handleFocus = (event: any) => {
		isOpen = true;
		filteredOptions = options.sort();
		if (event.target.value.toLowerCase() == '') {
			highlightedIndex = -1;
		}
		event.target.focus();
	};

	export function handleBlur() {
		setTimeout(() => {
			if (
				highlightedIndex >= 0 &&
				highlightedIndex < filteredOptions.length &&
				options.includes(value)
			) {
				value = filteredOptions[highlightedIndex];
				onInput({ target: { value: filteredOptions[highlightedIndex] } });
			} else {
				value = '';
				onInput({ target: { value: '' } });
			}
			isOpen = false;
			handleInput();
		}, 200); // Delay to allow click event to register
	}

	const handleKeyDown = (event: any) => {
		if (event.key === 'ArrowDown') {
			highlightedIndex = (highlightedIndex + 1) % filteredOptions.length;
			value = filteredOptions[highlightedIndex];
			event.preventDefault();
		} else if (event.key === 'ArrowUp') {
			highlightedIndex = (highlightedIndex - 1 + filteredOptions.length) % filteredOptions.length;
			value = filteredOptions[highlightedIndex];
			event.preventDefault();
		} else if (event.key === 'Enter' || event.key === 'Tab') {
			if (event.key === 'Enter') {
				event.preventDefault();
			}
			if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
				value = filteredOptions[highlightedIndex];
				onInput({ target: { value: filteredOptions[highlightedIndex] } });
			}
			isOpen = false;
			handleInput();
		}
	};

	const handleMouseEnter = (index: number) => {
		highlightedIndex = index;
		value = filteredOptions[highlightedIndex];
	};

	const handleClickOption = (option: string) => {
		value = option;
		onInput({ target: { value: option } });
		isOpen = false;
		handleInput();
	};

	export function forceClick() {
		if (inputElement) {
			inputElement.click();
		}
	}

	export function forceFocus() {
		if (inputElement) {
			inputElement.click();
			setTimeout(() => {
				inputElement.focus();
			}, 100); // Add a slight delay
		}
	}
	
	onMount(() => {
		filteredOptions = options.sort();
		updateError();
	});
</script>

<div class={classDiv} on:click|preventDefault>
	<label for={id}>
		<Text class="smallText {classLabel}">{label}</Text>
	</label>
	<div class="relative inline-block w-full">
		<div class="relative">
			<input
				{id}
				type="text"
				bind:value
				bind:this={inputElement}
				{placeholder}
				class="{classField} bg-placeholderGray border-none
				{invalid ? 'bg-tagYellow text-altTextBrown placeholder-altTextBrown' : ''}
				{classText}"
				on:input={handleSearch}
				on:keydown={handleKeyDown}
				on:focus={handleFocus}
				on:blur={handleBlur}
				on:click={handleFocus}
			/>
			{#if isOpen}
				<ul
					class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto"
				>
					{#each filteredOptions as option, index}
						<li
							class="cursor-pointer select-none relative py-2 pl-3 pr-9 {highlightedIndex ===
							index
								? 'bg-gray-100'
								: ''}"
							on:mouseenter={() => handleMouseEnter(index)}
							on:click={() => handleClickOption(option)}
						>
							{option}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
	{#if errorMsgs.length > 0}
		<div class="mb-3">
			{#if errorToShow}
				<Text class="smallText text-altTextBrown {errorToShow.style}">{errorToShow.msg}</Text>
			{:else if keepErrorSpacing}
				<Text class="smallText invisible">&nbsp;</Text>
			{/if}
		</div>
	{/if}
</div>