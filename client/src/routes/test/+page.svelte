<script lang="ts">
	import Text from '$lib/Components/Text/Text.svelte';
	import InputField from '$lib/Components/InputField.svelte';
	import FileUpload from '$lib/Components/Upload.svelte';
	import Popup from '$lib/Components/TCPopup.svelte';
	import FileDocumentOutline from 'svelte-material-icons/FileDocumentOutline.svelte';
	import CloseCircle from 'svelte-material-icons/CloseCircle.svelte';
	import Circle from 'svelte-material-icons/Circle.svelte';

	let name: string = '';
	let phoneNumber: string = '';
	let customLabel: string = '';
	let customPlaceholder: string = '';
	let textArea: string = '';
	let numberInput: string = '';
	let tagValTemp: string = '';
	let tagValues: string[] = [];
	let options: string[] = ['Apple', 'Pineapple', 'Banana', 'Orange', 'Pear', 'Mango', '+'];
	
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
	let showInputField: boolean = false;

	let fileLimit: number = 5;

	let imageFile: File | null = null;
	let otherFiles: File[] = [];
	let imageUrl: string = '';
	let otherFileUrls: string[] = [];

	const validateForm = (): void => {
		formValid = Boolean(name) && phoneValid && Boolean(numberInput) && tagValues.length > 0 && Boolean(textArea) 
		&& Boolean(customLabel) && Boolean(startDate) && Boolean(endDate) && Boolean(startTime) && Boolean(endTime)
		&& Boolean(imageFile) && otherFiles.length > 0 && verifyDateRange(startDate, endDate, startTime, endTime) && termsAgreed;
	};

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

	const verifyDateRange = (startDate, endDate, startTime, endTime) => {
		if (Boolean(startDate) && Boolean(endDate) && Boolean(startTime) && Boolean(endTime)) {
			const startDateObj = new Date(startDate);
			const endDateObj = new Date(endDate);
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

	const handleSubmit = (): void => {
		highlightInvalidFields();
		if (formValid) {
			console.log({
				name,
				phoneNumber,
				customLabel,
				customPlaceholder,
				textArea,
				numberInput,
				tagValues,
				startDate,
				endDate,
				startTime,
				endTime,
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
		if (tagValues.length === 0){
			invalidFields.push('tagInputDiv');
			invalidFields.push('tagInput');
			toggleInputField();
		}
		if (!textArea) invalidFields.push('textArea');
		if (!customLabel) invalidFields.push('customLabel');
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

	const handleTagSelect = (event: any): void => {
		if (tagValTemp && !tagValues.includes(tagValTemp)) {
			tagValues = [...tagValues, tagValTemp];
			options = options.filter(option => option !== tagValTemp);
			tagValTemp = '';
			toggleInputField();
			handleInputChange();
		}
	};

	const toggleInputField = (): void => {
		showInputField = !showInputField;
	};

	const removeTag = (tag: string): void => {
		tagValues = tagValues.filter(t => t !== tag);
		options = [...options, tag];
		handleInputChange();
	};
</script>

<div class="flex flex-col justify-center items-center min-h-screen">
	<div class="container mx-auto px-4 flex flex-col justify-center max-w-screen-lg space-y-6">
		<div class="w-full bg-white p-8 rounded-lg space-y-6">
			<Text class="section mb-2 text-center">Simple Test Form</Text>

			<form on:submit|preventDefault={handleSubmit} class="space-y-6" novalidate>
				
				<InputField
					id="name"
					label="Name"
					placeholder="Name"
					bind:value={name}
					invalid={invalidFields.includes('name')}
					onInput={handleInputChange}
				/>

				<InputField
					id="phoneNumber"
					label="Phone Number"
					placeholder="Phone Number"
					type="phone"
					bind:value={phoneNumber}
					bind:valid={phoneValid}
					invalid={invalidFields.includes('phoneNumber')}
					onInput={handleInputChange}
				/>

				<InputField
					id="customLabel"
					label="Custom Label"
					placeholder="Custom Placeholder"
					bind:value={customLabel}
					invalid={invalidFields.includes('customLabel')}
					onInput={handleInputChange}
					classLabel="heading"
					classPlaceholder="italic"
				/>

				<InputField
					id="textArea"
					label="Text Area"
					placeholder="Enter text here"
					bind:value={textArea}
					invalid={invalidFields.includes('textArea')}
					onInput={handleInputChange}
					rows=5
				/>

				<InputField
					id="numberInput"
					label="Number Input"
					placeholder="Enter a number"
					type="number"
					bind:value={numberInput}
					invalid={invalidFields.includes('numberInput')}
					onInput={handleInputChange}
				/>
				
				<div class="flex flex-wrap items-center {tagValues.length > 0 ? 'gap-6' : ''}">
					<div id="tagInputDiv" class="tag-list flex flex-wrap gap-6">
						{#each tagValues as tagVal}
							<div class="tag bg-tagYellow px-4 py-2 min-w-[6rem] rounded-full inline-block whitespace-nowrap text-center relative">
								<Text>{tagVal}</Text>
								<div class="absolute top-[-12px] right-0 cursor-pointer" on:click|preventDefault={() => removeTag(tagVal)}>
									<CloseCircle class="text-red-500" size={24} />
								</div>
							</div>
						{/each}
					</div>
					{#if showInputField || invalidFields.includes('tagInput')}
						<div class="flex items-center">
							<div class="w-2/3">
								<InputField
									id="tagInput"
									placeholder="Add tag"
									type="dropdown"
									bind:value={tagValTemp}
									invalid={invalidFields.includes('tagInput')}
									onInput={handleTagSelect}
									options={options}
								/>
							</div>
							<button on:click|preventDefault={toggleInputField} class="ml-2 text-blue-500 {invalidFields.includes('tagInput') && tagValues.length < 1 ? 'hidden' : ''}">←</button>
						</div>
					{:else}
						<button on:click|preventDefault={toggleInputField} class="tag mt-1 mb-4 bg-tagYellow w-10 h-10 rounded-full flex items-center justify-center text-center">
							+
						</button>
					{/if}
				</div>

				<InputField
					id="startDate"
					label="Start Date"
					placeholder="DD/MM/YYYY"
					type="date"
					bind:value={startDate}
					invalid={invalidFields.includes('startDate')}
					onInput={handleInputChange}
				/>

				<InputField
					id="endDate"
					label="End Date"
					placeholder="DD/MM/YYYY"
					type="date"
					bind:value={endDate}
					invalid={invalidFields.includes('endDate')}
					onInput={handleInputChange}
				/>

				<InputField
					id="startTime"
					label="Start Time"
					placeholder="9:00 AM"
					type="time"
					bind:value={startTime}
					invalid={invalidFields.includes('startTime')}
					onInput={handleInputChange}
				/>

				<InputField
					id="endTime"
					label="End Time"
					placeholder="5:00 PM"
					type="time"
					bind:value={endTime}
					invalid={invalidFields.includes('endTime')}
					onInput={handleInputChange}
				/>

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

				<div class="flex items-center mb-4 lg:justify-center">
					<Text>Click here to read the <a href="#" tabindex="-1" class="text-blue-500 underline" on:click|preventDefault={() => openPopup('liabilityPopup')}>Liability Information</a></Text>
				</div>

				<button
					type="submit"
					class="w-full bg-primaryYellow text-black py-2 px-4 rounded-lg mx-auto text"
				>
					<Text>Submit</Text>
				</button>
			</form>
		</div>
	</div>
</div>

<Popup id="termsPopup" title="Terms & Conditions" type="terms" />
<Popup id="liabilityPopup" title="Organization Liability Information" type="liabilityOrg" />
