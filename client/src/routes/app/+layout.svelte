<script lang="ts">
	import type { LayoutData } from './$types';
	import NavBar from '$lib/Components/NavBar.svelte';
	import { profileStore } from '$lib/stores/profileStore';
	export let data: LayoutData;
	let profile = data.profile;

	if (profile) {
		profileStore.set(profile);
	}
</script>

<NavBar
	isOrganization={profile?.role === 'organization'}
	name={profile?.name}
	email={profile?.email}
	avatar={profile?.avatar}
/>
<slot />
