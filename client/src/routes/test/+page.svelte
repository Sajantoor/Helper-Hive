<script>
  import Text from '$lib/Components/Text/Text.svelte';
  import InputField from '$lib/Components/InputField.svelte';

  let name = '';
  let phoneNumber = '';
  let dob = '';
  let formValid = false;
  let invalidFields = [];

  const validateForm = () => {
    formValid = Boolean(name) && validatePhoneNumber(phoneNumber) && Boolean(dob);
	console.log(formValid);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^[0-9\s\+\(\)\-]+$/;
    return re.test(phoneNumber);
  };

  const handleSubmit = () => {
    highlightInvalidFields();
	if (formValid) {
      console.log({
        name,
        phoneNumber,
        dob
      });
    }
  };

  const handleInputChange = () => {
    validateForm();
  };

  const highlightInvalidFields = () => {
    invalidFields = [];
    if (!name) invalidFields.push('name');
    if (!validatePhoneNumber(phoneNumber)) invalidFields.push('phoneNumber');
    if (!dob) invalidFields.push('dob');

    if (invalidFields.length > 0) {
      const firstInvalidField = document.getElementById(invalidFields[0]);
      firstInvalidField.scrollIntoView({ behavior: 'smooth' });
    }
  };
</script>

<style>
  .input-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .input-wrapper input {
    padding-right: 30px;
  }
</style>

<div class="flex flex-col justify-center items-center min-h-screen bg-gray-100">
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
          onChange={handleInputChange}
        />

        <InputField
          id="phoneNumber"
          label="Phone Number"
          placeholder="Phone Number"
          type="phone"
          bind:value={phoneNumber}
          invalid={invalidFields.includes('phoneNumber')}
          onInput={handleInputChange}
          onChange={handleInputChange}
        />

        <InputField
          id="dob"
          label="Date of Birth"
          placeholder="DD/MM/YYYY"
          type="date"
          bind:value={dob}
          invalid={invalidFields.includes('dob')}
          onInput={handleInputChange}
          onChange={handleInputChange}
        />

        <button type="submit" class={`w-full ${formValid ? 'bg-primaryYellow' : 'bg-tagYellow'} text-white font-bold py-2 px-4 rounded-lg mx-auto text`} on:click={handleSubmit}>
          <Text>Submit</Text>
        </button>
      </form>
    </div>
  </div>
</div>
