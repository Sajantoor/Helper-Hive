<script lang="ts">
	import Instagram from 'svelte-material-icons/Instagram.svelte';
	import FileDocumentOutline from 'svelte-material-icons/FileDocumentOutline.svelte';
	import Text from '../Text/Text.svelte';
	import SmallText from '../Text/SmallText.svelte';
	import Heading from '../Text/Heading.svelte';

	let iconSize = 30;

	export let hostImage: string = '';
	export let hostName: string = '';
</script>

<div class="hosted-by-container">
	<Heading class="mb-4">Hosted by</Heading>
	<div class="host-info">
		<div class="flex items-center">
			<img class="host-logo rounded-full h-6" src={hostImage} alt={hostName} />

			<Text class="ml-8">{hostName}</Text>
		</div>
		<Instagram class="text-iconYellow" size={iconSize} />
	</div>
	<div class="mb-8 mt-8">
		<FileDocumentOutline class="text-iconYellow" size={50} />
		<SmallText class="text-gray-400 ml-1 mt-1">File.txt</SmallText>
	</div>

	<Text class="text-altTextGray mb-4">Contact the host</Text>
	<Text class="text-altTextGray">Report this event</Text>
</div>

<style>
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
