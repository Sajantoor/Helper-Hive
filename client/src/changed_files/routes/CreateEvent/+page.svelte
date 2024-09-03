<script lang="ts">
	import Text from '$lib/Components/Text/Text.svelte';
	import FileUpload from '$lib/Components/Upload.svelte';
	import Location from '$lib/Components/EventPage/Location.svelte';
	import NavBar from '$lib/Components/NavBar.svelte';
	
	import DateInput from '$lib/Components/Input/DateInput.svelte';
	import LocationInput from '$lib/Components/Input/LocationInput.svelte';
	import NumberInput from '$lib/Components/Input/NumberInput.svelte';
	import TagSelect from '$lib/Components/Input/TagSelect.svelte';
	import TextInput from '$lib/Components/Input/TextInput.svelte';
	import TimeInput from '$lib/Components/Input/TimeInput.svelte';

	import FileDocumentOutline from 'svelte-material-icons/FileDocumentOutline.svelte';
	import CloseCircle from 'svelte-material-icons/CloseCircle.svelte';
	import Circle from 'svelte-material-icons/Circle.svelte';
	import Instagram from 'svelte-material-icons/Instagram.svelte';
	import CalendarMonth from 'svelte-material-icons/CalendarMonthOutline.svelte';
	import MapMarkerOutline from 'svelte-material-icons/MapMarkerOutline.svelte';
	import ClockOutline from 'svelte-material-icons/ClockTimeFourOutline.svelte';

	// Grab these from database:
	let options: string[] = [
		'Childcare',
		'Education',
		'Political',
		'Medical',
		'Science',
		'Museum',
		'Food',
		'Support',
		'Cleaning',
		'Athletics',
		'Event Planning',
		'Family'
	];
	let hostImage =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s';
	let hostName = 'The City of Vancouver';
	let hostInstagram = 'https://google.com';

	let title: string = '';
	let titleComp: TextInput;

	let startDate: Date;
	let endDate: Date;
	let startTime: string = '';
	let endTime: string = '';
	let startDateComp: DateInput;
	let endDateComp: DateInput;
	let startTimeComp: TimeInput;
	let endTimeComp: TimeInput;

	let tagValues: string[] = [];
	let tagInput: TagSelect;

	let shiftOpenings: string = '';
	let aboutEvent: string = '';
	let preShift: string = '';
	let shiftOpeningsComp: TextInput;
	let aboutEventComp: TextInput;
	let preShiftComp: TextInput;

	let fileLimit: number = 5;
	let tagLimit: number = 99;

	let imageFile: File | null = null;
	let otherFiles: File[] = [];
	let imageUrl: string = '';
	let otherFileUrls: string[] = [];

	let location: string = '';
	let locationInputComp: LocationInput;
	let location2 = 'Vancouver, BC 1455 Quebec St';
	let locationAddress: string = '';

	let formValid: boolean = false;
	let datesValid: boolean = true;
	let invalidFields: string[] = [];
	let invalidComps: any[] = [];

	const validateForm = (): void => {
		verifyDateRange();
		formValid =
			Boolean(title) &&
			Boolean(startDate) &&
			Boolean(endDate) &&
			Boolean(startTime) &&
			Boolean(endTime) &&
			tagValues.length > 0 &&
			Boolean(aboutEvent) &&
			Boolean(shiftOpenings) &&
			Boolean(location) &&
			Boolean(locationAddress) &&
			Boolean(imageFile) &&
			datesValid; // && otherFiles.length > 0  && Boolean(preShift);
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
				aboutEvent,
				shiftOpenings,
				preShift,
				location,
				locationAddress,
				imageFile,
				otherFiles
			});
			alert('Submitted form successfully');
		}
	};

	const highlightInvalidFields = (): void => {
		invalidFields = [];
		invalidComps = [];
		
		if (!title) invalidFields.push('title');
		if (!startDate) invalidFields.push('startDate');
		if (!endDate) invalidFields.push('endDate');
		if (!startTime) invalidFields.push('startTime');
		if (!endTime) invalidFields.push('endTime');
		if (tagValues.length === 0) invalidFields.push('tagInput');
		if (tagValues.length === 0) tagInput.toggleInputField('click blur');
		if (!aboutEvent) invalidFields.push('aboutEvent');
		// if (!preShift) invalidFields.push('preShift');
		if (!shiftOpenings) invalidFields.push('shiftOpenings');
		if (!location) invalidFields.push('locationInput');
		if (location == 'Address not found') invalidFields.push('locationInput');
		if (!locationAddress) invalidFields.push('locationInput');
		if (!imageFile) invalidFields.push('imageUpload');
		// if (otherFiles.length === 0) invalidFields.push('fileUpload');
		if (!datesValid) invalidFields.push('endDate', 'endTime');
		
		if (!title) invalidComps.push(titleComp);
		if (!startDate) invalidComps.push(startDateComp);
		if (!endDate) invalidComps.push(endDateComp);
		if (!startTime) invalidComps.push(startTimeComp);
		if (!endTime) invalidComps.push(endTimeComp);
		if (tagValues.length === 0) invalidComps.push(tagInput);
		if (!aboutEvent) invalidComps.push(aboutEventComp);
		// if (!preShift) invalidComps.push(preShiftComp);
		if (!shiftOpenings) invalidComps.push(shiftOpeningsComp);
		if (!location) invalidComps.push(locationInputComp);
		if (location == 'Address not found') invalidComps.push(locationInputComp);
		if (!locationAddress) invalidComps.push(locationInputComp);
		if (!datesValid) invalidComps.push(endTimeComp);

		if (invalidFields.length > 0) {
			for (let i = 0; i < invalidComps.length; i++){
				invalidComps[i].updateError();
			}
			startDateComp.updateError();
			startTimeComp.updateError();
			endDateComp.updateError();
			endTimeComp.updateError();
			const firstInvalidField = document.getElementById(invalidFields[0]);
			firstInvalidField.scrollIntoView({ behavior: 'smooth' });
		}
	};

	async function saveLocation() {
		if (location != '' && location != 'Address not found') {
			location2 = location;
			location = locationAddress;
			handleInputChange();
		}
	}

	// Date functions

	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	const minDate = `${('0' + tomorrow.getDate()).slice(-2)}/${('0' + (tomorrow.getMonth() + 1)).slice(-2)}/${tomorrow.getFullYear()}`;

	const parseTimeToNumber = (timeStr: string) => {
		const [time, modifier] = timeStr.split(' ');
		let [hoursStr, minutesStr] = time.split(':');
		let hours = parseInt(hoursStr, 10);
		let minutes = parseInt(minutesStr, 10);

		if (modifier === 'PM' && hours !== 12) {
			hours += 12;
		}
		if (modifier === 'AM' && hours === 12) {
			hours = 0;
		}

		return hours * 100 + minutes;
	};

	function parseDate(dateStr: string | number | Date) {
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

	const verifyDateRange = () => {
		datesValid = true;
		if (Boolean(startDate) && Boolean(endDate) && Boolean(startTime) && Boolean(endTime)) {
			const startDateObj = parseDate(startDate);
			const endDateObj = parseDate(endDate);
			const startTimeNum = parseTimeToNumber(startTime);
			const endTimeNum = parseTimeToNumber(endTime);

			if (endDateObj > startDateObj) {
				datesValid = true;
			} else if (endDateObj.getTime() === startDateObj.getTime()) {
				datesValid = endTimeNum > startTimeNum;
			} else {
				datesValid = false;
			}
		}
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
				otherFileUrls = otherFiles.map((file) => URL.createObjectURL(file));
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

<NavBar />
<a href="/" class="absolute left-8 mt-6 text-xl transform scale-x-[-1] hover:text-primaryYellow">➜</a>
<form on:submit|preventDefault={handleSubmit} class="space-y-6" novalidate>
	<div class="mx-auto mt-8 mb-8 w-[70vw] flex flex-col grid-cols-1 mdlg:grid mdlg:grid-cols-[44%_56%] mdlg:gap-[2rem_5rem] mdlg:justify-center">
		<!-- Image Upload -->
		<div class="relative mb-8 mdlg:mb-0 aspect-[7/5] flex flex-col mdlg:aspect-[5/4] w-full order-1 mdlg:order-1 mdlg:col-span-1">
			<FileUpload
				id="imageUpload"
				type="image"
				placeholder="Upload a picture..."
				invalid={invalidFields.includes('imageUpload')}
				on:drop={(event) => handleFileDrop(event, 'image')}
			/>
			{#if imageUrl}
				<div
					class="absolute inset-0 bg-cover bg-center rounded-3xl"
					style="background-image: url({imageUrl});"
				>
					<div class="absolute top-0 right-0 cursor-pointer" on:click={removeImage}>
						<Circle class="text-white rounded-full p-1" size={30} />
					</div>
					<div class="absolute top-0 right-0 cursor-pointer" on:click={removeImage}>
						<CloseCircle class="text-primaryYellow rounded-full p-1" size={30} />
					</div>
				</div>
			{/if}
			<div>
				{#if invalidFields.includes('imageUpload') && !imageFile}
					<Text class="smallText mt-2 text-altTextBrown">Event picture is required</Text>
				{/if}
			</div>
		</div>
		
		<!-- File upload, host, location display -->
		<div class="order-3 mdlg:order-3 mdlg:col-span-1">
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
							<a
								href={otherFileUrls[index]}
								target="_blank"
								class="text-blue-500 underline break-all block max-w-[80px]"
							>
								{file.name.length > 25
									? `${file.name.slice(0, 9)}...${file.name.slice(-9)}`
									: file.name}
							</a>
						</Text>
					</div>
					<div
						class="absolute top-[-12px] right-0 cursor-pointer"
						on:click|preventDefault={() => removeOtherFile(index)}
					>
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
					{#if hostInstagram}
					<div class="cursor-pointer" on:click|preventDefault={() => window.open(hostInstagram, '_blank')}>
						<Instagram class="text-primaryYellow" size={40} />
					</div>
					{/if}
				</div>
			</div>
			<div class="w-full max-w-[450px]">
				<Location bind:location={location2} bind:locationAddress />
			</div>
		</div>

		<!-- Input fields -->
		<div class="flex flex-col gap-2 order-2 mdlg:order-2 mdlg:col-span-1 mdlg:row-span-2">
			<TextInput
				id="title"
				placeholder="Add a title to your event..."
				classText="placeholder:italic"
				classDiv=""
				bind:value={title}
				bind:this={titleComp}
				invalid={invalidFields.includes('title')}
				errorMsgs={["Title is required"]}
				errorBools={[invalidFields.includes('title')]}
				onInput={handleInputChange}
			/>

			<div class="grid grid-cols-[auto_1fr_1fr] gap-4">
				<CalendarMonth class="text-primaryYellow" size={40} />
				<DateInput
					placeholder="Select start date..."
					classText="placeholder:italic"
					classDiv=""
					bind:value={startDate}
					bind:this={startDateComp}
					invalid={invalidFields.includes('startDate')}
					errorMsgs={["Start date is required"]}
					errorBools={[invalidFields.includes('startDate') && !startDate]}
					onInput={handleInputChange}
					{minDate}
				/>
				<DateInput
					id="endDate"
					placeholder="Select end date..."
					classText="placeholder:italic"
					classDiv=""
					bind:value={endDate}
					bind:this={endDateComp}
					invalid={invalidFields.includes('endDate')}
					errorMsgs={["End date is required"]}
					errorBools={[invalidFields.includes('endDate') && !endDate]}
					onInput={handleInputChange}
					{minDate}
				/>
			</div>

			<div class="grid grid-cols-[auto_1fr_1fr] gap-4">
				<ClockOutline class="text-primaryYellow" size={40} />
				<TimeInput
					id="startTime"
					placeholder="Select start time..."
					classText="placeholder:italic"
					classDiv=""
					bind:value={startTime}
					bind:this={startTimeComp}
					invalid={invalidFields.includes('startTime')}
					errorMsgs={["Start time is required"]}
					errorBools={[invalidFields.includes('startTime') && !startTime]}
					onInput={handleInputChange}
				/>

				<TimeInput
					id="endTime"
					placeholder="Select end time..."
					classText="placeholder:italic"
					classDiv=""
					bind:value={endTime}
					bind:this={endTimeComp}
					invalid={invalidFields.includes('endTime')}
					errorMsgs={["End time is required", "End date and time must be after start"]}
					errorBools={[invalidFields.includes('endTime') && !endTime, invalidFields.includes('endTime') && endTime && !datesValid]}
					onInput={handleInputChange}
				/>
			</div>

			<div class="grid grid-cols-[auto_1fr] gap-4">
				<MapMarkerOutline class="text-primaryYellow" size={40} />
				<LocationInput
					id="locationInput"
					placeholder="Select a location..."
					classText="placeholder:italic"
					bind:value={location}
					bind:this={locationInputComp}
					invalid={invalidFields.includes('locationInput')}
					errorMsgs={["Location is required", "Address could not be found"]}
					errorBools={[invalidFields.includes('locationInput') && !location, invalidFields.includes('locationInput') && location=="Address not found"]}
					onInput={handleInputChange}
					onBlur={saveLocation}
				/>
			</div>

			<Text class="font-bold">Tag Select</Text>
			<TagSelect
				id="tagInput"
				placeholder="Add tag"
				bind:tagValues
				bind:this={tagInput}
				invalid={invalidFields.includes('tagInput')}
				onInput={handleInputChange}
				{options}
				{tagLimit}
			/>
			<div>
				{#if invalidFields.includes('tagInput') && tagValues.length < 1}
					<Text class="smallText mb-3 text-altTextBrown">Atleast one tag is required</Text>
				{/if}
			</div>

			<NumberInput
				id="shiftOpenings"
				label="Number of Shift Openings"
				classLabel="font-bold"
				classDiv=""
				classField="mt-1 p-2 w-1/6"
				bind:value={shiftOpenings}
				bind:this={shiftOpeningsComp}
				invalid={invalidFields.includes('shiftOpenings')}
				errorMsgs={["Shift openings is required"]}
				errorBools={[invalidFields.includes('shiftOpenings')]}
				onInput={handleInputChange}
			/>

			<TextInput
				id="aboutEvent"
				label="About your event"
				placeholder="Include additional details about the event..."
				classLabel="heading mt-2"
				classText="placeholder:italic rounded-lg p-3"
				bind:value={aboutEvent}
				bind:this={aboutEventComp}
				invalid={invalidFields.includes('aboutEvent')}
				keepErrorSpacing={true}
				errorMsgs={["Event information is required"]}
				errorBools={[invalidFields.includes('aboutEvent')]}
				errorStyles={["mt-0 mb-2"]}
				onInput={handleInputChange}
				rows={6}
			/>

			<TextInput
				id="preShift"
				label="Important Pre-Shift Information"
				placeholder="Include details about any requirements, expectations, or information to know prior to arrival for shift..."
				classLabel="heading"
				classText="placeholder:italic rounded-lg p-3"
				bind:value={preShift}
				bind:this={preShiftComp}
				invalid={invalidFields.includes('preShift')}
				onInput={handleInputChange}
				rows={6}
			/>
		</div>
	</div>
	<div class="pt-28 pb-10 w-full flex justify-center">
		<button
			type="submit"
			class={`mdlg:w-1/5 w-4/6 ${formValid ? 'bg-primaryYellow text-black' : 'bg-tagYellow text-altTextBrown'} py-2 px-4 mt-[2.5rem] rounded-lg mx-auto text`}
		>
			<Text>Publish Event</Text>
		</button>
	</div>
</form>
