<script lang="ts">
	import SmallText from '$lib/components/text/SmallText.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ input: { value: string } }>();

	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let invalid = false;
	export let options: string[] = [];

	let filteredOptions = options.sort();
	let searchQuery = '';
	let isOpen = false;
	let highlightedIndex = -1;

	const handleSearch = (event: any) => {
		const target = event.target as HTMLInputElement;
		searchQuery = target.value.toLowerCase();

		if (!searchQuery || searchQuery.length < 1) {
			highlightedIndex = -1;
		}

		filteredOptions = options
			.filter((option) => option.toLowerCase().startsWith(searchQuery))
			.sort();
		highlightedIndex = 0;
	};

	const handleClick = (event: any) => {
		isOpen = true;
		if (event.target.value.toLowerCase() == '') {
			highlightedIndex = -1;
		}
		event.target.focus();
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		switch (event.key) {
			case 'Escape': {
				isOpen = false;
				break;
			}
			case 'ArrowDown': {
				highlightedIndex = (highlightedIndex + 1) % filteredOptions.length;
				value = filteredOptions[highlightedIndex];
				event.preventDefault();
				break;
			}
			case 'ArrowUp': {
				highlightedIndex = (highlightedIndex - 1 + filteredOptions.length) % filteredOptions.length;
				value = filteredOptions[highlightedIndex];
				event.preventDefault();
				break;
			}
			case 'Enter':
			case 'Tab': {
				if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
					value = filteredOptions[highlightedIndex];
					handleSelect();
				}
				isOpen = false;
				event.preventDefault();
				break;
			}
		}
	};

	const handleMouseEnter = (index: number) => {
		highlightedIndex = index;
		value = filteredOptions[highlightedIndex];
	};

	const handleClickOption = (option: string) => {
		value = option;
		handleSelect();
		isOpen = false;
	};

	const handleSelect = () => {
		dispatch('input', { value });
		value = '';
	};
</script>

<div class="mb-1 w-full" on:click|preventDefault>
	<label for="div">
		<SmallText>{label}</SmallText>
	</label>
	<div class="relative inline-block w-full">
		<div class="relative">
			<input
				type="text"
				bind:value
				{placeholder}
				class="mt-1 pl-4 desktop:pl-3 p-2 w-full rounded-full bg-placeholderGray border-none
				{invalid ? 'bg-tagYellow text-altTextBrown placeholder-altTextBrown' : ''}"
				on:input={handleSearch}
				on:keydown={handleKeyDown}
				on:click={handleClick}
			/>
			{#if isOpen}
				<ul
					class="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto"
				>
					{#each filteredOptions as option, index}
						<li
							class="cursor-pointer select-none relative py-2 pl-3 pr-9
							{highlightedIndex === index ? 'bg-gray-100' : ''}"
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
</div>
