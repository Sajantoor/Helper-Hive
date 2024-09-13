<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Section from '$lib/Components/Text/Section.svelte';
	import Text from '$lib/Components/Text/Text.svelte';
</script>

<!-- TODO: Replace with back button from another commit -->
<button on:click={() => goto('/')}>Go home</button>

<div class="flex flex-col md:flex-row justify-center items-center min-h-screen">
	<div class="w-full md:w-3/5 md:max-w-[60%] bg-white p-8 rounded-lg space-y-6 relative">
		{#if $page.error?.code}
			<Section class="text-center">{$page.error?.code}</Section>
		{/if}

		<!-- Edge case for not found... -->
		<!-- Can setup properly like this but a bit annoying: https://kit.svelte.dev/docs/advanced-routing#rest-parameters-404-pages -->
		{#if $page.error?.message === 'Not Found'}
			<Section class="text-center">404</Section>
		{/if}

		{#if $page.error?.message}
			<Text class="text-center">{$page.error?.message}</Text>
		{/if}

		<!-- TODO: This is temporary -->
		<form class="space-y-6">
			<button
				type="submit"
				class={`w-full bg-primaryYellow text-black py-2 px-4 rounded-lg mx-auto text`}
			>
				<Text>Submit</Text>
			</button>
		</form>
	</div>
</div>
