<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SmallText from '../Text/SmallText.svelte';

	export let label: string = '';
	export let value: string = '';
	let isValid = true;

	let placeholder = 'Enter email address...';
	let errorMessage = '';

	export const validateEmail = (email: string) => {
		if (!email) {
			errorMessage = 'Email is required';
			return false;
		}

		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!re.test(email)) {
			errorMessage = 'Must enter a valid email address';
			return false;
		}

		errorMessage = '';
		return true;
	};

	export const validateInput = () => {
		isValid = validateEmail(value);
		dispatch('validate', isValid);
	};

	const dispatch = createEventDispatcher<{ validate: boolean }>();
</script>

<div>
	<label for="div">
		<SmallText>{label}</SmallText>
	</label>
	<div class="relative inline-block w-full mb-2">
		<input
			type="email"
			bind:value
			{placeholder}
			class="mt-1 pl-3 p-2 w-full bg-placeholderGray border-none rounded-lg
                    {!isValid ? 'bg-tagYellow text-altTextBrown placeholder-altTextBrown' : ''}"
			on:change={validateInput}
		/>
	</div>

	{#if errorMessage}
		<SmallText class="text-altTextBrown">{errorMessage}</SmallText>
	{/if}
</div>
