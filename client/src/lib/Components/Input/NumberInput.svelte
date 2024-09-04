<!-- 
Usage in page:

let myValue = '';

const myFunc = () => {
	//optional function for on:input
};

...

<InputField
	// All fields are optional
	id="id"
	label="Text"
	placeholder="Text"
	bind:value={myValue}
	
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
	export let classText = '';
	export let classDiv = 'w-full';
	export let classField = 'mt-1 pl-3 p-2 w-full';
	
	export let errorMsgs = [];
	export let errorBools = [];
	export let errorStyles = [];
	export let keepErrorSpacing = false;
	export let keepErrorsOnBlur= false;
	export let showErrorsOnlyWhen = true;
	
	let inputElement: HTMLInputElement;
	let fieldActive = false;
	let errorToShow = null;
	$: {
		const minLength = Math.min(errorMsgs.length, errorBools.length);
		errorMsgs = errorMsgs.slice(0, minLength);
		errorBools = errorBools.slice(0, minLength);
		errorStyles = errorStyles.concat(Array(Math.max(0, minLength - errorStyles.length)).fill("text-altTextBrown"));
	}

	const handleInput = (event: any) => {
		fieldActive = true;
		updateError();
		value = event.target.value;
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
			}, 100);
		}
	}

	onMount(() => {
		updateError();
	});
</script>

<div class={classDiv}>
	<label for={id}>
		<Text class="smallText {classLabel}">{label}</Text>
	</label>
	<div class="relative inline-block w-full mb-2">
		<input
			{id}
			type="number"
			min="1"
			bind:value
			bind:this={inputElement}
			{placeholder}
			class="{classField} bg-placeholderGray border-none rounded-lg {invalid
				? 'bg-tagYellow text-altTextBrown placeholder-altTextBrown'
				: ''} {classText}"
			on:input={handleInput}
			on:change={handleInput}
			on:blur={handleFieldBlur}
			style="appearance: textfield; -webkit-appearance: none; -moz-appearance: textfield;"
		/>
	</div>
	{#if errorMsgs.length > 0}
		<div>
			{#if errorToShow}
				<Text class="smallText text-altTextBrown {errorToShow.style}">{errorToShow.msg}</Text>
			{:else if keepErrorSpacing}
				<Text class="smallText invisible">&nbsp;</Text>
			{/if}
		</div>
	{/if}
</div>
