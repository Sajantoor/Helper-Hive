<script>
	import { createEventDispatcher } from 'svelte';
	import Text from '$lib/Components/Text/Text.svelte';
	import TextInput from '$lib/Components/Input/TextInput.svelte';
	import PasswordInput from '$lib/Components/Input/PasswordInput.svelte';
	import { PUBLIC_SERVER_HOST } from '$env/static/public';

	const dispatch = createEventDispatcher();

	export let closeOverlay;
	export let profilePicSrc = '';
	let name = '';
	let currentPassword = '';
	let newPassword = '';
	let confirmPassword = '';

	function saveProfile() {
		console.log('Profile saved:', { name, currentPassword, newPassword, confirmPassword });
		close();
	}

	/* 
     async function saveProfile(event) {
		event.preventDefault();

		if (newPassword !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		try {
			const response = await fetch(`${PUBLIC_SERVER_HOST}/api/users`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name,
					currentPassword,
					newPassword
				})
			});

			if (response.ok) {
				const updatedProfile = await response.json();
				console.log('Profile updated successfully', updatedProfile);
				closeOverlay();
			} else {
				const errorData = await response.json();
				console.error('Error updating profile:', errorData);
				alert(`Error updating profile: ${errorData.message}`);
			}
		} catch (error) {
			console.error('Failed to update profile', error);
			alert('Failed to update profile');
		}
    } */

	function close() {
		dispatch('closeOverlay');
	}
</script>

\
<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
	<div class="bg-white w-96 p-6 rounded-xl shadow-lg">
		<div class="flex justify-between items-center mb-4">
			<Text class="text-lg font-bold">Edit Profile</Text>
			<button on:click={close} class="text-gray-600 hover:text-gray-900"> &times; </button>
		</div>

		<div class="mb-4">
			<div class="flex items-center mb-4">
				<div class="w-12 h-12 rounded-full bg-gray-200 mr-4">
					<img src={profilePicSrc} alt="Profile Picture" class="rounded-full" />
				</div>
				<TextInput label="" placeholder="Name" bind:value={name} />
			</div>
		</div>

		<Text class="font-semibold mb-2">Update Password</Text>
		<div class="mb-4">
			<PasswordInput
				label=""
				placeholder="Current Password"
				bind:value={currentPassword}
				type="default"
			/>
			<PasswordInput label="" placeholder="New Password" bind:value={newPassword} type="new" />
			<PasswordInput
				label=""
				placeholder="Confirm Password"
				bind:value={confirmPassword}
				type="confirm"
				matchPassword={newPassword}
			/>
		</div>

		<button
			on:click={saveProfile}
			class="bg-primaryYellow text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-yellow-600"
		>
			Save
		</button>
	</div>
</div>
