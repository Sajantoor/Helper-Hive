<script lang="ts">
	import SmallText from '../Text/SmallText.svelte';

	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let isValid = false;
	export let isRequired = false;
	export let rows = 0;
	let inputClass = 'mt-1 pl-3 p-2 w-full bg-placeholderGray border-none rounded-lg';
	let invalidClass = 'bg-tagYellow text-altTextBrown placeholder-altTextBrown';

	function handleInput() {
		isValid = value.length > 0 || !isRequired;
	}
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
				class="{inputClass} {isValid && invalidClass}"
				on:change={handleInput}
			></textarea>
		{:else}
			<input
				type="text"
				bind:value
				{placeholder}
				class="{inputClass} {isValid && invalidClass}"
				on:change={handleInput}
			/>
		{/if}
	</div>
	{#if !isValid}
		<SmallText class="text-altTextBrown">{label} is required.</SmallText>
	{/if}
</div>
