<script>
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
<div class="flex justify-center items-center min-h-screen bg-gray-100">
          <div class="container mx-auto px-4">
            <div class="bg-white p-8 rounded-lg shadow-lg">
              <h2 class="text-2xl font-bold mb-2 text-center">Join us today!</h2>
              <p class="text-xl mb-6 text-center">Sign Up Now to Become a Member</p>

                  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                      <h3 class="text-xl font-semibold mb-2">Organization Information</h3>
                      <div>
                          <label for="organizationName" class="block font-semibold">Name of Organization</label>
                          <input type="text" id="organizationName" bind:value={organizationName} placeholder="Name of Organization" class="mt-1 p-2 w-full border rounded"/>
                      </div>

                      <div>
                          <label for="email" class="block font-semibold">Email Address</label>
                          <input type="email" id="email" bind:value={email} placeholder="Email Address" class="mt-1 p-2 w-full border rounded"/>
                      </div>

                      <div>
                          <label for="phoneNumber" class="block font-semibold">Phone Number</label>
                          <input type="text" id="phoneNumber" bind:value={phoneNumber} placeholder="Phone Number" class="mt-1 p-2 w-full border rounded"/>
                      </div>

                      <h3 class="text-xl font-semibold mb-2">Contact Personnel</h3>
                      <div class="grid grid-cols-2 gap-4">
                          <div>
                              <label for="firstName" class="block font-semibold">First Name</label>
                              <input type="text" id="firstName" bind:value={firstName} placeholder="First Name" class="mt-1 p-2 w-full border rounded"/>
                          </div>
                          <div>
                              <label for="lastName" class="block font-semibold">Last Name</label>
                              <input type="text" id="lastName" bind:value={lastName} placeholder="Last Name" class="mt-1 p-2 w-full border rounded"/>
                          </div>
                      </div>

                      <h3 class="text-xl font-semibold mb-2">Create Password</h3>
                      <div>
                          <label for="password" class="block font-semibold">Password</label>
                          <input type="password" id="password" bind:value={password} placeholder="Password" class="mt-1 p-2 w-full border rounded"/>
                      </div>

                      <div>
                          <label for="reenterPassword" class="block font-semibold">Re-Enter Password</label>
                          <input type="password" id="reenterPassword" bind:value={reenterPassword} placeholder="Re-enter Password" class="mt-1 p-2 w-full border rounded"/>
                      </div>

                      <h3 class="text-xl font-semibold mb-2">Agree to Terms and Conditions</h3>
                      <div class="flex items-center mb-4">
                          <input type="checkbox" id="termsAgreed" bind:checked={termsAgreed} class="mr-2"/>
                          <label for="termsAgreed">Click here to indicate that you have read and agree to Helper Hive's <a href="#" class="text-blue-500 underline">Terms & Conditions</a></label>
                      </div>
                      <div class="flex items-center mb-4">
                          <input type="checkbox" id="liabilityAgreed" bind:checked={liabilityAgreed} class="mr-2"/>
                          <label for="liabilityAgreed">Click here to indicate that you have read and agree to Helper Hive's <a href="#" class="text-blue-500 underline">Liability Agreement</a></label>
                      </div>

                    </form>

                  <p class="mt-4">Already a member? <a href="#" class="text-blue-500 underline">Login Here</a></p>
              </div>
          </div>
      </div>