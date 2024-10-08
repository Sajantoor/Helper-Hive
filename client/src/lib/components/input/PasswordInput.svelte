<script lang="ts">
	import EyeOutline from 'svelte-material-icons/EyeOutline.svelte';
	import EyeOffOutline from 'svelte-material-icons/EyeOffOutline.svelte';
	import SmallText from '../text/SmallText.svelte';

	export let type: 'new' | 'confirm' | 'default' = 'default';
	export let matchPassword: string | null = null;
	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let valid = false;
	export let successMessage = '';
	export let touched = false;

	let showPassword = false;
	let errorMessage = '';

	let ref: HTMLInputElement;

	const togglePassword = () => {
		showPassword = !showPassword;
		ref.type = showPassword ? 'text' : 'password';
	};

	const handleInput = () => {
		touched = true;

		if (type === 'new') {
			let conditions = [
				{ regex: /[A-Z]/, message: 'an uppercase letter' },
				{ regex: /[a-z]/, message: 'a lowercase letter' },
				{ regex: /[0-9]/, message: 'a number' },
				{
					regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.`~<>\/?]/,
					message: 'a special character'
				},
				{ test: (val: string) => val.length >= 8, message: 'at least 8 characters' }
			];

			let unmetConditions = conditions
				.filter(({ regex, test }) => !(regex ? regex.test(value) : test(value)))
				.map(({ message }) => message);

			if (unmetConditions.length > 0) {
				errorMessage =
					'Password must contain ' +
					unmetConditions.join(', ').replace(/,([^,]*)$/, ', and$1') +
					'.';
			} else {
				errorMessage = '';
			}
		}

		if (type === 'confirm') {
			if (!matchPassword) {
				errorMessage = 'Please enter your password';
			} else if (value !== matchPassword) {
				errorMessage = 'Passwords do not match';
			} else {
				errorMessage = '';
			}
		}

		if (type === 'default') {
			if (value.length === 0) {
				errorMessage = 'Please enter your password';
			} else {
				errorMessage = '';
			}
		}

		valid = errorMessage.length === 0;
	};

	const handleBlur = () => {
		touched = true;
		handleInput();
	};

	$: if (touched || (touched && matchPassword)) {
		handleInput();
	}
</script>

<div class="w-full">
	<label for="div">
		<SmallText>{label}</SmallText>
	</label>
	<div class="relative inline-block w-full mb-2">
		<input
			type="password"
			bind:this={ref}
			bind:value
			{placeholder}
			class="mt-1 pl-3 p-2 w-full bg-placeholderGray border-none rounded-lg max-desktop:pt-3 max-desktop:pb-3
			{touched && !valid && 'bg-tagYellow text-altTextBrown placeholder-altTextBrown'}"
			on:input={handleInput}
			on:blur={handleBlur}
		/>
		<button
			type="button"
			class="absolute top-1/2 right-4 transform -translate-y-[45%] max-desktop:scale-125 border-none bg-none cursor-pointer"
			tabindex="-1"
			on:click={togglePassword}
		>
			{#if showPassword}
				<EyeOutline class="text-altTextGray" />
			{:else}
				<EyeOffOutline class="text-altTextGray" />
			{/if}
		</button>
	</div>
	{#if errorMessage}
		<SmallText class="text-altTextBrown mb-2">{errorMessage}</SmallText>
	{:else if successMessage}
		<SmallText class="text-green-500 mb-2">{successMessage}</SmallText>
	{/if}
</div>
