<script lang="ts">
	import Text from '$lib/Components/Text/Text.svelte';
	import LoremIpsum from '$lib/Components/TCContents.svelte';

	export let id = '';
	export let title = '';
	export let type = 'terms';

	const closePopup = () => {
		const popup = document.getElementById(id);
		popup?.classList.add('hidden');
	};
</script>

<style>
	.scrollbar-custom::-webkit-scrollbar {
		width: 8px;
	}

	.scrollbar-custom::-webkit-scrollbar-track {
		background: transparent;
	}

	.scrollbar-custom::-webkit-scrollbar-thumb {
		background-color: #FABD22;
		border-radius: 10px;
	}
	
	.scrollbar-custom::-webkit-scrollbar-thumb:hover {
		background-color: #CEA32D;
	}

	.scrollbar-custom::-webkit-scrollbar-thumb:active {
		background-color: #A98D36;
	}
</style>

<div {id} class="fixed inset-0 flex items-center justify-center bg-dimBlack bg-opacity-50 hidden">
	<div class="bg-darkGray p-4 rounded-3xl w-4/5 h-5/6 overflow-hidden relative">
		<div
			class="bg-darkGray rounded-t-3xl rounded-b-none flex justify-between items-center sticky top-0 z-10"
		>
			<Text class="heading text-white text-center w-full">{title}</Text>
			<button class="cursor-pointer text-2xl mr-4 text-tagYellow hover:text-primaryYellow active:text-altTextBrown" on:click={closePopup}>x</button>
		</div>
		<div class="absolute inset-0 top-[4rem] bg-white p-4 rounded-b-3xl rounded-t-lg mb-4 mr-4 ml-4">
			<div
				class="popup-body overflow-y-auto h-full pb-3 pl-4 pr-4 scrollbar-custom text-placeholderGrayText"
			>
				<LoremIpsum {type} />
			</div>
		</div>
	</div>
</div>
