<script lang="ts">
	import Text from '$lib/components/text/Text.svelte';
	import PasswordInput from '$lib/components/input/PasswordInput.svelte';
	import { goto } from '$app/navigation';
	import { PUBLIC_SERVER_HOST } from '$env/static/public';
	import EmailInput from '$lib/components/input/EmailInput.svelte';
	import SmallText from '$lib/components/text/SmallText.svelte';

	let email = '';
	let password = '';
	let passwordError = false;

	let emailValid = false;
	let passwordValid = false;
	let isFormValid = false;

	function validateFields(): boolean {
		isFormValid = emailValid && passwordValid;
		return isFormValid;
	}

	async function handleSubmit() {
		if (!validateFields()) return;

		const data = { email, password };
		const response = await fetch(`${PUBLIC_SERVER_HOST}/api/login`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (response.ok) {
			goto('/app/');
		} else {
			passwordError = true;
		}
	}

	$: if (emailValid || passwordValid) {
		validateFields();
	}
</script>

<div
	class="flex flex-col mdlg:flex-row justify-center items-center min-h-[90vh] desktop:min-h-screen"
>
	<div
		class="container mx-auto px-4 flex flex-col mdlg:flex-row justify-center max-w-screen-lg space-y-6"
	>
		<!-- Middle section -->
		<div class="w-full mdlg:w-3/5 mdlg:max-w-[60%] bg-white p-8 rounded-lg space-y-6 relative">
			<Text class="section text-center">Welcome back!</Text>

			<form on:submit|preventDefault={handleSubmit} class="space-y-3">
				<EmailInput label="Email Address" bind:value={email} bind:valid={emailValid} />

				<PasswordInput
					label="Password"
					placeholder="Enter your password..."
					bind:value={password}
					bind:valid={passwordValid}
				/>

				<SmallText class="text-left mt-3">
					<a href="/forgot" class="text-blue-500 underline">Forgot password?</a>
				</SmallText>

				<button
					type="submit"
					class={`w-full py-2 px-4 rounded-lg mx-auto ${isFormValid ? 'bg-primaryYellow text-black' : 'bg-tagYellow text-altTextBrown'}`}
				>
					<Text>Login</Text>
				</button>
			</form>

			{#if passwordError}
				<SmallText class=" text-red-500 text-center">Incorrect username or password</SmallText>
			{/if}

			<Text class="mt-4 text-center"
				>Not a member? <a href="/registration/volunteer" class="text-blue-500 underline"
					>Register here</a
				></Text
			>
		</div>
	</div>
</div>
