<script>
  import Text from '$lib/Components/Text/Text.svelte';
  import InputField from '$lib/Components/InputField.svelte';
  import FileUpload from '$lib/Components/Upload.svelte';
  import Popup from '$lib/Components/TCPopup.svelte';
  import FileDocumentOutline from 'svelte-material-icons/FileDocumentOutline.svelte';
  import CloseCircle from 'svelte-material-icons/CloseCircle.svelte';
  import Circle from 'svelte-material-icons/Circle.svelte';

  let name = '';
  let phoneNumber = '';
  let dob = '';
  let customLabel = '';
  let customPlaceholder = '';
  let textArea = '';
  let numberInput = '';
  let dateRange = '';
  let termsAgreed = false;
  let formValid = false;
  let phoneValid = false;
  let invalidFields = [];
  let showTermsPopup = false;
  let showLiabilityPopup = false;
  let imageFile = null;
  let otherFiles = [];
  let imageUrl = '';
  let otherFileUrls = [];
  let fileLimit = 5;

  const validateForm = () => {
    formValid = Boolean(name) && phoneValid && Boolean(dob) && Boolean(numberInput) && Boolean(textArea) && Boolean(customLabel) && Boolean(dateRange) && Boolean(imageFile) && otherFiles.length > 0 && termsAgreed;
  };

  const handleSubmit = () => {
    highlightInvalidFields();
    if (formValid) {
      console.log({
        name,
        phoneNumber,
        dob,
        customLabel,
        customPlaceholder,
        textArea,
        numberInput,
        dateRange,
        termsAgreed,
        imageFile,
        otherFiles
      });
      alert("submitted");
    }
  };

  const handleInputChange = () => {
    validateForm();
  };

  const highlightInvalidFields = () => {
    invalidFields = [];
    if (!name) invalidFields.push('name');
    if (!phoneValid) invalidFields.push('phoneNumber');
    if (!dob) invalidFields.push('dob');
    if (!numberInput) invalidFields.push('numberInput');
    if (!textArea) invalidFields.push('textArea');
    if (!customLabel) invalidFields.push('customLabel');
    if (!dateRange) invalidFields.push('dateRange');
    if (!termsAgreed) invalidFields.push('termsAgreed');
    if (!imageFile) invalidFields.push('imageUpload');
    if (otherFiles.length === 0) invalidFields.push('fileUpload');

    if (invalidFields.length > 0) {
      const firstInvalidField = document.getElementById(invalidFields[0]);
      firstInvalidField.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFileDrop = (event, type) => {
    const files = event.detail.files.detail;
    if (files.acceptedFiles.length > 0) {
      if (type === 'image') {
        imageFile = files.acceptedFiles[0];
        imageUrl = URL.createObjectURL(imageFile);
        const index = invalidFields.indexOf('imageUpload');
        if (index > -1) {
          invalidFields.splice(index, 1);
        }
      } else {
	    if (otherFiles.length == fileLimit){
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

  const removeImage = () => {
    imageFile = null;
    imageUrl = '';
    handleInputChange();
  };

  const removeOtherFile = (index) => {
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
          id="dob"
          label="Date of Birth"
          placeholder="DD/MM/YYYY"
          type="date"
          bind:value={dob}
          invalid={invalidFields.includes('dob')}
          onInput={handleInputChange}
          minDate="01/01/2024"
          maxDate="31/12/2024"
        />

        <InputField
          id="customLabel"
          label="Custom Label"
          placeholder="Custom Placeholder"
          bind:value={customLabel}
          invalid={invalidFields.includes('customLabel')}
          onInput={handleInputChange}
          classLabel="font-bold"
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

        <InputField
          id="dateRange"
          label="Date Range"
          placeholder="Select date range"
          type="dateRange"
          bind:value={dateRange}
          invalid={invalidFields.includes('dateRange')}
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
