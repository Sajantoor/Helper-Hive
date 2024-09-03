<script lang="ts">
	import Text from '$lib/Components/Text/Text.svelte';
	import FileUpload from '$lib/Components/Upload.svelte';
	import Popup from '$lib/Components/TCPopup.svelte';
	
	import DateInput from '$lib/Components/Input/DateInput.svelte';
	import TagSelect from '$lib/Components/Input/TagSelect.svelte';
	import LocationInput from '$lib/Components/Input/LocationInput.svelte';
	import NumberInput from '$lib/Components/Input/NumberInput.svelte';
	import PhoneInput from '$lib/Components/Input/PhoneInput.svelte';
	import TextInput from '$lib/Components/Input/TextInput.svelte';
	import TimeInput from '$lib/Components/Input/TimeInput.svelte';
	
	import FileDocumentOutline from 'svelte-material-icons/FileDocumentOutline.svelte';
	import CloseCircle from 'svelte-material-icons/CloseCircle.svelte';
	import Circle from 'svelte-material-icons/Circle.svelte';
	import HostInfo from '$lib/Components/EventPage/HostInfo.svelte';
	import EventDetails from '$lib/Components/EventPage/EventDetails.svelte';
	import Location from '$lib/Components/EventPage/Location.svelte';

	let name: string = '';
	let phoneNumber: string = '';
	let customLabel: string = '';
	let customPlaceholder: string = '';
	let textArea: string = '';
	let numberInput: string = '';
	
	let tagValues: string[] = [];
	let options: string[] = ['Apple', 'Pineapple', 'Banana', 'Orange', 'Pear', 'Mango'];
	let tagInput: TagSelect;
	
	let startDate: string = '';
	let endDate: string = '';
	let startTime: string = '';
	let endTime: string = '';
	
	let termsAgreed: boolean = false;
	
	let formValid: boolean = false;
	let phoneValid: boolean = false;
	let invalidFields: string[] = [];
	
	let showTermsPopup: boolean = false;
	let showLiabilityPopup: boolean = false;

	let fileLimit: number = 5;
	let tagLimit: number = 99;

	let imageFile: File | null = null;
	let otherFiles: File[] = [];
	let imageUrl: string = '';
	let otherFileUrls: string[] = [];
	
	let location: string = '';
	let location2 = 'Vancouver, BC 1455 Quebec St';
	let locationAddress: string = '';

	const validateForm = (): void => {
		formValid = Boolean(name) && phoneValid && Boolean(numberInput) && tagValues.length > 0 && Boolean(textArea)  && Boolean(location) 
		&& Boolean(locationAddress) && Boolean(customLabel) && Boolean(startDate) && Boolean(endDate) && Boolean(startTime) && Boolean(endTime)
		&& Boolean(imageFile) && otherFiles.length > 0 && verifyDateRange(startDate, endDate, startTime, endTime) && termsAgreed;
	};

	const handleSubmit = (): void => {
		saveLocation();
		validateForm();
		highlightInvalidFields();
		if (formValid) {
			console.log({
				name,
				phoneNumber,
				customLabel,
				textArea,
				numberInput,
				tagValues,
				startDate,
				endDate,
				startTime,
				endTime,
				location,
				locationAddress,
				termsAgreed,
				imageFile,
				otherFiles
			});
			alert("Submitted form successfully");
		}
	};

	const handleInputChange = (): void => {
		validateForm();
	};

	const highlightInvalidFields = (): void => {
		invalidFields = [];
		if (!name) invalidFields.push('name');
		if (!phoneValid) invalidFields.push('phoneNumber');
		if (!numberInput) invalidFields.push('numberInput');
		if (tagValues.length === 0) invalidFields.push('tagInput');
		if (tagValues.length === 0) tagInput.toggleInputField('clickOnly');
		if (!textArea) invalidFields.push('textArea');
		if (!customLabel) invalidFields.push('customLabel');
		if (!location) invalidFields.push('locationInput');
		if (!locationAddress) invalidFields.push('locationinPut');
		if (!startDate) invalidFields.push('startDate');
		if (!endDate) invalidFields.push('endDate');
		if (!startTime) invalidFields.push('startTime');
		if (!endTime) invalidFields.push('endTime');
		if (!termsAgreed) invalidFields.push('termsAgreed');
		if (!imageFile) invalidFields.push('imageUpload');
		if (otherFiles.length === 0) invalidFields.push('fileUpload');
		if (!verifyDateRange(startDate, endDate, startTime, endTime)) invalidFields.push('endDate', 'endTime');

		if (invalidFields.length > 0) {
			const firstInvalidField = document.getElementById(invalidFields[0]);
			firstInvalidField.scrollIntoView({ behavior: 'smooth' });
		}
	};
	
	async function saveLocation() {
		location2 = location;
		location = locationAddress;
		handleInputChange();
	}
	
	// Date functions

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

