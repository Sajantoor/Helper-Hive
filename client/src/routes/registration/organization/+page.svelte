<script lang="ts">
	import Text from '$lib/Components/Text/Text.svelte';
	import SmallText from '$lib/Components/Text/SmallText.svelte';
	import Popup from '$lib/Components/TCPopup.svelte';
	import { goto } from '$app/navigation';
	import { PUBLIC_SERVER_HOST } from '$env/static/public';

	import PasswordInput from '$lib/Components/Input/PasswordInput.svelte';
	import PhoneInput from '$lib/Components/Input/PhoneInput.svelte';
	import TextInput from '$lib/Components/Input/TextInput.svelte';
	import EmailInput from '$lib/Components/Input/EmailInput.svelte';
	import { generateAndUploadRandomAvatar } from '$lib/Utils/generateRandomAvatar';

	let touched = false;

	let formData = {
		organizationName: '',
		avatar: '',
		email: '',
		phoneNumber: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
		termsAgreed: false,
		liabilityAgreed: false
	};

	let isValid = {
		organizationName: false,
		email: false,
		phoneNumber: false,
		firstName: false,
		lastName: false,
		password: false,
		confirmPassword: false,
		termsAgreed: false,
		liabilityAgreed: false
	};

	let isFormValid = false;

	const validateForm = () => {
		return Object.values(isValid).every(Boolean);
	};

	const handleSubmit = async () => {
		touched = true;

		if (!isFormValid) {
			return;
		}

		if (!formData.avatar) {
			formData.avatar = await generateAndUploadRandomAvatar(formData.email);
		}

		const body = {
			name: formData.organizationName,
			logo: formData.avatar,
			email: formData.email,
			phoneNumber: formData.phoneNumber,
			contactPerson: {
				firstName: formData.firstName,
				lastName: formData.lastName
			},
			password: formData.password
		};

		const response = await fetch(`${PUBLIC_SERVER_HOST}/api/organizations/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});

		if (!response.ok) {
			console.error('Failed to register organization');
			return;
		}

		goto('/login');
	};

	const openPopup = (id: string) => {
		const popup = document.getElementById(id);
		popup?.classList.remove('hidden');
	};

	$: if (formData || isValid) {
		isFormValid = validateForm();
	}
</script>

<div class="flex flex-col lg:flex-row justify-center items-center min-h-screen">
	<div class="container mx-auto px-4 flex flex-col lg:flex-row lg:ml-2">
		<!-- Left section -->
		<div
			class="flex flex-col justify-start lg:items-start items-center w-full lg:w-3/10 lg:max-w-[30%] lg:text-left text-center"
		>
			<Text class="section lg:w-1/2 mb-4 whitespace-normal pt-10">Organization Registration</Text>
			<SmallText>
				Wrong Place?
				<a href="/registration/volunteer" class="text-blue-500 underline">Click here</a>
				for Volunteer Registration
			</SmallText>
		</div>

		<!-- Middle section -->
		<div class="w-full lg:w-4/10 bg-white p-8 rounded-lg">
			<Text class="section mb-2 text-center">Join us today!</Text>
			<Text class="heading mb-6 text-center">Sign Up Now to Become a Member</Text>

			<form on:submit|preventDefault={handleSubmit} class="space-y-4" novalidate>
				<!-- Org and Personnel Section -->
				<Text class="heading mb-2">Organization Information</Text>

				<TextInput
					label="Organization Name"
					placeholder="Organization Name"
					errorMessage="Organization name is required"
					bind:value={formData.organizationName}
					bind:valid={isValid.organizationName}
					{touched}
				/>

				<EmailInput
					label="Email Address"
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

				<div style="margin-top: 2.5rem;">
					<Text class="heading mb-2">Contact Personnel</Text>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<TextInput
						label="First Name"
						placeholder="First Name"
						bind:value={formData.firstName}
						bind:valid={isValid.firstName}
						{touched}
					/>
					<TextInput
						label="Last Name"
						placeholder="Last Name"
						bind:value={formData.lastName}
						bind:valid={isValid.lastName}
						{touched}
					/>
				</div>

				<!-- Create Password Section -->
				<div style="margin-top: 1.5rem;">
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
<Popup id="liabilityPopup" title="Organization Liability Information" type="liabilityOrg" />
