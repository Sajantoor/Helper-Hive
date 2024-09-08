<script lang="ts">
	import SmallText from '../Text/SmallText.svelte';

	export let label: string = '';
	export let value: string = '';
	export let valid = true;
	export let touched = false;

	let placeholder = 'Enter email address...';
	let errorMessage = 'Email is required';

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

	const validateInput = () => {
		valid = validateEmail(value);
	};

	const handleBlur = () => {
		touched = true;
	};
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
                {touched && !valid && 'bg-tagYellow text-altTextBrown placeholder-altTextBrown'}"
			on:change={validateInput}
			on:blur={handleBlur}
		/>
	</div>

	{#if touched && !valid && errorMessage}
		<SmallText class="text-altTextBrown">{errorMessage}</SmallText>
	{/if}
</div>
