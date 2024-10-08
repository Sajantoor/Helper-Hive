<script lang="ts">
	import Text from '$lib/components/text/Text.svelte';
	import FileUpload from '$lib/components/input/Upload.svelte';
	import DateInput from '$lib/components/input/DateInput.svelte';
	import LocationInput from '$lib/components/input/LocationInput.svelte';
	import NumberInput from '$lib/components/input/NumberInput.svelte';
	import TagSelect from '$lib/components/input/TagSelect.svelte';
	import TextInput from '$lib/components/input/TextInput.svelte';
	import TimeInput from '$lib/components/input/TimeInput.svelte';
	import Location from '$lib/components/eventPage/Location.svelte';

	import FileDocumentOutline from 'svelte-material-icons/FileDocumentOutline.svelte';
	import CloseCircle from 'svelte-material-icons/CloseCircle.svelte';
	import Circle from 'svelte-material-icons/Circle.svelte';
	import CalendarMonth from 'svelte-material-icons/CalendarMonthOutline.svelte';
	import MapMarkerOutline from 'svelte-material-icons/MapMarkerOutline.svelte';
	import ClockOutline from 'svelte-material-icons/ClockTimeFourOutline.svelte';
	import { PUBLIC_SERVER_HOST } from '$env/static/public';
	import { goto, invalidateAll } from '$app/navigation';
	import SmallText from '$lib/components/text/SmallText.svelte';
	import { createBase64Image, uploadFile } from '$lib/utils/uploadFiles';
	import HostInfo from './HostInfo.svelte';
	import { profileStore } from '$lib/stores/profileStore';
	import type { OrganizationEventData } from '$common/types/eventResponse';
	import BackButton from '../BackButton.svelte';
	import type { EventFormData } from '$common/types/FormData';
	import { onMount } from 'svelte';
	import { tags } from '$lib/utils/tags';

	let organizationInfo: OrganizationEventData;

	if ($profileStore) {
		organizationInfo = {
			_id: $profileStore.id,
			name: $profileStore.name,
			avatar: $profileStore.avatar
		};
	}

	export let formData: EventFormData = {
		name: undefined,
		description: undefined,
		preShift: undefined,
		startDate: null,
		endDate: null,
		startTime: undefined,
		endTime: undefined,
		tagValues: [],
		shiftOpenings: undefined,
		location: undefined,
		image: undefined,
		files: [],
		uploadedFiles: []
	};

	export let isEditing = false;

	let imageBase64: string | null = formData.imageUrl || null;

	interface Validity {
		name: boolean;
		description: boolean;
		preShift: boolean;
		startDate: boolean;
		endDate: boolean;
		startTime: boolean;
		endTime: boolean;
		tagValues: boolean;
		shiftOpenings: boolean;
		location: boolean;
		image: boolean;
		files: boolean;
	}

	let isValid: Validity = {
		name: false,
		description: false,
		preShift: false,
		startDate: false,
		endDate: false,
		startTime: false,
		endTime: false,
		tagValues: true, // default to true
		shiftOpenings: false,
		location: false,
		image: imageBase64 !== null || false,
		files: true // default to true
	};

	let fileLimit = 3;
	let formValid = false;
	let touched = false;
	let startDateError = 'Invalid start date';
	let endDateError = 'Invalid end date';
	let startTimeError = 'Invalid start time';
	let endTimeError = 'Invalid end time';
	let errorMessage = '';

	$: if (formData || isValid) {
		handleValidityChange();
	}

	function handleValidityChange() {
		formValid = isFormValid();
	}

	function validateDates() {
		if (!formData.startDate || !formData.endDate) {
			return;
		}

		if (formData.startDate > formData.endDate) {
			startDateError = 'Start date must be before end date';
			endDateError = 'End date must be after start date';
			isValid.startDate = false;
			isValid.endDate = false;
		} else {
			startDateError = 'Invalid start date';
			endDateError = 'Invalid end date';
			isValid.startDate = true;
			isValid.endDate = true;
		}
	}

	function validateTimes() {
		if (!formData.startTime || !formData.endTime || !formData.startDate || !formData.endDate) {
			return;
		}

		// change them to dates
		const startTime = getDateFromTimes(formData.startDate, formData.startTime);
		const endTime = getDateFromTimes(formData.endDate, formData.endTime);

		if (startTime > endTime) {
			startTimeError = 'Start time must be before end time';
			endTimeError = 'End time must be after start time';
			isValid.startTime = false;
			isValid.endTime = false;
		} else {
			isValid.startTime = true;
			isValid.endTime = true;
		}
	}

	function isFormValid(): boolean {
		validateDates();
		validateTimes();
		return Object.values(isValid).every(Boolean);
	}

	function getDateFromTimes(date: Date, time: string): Date {
		time = time.toUpperCase();
		let [hours, minutes] = time.split(':').map((str) => parseInt(str, 10));
		if (hours === 12) hours = 0;
		if (time.includes('PM')) hours += 12;

		const newDate = new Date(date);
		newDate.setHours(hours, minutes);
		return newDate;
	}

	const handleSubmit = async () => {
		if (!formValid) {
			touched = true;
			return;
		}

		errorMessage = '';

		// only upload image if it has changed
		if (!formData.imageUrl) {
			formData.imageUrl = await uploadFile(formData.image!);
		}

		// only reupload files if they have changed
		if (
			(formData.files.length > 0 && !formData.uploadedFiles) ||
			(formData.uploadedFiles && formData.uploadedFiles.length !== formData.files.length)
		) {
			formData.uploadedFiles = await Promise.all(
				formData.files.map(async (file) => {
					return {
						name: file.name,
						url: await uploadFile(file)
					};
				})
			);
		}

		const body = {
			name: formData.name,
			date: {
				startDay: formData.startDate,
				endDay: formData.endDate,
				startTime: getDateFromTimes(formData.startDate!, formData.startTime!),
				endTime: getDateFromTimes(formData.endDate!, formData.endTime!)
			},
			registration: {
				totalSpots: formData.shiftOpenings
			},
			details: {
				description: formData.description,
				preShiftInfo: formData.preShift,
				tags: formData.tagValues,
				location: formData.location,
				photo: formData.imageUrl,
				files: formData.uploadedFiles
			}
		};

		if (isEditing) {
			handleEditEvent(body);
		} else {
			handleCreateEvent(body);
		}
	};

	const handleCreateEvent = async (body: any) => {
		const response = await fetch(`${PUBLIC_SERVER_HOST}/api/events`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(body)
		});

		if (response.ok) {
			const data = await response.json();
			goto(`/app/events/${data._id}`);
		} else {
			const data = await response.json();
			errorMessage = data.message;
		}
	};

	const handleEditEvent = async (body: any) => {
		const response = await fetch(`${PUBLIC_SERVER_HOST}/api/events/${formData.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(body)
		});

		if (response.ok) {
			const data = await response.json();
			// reloads the event page
			await invalidateAll();
			goto(`/app/events/${data._id}`);
		} else {
			const data = await response.json();
			errorMessage = data.message;
		}
	};

	const handleDeleteEvent = async () => {
		errorMessage = '';

		const response = await fetch(`${PUBLIC_SERVER_HOST}/api/events/${formData.id}`, {
			method: 'DELETE',
			credentials: 'include'
		});

		if (response.ok) {
			await invalidateAll();
			goto('/app/');
		} else {
			const data = await response.json();
			errorMessage = data.message;
		}
	};

	const removeImage = (): void => {
		formData.image = undefined;
		formData.imageUrl = undefined;
		imageBase64 = '';
		isValid.image = false;
	};

	const removeFile = (index: number) => {
		formData.files.splice(index, 1);
		formData.files = formData.files;

		if (formData.uploadedFiles && formData.uploadedFiles.length > index) {
			formData.uploadedFiles.splice(index, 1);
			formData.uploadedFiles = formData.uploadedFiles;
		}
	};

	const handleFileUpload = (event: CustomEvent<{ files: File[] }>) => {
		const uploadedFiles = event.detail.files;
		if (uploadedFiles.length === 0) {
			return;
		}

		if (formData.files.length > fileLimit) {
			formData.files = [...uploadedFiles.slice(0, fileLimit)];
			return;
		}

		if (uploadedFiles.length + formData.files.length > fileLimit) {
			formData.files = [
				...formData.files,
				...uploadedFiles.slice(0, fileLimit - formData.files.length)
			];
			return;
		}

		formData.files = [...formData.files, ...uploadedFiles];
	};

	const handleImageUpload = async (event: CustomEvent<{ files: File[] }>) => {
		const uploadedFiles = event.detail.files;
		if (uploadedFiles.length === 0) {
			return;
		}

		imageBase64 = await createBase64Image(uploadedFiles[0]);
		formData.image = uploadedFiles[0];
		isValid.image = true;
	};

	onMount(() => {
		if (formData) {
			handleValidityChange();
		}
	});
</script>

<BackButton />

<form on:submit|preventDefault={handleSubmit} class="space-y-6" novalidate>
	<div
		class="mx-auto mt-8 mb-8 w-[90vw] desktop:w-[70vw] flex flex-col grid-cols-1 mdlg:grid mdlg:grid-cols-[44%_56%] mdlg:gap-[2rem_5rem] mdlg:justify-center"
	>
		<!-- Image Upload -->
		<div
			class="relative mb-5 desktop:mb-8 mdlg:mb-0 aspect-[7/5] flex flex-col mdlg:aspect-[5/4] w-[94%] desktop:w-full max-desktop:ml-auto order-1 mdlg:order-1 mdlg:col-span-1"
		>
			{#if !imageBase64}
				<FileUpload
					type="image"
					placeholder="Upload a picture..."
					bind:valid={isValid.image}
					on:file={handleImageUpload}
					errorMessage="Event picture is required"
					{touched}
				/>
			{:else}
				<div
					class="absolute inset-0 bg-cover bg-center rounded-3xl"
					style="background-image: url({imageBase64});"
				>
					<div class="absolute top-0 right-0 cursor-pointer" on:click={removeImage}>
						<Circle class="text-white rounded-full p-1" size={30} />
					</div>
					<div class="absolute top-0 right-0 cursor-pointer" on:click={removeImage}>
						<CloseCircle class="text-primaryYellow rounded-full p-1" size={30} />
					</div>
				</div>
			{/if}
		</div>

		<!-- File upload, host, location display -->
		<div class="order-3 mdlg:order-3 mdlg:col-span-1">
			<div class="h-20 mb-8 w-full">
				<FileUpload
					type="file"
					placeholder="Click or drag and drop to upload a file..."
					disabled={formData.files.length === fileLimit}
					on:file={handleFileUpload}
					errorMessage={`A max of ${fileLimit} files can be uploaded`}
					{touched}
				/>
			</div>
			{#each formData.files as file, index}
				<div
					class="inline-block mr-3 mb-2 relative
					{formData.files.length === fileLimit ? 'mt-4' : ''}"
				>
					<div class="flex flex-col items-center">
						<FileDocumentOutline class="file text-primaryYellow" size={30} />
						<SmallText class=" text-gray-400 mt-1 break-all text-center">
							<a
								target="_blank"
								href={URL.createObjectURL(file)}
								class="text-blue-500 underline break-all block max-w-[80px]"
							>
								{file.name.length > 25
									? `${file.name.slice(0, 9)}...${file.name.slice(-9)}`
									: file.name}
							</a>
						</SmallText>
					</div>
					<div
						class="absolute top-[-12px] right-0 cursor-pointer"
						on:click|preventDefault={() => removeFile(index)}
					>
						<CloseCircle class="text-red-500" size={24} />
					</div>
				</div>
			{/each}

			<div>
				<HostInfo organization={organizationInfo} />
			</div>
			<div class="w-full max-w-1/2">
				<Location location={formData.location?.formattedAddress || ''} />
			</div>
		</div>

		<!-- Input fields -->
		<div class="flex flex-col gap-2 order-2 mdlg:order-2 mdlg:col-span-1 mdlg:row-span-2">
			<TextInput
				placeholder="Add a title to your event..."
				errorMessage="Event name is required"
				bind:value={formData.name}
				bind:valid={isValid.name}
				{touched}
			/>

			<div class="grid grid-cols-[auto_1fr_1fr] gap-4">
				<CalendarMonth class="text-primaryYellow" size={40} />
				<DateInput
					placeholder="Select start date..."
					bind:value={formData.startDate}
					bind:valid={isValid.startDate}
					minDate="today"
					errorMessage={startDateError}
					{touched}
				/>
				<DateInput
					placeholder="Select end date..."
					bind:value={formData.endDate}
					bind:valid={isValid.endDate}
					minDate="today"
					errorMessage={endDateError}
					{touched}
				/>
			</div>

			<div class="grid grid-cols-[auto_1fr_1fr] gap-4">
				<ClockOutline class="text-primaryYellow" size={40} />
				<TimeInput
					placeholder="Select start time..."
					bind:value={formData.startTime}
					bind:valid={isValid.startTime}
					errorMessage={startTimeError}
					{touched}
				/>

				<TimeInput
					placeholder="Select end time..."
					bind:value={formData.endTime}
					bind:valid={isValid.endTime}
					errorMessage={endTimeError}
					{touched}
				/>
			</div>

			<div class="grid grid-cols-[auto_1fr] gap-4">
				<MapMarkerOutline class="text-primaryYellow" size={40} />
				<LocationInput
					placeholder="Select a location..."
					bind:value={formData.location}
					bind:valid={isValid.location}
					{touched}
				/>
			</div>

			<Text class="font-bold">Tag Select</Text>
			<TagSelect placeholder="Add tag" bind:tagValues={formData.tagValues} options={tags} />

			<NumberInput
				label="Number of Shift Openings"
				bind:value={formData.shiftOpenings}
				bind:valid={isValid.shiftOpenings}
				{touched}
			/>

			<TextInput
				label="About your event"
				placeholder="Include additional details about the event..."
				bind:value={formData.description}
				bind:valid={isValid.description}
				rows={6}
				{touched}
			/>

			<TextInput
				label="Important Pre-Shift Information"
				placeholder="Include details about any requirements, expectations, or information to know prior to arrival for shift..."
				bind:value={formData.preShift}
				bind:valid={isValid.preShift}
				rows={6}
				{touched}
			/>
		</div>
	</div>

	<div class="pt-4 pb-10 w-full">
		{#if errorMessage}
			<Text class="text-red-500 text-center">{errorMessage}</Text>
		{/if}

		{#if !isEditing}
			<button
				type="submit"
				class={`mdlg:w-1/5 w-4/6 m-auto block ${formValid ? 'bg-primaryYellow text-black' : 'bg-tagYellow text-altTextBrown'} py-2 px-4 mt-[2.5rem] rounded-lg mx-auto text`}
			>
				<Text>Publish Event</Text>
			</button>
		{:else}
			<button
				type="submit"
				class={`mdlg:w-1/5 w-4/6 m-auto block ${formValid ? 'bg-primaryYellow text-black' : 'bg-tagYellow text-altTextBrown'} py-2 px-4 mt-[2.5rem] rounded-lg mx-auto text`}
			>
				<Text>Save Changes</Text>
			</button>

			<button
				on:click={() => {
					if (confirm('Are you sure you want to delete this event?')) {
						handleDeleteEvent();
					}
				}}
				type="button"
				class="mdlg:w-1/5 w-4/6 m-auto block bg-red-500 text-white py-2 px-4 mt-4 rounded-lg mx-auto text"
			>
				<Text>Delete Event</Text>
			</button>
		{/if}
	</div>
</form>
