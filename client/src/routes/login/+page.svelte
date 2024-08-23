<script>
  import Text from '$lib/Components/Text/Text.svelte';

  let email = '';
  let password = '';
  
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log({
      email,
      password
    });
  };
</script>

<div class="flex flex-col mdlg:flex-row justify-center items-center min-h-screen bg-gray-100">
  <div class="container mx-auto px-4 flex flex-col mdlg:flex-row justify-center max-w-screen-lg space-y-6">
    <!-- Middle section -->
    <div class="w-full mdlg:w-3/5 mdlg:max-w-[60%] bg-white p-8 rounded-lg space-y-6">
      <Text class="section mb-2 text-center" style="padding-bottom: 5%;">Welcome back!</Text>

      <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <div>
          <label for="email" class="block font-semibold">
            <Text class="block font-semibold">Email Address</Text>
          </label>
          <input type="email" id="email" bind:value={email} placeholder="Email Address" class="mt-1 p-2 w-full bg-placeholderGray border-none rounded text" />
        </div>

        <div>
          <label for="password" class="block font-semibold">
            <Text class="block font-semibold">Password</Text>
          </label>
          <input type="password" id="password" bind:value={password} placeholder="Password" class="mt-1 p-2 w-full bg-placeholderGray border-none rounded text" />
          <Text class="smallText text-left mt-3">
            <a href="/login#" class="text-blue-500 underline">Forgot password?</a>
          </Text>
        </div>

        <button type="submit" class="w-full bg-primaryYellow text-white font-bold py-2 px-4 rounded-lg mx-auto text">
          <Text>Login</Text>
        </button>
      </form>

      <Text class="mt-4 text-center">Not a member? <a href="/VolunteerRegistration" class="text-blue-500 underline">Register here</a></Text>
    </div>
  </div>
</div>
