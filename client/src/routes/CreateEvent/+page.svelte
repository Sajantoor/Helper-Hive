<script lang="ts">
	import Text from '$lib/Components/Text/Text.svelte';
	import InputField from '$lib/Components/InputField.svelte';
	import FileUpload from '$lib/Components/Upload.svelte';
	import TagSelect from '$lib/Components/TagSelect.svelte';
	import Location from '$lib/Components/EventPage/Location.svelte';
	
	import FileDocumentOutline from 'svelte-material-icons/FileDocumentOutline.svelte';
	import CloseCircle from 'svelte-material-icons/CloseCircle.svelte';
	import Circle from 'svelte-material-icons/Circle.svelte';
	import Instagram from 'svelte-material-icons/Instagram.svelte';
	import CalendarMonth from 'svelte-material-icons/CalendarMonthOutline.svelte';
	import MapMarkerOutline from 'svelte-material-icons/MapMarkerOutline.svelte';
	import ClockOutline from 'svelte-material-icons/ClockTimeFourOutline.svelte';
	
	import { onMount } from 'svelte';

	// Grab these from database:
	let options: string[] = ['Childcare', 'Education', 'Political', 'Medical', 'Science', 'Museum', 'Food', 'Support', 'Cleaning', 'Athletics', 'Family'];
	let hostImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s"
	let hostName="The City of Vancouver"

	let title: string = '';
	
	let startDate: string = '';
	let endDate: string = '';
	let startTime: string = '';
	let endTime: string = '';
	
	let tagValues: string[] = [];
	let tagInput: TagSelect;
	
	let shiftopenings: string = '';
	let aboutevent: string = '';
	let preshift: string = '';
	
	let fileLimit: number = 5;
	let tagLimit: number = 99;

	let imageFile: File | null = null;
	let otherFiles: File[] = [];
	let imageUrl: string = '';
	let otherFileUrls: string[] = [];
	
	let location: string = '';
	let location2 = 'Vancouver, BC 1455 Quebec St';
	let locationAddress: string = '';
	
	let formValid: boolean = false;
	let invalidFields: string[] = [];

	const validateForm = (): void => {
		formValid = Boolean(title) && Boolean(startDate) && Boolean(endDate) && Boolean(startTime) && Boolean(endTime) && tagValues.length > 0
			&& Boolean(aboutevent)  && Boolean(shiftopenings) && Boolean(location) && Boolean(locationAddress) && Boolean(imageFile)
			&& verifyDateRange(startDate, endDate, startTime, endTime); // && otherFiles.length > 0  && Boolean(preshift);
	};

	const handleInputChange = (): void => {
		validateForm();
	};

	const handleSubmit = (): void => {
		saveLocation();
		validateForm();
		highlightInvalidFields();
		if (formValid) {
			console.log({
				title,
				startDate,
				endDate,
				startTime,
				endTime,
				tagValues,
				aboutevent,
				shiftopenings,
				preshift,
				location,
				locationAddress,
				imageFile,
				otherFiles
			});
			alert("Submitted form successfully");
		}
	};

	const highlightInvalidFields = (): void => {
		invalidFields = [];
		if (!title) invalidFields.push('title');
		if (!startDate) invalidFields.push('startDate');
		if (!endDate) invalidFields.push('endDate');
		if (!startTime) invalidFields.push('startTime');
		if (!endTime) invalidFields.push('endTime');
		if (tagValues.length === 0) invalidFields.push('tagInput');
		if (tagValues.length === 0) tagInput.toggleInputField('clickOnly');
		if (!aboutevent) invalidFields.push('aboutevent');
		// if (!preshift) invalidFields.push('preshift');
		if (!shiftopenings) invalidFields.push('shiftopenings');
		if (!location) invalidFields.push('locationInput');
		if (location == "Address not found") invalidFields.push('locationInput');
		if (!locationAddress) invalidFields.push('locationInput');
		if (!imageFile) invalidFields.push('imageUpload');
		// if (otherFiles.length === 0) invalidFields.push('fileUpload');
		if (!verifyDateRange(startDate, endDate, startTime, endTime)) invalidFields.push('endDate', 'endTime');

		if (invalidFields.length > 0) {
			const firstInvalidField = document.getElementById(invalidFields[0]);
			firstInvalidField.scrollIntoView({ behavior: 'smooth' });
		}
	};
	
	async function saveLocation() {
		if (location != ''){
			location2 = location;
			location = locationAddress;
			handleInputChange();
		}
	}
	
	// Date functions
	
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	const minDate = `${('0' + tomorrow.getDate()).slice(-2)}/${('0' + (tomorrow.getMonth() + 1)).slice(-2)}/${tomorrow.getFullYear()}`;

	const parseTimeToNumber = (timeString) => {
		const [time, modifier] = timeString.split(' ');
		let [hours, minutes] = time.split(':');
		hours = parseInt(hours, 10);
		minutes = parseInt(minutes, 10);
		if (modifier === 'PM' && hours !== 12) {
			hours += 12;
		}
		if (modifier === 'AM' && hours === 12) {
			hours = 0;
		}
		return hours * 100 + minutes;
	};
	
	function parseDate(dateStr) {
		if (typeof dateStr === 'string') {
			const dateParts = dateStr.split('/');
			if (dateParts.length === 3 && dateParts[2].length === 4) {
				const day = parseInt(dateParts[0], 10);
				const month = parseInt(dateParts[1], 10) - 1;
				const year = parseInt(dateParts[2], 10);
				return new Date(year, month, day);
			}
		}
		return new Date(dateStr);
	}

	const verifyDateRange = (startDate, endDate, startTime, endTime) => {
		if (Boolean(startDate) && Boolean(endDate) && Boolean(startTime) && Boolean(endTime)) {
			const startDateObj = parseDate(startDate);
			const endDateObj = parseDate(endDate);
			const startTimeNum = parseTimeToNumber(startTime);
			const endTimeNum = parseTimeToNumber(endTime);
			
			if (endDateObj > startDateObj) {
				return true;
			} else if (endDateObj.getTime() === startDateObj.getTime()) {
				return endTimeNum > startTimeNum;
			} else {
				return false;
			}
		}
		return true;
	};

	// File functions

	const handleFileDrop = (event: any, type: string): void => {
		const files = event.detail.files.detail;
		if (files.acceptedFiles.length > 0) {
			if (type === 'image' && !imageFile) {
				imageFile = files.acceptedFiles[0];
				imageUrl = URL.createObjectURL(imageFile);
				const index = invalidFields.indexOf('imageUpload');
				if (index > -1) {
					invalidFields.splice(index, 1);
				}
			} else {
				if (otherFiles.length == fileLimit) {
					removeOtherFile(4);
				}
				const newFiles = files.acceptedFiles.slice(0, fileLimit - otherFiles.length);
				otherFiles = [...otherFiles, ...newFiles];
				otherFileUrls = otherFiles.map(file => URL.createObjectURL(file));
				if (otherFiles.length > fileLimit) {
					otherFiles = otherFiles.slice(0, fileLimit);
					otherFileUrls = otherFileUrls.slice(0, fileLimit);
				}
				const index = invalidFields.indexOf('fileUpload');
				if (index > -1) {
					invalidFields.splice(index, 1);
				}
			}
		}
		invalidFields = invalidFields;
		handleInputChange();
	};

	const removeImage = (): void => {
		imageFile = null;
		imageUrl = '';
		handleInputChange();
	};

	const removeOtherFile = (index: number): void => {
		otherFiles.splice(index, 1);
		otherFileUrls.splice(index, 1);
		otherFiles = otherFiles;
		otherFileUrls = otherFileUrls;
		handleInputChange();
	};
