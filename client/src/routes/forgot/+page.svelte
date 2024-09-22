<script lang="ts">
	import Text from '$lib/Components/Text/Text.svelte';
	import LeftArrow from 'svelte-material-icons/ChevronLeft.svelte';
	import { PUBLIC_SERVER_HOST } from '$env/static/public';
	import EmailInput from '$lib/Components/Input/EmailInput.svelte';

	let email = '';
	let isFormValid = false;
	let submitted = false;

	const handleSubmit = async () => {
		if (!isFormValid) {
			return;
		}

		const response = await fetch(`${PUBLIC_SERVER_HOST}/api/forgot-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		if (response.ok) {
			submitted = true;
		} else {
			const data = await response.json();
			console.error('Failed to send forgot password: ' + data);
		}
	};

	const resetForm = () => {
		submitted = false;
	};
</script>

<div class="flex flex-col md:flex-row justify-center items-center  min-h-[90vh] desktop:min-h-screen">
	<div
		class="container mx-auto px-4 flex flex-col md:flex-row justify-center max-w-screen-lg space-y-6"
	>
		<!-- Middle section -->
		<div class="w-full md:w-3/5 md:max-w-[60%] bg-white p-8 rounded-lg space-y-6 relative">
			{#if !submitted}
				<Text class="section text-center">Forgot your password?</Text>
				<Text class="text-center w-full mx-auto"
					>Enter your email address below, and we will send you a link to reset your password.
					Please check your inbox for further instructions.</Text
				>

				<form on:submit|preventDefault={handleSubmit} class="space-y-6">
					<EmailInput label="Email Address" bind:value={email} bind:valid={isFormValid} />

					<button
						type="submit"
						class={`w-full ${isFormValid ? 'bg-primaryYellow text-black' : 'bg-tagYellow text-altTextBrown'} py-2 px-4 rounded-lg mx-auto text`}
					>
						<Text>Submit</Text>
					</button>
				</form>
			{:else}
				<Text class="section text-center">Check your email</Text>
				<Text class="text-center w-full mx-auto"
					>We have sent an email to <strong>{email}</strong> with instructions to reset your password.
					Please follow the instructions in the email to proceed. If you can't find it, the email may
					be in your spam.</Text
				>
				<div class="flex justify-center space-x-4">
					<button
						type="button"
						class="bg-primaryYellow text-black py-2 px-4 rounded-lg flex items-center"
						on:click={resetForm}
					>
						<LeftArrow class="h-6 w-6 mr-2" />
						<Text>Try again</Text>
					</button>
					<a
						href="/login"
						class="bg-primaryYellow text-black py-2 px-4 rounded-lg flex items-center"
					>
						<Text>Back to Login</Text>
					</a>
				</div>
			{/if}
		</div>
	</div>
</div>
