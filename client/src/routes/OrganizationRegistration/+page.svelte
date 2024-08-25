<script>
  import Text from '$lib/Components/Text/Text.svelte';
  import InputField from '$lib/Components/InputField.svelte';
  import { onMount } from 'svelte';
  import MdVisibilityOff from 'svelte-material-icons/EyeOutline.svelte';
  import MdVisibility from 'svelte-material-icons/EyeOffOutline.svelte';

  let organizationName = '';
  let email = '';
  let phoneNumber = '';
  let firstName = '';
  let lastName = '';
  let password = '';
  let reenterPassword = '';
  let termsAgreed = false;
  let liabilityAgreed = false;
  let passwordsMatch = true;
  let formValid = false;
  let showPassword = false;
  let showReenterPassword = false;
  let invalidFields = [];

  const validateForm = () => {
    formValid = Boolean(organizationName) && Boolean(email) && Boolean(phoneNumber) && Boolean(firstName) && Boolean(lastName) && Boolean(password) && Boolean(reenterPassword) && termsAgreed && liabilityAgreed && passwordsMatch && validateEmail(email) && validatePhoneNumber(phoneNumber);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^[0-9\s\+\(\)\-]+$/;
    return re.test(phoneNumber);
  };

  const handleSubmit = () => {
    highlightInvalidFields();
	
	if (formValid) {
      console.log({
        organizationName,
        email,
        phoneNumber,
        firstName,
        lastName,
        password,
        reenterPassword,
        termsAgreed,
        liabilityAgreed
      });
    }
  };

  const handlePasswordChange = () => {
    passwordsMatch = password === reenterPassword;
    validateForm();
  };

  const handleInputChange = () => {
    validateForm();
  };

  const highlightInvalidFields = () => {
    invalidFields = [];
    if (!organizationName) invalidFields.push('organizationName');
    if (!validateEmail(email)) invalidFields.push('email');
    if (!validatePhoneNumber(phoneNumber)) invalidFields.push('phoneNumber');
    if (!firstName) invalidFields.push('firstName');
    if (!lastName) invalidFields.push('lastName');
    if (!password) invalidFields.push('password');
    if (!reenterPassword) invalidFields.push('reenterPassword');
    if (!termsAgreed) invalidFields.push('termsAgreed');
    if (!liabilityAgreed) invalidFields.push('liabilityAgreed');
    if (!passwordsMatch) invalidFields.push('reenterPassword');

    if (invalidFields.length > 0) {
      const firstInvalidField = document.getElementById(invalidFields[0]);
      firstInvalidField.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhoneNumberInput = (event) => {
    const input = event.target.value;
    const formattedInput = input.replace(/[^0-9\s\+\(\)\-]/g, '');
    phoneNumber = formattedInput;
  };

  onMount(() => {
    validateForm();
  });
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

  .toggle-password {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(20%);
    border: none;
    background: none;
    cursor: pointer;
  }
</style>

<div class="flex flex-col lg:flex-row justify-center items-center min-h-screen bg-gray-100">
  <div class="container mx-auto px-4 flex flex-col lg:flex-row lg:ml-2">
    <!-- Left section -->
    <div class="flex flex-col justify-start lg:items-start items-center w-full lg:w-3/10 lg:max-w-[30%] lg:text-left text-center">
      <Text class="section lg:w-1/2 mb-4 whitespace-normal pt-10">Organization Registration</Text>
      <Text class="smallText">
        Wrong Place? <a href="/VolunteerRegistration" class="text-blue-500 underline">Click here</a> for Volunteer Registration
      </Text>
    </div>

    <!-- Middle section -->
    <div class="w-full lg:w-4/10 bg-white p-8 rounded-lg">
      <Text class="section mb-2 text-center">Join us today!</Text>
      <Text class="heading mb-6 text-center">Sign Up Now to Become a Member</Text>

      <form on:submit|preventDefault={handleSubmit} class="space-y-4" novalidate>
        <!-- Org and Personnel Section -->
		<Text class="heading mb-2">Organization Information</Text>
        
        <InputField
          id="organizationName"
          label="Name of Organization"
          placeholder="Name of Organization"
          bind:value={organizationName}
          invalid={invalidFields.includes('organizationName')}
          on:input={handleInputChange}
        />

        <InputField
          id="email"
          label="Email Address"
          placeholder="Email Address"
          bind:value={email}
          invalid={invalidFields.includes('email')}
          on:input={handleInputChange}
        />

        <InputField
          id="phoneNumber"
          label="Phone Number"
          placeholder="Phone Number"
          type="phone"
          bind:value={phoneNumber}
          invalid={invalidFields.includes('phoneNumber')}
          on:input={handlePhoneNumberInput}
        />

        <div style="margin-top: 2.5rem;">
		  <Text class="heading mb-2">Contact Personnel</Text>
		</div>
        <div class="grid grid-cols-2 gap-4">
          <InputField
            id="firstName"
            label="First Name"
            placeholder="First Name"
            bind:value={firstName}
            invalid={invalidFields.includes('firstName')}
            on:input={handleInputChange}
          />
          <InputField
            id="lastName"
            label="Last Name"
            placeholder="Last Name"
            bind:value={lastName}
            invalid={invalidFields.includes('lastName')}
            on:input={handleInputChange}
          />
        </div>

        <!-- Create Password Section -->
		<div style="margin-top: 2rem;">
		  <Text class="heading mb-2">Create Password</Text>
		</div>
		<div class="relative">
		  <InputField
			id="password"
			label="Password"
			placeholder="Password"
			type="password"
			bind:value={password}
			invalid={invalidFields.includes('password')}
			onPasswordChange={handlePasswordChange}
			showPassword={showPassword}
		  />
		  <InputField
			id="reenterPassword"
			label="Re-enter Password"
			placeholder="Re-enter Password"
			type="password"
			bind:value={reenterPassword}
			invalid={invalidFields.includes('reenterPassword')}
			onPasswordChange={handlePasswordChange}
			showPassword={showReenterPassword}
		  />
		  {#if !passwordsMatch}
			<Text class="smallText text-red-500 absolute -bottom-8">Passwords do not match</Text>
		  {/if}
		</div>

        <!-- Terms and Conditions Section -->
        <div style="margin-top: 3rem;">
          <Text class="heading mb-2">Agree to Terms and Conditions</Text>
        </div>
        <div class="flex items-center mb-4 justify-center">
          <input type="checkbox" id="termsAgreed" bind:checked={termsAgreed} class="mr-5 transform scale-[2.0] accent-primaryYellow {invalidFields.includes('termsAgreed') ? 'accent-primaryYellow' : ''}" on:change={handleInputChange} />
          <label for="termsAgreed" class="lg:w-3/4 {invalidFields.includes('termsAgreed') ? 'text-altTextBrown font-bold' : ''}">
            <Text>Click here to indicate that you have read and agree to Helper Hive's <a href="#" class="text-blue-500 underline">Terms & Conditions</a></Text>
          </label>
        </div>
        <div class="flex items-center mb-4 justify-center">
          <input type="checkbox" id="liabilityAgreed" bind:checked={liabilityAgreed} class="mr-5 transform scale-[2.0] accent-primaryYellow {invalidFields.includes('liabilityAgreed') ? 'accent-primaryYellow' : ''}" on:change={handleInputChange} />
          <label for="liabilityAgreed" class="lg:w-3/4 {invalidFields.includes('liabilityAgreed') ? 'text-altTextBrown font-bold' : ''}">
            <Text>Click here to indicate that you have read and agree to Helper Hive's <a href="#" class="text-blue-500 underline">Liability Agreement</a></Text>
          </label>
        </div>

        <button type="submit" class={`w-full ${formValid ? 'bg-primaryYellow' : 'bg-tagYellow'} text-white font-bold py-2 px-4 rounded-lg mx-auto text`} style="margin-top: 2.5rem;" on:click={handleSubmit}>
          <Text>Sign Up</Text>
        </button>
      </form>

      <Text class="smallText mt-4 text-center">Already a member? <a href="/login" class="text-blue-500 underline">Login here</a></Text>
    </div>

    <!-- Right section (empty) -->
    <div class="w-full lg:w-3/10 lg:max-w-[30%]"></div>
  </div>
</div>
