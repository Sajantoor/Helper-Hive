<script lang="ts">
	import NavBar from '$lib/Components/NavBar.svelte';
	import Section from '$lib/Components/Text/Section.svelte';
	import Heading from '$lib/Components/Text/Heading.svelte';

	import Text from '$lib/Components/Text/Text.svelte';
	import Pencil from 'svelte-material-icons/Pencil.svelte';
	import EventsContainer from '$lib/Components/EventsContainer.svelte';

	let profilePicSrc = 'https://cdn-icons-png.freepik.com/512/4032/4032866.png'; // www.freepik.com
	let name = 'Jane Doe';
	let isCurrentUser = true;
	let bio =
		'Adventurous soul, avid learner, and always up for a good laugh. Living life one moment at a time 100.';
	let completedHours = 100;
</script>

<NavBar />

<div class="ml-10 mt-2 p-8 mr-10 pb-28">
	{#if isCurrentUser}
		<div class="editProfile float-right">
			<button class="editProfile flex border rounded-full p-2 pl-4 pr-4">
				<Pencil size={25} />
				<Text class="ml-2">Edit Profile</Text>
			</button>
		</div>
	{/if}

	<img
		src={profilePicSrc}
		alt="Profile"
		class="h-40 w-40 mr-10 rounded-full object-cover float-left"
	/>
	<Section class="block">{name}</Section>

	{#if bio}
		<Text class="bioText">{bio}</Text>
	{/if}

	{#if completedHours}
		<div class="float-right">
			<Heading>Completed Hours:</Heading>
			<Heading class="float-right text-primaryYellow">{completedHours}</Heading>
		</div>
	{/if}
</div>

<div class="sectionMarker"></div>


<style lang="postcss">
	.sectionMarker {
		width: 90%;
		margin: 0 auto;
		border-bottom: 1px solid #999999;
	}
</style>
