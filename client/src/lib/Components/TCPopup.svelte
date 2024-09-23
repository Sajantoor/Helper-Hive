<script lang="ts">
	import Text from '$lib/Components/Text/Text.svelte';
	import TCContents from '$lib/Components/TCContents.svelte';
	import CloseCircle from 'svelte-material-icons/CloseCircle.svelte';

	export let id = '';
	export let title = '';
	export let type: 'terms' | 'liabilityOrg' | 'liabilityVol' = 'terms';

	const closePopup = () => {
		const popup = document.getElementById(id);
		popup?.classList.add('hidden');
	};
</script>

<div {id} class="fixed inset-0 flex items-center justify-center bg-dimBlack bg-opacity-50 hidden">
	<div class="bg-darkGray p-4 rounded-3xl desktop:rounded-2xl w-[95%] desktop:w-4/5 h-5/6 desktop:h-[90%] overflow-hidden relative">
		<div
			class="bg-darkGray rounded-t-3xl desktop:rounded-t-2xl rounded-b-none flex justify-between items-center sticky top-0 z-10"
		>
			<Text class="heading text-white text-center w-full ml-10">{title}</Text>
			<div class="pl-4" on:click|preventDefault={closePopup}>
				<CloseCircle
					class="cursor-pointer text-xl mr-1 mt-1 text-tagYellow hover:text-primaryYellow active:text-altTextBrown"
				/>
			</div>
		</div>
		<div class="absolute inset-0 top-[4rem] bg-white p-4 rounded-b-3xl desktop:rounded-b-2xl rounded-t-lg mb-2 mr-2 ml-2">
			<div
				class="popup-body overflow-y-auto h-full pb-3 desktop:pl-2 pr-4 scrollbar-custom text-placeholderGrayText"
			>
				<TCContents {type} />
			</div>
		</div>
	</div>
</div>

<style>
	.scrollbar-custom::-webkit-scrollbar {
		width: 8px;
	}

	.scrollbar-custom::-webkit-scrollbar-track {
		background: transparent;
	}

	.scrollbar-custom::-webkit-scrollbar-thumb {
		background-color: #fabd22;
		border-radius: 10px;
	}

	.scrollbar-custom::-webkit-scrollbar-thumb:hover {
		background-color: #cea32d;
	}

	.scrollbar-custom::-webkit-scrollbar-thumb:active {
		background-color: #a98d36;
	}
</style>
