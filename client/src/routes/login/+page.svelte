<script lang="ts">
	import Text from '$lib/Components/Text/Text.svelte';
	import PasswordInput from '$lib/Components/Input/PasswordInput.svelte';
	import TextInput from '$lib/Components/Input/TextInput.svelte';
	import { goto } from '$app/navigation';
	import { PUBLIC_SERVER_HOST } from '$env/static/public';

	let email = '';
	let password = '';
	let passwordError = false;
	let invalidFields: string[] = [];

	let emailComp: TextInput;
	let passwordComp: PasswordInput;
	let invalidComps: any[] = [];

	function validateFields(): boolean {
		invalidFields = [];
		if (!email) invalidFields.push('email');
		if (!email) invalidComps.push(emailComp);
		if (!password) invalidFields.push('password');
		if (!password) invalidComps.push(passwordComp);

		if (invalidFields.length > 0) {
			for (let i = 0; i < invalidComps.length; i++) {
				invalidComps[i].updateError();
			}
			const firstInvalidField = document.getElementById(invalidFields[0]);
			firstInvalidField?.scrollIntoView({ behavior: 'smooth' });
			return false;
		}

		return true;
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
</script>

<div class="flex flex-col mdlg:flex-row justify-center items-center min-h-screen">
	<div
		class="container mx-auto px-4 flex flex-col mdlg:flex-row justify-center max-w-screen-lg space-y-6"
	>
		<!-- Middle section -->
		<div class="w-full mdlg:w-3/5 mdlg:max-w-[60%] bg-white p-8 rounded-lg space-y-6 relative">
			<Text class="section text-center">Welcome back!</Text>
			{#if passwordError}
				<Text
					class="smallText text-red-500 text-center absolute top-[4rem] left-1/2 transform -translate-x-1/2"
					>Password does not match</Text
				>
			{/if}

			<form on:submit|preventDefault={handleSubmit} class="space-y-3">
				<TextInput
					id="email"
					label="Email Address"
					placeholder="Email Address"
					bind:value={email}
					bind:this={emailComp}
					invalid={invalidFields.includes('email')}
					keepErrorSpacing={true}
					errorMsgs={['Email address required']}
					errorBools={[invalidFields.includes('email')]}
				/>

				<PasswordInput
					id="password"
					label="Password"
					placeholder="Password"
					bind:value={password}
					bind:this={passwordComp}
					invalid={invalidFields.includes('password')}
					errorMsgs={['Password required']}
					errorBools={[invalidFields.includes('password')]}
				/>
				<Text class="smallText text-left mt-3">
					<a href="/forgot" class="text-blue-500 underline">Forgot password?</a>
				</Text>

				<button
					type="submit"
					class="w-full bg-primaryYellow text-black py-2 px-4 rounded-lg mx-auto text"
				>
					<Text>Login</Text>
				</button>
			</form>

			<Text class="mt-4 text-center"
				>Not a member? <a href="/registration/volunteer" class="text-blue-500 underline"
					>Register here</a
				></Text
			>
		</div>
	</div>
</div>
