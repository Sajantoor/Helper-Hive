<script lang="ts">
	import CreateEventPage from '$lib/components/eventPage/CreateEventPage.svelte';
	import Text from '$lib/components/text/Text.svelte';
	import type { LayoutData } from '../$types';
	import { profileStore } from '$lib/stores/profileStore';
	import type { EventFormData, UploadedFiles } from '$common/types/FormData';
	import BackButton from '$lib/components/BackButton.svelte';

	export let data: LayoutData;
	let authorized = false;

	if ($profileStore && $profileStore.id === data.organization._id) {
		authorized = true;
	}

	function convertDatesToTimes(date: Date): string {
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let amOrPm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		let minutesStr = minutes < 10 ? '0' + minutes : minutes;
		let strTime = hours + ':' + minutesStr + ' ' + amOrPm;
		return strTime;
	}

	let uploadedFiles: UploadedFiles[] = data.details.files.map((file) => {
		return {
			name: file.name,
			url: file.url
		};
	});

	let formData: EventFormData = {
		name: data.name,
		description: data.details.description,
		preShift: data.details.preShiftInfo,
		startDate: data.date.startDay,
		endDate: data.date.endDay,
		startTime: convertDatesToTimes(data.date.startTime),
		endTime: convertDatesToTimes(data.date.endTime),
		tagValues: data.details.tags,
		shiftOpenings: data.registration.totalSpots,
		location: data.details.location,
		image: undefined,
		imageUrl: data.details.photo,
		files: [],
		uploadedFiles: uploadedFiles,
		id: data._id
	};
</script>

{#if authorized}
	<CreateEventPage isEditing={true} {formData} />
{:else}
	<BackButton />
	<div class="block p-20">
		<Text class="text-center">You are not authorized to edit this event...</Text>
	</div>
{/if}
