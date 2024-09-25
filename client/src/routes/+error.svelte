<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import BackButton from '$lib/Components/BackButton.svelte';
	import Section from '$lib/Components/Text/Section.svelte';
	import Text from '$lib/Components/Text/Text.svelte';

	if ($page.error?.code === 401) {
		if (typeof window !== 'undefined') {
			goto('/login');
		}
	}
</script>

<BackButton />

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

			{#if $page.error.message === 'Account not confirmed'}
				<Text class="text-center">Please check your email to confirm your account.</Text>
				<Text class="text-center">
					If you don't see the email in your inbox, please check your spam or junk folder.
				</Text>
			{/if}
		{/if}
	</div>
</div>
