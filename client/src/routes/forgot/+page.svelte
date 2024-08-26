<script>
  import Text from '$lib/Components/Text/Text.svelte';
  import InputField from '$lib/Components/InputField.svelte';
  import LeftArrow from 'svelte-material-icons/ChevronLeft.svelte';
  import RightArrow from 'svelte-material-icons/ChevronRight.svelte';

  let email = '';
  let formValid = false;
  let invalidFields = [];
  let submitted = false;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    formValid = Boolean(email) && validateEmail(email);
  };

  const handleSubmit = () => {
    highlightInvalidFields();
    if (formValid) {
	  // Submission logic here
	  console.log("Sent email to " + email);
      submitted = true;
    }
  };

  const handleInputChange = () => {
    validateForm();
  };

  const highlightInvalidFields = () => {
    invalidFields = [];
    if (!validateEmail(email)) invalidFields.push('email');

    if (invalidFields.length > 0) {
      const firstInvalidField = document.getElementById(invalidFields[0]);
      firstInvalidField.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetForm = () => {
    submitted = false;
  };
</script>

<div class="flex flex-col md:flex-row justify-center items-center min-h-screen">
  <div class="container mx-auto px-4 flex flex-col md:flex-row justify-center max-w-screen-lg space-y-6">
    <!-- Middle section -->
    <div class="w-full md:w-3/5 md:max-w-[60%] bg-white p-8 rounded-lg space-y-6 relative">
      {#if !submitted}
        <Text class="section text-center">Forgot your password?</Text>
        <Text class="text-center w-full mx-auto">Enter your email address below, and we will send you a link to reset your password. Please check your inbox for further instructions.</Text>

        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <InputField
            id="email"
            label="Email Address"
            placeholder="Email Address"
            bind:value={email}
            invalid={invalidFields.includes('email')}
			onInput={handleInputChange}
          />

          <button type="submit" class={`w-full ${formValid ? 'bg-primaryYellow' : 'bg-tagYellow'} text-white font-bold py-2 px-4 rounded-lg mx-auto text`}>
            <Text>Submit</Text>
          </button>
        </form>
      {:else}
        <Text class="section text-center">Check your email</Text>
        <Text class="text-center w-full mx-auto">We have sent an email to <strong>{email}</strong> with instructions to reset your password. Please follow the instructions in the email to proceed. If you can't find it, the email may be in your spam.</Text>
        <div class="flex justify-center space-x-4">
          <button type="button" class="bg-primaryYellow text-white font-bold py-2 px-4 rounded-lg flex items-center" on:click={resetForm}>
            <LeftArrow class="h-6 w-6 mr-2" /> Try again
          </button>
          <a href="/login" class="bg-primaryYellow text-white font-bold py-2 px-4 rounded-lg flex items-center">
            Back to Login
          </a>
        </div>
      {/if}
    </div>
  </div>
</div>
