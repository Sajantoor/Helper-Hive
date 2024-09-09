<script lang="ts">
	import { onMount } from 'svelte';
	import Text from './Text/Text.svelte';
	import SmallText from './Text/SmallText.svelte';
	import logoSrc from '$lib/assets/Logo.png';
	import { goto } from '$app/navigation';
	import { PUBLIC_SERVER_HOST } from '$env/static/public';

	export let profilePic: string | null | undefined =
		'https://cdn-icons-png.freepik.com/512/4032/4032866.png';
	export let isOrganization = false;
	export let name = '';
	export let email = '';

	let isDropdownOpen = false;

	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	onMount(() => {
		// Only add event listeners if running in the browser
		if (typeof document === 'undefined') {
			return;
		}

		// Close the dropdown when clicking outside of it
		function handleClickOutside(event: MouseEvent) {
			if (!(event.target as HTMLElement | null)?.closest('.profile-pic, .dropdown-menu')) {
				isDropdownOpen = false;
			}
		}

		document.addEventListener('click', handleClickOutside);

		// Cleanup event listener on destroy
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	const handleLogout = async () => {
		const response = await fetch(`${PUBLIC_SERVER_HOST}/api/logout`, {
			method: 'POST',
			credentials: 'include'
		});

		console.log(response);

		goto('/login');
	};
</script>

<nav
	class="flex items-center justify-between p-1 bg-white text-black border-b-1 shadow-sm relative"
>
	<div class="flex items-center gap-10">
		<div class="logo mr-4">
			<img src={logoSrc} alt="Logo" class="h-10 ml-5" />
		</div>
		<div class="nav-links flex gap-14">
			<a href="/app" class="text-black hover:underline"><Text>Events</Text></a>
			{#if isOrganization}
				<a href="/app/events/create" class="text-black hover:underline">
					<Text>Create Event</Text>
				</a>
			{/if}
		</div>
	</div>
	<div class="profile-pic relative">
		<button on:click={toggleDropdown} class="focus:outline-none">
			<img src={profilePic} alt="Profile" class="h-8 w-8 mr-8 rounded-full object-cover" />
		</button>

		{#if isDropdownOpen}
			<div class="dropdown-menu absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10">
				<div class="p-4 flex items-center">
					<img src={profilePic} alt="Profile" class="h-12 w-12 rounded-full" />
					<div class="ml-3">
						<Text class="text-gray-900 font-semibold">{name}</Text>
						<SmallText class="text-gray-600 text-sm truncate w-full">{email}</SmallText>
					</div>
				</div>
				<div class="border-t border-gray-200"></div>
				<div class="py-2">
					<a href="/app/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
						<Text>View Profile</Text>
					</a>
				</div>
				<div class="py-2 pb-3 flex justify-center">
					<button
						class="w-40 px-4 py-2 text-center text-black font-semibold bg-primaryYellow rounded-lg"
						on:click={handleLogout}
					>
						<Text>Logout</Text>
					</button>
				</div>
			</div>
		{/if}
	</div>
</nav>
