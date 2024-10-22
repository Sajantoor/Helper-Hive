<script lang="ts">
	import BackButton from '$lib/components/BackButton.svelte';
	import Section from '$lib/components/text/Section.svelte';
</script>

<BackButton />

<div class="flex flex-col md:flex-row justify-center items-center min-h-screen">
	<div class="w-full md:w-3/5 md:max-w-[60%] bg-white p-8 rounded-lg space-y-6 relative">
		<Section class="text-center">Your account has been confirmed!</Section>
	</div>
</div>
