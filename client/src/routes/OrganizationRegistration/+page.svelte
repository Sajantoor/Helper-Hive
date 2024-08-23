<script>
  import Text from '$lib/Components/Text/Text.svelte';

  let organizationName = '';
  let email = '';
  let phoneNumber = '';
  let firstName = '';
  let lastName = '';
  let password = '';
  let reenterPassword = '';
  let termsAgreed = false;
  let liabilityAgreed = false;

  const handleSubmit = () => {
    // handle form submission logic here
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
  };
</script>

<div class="flex flex-col lg:flex-row justify-center items-center min-h-screen bg-gray-100">
  <div class="container mx-auto px-4 flex flex-col lg:flex-row">
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

      <form on:submit|preventDefault={handleSubmit} class="space-y-4">
        <Text class="heading mb-2">Organization Information</Text>
        <div>
          <label for="organizationName" class="block font-semibold">
            <Text class="block font-semibold">Name of Organization</Text>
          </label>
          <input type="text" id="organizationName" bind:value={organizationName} placeholder="Name of Organization" class="mt-1 p-2 w-full bg-placeholderGray border-none rounded text" />
        </div>

        <div>
          <label for="email" class="block font-semibold">
            <Text class="block font-semibold">Email Address</Text>
          </label>
          <input type="email" id="email" bind:value={email} placeholder="Email Address" class="mt-1 p-2 w-full bg-placeholderGray border-none rounded text" />
        </div>

        <div>
          <label for="phoneNumber" class="block font-semibold">
            <Text class="block font-semibold">Phone Number</Text>
          </label>
          <input type="text" id="phoneNumber" bind:value={phoneNumber} placeholder="Phone Number" class="mt-1 p-2 w-full bg-placeholderGray border-none rounded text" />
        </div>

        <div style="margin-top: 2.5rem;">
          <Text class="heading mb-2">Contact Personnel</Text>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block font-semibold">
              <Text class="block font-semibold">First Name</Text>
            </label>
            <input type="text" id="firstName" bind:value={firstName} placeholder="First Name" class="mt-1 p-2 w-full bg-placeholderGray border-none rounded text" />
          </div>
          <div>
            <label for="lastName" class="block font-semibold">
              <Text class="block font-semibold">Last Name</Text>
            </label>
            <input type="text" id="lastName" bind:value={lastName} placeholder="Last Name" class="mt-1 p-2 w-full bg-placeholderGray border-none rounded text" />
          </div>
        </div>

        <div style="margin-top: 2.5rem;">
          <Text class="heading mb-2">Create Password</Text>
        </div>
        <div>
          <label for="password" class="block font-semibold">
            <Text class="block font-semibold">Password</Text>
          </label>
          <input type="password" id="password" bind:value={password} placeholder="Password" class="mt-1 p-2 w-full bg-placeholderGray border-none rounded text" />
        </div>

        <div>
          <label for="reenterPassword" class="block font-semibold">
            <Text class="block font-semibold">Re-Enter Password</Text>
          </label>
          <input type="password" id="reenterPassword" bind:value={reenterPassword} placeholder="Re-enter Password" class="mt-1 p-2 w-full bg-placeholderGray border-none rounded text" />
        </div>

        <div style="margin-top: 2.5rem;">
          <Text class="heading mb-2">Agree to Terms and Conditions</Text>
        </div>
        <div class="flex items-center mb-4">
          <input type="checkbox" id="termsAgreed" bind:checked={termsAgreed} class="mr-2 transform scale-150" />
          <label for="termsAgreed">
            <Text>Click here to indicate that you have read and agree to Helper Hive's <a href="#" class="text-blue-500 underline">Terms & Conditions</a></Text>
          </label>
        </div>
        <div class="flex items-center mb-4">
          <input type="checkbox" id="liabilityAgreed" bind:checked={liabilityAgreed} class="mr-2 transform scale-150" />
          <label for="liabilityAgreed">
            <Text>Click here to indicate that you have read and agree to Helper Hive's <a href="#" class="text-blue-500 underline">Liability Agreement</a></Text>
          </label>
        </div>

        <button type="submit" class="w-full bg-primaryYellow text-white font-bold py-2 px-4 rounded-lg mx-auto text" style="margin-top: 2.5rem;">
          <Text>Sign Up</Text>
        </button>
      </form>

      <Text class="smallText mt-4 text-center">Already a member? <a href="/login" class="text-blue-500 underline">Login here</a></Text>
    </div>

    <!-- Right section (empty) -->
    <div class="w-full lg:w-3/10 lg:max-w-[30%]"></div>
  </div>
</div>
