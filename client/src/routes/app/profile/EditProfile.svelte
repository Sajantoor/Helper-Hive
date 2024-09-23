<script>
	import { createEventDispatcher } from 'svelte';
	import Text from '$lib/Components/Text/Text.svelte';
	import TextInput from '$lib/Components/Input/TextInput.svelte';
	import PasswordInput from '$lib/Components/Input/PasswordInput.svelte';
	import CloseCircle from 'svelte-material-icons/CloseCircle.svelte';
	import { PUBLIC_SERVER_HOST } from '$env/static/public';

	const dispatch = createEventDispatcher();

	export let profilePic = '';
	let name = '';
	let currentPassword = '';
	let newPassword = '';
	let confirmPassword = '';

	async function saveProfile() {
		const data = { currentPassword, newPassword };
		try {
			const response = await fetch(`${PUBLIC_SERVER_HOST}/api/reset-password`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			if (!response.ok) {
				const errorData = await response.json();
				alert(`Error: ${errorData.message}`);
				return;
			}

			alert('Profile saved successfully.');
			close();
		} catch (error) {
			alert(error);
		}
	}

	function close() {
		dispatch('closeOverlay');
	}
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
	<div class="bg-white w-96 p-6 rounded-xl shadow-lg">
		<div class="flex justify-between items-center mb-4">
			<Text class="text-lg font-bold">Edit Profile</Text>
			<button on:click={close} class="text-gray-500/75 hover:text-gray-900 mb-2 scale-150 desktop:scale-125"><CloseCircle /></button>
		</div>

		<div class="mb-4">
			<div class="flex items-center mb-4">
				<div class="w-12 h-12 rounded-full mr-4">
					<img src={profilePic} alt="Profile Picture" class="rounded-full" />
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
			class="bg-primaryYellow text-black py-2 px-4 rounded-lg w-full hover:bg-yellow-600"
		>
			Save
		</button>
	</div>
</div>
