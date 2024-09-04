<script lang="ts">
	import Text from '$lib/Components/Text/Text.svelte';
	import Popup from '$lib/Components/TCPopup.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { PUBLIC_SERVER_HOST } from '$env/static/public';

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
	let emailValid = false;
	let invalidFields: string[] = [];

	let organizationNameComp: TextInput;
	let emailComp: TextInput;
	let phoneNumberComp: PhoneInput;
	let firstNameComp: TextInput;
	let lastNameComp: TextInput;
	let passwordComp: PasswordInput;
	let reenterPasswordComp: PasswordInput;
	let invalidComps: any[] = [];

	let pwdStatus = 'Password must have';
	let showPwdStatus = false;
	let passwordValid = false;

	const validatePassword = () => {
		passwordValid = false;
		pwdStatus = 'Password must contain';

		if (!/[A-Z]/.test(password)) pwdStatus += ' an uppercase letter,';
		if (!/[a-z]/.test(password)) pwdStatus += ' a lowercase letter,';
		if (!/[0-9]/.test(password)) pwdStatus += ' a number,';
		if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.`~<>\/?]/.test(password))
			pwdStatus += ' a special character,';
		if (password.length < 8) pwdStatus += ' at least 8 characters,';

		pwdStatus = pwdStatus.replace(/,$/, '.').replace(/,(?=[^,]+$)/, ', and');

		if (
			password.length >= 8 &&
			/[A-Z]/.test(password) &&
			/[a-z]/.test(password) &&
			/[0-9]/.test(password) &&
			/[!@#$%^&*()_+\-=\[\]{};':"\\|,.`~<>\/?]/.test(password)
		) {
			passwordValid = true;
		}
	};

	const validateForm = () => {
		validateEmail();
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
			passwordValid &&
			passwordsMatch &&
			emailValid;
	};

	const validateEmail = () => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		emailValid = re.test(email);
	};

	const handleSubmit = async () => {
		highlightInvalidFields();

		if (!formValid) {
			return;
		}

		const body = {
			name: organizationName,
			logo: '',
			email,
			phoneNumber,
			contactPerson: {
				firstName,
				lastName
			},
			password
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

	const handleInputChange = () => {
		validateForm();
	};

	function handlePasswordChange(showStatus: boolean = false) {
		if (showStatus) {
			showPwdStatus = true;
			validatePassword();
		}
		passwordsMatch = password === reenterPassword;
		reenterPasswordComp.updateError();
		validateForm();
	}

	const highlightInvalidFields = () => {
		invalidFields = [];
		invalidComps = [];

		if (!organizationName) invalidFields.push('organizationName');
		if (!emailValid) invalidFields.push('email');
		if (!phoneValid) invalidFields.push('phoneNumber');
		if (!firstName) invalidFields.push('firstName');
		if (!lastName) invalidFields.push('lastName');
		if (!password) invalidFields.push('password');
		if (!reenterPassword) invalidFields.push('reenterPassword');
		if (!passwordValid) invalidFields.push('password');
		if (!passwordsMatch) invalidFields.push('reenterPassword');
		if (!termsAgreed) invalidFields.push('termsAgreed');
		if (!liabilityAgreed) invalidFields.push('liabilityAgreed');

		if (!organizationName) invalidComps.push(organizationNameComp);
		if (!emailValid) invalidComps.push(emailComp);
		if (!phoneValid) invalidComps.push(phoneNumberComp);
		if (!firstName) invalidComps.push(firstNameComp);
		if (!lastName) invalidComps.push(lastNameComp);
		if (!password) invalidComps.push(passwordComp);
		if (!reenterPassword) invalidComps.push(reenterPasswordComp);
		if (!passwordValid) invalidComps.push(passwordComp);
		if (!passwordsMatch) invalidComps.push(reenterPasswordComp);

		if (invalidFields.length > 0) {
			for (let i = 0; i < invalidComps.length; i++) {
				invalidComps[i].updateError();
			}
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
				Wrong Place? <a href="/registration/volunteer" class="text-blue-500 underline">Click here</a
				>
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
					bind:this={organizationNameComp}
					invalid={invalidFields.includes('organizationName')}
					errorMsgs={['Organization name is required']}
					errorBools={[invalidFields.includes('organizationName')]}
					onInput={handleInputChange}
				/>

				<TextInput
					id="email"
					label="Email Address"
					placeholder="Email Address"
					bind:value={email}
					bind:this={emailComp}
					invalid={invalidFields.includes('email')}
					errorMsgs={['Email address is required', 'Must enter a valid email address']}
					errorBools={[
						!email && invalidFields.includes('email'),
						email && !emailValid && invalidFields.includes('email')
					]}
					onInput={handleInputChange}
				/>

				<PhoneInput
					id="phoneNumber"
					label="Phone Number"
					placeholder="Phone Number"
					bind:value={phoneNumber}
					bind:this={phoneNumberComp}
					bind:valid={phoneValid}
					invalid={invalidFields.includes('phoneNumber')}
					errorMsgs={['Phone number is required', 'Must enter a valid phone number']}
					errorBools={[
						!phoneNumber && invalidFields.includes('phoneNumber'),
						phoneNumber && !phoneValid && invalidFields.includes('phoneNumber')
					]}
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
						bind:this={firstNameComp}
						invalid={invalidFields.includes('firstName')}
						errorMsgs={['First name is required']}
						errorBools={[invalidFields.includes('firstName')]}
						onInput={handleInputChange}
					/>
					<TextInput
						id="lastName"
						label="Last Name"
						placeholder="Last Name"
						bind:value={lastName}
						bind:this={lastNameComp}
						invalid={invalidFields.includes('lastName')}
						errorMsgs={['Last name is required']}
						errorBools={[invalidFields.includes('lastName')]}
						onInput={handleInputChange}
					/>
				</div>

				<!-- Create Password Section -->
				<div style="margin-top: 1.5rem;">
					<Text class="heading mb-2">Create Password</Text>
				</div>
				<div class="relative">
					<PasswordInput
						id="password"
						label="Password"
						placeholder="Password"
						bind:value={password}
						bind:this={passwordComp}
						invalid={invalidFields.includes('password')}
						errorMsgs={['Password required', pwdStatus, 'Looks good!']}
						errorBools={[
							invalidFields.includes('password') && !password,
							password != '' && !passwordValid,
							passwordValid
						]}
						errorStyles={['', '', 'text-green-500']}
						keepErrorSpacing={true}
						showErrorsOnlyWhen={showPwdStatus || password == ''}
						onInput={() => handlePasswordChange(true)}
					/>
					<PasswordInput
						id="reenterPassword"
						label="Re-enter Password"
						placeholder="Re-enter Password"
						bind:value={reenterPassword}
						bind:this={reenterPasswordComp}
						invalid={invalidFields.includes('reenterPassword')}
						errorMsgs={['Re-enter password required', 'Passwords do not match']}
						errorBools={[
							invalidFields.includes('reenterPassword') && !reenterPassword,
							!passwordsMatch
						]}
						errorStyles={['', 'text-red-500']}
						keepErrorSpacing={true}
						keepErrorsOnBlur={true}
						onInput={() => handlePasswordChange()}
					/>
				</div>

				<!-- Terms and Conditions Section -->
				<div style="margin-top: 2rem;">
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
