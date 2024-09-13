<script>
    import { createEventDispatcher } from 'svelte';
    import TextInput from '$lib/Components/Input/TextInput.svelte';
    import PasswordInput from '$lib/Components/Input/PasswordInput.svelte';
  
    const dispatch = createEventDispatcher();
  
    export let closeOverlay;
  
    let name = '';
    let bio = '';
    let currentPassword = '';
    let newPassword = '';
    let confirmPassword = '';
  
    function saveProfile() {
      // Handle the save logic here (e.g., API call)
      console.log('Profile saved:', { name, bio, currentPassword, newPassword, confirmPassword });
      closeOverlay(); // Close the overlay once saved
    }
  
    function close() {
      dispatch('closeOverlay');
    }
  </script>
  
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white w-96 p-6 rounded-lg shadow-lg">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-bold">Edit Profile</h2>
        <button on:click={close} class="text-gray-600 hover:text-gray-900">
          &times;
        </button>
      </div>
  
      <!-- Profile Image & Name -->
      <div class="mb-4">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 rounded-full bg-gray-200 mr-4">
            <!-- Placeholder image -->
            <img src="https://via.placeholder.com/48" alt="User Avatar" class="rounded-full">
          </div>
          <!-- Use TextInput for the name field -->
          <TextInput label="Name" placeholder="Enter your name" bind:value={name} />
        </div>
        <!-- Use TextInput for the bio field -->
        <TextInput
          label="Bio"
          placeholder="Add a short bio - let the community get to know you better!"
          bind:value={bio}
          textarea
        />
      </div>
  
      <!-- Password Section -->
      <h3 class="font-bold mb-2">Update Password</h3>
      <div class="mb-4">
        <!-- Use PasswordInput for the password fields -->
        <PasswordInput
          label="Current Password"
          placeholder="Enter current password"
          bind:value={currentPassword}
        />
        <PasswordInput
          label="New Password"
          placeholder="Enter new password"
          bind:value={newPassword}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm new password"
          bind:value={confirmPassword}
        />
      </div>
  
      <!-- Save Button -->
      <button
        on:click={saveProfile}
        class="bg-yellow-500 text-white font-bold py-2 px-4 rounded w-full hover:bg-yellow-600">
        Save
      </button>
    </div>
  </div>
  