<script lang="ts">
	import Text from '$lib/Components/Text/Text.svelte';
	import Popup from '$lib/Components/TCPopup.svelte';
	import { onMount } from 'svelte';
	
	import PasswordInput from '$lib/Components/Input/PasswordInput.svelte';
	import PhoneInput from '$lib/Components/Input/PhoneInput.svelte';
	import TextInput from '$lib/Components/Input/TextInput.svelte';

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
	let phoneValid = false;
	let invalidFields: string[] = [];

	const validateForm = () => {
		formValid =
			Boolean(organizationName) &&
			Boolean(email) &&
			phoneValid &&
			Boolean(firstName) &&
			Boolean(lastName) &&
			Boolean(password) &&
			Boolean(reenterPassword) &&
			termsAgreed &&
			liabilityAgreed &&
			passwordsMatch &&
			validateEmail(email);
	};

	const validateEmail = (email: string) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	const handleSubmit = () => {
		highlightInvalidFields();

		if (formValid) {
			// Submission logic goes here
			if (email === 'already@exists.com') {
				console.log('Email already exists');
			} else {
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
				alert('Form successfully submitted');
			}
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
		if (!phoneValid) invalidFields.push('phoneNumber');
		if (!firstName) invalidFields.push('firstName');
		if (!lastName) invalidFields.push('lastName');
		if (!password) invalidFields.push('password');
		if (!reenterPassword) invalidFields.push('reenterPassword');
		if (!termsAgreed) invalidFields.push('termsAgreed');
		if (!liabilityAgreed) invalidFields.push('liabilityAgreed');
		if (!passwordsMatch) invalidFields.push('reenterPassword');

		if (invalidFields.length > 0) {
			const firstInvalidField = document.getElementById(invalidFields[0]);
			firstInvalidField?.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const openPopup = (popupId: string) => {
		const popup = document.getElementById(popupId);
		popup?.classList.remove('hidden');
	};

	const closePopup = (popupId: string) => {
		const popup = document.getElementById(popupId);
		popup?.classList.add('hidden');
	};

	onMount(() => {
		validateForm();
	});
</script>

<div class="flex flex-col lg:flex-row justify-center items-center min-h-screen">
	<div class="container mx-auto px-4 flex flex-col lg:flex-row lg:ml-2">
		<!-- Left section -->
		<div
			class="flex flex-col justify-start lg:items-start items-center w-full lg:w-3/10 lg:max-w-[30%] lg:text-left text-center"
		>
			<Text class="section lg:w-1/2 mb-4 whitespace-normal pt-10">Organization Registration</Text>
			<Text class="smallText">
				Wrong Place? <a href="/VolunteerRegistration" class="text-blue-500 underline">Click here</a>
				for Volunteer Registration
			</Text>
		</div>

		<!-- Middle section -->
		<div class="w-full lg:w-4/10 bg-white p-8 rounded-lg">
			<Text class="section mb-2 text-center">Join us today!</Text>
			<Text class="heading mb-6 text-center">Sign Up Now to Become a Member</Text>

			<form on:submit|preventDefault={handleSubmit} class="space-y-4" novalidate>
				<!-- Org and Personnel Section -->
				<Text class="heading mb-2">Organization Information</Text>

				<TextInput
					id="organizationName"
					label="Name of Organization"
					placeholder="Name of Organization"
					bind:value={organizationName}
					invalid={invalidFields.includes('organizationName')}
					onInput={handleInputChange}
				/>

				<TextInput
					id="email"
					label="Email Address"
					placeholder="Email Address"
					bind:value={email}
					invalid={invalidFields.includes('email')}
					onInput={handleInputChange}
				/>

				<PhoneInput
					id="phoneNumber"
					label="Phone Number"
					placeholder="Phone Number"
					bind:value={phoneNumber}
					bind:valid={phoneValid}
					invalid={invalidFields.includes('phoneNumber')}
					onInput={handleInputChange}
				/>

				<div style="margin-top: 2.5rem;">
					<Text class="heading mb-2">Contact Personnel</Text>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<TextInput
						id="firstName"
						label="First Name"
						placeholder="First Name"
						bind:value={firstName}
						invalid={invalidFields.includes('firstName')}
						onInput={handleInputChange}
					/>
					<TextInput
						id="lastName"
						label="Last Name"
						placeholder="Last Name"
						bind:value={lastName}
						invalid={invalidFields.includes('lastName')}
						onInput={handleInputChange}
					/>
				</div>

				<!-- Create Password Section -->
				<div style="margin-top: 2rem;">
					<Text class="heading mb-2">Create Password</Text>
				</div>
				<div class="relative">
					<PasswordInput
						id="password"
						label="Password"
						placeholder="Password"
						bind:value={password}
						invalid={invalidFields.includes('password')}
						onInput={handlePasswordChange}
					/>
					<PasswordInput
						id="reenterPassword"
						label="Re-enter Password"
						placeholder="Re-enter Password"
						bind:value={reenterPassword}
						invalid={invalidFields.includes('reenterPassword')}
						onInput={handlePasswordChange}
					/>
					{#if !passwordsMatch}
						<Text class="smallText text-red-500 absolute -bottom-8">Passwords do not match</Text>
					{/if}
				</div>

				<!-- Terms and Conditions Section -->
				<div style="margin-top: 3rem;">
					<Text class="heading mb-2">Agree to Terms and Conditions</Text>
				</div>
				<div class="flex items-center mb-4 lg:justify-center">
					<input
						type="checkbox"
						id="termsAgreed"
						bind:checked={termsAgreed}
						class="lg:ml-0 ml-2 mr-5 transform scale-[2.0] accent-primaryYellow {invalidFields.includes(
							'termsAgreed'
						)
							? 'accent-primaryYellow'
							: ''}"
						on:change={handleInputChange}
					/>
					<label
						for="termsAgreed"
						class="lg:w-3/4 {invalidFields.includes('termsAgreed')
							? 'text-altTextBrown font-bold'
							: ''}"
					>
						<Text
							>Click here to indicate that you have read and agree to Helper Hive's <a
								href="#"
								tabindex="-1"
								class="text-blue-500 underline"
								on:click|preventDefault={() => openPopup('termsPopup')}>Terms & Conditions</a
							></Text
						>
					</label>
				</div>
				<div class="flex items-center mb-4 lg:justify-center">
					<input
						type="checkbox"
						id="liabilityAgreed"
						bind:checked={liabilityAgreed}
						class="lg:ml-0 ml-2 mr-5 transform scale-[2.0] accent-primaryYellow {invalidFields.includes(
							'liabilityAgreed'
						)
							? 'accent-primaryYellow'
							: ''}"
						on:change={handleInputChange}
					/>
					<label
						for="liabilityAgreed"
						class="lg:w-3/4 {invalidFields.includes('liabilityAgreed')
							? 'text-altTextBrown font-bold'
							: ''}"
					>
						<Text
							>Click here to indicate that you have read and agree to Helper Hive's <a
								href="#"
								tabindex="-1"
								class="text-blue-500 underline"
								on:click|preventDefault={() => openPopup('liabilityPopup')}>Liability Agreement</a
							></Text
						>
					</label>
				</div>

				<button
					type="submit"
					class={`w-full ${formValid ? 'bg-primaryYellow text-black' : 'bg-tagYellow text-altTextBrown'} py-2 px-4 rounded-lg mx-auto text`}
					style="margin-top: 2.5rem;"
				>
					<Text>Sign Up</Text>
				</button>
			</form>

			<Text class="smallText mt-4 text-center"
				>Already a member? <a href="/login" class="text-blue-500 underline">Login here</a></Text
			>
		</div>

		<!-- Right section (empty) -->
		<div class="w-full lg:w-3/10 lg:max-w-[30%]"></div>
	</div>
</div>

<Popup id="termsPopup" title="Terms & Conditions" type="terms" />
<Popup id="liabilityPopup" title="Organization Liability Information" type="liabilityOrg" />
