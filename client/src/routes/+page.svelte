<script lang="ts">
	import NavBar from '$lib/Components/NavBar.svelte';
	import SmallText from '$lib/Components/Text/SmallText.svelte';
	import Text from '$lib/Components/Text/Text.svelte';
</script>

<Text>Welcome to Helper Hive (This is a temporary landing page)</Text>
<SmallText class="text mr-2 mt-1">
	<a href="/login" class="text-blue-500">Login here</a>
</SmallText>

<SmallText class="text mr-2 mt-1">
	<a href="/registration/volunteer" class="text-blue-500">Volunteers register here</a>
</SmallText>

<SmallText class="text mr-2 mt-1">
	<a href="/registration/organization" class="text-blue-500">Organizations register here</a>
</SmallText>
