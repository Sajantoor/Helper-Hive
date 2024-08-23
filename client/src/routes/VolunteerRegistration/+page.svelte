<script>
    let firstName = '';
    let lastName = '';
    let email = '';
    let phoneNumber = '';
    let dob = '';
    let password = '';
    let reenterPassword = '';
    let termsAgreed = false;
    let liabilityAgreed = false;

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log({
            firstName,
            lastName,
            email,
            phoneNumber,
            dob,
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
            <h1 class="w-1/2 text-4xl font-bold mb-4 whitespace-normal pt-10">Volunteer Registration</h1>
            <p class="block font-semibold">
                Wrong Place? <a href="/OrganizationRegistration" class="text-blue-500 underline">Click here</a> for Organization Registration
            </p>
        </div>

        <!-- Middle section -->
        <div class="w-full lg:w-4/10 bg-white p-8 rounded-lg">
            <h2 class="text-3xl font-bold mb-2 text-center">Join us today!</h2>
            <p class="text-xl mb-6 text-center">Sign Up Now to Become a Member</p>

            <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                <!-- Personal Information Section -->
                <h3 class="text-xl font-semibold mb-2">Personal Information</h3>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="firstName" class="block font-semibold">First Name</label>
                        <input type="text" id="firstName" bind:value={firstName} placeholder="First Name" class="mt-1 p-2 w-full bg-placeholderGray border-none rounded"/>
                    </div>
                    <div>
                        <label for="lastName" class="block font-semibold">Last Name</label>
                        <input type="text" id="lastName" bind:value={lastName} placeholder="Last Name" class="mt-1 p-2 w-full bg-placeholderGray border-none rounded"/>
                    </div>
                </div>

                <div>
                    <label for="email" class="block font-semibold">Email Address</label>
                    <input type="email" id="email" bind:value={email} placeholder="Email Address" class="mt-1 p-2 w-full bg-placeholderGray border-none rounded"/>
                </div>

                <div>
                    <label for="phoneNumber" class="block font-semibold">Phone Number</label>
                    <input type="text" id="phoneNumber" bind:value={phoneNumber} placeholder="Phone Number" class="mt-1 p-2 w-full bg-placeholderGray border-none rounded"/>
                </div>

                <div>
                    <label for="dob" class="block font-semibold">Date of Birth</label>
                    <div class="flex items-center">
                        <input type="text" id="dob" bind:value={dob} placeholder="DD/MM/YYYY" class="mt-1 p-2 w-full bg-placeholderGray border-none rounded"/>
                    </div>
                </div>

                <!-- Create Password Section -->
                <h3 class="text-xl font-semibold mb-2">Create Password</h3>
                
                <div>
                    <label for="password" class="block font-semibold">Password</label>
                    <input type="password" id="password" bind:value={password} placeholder="Password" class="mt-1 p-2 w-full bg-placeholderGray border-none rounded"/>
                </div>

                <div>
                    <label for="reenterPassword" class="block font-semibold">Re-Enter Password</label>
                    <input type="password" id="reenterPassword" bind:value={reenterPassword} placeholder="Re-enter Password" class="mt-1 p-2 w-full bg-placeholderGray border-none rounded"/>
                </div>

                <!-- Terms and Conditions Section -->
                <h3 class="text-xl font-semibold mb-2">Agree to Terms and Conditions</h3>
                
                <div class="flex items-center mb-4">
                    <input type="checkbox" id="termsAgreed" bind:checked={termsAgreed} class="mr-2 transform scale-150"/>
                    <label for="termsAgreed">Click here to indicate that you have read and agree to Helper Hive's <a href="#" class="text-blue-500 underline">Terms & Conditions</a></label>
                </div>
                
                <div class="flex items-center mb-4">
                    <input type="checkbox" id="liabilityAgreed" bind:checked={liabilityAgreed} class="mr-2 transform scale-150"/>
                    <label for="liabilityAgreed">Click here to indicate that you have read and agree to Helper Hive's <a href="#" class="text-blue-500 underline">Liability Agreement</a></label>
                </div>

                <button type="submit" class="w-full bg-primaryYellow text-white font-bold py-2 px-4 rounded-lg mx-auto">Sign Up</button>
            </form>

            <p class="mt-4 text-center">Already a member? <a href="/login" class="text-blue-500 underline">Login here</a></p>
        </div>

        <!-- Right section (empty) -->
        <div class="w-full lg:w-3/10 lg:max-w-[30%]"></div>
    </div>
</div>