</script>

<a href="/" class="absolute left-8 text-xl transform scale-x-[-1] hover:text-primaryYellow">➜</a>
<form on:submit|preventDefault={handleSubmit} class="space-y-6" novalidate>
<div class="mx-auto mt-8 mb-8 w-[70vw] flex flex-col lg:grid lg:grid-cols-[44%_56%] lg:grid-rows-auto lg:gap-[2rem_5rem] lg:justify-center">	
	<div class="order-2 lg:order-1">
		<div class="relative aspect-[5/4] mb-8 w-full">
			<FileUpload
				id="imageUpload"
				type="image"
				placeholder="Upload a picture..."
				invalid={invalidFields.includes('imageUpload')}
				on:drop={(event) => handleFileDrop(event, 'image')}
			/>
			{#if imageUrl}
				<div class="absolute inset-0 bg-cover bg-center rounded-3xl" style="background-image: url({imageUrl});">
					<div class="absolute top-0 right-0 cursor-pointer" on:click={removeImage}>
						<Circle class="text-white rounded-full p-1" size={30} />
					</div>
					<div class="absolute top-0 right-0 cursor-pointer" on:click={removeImage}>
						<CloseCircle class="text-primaryYellow rounded-full p-1" size={30} />
					</div>
				</div>
			{/if}
		</div>

		<div class="h-20 mb-8 w-full">
			<FileUpload
				id="fileUpload"
				type="file"
				placeholder="Click or drag and drop to upload a file..."
				invalid={invalidFields.includes('fileUpload')}
				on:drop={(event) => handleFileDrop(event, 'file')}
			/>
		</div>
		{#each otherFiles as file, index}
			<div class="inline-block mr-3 relative">
				<div class="flex flex-col items-center">
					<FileDocumentOutline class="file text-primaryYellow" size={30} />
					<Text class="smallText text-gray-400 mt-1 break-all text-center">
						<a href={otherFileUrls[index]} target="_blank" class="text-blue-500 underline break-all block max-w-[80px]">
							{file.name.length > 25 ? `${file.name.slice(0, 9)}...${file.name.slice(-9)}` : file.name}
						</a>
					</Text>
				</div>
				<div class="absolute top-[-12px] right-0 cursor-pointer" on:click={() => removeOtherFile(index)}>
					<CloseCircle class="text-red-500" size={24} />
				</div>
			</div>
		{/each}
	
		<div>
			<Text class="heading mt-8 mb-4">Hosted by</Text>
			<div class="flex justify-between items-center mb-8">
				<div class="flex items-center">
					<img class="rounded-full h-14 w-14" src={hostImage} alt={hostName} />
					<Text class="ml-8">{hostName}</Text>
				</div>
				<Instagram class="text-primaryYellow" size={40} />
			</div>
		</div>
		<div class="w-full max-w-[450px]"><Location bind:location={location2} bind:locationAddress={locationAddress}/></div>
	</div>
	
	<div class="flex flex-col gap-4 order-1 lg:order-2 ">
		<InputField
			id="title"
			placeholder="Add a title to your event..."
			classPlaceholder = "italic"
			classDiv = ""
			bind:value={title}
			invalid={invalidFields.includes('title')}
			onInput={handleInputChange}
		/>
		
		<div class="grid grid-cols-[auto_1fr_1fr] gap-4">
			<CalendarMonth class="text-primaryYellow" size={40} />
			<InputField
				placeholder="Select start date..."
				classPlaceholder = "italic"
				classDiv = ""
				type="date"
				bind:value={startDate}
				invalid={invalidFields.includes('startDate')}
				onInput={handleInputChange}
				minDate={minDate}
			/>
			<InputField
				id="endDate"
				placeholder="Select end date..."
				classPlaceholder = "italic"
				classDiv = ""
				type="date"
				bind:value={endDate}
				invalid={invalidFields.includes('endDate')}
				onInput={handleInputChange}
				minDate={minDate}
			/>
		</div>
		
		<div class="grid grid-cols-[auto_1fr_1fr] gap-4">
			<ClockOutline class="text-primaryYellow" size={40} />
			<InputField
				id="startTime"
				placeholder="Select start time..."
				classPlaceholder = "italic"
				classDiv = ""
				type="time"
				bind:value={startTime}
				invalid={invalidFields.includes('startTime')}
				onInput={handleInputChange}
			/>

			<InputField
				id="endTime"
				placeholder="Select end time..."
				classPlaceholder = "italic"
				classDiv = ""
				type="time"
				bind:value={endTime}
				invalid={invalidFields.includes('endTime')}
				onInput={handleInputChange}
			/>	
		</div>
		
		<div class="grid grid-cols-[auto_1fr] gap-4">
			<MapMarkerOutline class="text-primaryYellow" size={40} />
			<InputField
				id="locationInput"
				type="location"
				placeholder="Select a location..."
				classPlaceholder = "italic"
				bind:value={location}
				invalid={invalidFields.includes('locationInput')}
				onInput={handleInputChange}
				onBlur={saveLocation}
			/>
		</div>
		
		<Text class="heading">Tag Select</Text>
		<TagSelect
			id="tagInput"
			placeholder="Add tag"
			bind:tagValues={tagValues}
			bind:this={tagInput}
			invalid={invalidFields.includes('tagInput')}
			onInput={handleInputChange}
			{options}
			{tagLimit}
		/>
		
		<InputField
			id="shiftopenings"
			label="Number of Shift Openings"
			type="number"
			classLabel = "font-bold"
			classDiv = ""
			classField = "mt-1 p-2 w-1/6"
			bind:value={shiftopenings}
			invalid={invalidFields.includes('shiftopenings')}
			onInput={handleInputChange}
		/>
		
		<InputField
			id="aboutevent"
			label="About your event"
			placeholder="Include additional details about the event..."
			classLabel = "heading mt-2"
			classPlaceholder = "italic rounded-lg p-3"
			bind:value={aboutevent}
			invalid={invalidFields.includes('aboutevent')}
			onInput={handleInputChange}
			rows=6
		/>

		<InputField
			id="preshift"
			label="Important Pre-Shift Information"
			placeholder="Include details about any requirements, expectations, or information to know prior to arrival for shift..."
			classLabel = "heading"
			classPlaceholder = "italic rounded-lg p-3"
			bind:value={preshift}
			invalid={invalidFields.includes('preshift')}
			onInput={handleInputChange}
			rows=6
		/>
	</div>
</div>
<div class="pt-28 pb-10 w-full flex justify-center">
	<button
		type="submit"
		class={`w-1/5 ${formValid ? 'bg-primaryYellow text-black' : 'bg-tagYellow text-altTextBrown'} py-2 px-4 rounded-lg mx-auto text`}
		style="margin-top: 2.5rem;"
	>
		<Text>Publish Event</Text>
	</button>
</div>
</form>