<div class="flex flex-col justify-center items-center min-h-screen">
	<div class="container mx-auto px-4 flex flex-col justify-center max-w-screen-lg space-y-6">
		<div class="w-full bg-white p-8 rounded-lg space-y-6">
			<Text class="section mb-2 text-center">Simple Test Form</Text>

			<form on:submit|preventDefault={handleSubmit} class="space-y-6" novalidate>
				
				<TextInput
					id="name"
					label="Name"
					placeholder="Name"
					bind:value={name}
					invalid={invalidFields.includes('name')}
					onInput={handleInputChange}
				/>

				<PhoneInput
					id="phoneNumber"
					label="Phone Number"
					placeholder="Phone Number"
					bind:value={phoneNumber}
					bind:valid={phoneValid}
					invalid={invalidFields.includes('phoneNumber')}
					onInput={handleInputChange}
				/>

				<TextInput
					id="customLabel"
					label="Custom Label"
					placeholder="Custom Placeholder"
					bind:value={customLabel}
					invalid={invalidFields.includes('customLabel')}
					onInput={handleInputChange}
					classLabel="heading"
					classText="placeholder:italic"
				/>

				<TextInput
					id="textArea"
					label="Text Area"
					placeholder="Enter text here"
					bind:value={textArea}
					invalid={invalidFields.includes('textArea')}
					onInput={handleInputChange}
					rows=5
				/>

				<NumberInput
					id="numberInput"
					label="Number Input"
					placeholder="Enter a number"
					bind:value={numberInput}
					invalid={invalidFields.includes('numberInput')}
					onInput={handleInputChange}
				/>
				
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

				<DateInput
					id="startDate"
					label="Start Date"
					placeholder="DD/MM/YYYY"
					bind:value={startDate}
					invalid={invalidFields.includes('startDate')}
					onInput={handleInputChange}
				/>

				<DateInput
					id="endDate"
					label="End Date"
					placeholder="DD/MM/YYYY"
					bind:value={endDate}
					invalid={invalidFields.includes('endDate')}
					onInput={handleInputChange}
				/>

				<TimeInput
					id="startTime"
					label="Start Time"
					placeholder="9:00 AM"
					bind:value={startTime}
					invalid={invalidFields.includes('startTime')}
					onInput={handleInputChange}
				/>

				<TimeInput
					id="endTime"
					label="End Time"
					placeholder="5:00 PM"
					bind:value={endTime}
					invalid={invalidFields.includes('endTime')}
					onInput={handleInputChange}
				/>
				
				<LocationInput
					id="locationInput"
					label="Location"
					placeholder="Location"
					bind:value={location}
					invalid={invalidFields.includes('location')}
					onInput={handleInputChange}
					onBlur={saveLocation}
				/>
				<div class="w-[450px]"><Location bind:location={location2} bind:locationAddress={locationAddress}/></div>

				<div class="relative h-48 w-full">
					<FileUpload
						id="imageUpload"
						type="image"
						placeholder="Upload a picture..."
						invalid={invalidFields.includes('imageUpload')}
						on:drop={(event) => handleFileDrop(event, 'image')}
					/>
					{#if imageUrl}
						<div class="absolute inset-0 bg-cover bg-center rounded-lg" style="background-image: url({imageUrl});">
							<div class="absolute top-0 right-0 cursor-pointer" on:click={removeImage}>
								<Circle class="text-white rounded-full p-1" size={30} />
							</div>
							<div class="absolute top-0 right-0 cursor-pointer" on:click={removeImage}>
								<CloseCircle class="text-primaryYellow rounded-full p-1" size={30} />
							</div>
						</div>
					{/if}
				</div>

				<div class="h-24 w-full">
					<FileUpload
						id="fileUpload"
						type="file"
						placeholder="Click or drag and drop to upload a file..."
						invalid={invalidFields.includes('fileUpload')}
						on:drop={(event) => handleFileDrop(event, 'file')}
					/>
				</div>
				{#each otherFiles as file, index}
					<div class="inline-block mr-5 relative">
						<div class="flex flex-col items-center">
							<FileDocumentOutline class="file text-primaryYellow" size={30} />
							<Text class="smallText text-gray-400 mt-1 break-all text-center">
								<a href={otherFileUrls[index]} target="_blank" class="text-blue-500 underline break-all block" style="max-width: 80px;">
									{file.name.length > 25 ? `${file.name.slice(0, 9)}...${file.name.slice(-9)}` : file.name}
								</a>
							</Text>
						</div>
						<div class="absolute top-[-12px] right-0 cursor-pointer" on:click={() => removeOtherFile(index)}>
							<CloseCircle class="text-red-500" size={24} />
						</div>
					</div>
				{/each}

				<div class="flex items-center mb-4 lg:justify-center">
					<input type="checkbox" id="termsAgreed" bind:checked={termsAgreed} class="lg:ml-0 ml-2 mr-5 transform scale-[2.0] accent-primaryYellow {invalidFields.includes('termsAgreed') ? 'accent-primaryYellow' : ''}" on:change={handleInputChange} />
					<label for="termsAgreed" class="lg:w-3/4 {invalidFields.includes('termsAgreed') ? 'text-altTextBrown font-bold' : ''}">
						<Text>Click here to indicate that you have read and agree to Helper Hive's <a href="#" tabindex="-1" class="text-blue-500 underline" on:click|preventDefault={() => openPopup('termsPopup')}>Terms & Conditions</a></Text>
					</label>
				</div>

				<button
					type="submit"
					class={`w-full ${formValid ? 'bg-primaryYellow text-black' : 'bg-tagYellow text-altTextBrown'} py-2 px-4 mt-[2.5rem] rounded-lg mx-auto text`}
				>
					<Text>Submit</Text>
				</button>
			</form>
		</div>
	</div>
</div>

<Popup id="termsPopup" title="Terms & Conditions" type="terms" />
<Popup id="liabilityPopup" title="Organization Liability Information" type="liabilityOrg" />
