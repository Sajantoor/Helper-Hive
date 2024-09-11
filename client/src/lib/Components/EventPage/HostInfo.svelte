<script lang="ts">
	import Instagram from 'svelte-material-icons/Instagram.svelte';
	import Text from '../Text/Text.svelte';
	import Heading from '../Text/Heading.svelte';

	let iconSize = 40;

	export let organization: {
		name: string;
		logo: string;
		instagram?: string;
	};
</script>

<div>
	<Heading class="mb-4">Hosted by</Heading>
	<div class="host-info">
		<div class="flex items-center">
			<img class="host-logo rounded-full h-6" src={organization.logo} alt={organization.name} />
			<Text class="ml-8">{organization.name}</Text>
		</div>
		{#if organization.instagram}
			<div
				class="cursor-pointer"
				on:click|preventDefault={() => window.open(organization.instagram, '_blank')}
			>
				<Instagram class="text-primaryYellow" size={iconSize} />
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.host-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.host-logo {
		width: 3.5rem;
		height: 3.5rem;
	}
</style>
