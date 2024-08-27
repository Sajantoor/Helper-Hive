<script>
  import Text from '$lib/Components/Text/Text.svelte';
  import InputField from '$lib/Components/InputField.svelte';
  import FileDropzone from '$lib/Components/Upload.svelte';
  import Popup from '$lib/Components/TCPopup.svelte';

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

  const validateForm = () => {
    formValid = Boolean(name) && phoneValid && Boolean(dob) && Boolean(numberInput) && Boolean(textArea) && Boolean(customLabel) && Boolean(dateRange) && termsAgreed;
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
        termsAgreed
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

    if (invalidFields.length > 0) {
      const firstInvalidField = document.getElementById(invalidFields[0]);
      firstInvalidField.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openPopup = (popupId) => {
    const popup = document.getElementById(popupId);
    popup.classList.remove('hidden');
  };

  const closePopup = (popupId) => {
    const popup = document.getElementById(popupId);
    popup.classList.add('hidden');
  };

  const handleFileDrop = (event) => {
    console.log(event.detail.files);
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

        <!-- New File Dropzones -->
        <FileDropzone
          id="imageDropzone"
          type="image"
          placeholder="Drop images here or click to upload"
          on:drop={handleFileDrop}
        />

        <FileDropzone
          id="fileDropzone"
          type="file"
          placeholder="Drop files here or click to upload"
          on:drop={handleFileDrop}
        />

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
