<script>
  import Text from '$lib/Components/Text/Text.svelte';
  import InputField from '$lib/Components/InputField.svelte';

  let name = '';
  let phoneNumber = '';
  let dob = '';
  let termsAgreed = false;
  let formValid = false;
  let phoneValid = false;
  let invalidFields = [];

  const validateForm = () => {
    formValid = Boolean(name) && phoneValid && Boolean(dob) && termsAgreed;
  };

  const handleSubmit = () => {
    highlightInvalidFields();
    if (formValid) {
      console.log({
        name,
        phoneNumber,
        dob,
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
    if (!termsAgreed) invalidFields.push('termsAgreed');

    if (invalidFields.length > 0) {
      const firstInvalidField = document.getElementById(invalidFields[0]);
      firstInvalidField.scrollIntoView({ behavior: 'smooth' });
    }
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
        />
		
		<div class="flex items-center mb-4 lg:justify-center">
          <input type="checkbox" id="termsAgreed" bind:checked={termsAgreed} class="lg:ml-0 ml-2 mr-5 transform scale-[2.0] accent-primaryYellow {invalidFields.includes('termsAgreed') ? 'accent-primaryYellow' : ''}" on:change={handleInputChange} />
          <label for="termsAgreed" class="lg:w-3/4 {invalidFields.includes('termsAgreed') ? 'text-altTextBrown font-bold' : ''}">
            <Text>Click here to indicate that you have read and agree to Helper Hive's <a href="#" tabindex="-1" class="text-blue-500 underline">Terms & Conditions</a></Text>
          </label>
        </div>

        <button type="submit" class={`w-full ${formValid ? 'bg-primaryYellow' : 'bg-tagYellow'} text-white font-bold py-2 px-4 rounded-lg mx-auto text`}>
          <Text>Submit</Text>
        </button>
      </form>
    </div>
  </div>
</div>
