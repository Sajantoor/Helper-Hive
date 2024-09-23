<script lang="ts">
	import { onMount } from 'svelte';
	import SmallText from '../Text/SmallText.svelte';

	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let required = true;
	export let valid = false || !required;
	export let rows = 0;
	export let errorMessage: string | null = null;
	export let touched = false;
	let inputClass = 'mt-1 pl-3 p-2 w-full bg-placeholderGray border-none rounded-lg max-desktop:pt-3 max-desktop:pb-3';
	let invalidClass = 'bg-tagYellow text-altTextBrown placeholder-altTextBrown';

	function handleInput() {
		touched = true;
		valid = value.length > 0 || !required;
	}

	onMount(() => {
		if (value) {
			handleInput();
		}
	});
</script>

<div class="w-full">
	<label for="div">
		<SmallText>{label}</SmallText>
	</label>
	<div class="relative inline-block w-full mb-2">
		{#if rows > 0}
			<textarea
				bind:value
				{placeholder}
				{rows}
				class="{inputClass} {touched && !valid && invalidClass}"
				on:change={handleInput}
				on:blur={handleInput}
			/>
		{:else}
			<input
				type="text"
				bind:value
				{placeholder}
				class="{inputClass} {touched && !valid && invalidClass}"
				on:change={handleInput}
				on:blur={handleInput}
			/>
		{/if}
	</div>
	{#if touched && !valid}
		<SmallText class="text-altTextBrown">
			{errorMessage ? errorMessage : label + ' is required.'}
		</SmallText>
	{/if}
</div>
