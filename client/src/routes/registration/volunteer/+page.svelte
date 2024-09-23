<script lang="ts">
	import Text from '$lib/Components/Text/Text.svelte';
	import Popup from '$lib/Components/TCPopup.svelte';

	import DateInput from '$lib/Components/Input/DateInput.svelte';
	import PasswordInput from '$lib/Components/Input/PasswordInput.svelte';
	import PhoneInput from '$lib/Components/Input/PhoneInput.svelte';
	import TextInput from '$lib/Components/Input/TextInput.svelte';
	import FileUpload from '$lib/Components/Input/Upload.svelte';
	import CloseCircle from 'svelte-material-icons/CloseCircle.svelte';
	import Circle from 'svelte-material-icons/Circle.svelte';

	import { goto } from '$app/navigation';
	import { PUBLIC_SERVER_HOST } from '$env/static/public';
	import SmallText from '$lib/Components/Text/SmallText.svelte';
	import { generateAndUploadRandomAvatar } from '$lib/Utils/generateRandomAvatar';
	import { createBase64Image, uploadFile } from '$lib/Utils/uploadFiles';

	let formData: {
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber: string;
		dob: Date | null;
		password: string;
		confirmPassword: string;
		avatar: string;
	} = {
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		dob: null,
		password: '',
		confirmPassword: '',
		avatar: ''
	};

	let isValid = {
		firstName: false,
		lastName: false,
		email: false,
		phoneNumber: false,
		dob: false,
		password: false,
		confirmPassword: false,
		termsAgreed: false,
		liabilityAgreed: false
	};

	let avatarFile: File | null = null;

	let isFormValid = false;
	let touched = false;
	let dobErrorMessage = 'Please enter a valid date of birth';
	const ageLimit = 16;
	let errorMessage = '';

	const handleSubmit = async () => {
		touched = true;
		errorMessage = '';

		if (!isFormValid) {
			return;
		}

		if (!avatarFile) {
			formData.avatar = await generateAndUploadRandomAvatar(formData.email);
		} else {
			formData.avatar = await uploadFile(avatarFile);
		}

		const body = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			phoneNumber: formData.phoneNumber,
			dateOfBirth: formData.dob,
			email: formData.email,
			password: formData.password,
			avatar: formData.avatar
		};

		// Submission logic goes here
		const response = await fetch(`${PUBLIC_SERVER_HOST}/api/users/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});

		if (response.ok) {
			goto('/login');
		} else {
			const data = await response.json();
			errorMessage = data.message;
		}
	};

	$: if (isValid || formData) {
		isFormValid = validateForm();
	}

	const validateAge = () => {
		const dob = formData.dob;
		if (!dob) {
			dobErrorMessage = 'Please enter a valid date of birth';
			return;
		}

		const today = new Date();
		const validRegistrationAge = new Date(today.setFullYear(today.getFullYear() - ageLimit));
		isValid.dob = dob <= validRegistrationAge;

		if (!isValid.dob) {
			dobErrorMessage = `You must be at least ${ageLimit} years old to register`;
		}
	};

	const validateForm = (): boolean => {
		validateAge();
		return Object.values(isValid).every(Boolean);
	};

	const openPopup = (id: string) => {
		const popup = document.getElementById(id);
		popup?.classList.remove('hidden');
	};

	let avatarBase64 = '';

	const handleImageUpload = async (event: CustomEvent<{ files: File[] }>) => {
		const uploadedFiles = event.detail.files;
		if (uploadedFiles.length === 0) {
			return;
		}

		avatarBase64 = await createBase64Image(uploadedFiles[0]);
		avatarFile = uploadedFiles[0];
	};

	const removeImage = () => {
		avatarBase64 = '';
		avatarFile = null;
	};
</script>

<div class="flex flex-col lg:flex-row justify-center items-center min-h-screen">
	<div class="container mx-auto desktoppx-4 flex flex-col lg:flex-row lg:ml-2">
		<!-- Left section -->
		<div
			class="flex flex-col justify-start lg:items-start items-center w-full lg:w-3/10 lg:max-w-[30%] lg:text-left text-center"
		>
			<Text class="section lg:w-1/2 mb-4 whitespace-normal pt-10">Volunteer Registration</Text>
			<SmallText>
				Wrong Place?
				<a href="/registration/organization" class="text-blue-500 underline"> Click here</a>
				for Organization Registration
			</SmallText>
		</div>

		<!-- Middle section -->
		<div class="w-full lg:w-4/10 bg-white p-8 rounded-lg">
			<Text class="section mb-2 text-center">Join us today!</Text>
			<Text class="heading mb-6 text-center">Sign Up Now to Become a Member</Text>

			<form on:submit|preventDefault={handleSubmit} class="space-y-4" novalidate>
				<!-- Personal Information Section -->
				<Text class="heading mb-2">Personal Information</Text>

				<div class="grid grid-cols-2 gap-4">
					<TextInput
						label="First Name"
						placeholder="First Name"
						errorMessage="First name is required"
						bind:value={formData.firstName}
						bind:valid={isValid.firstName}
						{touched}
					/>
					<TextInput
						label="Last Name"
						placeholder="Last Name"
						errorMessage="Last name is required"
						bind:value={formData.lastName}
						bind:valid={isValid.lastName}
						{touched}
					/>
				</div>

				<TextInput
					label="Email Address"
					placeholder="Email Address"
					bind:value={formData.email}
					bind:valid={isValid.email}
					{touched}
				/>

				<PhoneInput
					label="Phone Number"
					placeholder="Phone Number"
					bind:value={formData.phoneNumber}
					bind:valid={isValid.phoneNumber}
					{touched}
				/>

				<DateInput
					label="Date of Birth"
					placeholder="DD/MM/YYYY"
					errorMessage={dobErrorMessage}
					bind:value={formData.dob}
					bind:valid={isValid.dob}
					maxDate="today"
					{touched}
				/>

				<Text>Upload a profile picture</Text>
				{#if !avatarFile}
					<FileUpload
						type="image"
						placeholder="Upload a profile picture..."
						valid={true}
						on:file={handleImageUpload}
						{touched}
					/>
				{:else}
					<div
						class="w-24 h-24 bg-cover bg-center rounded-full relative"
						style="background-image: url({avatarBase64});"
					>
						<div class="absolute top-0 right-0 cursor-pointer" on:click={removeImage}>
							<Circle class="text-white rounded-full p-1" size={30} />
						</div>
						<div class="absolute top-0 right-0 cursor-pointer" on:click={removeImage}>
							<CloseCircle class="text-primaryYellow rounded-full p-1" size={30} />
						</div>
					</div>
				{/if}

				<!-- Create Password Section -->
				<div style="margin-top: 2rem;">
					<Text class="heading mb-2">Create Password</Text>
				</div>
				<div class="relative">
					<PasswordInput
						type="new"
						label="Password"
						placeholder="Password"
						bind:value={formData.password}
						bind:valid={isValid.password}
						{touched}
					/>
					<PasswordInput
						type="confirm"
						label="Re-enter Password"
						placeholder="Re-enter Password"
						bind:value={formData.confirmPassword}
						bind:valid={isValid.confirmPassword}
						matchPassword={formData.password}
						{touched}
					/>
				</div>

				<!-- Terms and Conditions Section -->
				<div style="margin-top: 2rem;">
					<Text class="heading mb-2">Agree to Terms and Conditions</Text>
				</div>
				<div class="flex items-center mb-4 lg:justify-center">
					<input
						type="checkbox"
						bind:checked={isValid.termsAgreed}
						class="lg:ml-0 ml-2 mr-5 transform scale-[2.0] accent-primaryYellow
						{touched && !isValid.termsAgreed && 'accent-primaryYellow'}"
					/>
					<label
						for="termsAgreed"
						class="lg:w-3/4 {touched && !isValid.termsAgreed && 'text-altTextBrown font-bold'}"
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
						bind:checked={isValid.liabilityAgreed}
						class="lg:ml-0 ml-2 mr-5 transform scale-[2.0] accent-primaryYellow
						{touched && !isValid.liabilityAgreed && 'accent-primaryYellow'}"
					/>
					<label
						for="liabilityAgreed"
						class="lg:w-3/4 {touched && !isValid.liabilityAgreed && 'text-altTextBrown font-bold'}"
					>
						<Text>
							Click here to indicate that you have read and agree to Helper Hive's
							<a
								href="#"
								tabindex="-1"
								class="text-blue-500 underline"
								on:click|preventDefault={() => openPopup('liabilityPopup')}
							>
								Liability Agreement
							</a>
						</Text>
					</label>
				</div>

				<button
					type="submit"
					class={`w-full ${isFormValid ? 'bg-primaryYellow text-black' : 'bg-tagYellow text-altTextBrown'} py-2 px-4 rounded-lg mx-auto text`}
					style="margin-top: 2.5rem;"
				>
					<Text>Sign Up</Text>
				</button>

				{#if errorMessage}
					<Text class="text-red-500 text-center">{errorMessage}</Text>
				{/if}
			</form>

			<SmallText class="mt-4 text-center">
				Already a member? <a href="/login" class="text-blue-500 underline">Login here</a>
			</SmallText>
		</div>

		<!-- Right section (empty) -->
		<div class="w-full lg:w-3/10 lg:max-w-[30%]"></div>
	</div>
</div>

<Popup id="termsPopup" title="Terms & Conditions" type="terms" />
<Popup id="liabilityPopup" title="Volunteer Liability Information" type="liabilityVol" />
