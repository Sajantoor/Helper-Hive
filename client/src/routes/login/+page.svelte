<script>
  import Text from '$lib/Components/Text/Text.svelte';
  import InputField from '$lib/Components/InputField.svelte';

  let email = '';
  let password = '';
  let passwordError = false;
  let invalidFields = [];

  const handleSubmit = () => {
    invalidFields = [];
    if (!email) invalidFields.push('email');
    if (!password) invalidFields.push('password');

    if (invalidFields.length > 0) {
      const firstInvalidField = document.getElementById(invalidFields[0]);
      firstInvalidField.scrollIntoView({ behavior: 'smooth' });
    }
	else{
	  // Submission logic goes here
	  if (password === 'incorrect') {
        passwordError = true;
      } else {
        passwordError = false;
        console.log({
          email,
          password
        });
		alert("Login successfully submitted");
      }
	}
  };
</script>

<div class="flex flex-col mdlg:flex-row justify-center items-center min-h-screen">
  <div class="container mx-auto px-4 flex flex-col mdlg:flex-row justify-center max-w-screen-lg space-y-6">
    <!-- Middle section -->
    <div class="w-full mdlg:w-3/5 mdlg:max-w-[60%] bg-white p-8 rounded-lg space-y-6 relative">
	  <Text class="section text-center">Welcome back!</Text>
	  {#if passwordError}
		<Text class="smallText text-red-500 text-center absolute top-[4rem] left-1/2 transform -translate-x-1/2">Password does not match</Text>
	  {/if}

      <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <InputField
          id="email"
          label="Email Address"
          placeholder="Email Address"
          bind:value={email}
          invalid={invalidFields.includes('email')}
        />

        <InputField
          id="password"
          label="Password"
          placeholder="Password"
          type="password"
          bind:value={password}
          invalid={invalidFields.includes('password')}
        />
        <Text class="smallText text-left mt-3">
          <a href="/forgot" class="text-blue-500 underline">Forgot password?</a>
        </Text>

        <button type="submit" class="w-full bg-primaryYellow text-white font-bold py-2 px-4 rounded-lg mx-auto text">
          <Text>Login</Text>
        </button>
      </form>

      <Text class="mt-4 text-center">Not a member? <a href="/VolunteerRegistration" class="text-blue-500 underline">Register here</a></Text>
    </div>
  </div>
</div>
