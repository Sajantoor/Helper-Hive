<script lang="ts">
	import { onMount } from 'svelte';
	import Text from './text/Text.svelte';
	import SmallText from './text/SmallText.svelte';
	import logoSrc from '$lib/assets/Logo.png';
	import { goto } from '$app/navigation';
	import { PUBLIC_SERVER_HOST } from '$env/static/public';
	import Close from 'svelte-material-icons/Close.svelte';

	export let avatar: string = '';
	export let isOrganization = false;
	export let name = '';
	export let email = '';
	export let isVerified = true;

	let isDropdownOpen = false;
	let showWarning = true;

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
		await fetch(`${PUBLIC_SERVER_HOST}/api/logout`, {
			method: 'POST',
			credentials: 'include'
		});

		goto('/login');
	};
</script>

<nav
	class="flex items-center justify-between p-1 bg-white text-black border-b-1 shadow-sm relative"
>
	<div class="flex items-center gap-3 desktop:gap-10">
		<div class="logo mr-4">
			<a href="/app">
				<img src={logoSrc} alt="Logo" class="h-10 ml-5" />
			</a>
		</div>
		<div class="nav-links flex gap-6 desktop:gap-14">
			<a href="/app" class="text-black hover:underline"><Text>Events</Text></a>
			{#if isOrganization && isVerified}
				<a href="/app/events/create" class="text-black hover:underline">
					<Text>Create Event</Text>
				</a>
			{/if}
		</div>
	</div>
	<div class="profile-pic relative">
		<button on:click={toggleDropdown} class="focus:outline-none">
			<img src={avatar} alt="Profile" class="h-8 w-8 mr-8 mt-2 rounded-full object-cover" />
		</button>

		{#if isDropdownOpen}
			<div class="dropdown-menu absolute right-2 mt-2 min-w-64 bg-white rounded-lg shadow-lg z-10">
				<div class="p-4 flex items-center">
					<img src={avatar} alt="Profile" class="h-12 w-12 rounded-full" />
					<div class="ml-3 mr-8">
						<Text class="text-gray-900 font-semibold">{name}</Text>
						<SmallText class="text-gray-600 text-sm truncate w-full pr-4">{email}</SmallText>
					</div>
				</div>
				<div class="border-t border-gray-200"></div>
				<div class="py-2">
					<a
						href="/app/profile"
						on:click={() => (isDropdownOpen = false)}
						class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
					>
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
{#if !isVerified && showWarning}
	<!-- show a warning that account is not verified -->
	<div
		class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
		role="alert"
	>
		<SmallText>
			<div class="inline">
				<button class="float-right mr-5" on:click={() => (showWarning = false)}>
					<Close size={20} />
				</button>
				<strong class="font-bold">Warning!</strong>
			</div>

			<div class="sm:inline">
				Your account is not verified. You will not be able to create events at this time. Please
				wait 1-5 days for the Helper Hive team to verify you.
			</div>
		</SmallText>
	</div>
{/if}
