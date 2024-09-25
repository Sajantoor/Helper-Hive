<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { PUBLIC_SERVER_HOST } from '$env/static/public';
	import BackButton from '$lib/Components/BackButton.svelte';
	import PasswordInput from '$lib/Components/Input/PasswordInput.svelte';
	import Section from '$lib/Components/Text/Section.svelte';
	import Text from '$lib/Components/Text/Text.svelte';

	let password = '';
	let confirmValue = '';
	let passwordValid = false;
	let confirmPasswordValid = false;
	let touched = false;
	let errorMessage = '';

	const onSubmit = async () => {
		const res = await fetch(`${PUBLIC_SERVER_HOST}/api/reset-password/${$page.params.slug}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ password })
		});

		if (res.ok) {
			goto('/login');
			return;
		}

		const data = await res.json();
		errorMessage = data.message;
	};
</script>

<BackButton />

<div class="flex flex-col md:flex-row justify-center items-center min-h-screen">
	<div class="w-full md:w-3/5 md:max-w-[60%] bg-white p-8 rounded-lg space-y-6 relative">
		<Section class="text-center">Reset Password</Section>
		<PasswordInput
			type="new"
			label="Password"
			placeholder="Password"
			bind:value={password}
			bind:valid={passwordValid}
			{touched}
		/>
		<PasswordInput
			type="confirm"
			label="Confirm Password"
			placeholder="Confirm Password"
			bind:value={confirmValue}
			bind:valid={confirmPasswordValid}
			matchPassword={password}
			{touched}
		/>

		<button
			disabled={!passwordValid || !confirmPasswordValid}
			on:click={onSubmit}
			class={`w-full ${passwordValid && confirmPasswordValid ? 'bg-primaryYellow text-black' : 'bg-tagYellow text-altTextBrown'} py-2 px-4 rounded-lg mx-auto text`}
			style="margin-top: 2.5rem;"
		>
			<Text>Reset Password</Text>
		</button>

		{#if errorMessage}
			<Text class="text-red-500 text-center">
				{errorMessage}
			</Text>
		{/if}
	</div>
</div>
