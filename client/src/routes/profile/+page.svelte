<script lang="ts">
	import NavBar from '$lib/Components/NavBar.svelte';
	import Text from '$lib/Components/Text/Text.svelte';
	import Pencil from 'svelte-material-icons/Pencil.svelte';

	let profilePicSrc = 'https://cdn-icons-png.freepik.com/512/4032/4032866.png'; // www.freepik.com
	let name = 'Jane Doe';
	let isCurrentUser = true;
</script>

<NavBar />

<div class="flex">
	<img src={profilePicSrc} alt="Profile" class="h-32 w-32 mr-10 rounded-full object-cover" />
	<Text>{name}</Text>
	{#if isCurrentUser}
		<div class="editProfile absolute right-8">
			<button class="flex">
				<Pencil size={25} />
				<Text>Edit Profile</Text>
			</button>
		</div>
	{/if}
</div>

<style lang="postcss">
</style>
