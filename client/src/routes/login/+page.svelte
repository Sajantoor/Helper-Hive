<script>
  import Text from '$lib/Components/Text/Text.svelte';
  import MdVisibilityOff from 'svelte-material-icons/EyeOutline.svelte';
  import MdVisibility from 'svelte-material-icons/EyeOffOutline.svelte';

  let email = '';
  let password = '';
  let showPassword = false;
  let passwordError = false;

  const handleSubmit = () => {
    if (password === 'incorrect') {
      passwordError = true;
    } else {
      passwordError = false;
      console.log({
        email,
        password
      });
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

  .toggle-password {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-70%);
    border: none;
    background: none;
    cursor: pointer;
  }
</style>

<div class="flex flex-col mdlg:flex-row justify-center items-center min-h-screen bg-gray-100">
  <div class="container mx-auto px-4 flex flex-col mdlg:flex-row justify-center max-w-screen-lg space-y-6">
    <!-- Middle section -->
    <div class="w-full mdlg:w-3/5 mdlg:max-w-[60%] bg-white p-8 rounded-lg space-y-6">
      <Text class="section mb-2 text-center" style="padding-bottom: 5%;">Welcome back!</Text>
      {#if passwordError}
        <Text class="smallText text-red-500 text-center">Password does not match</Text>
      {/if}

      <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <div>
          <label for="email">
            <Text class="smallText">Email Address</Text>
          </label>
          <input type="text" id="email" bind:value={email} placeholder="Email Address" class="mt-1 p-2 w-full bg-placeholderGray border-none rounded text" />
        </div>

        <div class="input-wrapper">
          <label for="password">
            <Text class="smallText">Password</Text>
          </label>
          {#if showPassword}
            <input type="text" id="password" bind:value={password} placeholder="Password" class="mt-1 p-2 w-full bg-placeholderGray border-none rounded text" />
          {:else}
            <input type="password" id="password" bind:value={password} placeholder="Password" class="mt-1 p-2 w-full bg-placeholderGray border-none rounded text" />
          {/if}
          <button type="button" class="toggle-password" tabindex="-1" on:mousedown={() => showPassword = true} on:mouseup={() => showPassword = false} on:mouseleave={() => showPassword = false}>
            {#if showPassword}
              <MdVisibilityOff class="text-altTextGray" />
            {:else}
              <MdVisibility class="text-altTextGray" />
            {/if}
          </button>
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
