<script lang="ts">
	import Text from '$lib/Components/Text/Text.svelte';
	import InputField from '$lib/Components/InputField.svelte';
	import Popup from '$lib/Components/TCPopup.svelte';
	import { onMount } from 'svelte';

	let firstName = '';
	let lastName = '';
	let password = '';
	let reenterPassword = '';
	let termsAgreed = false;
	let passwordsMatch = true;
	let formValid = false;
	let invalidFields: string[] = [];
	let invalidComps: InputField[] = [];
	
	let firstNameComp: InputField;
	let lastNameComp: InputField;
	let passwordComp: InputField;
	let reenterPasswordComp: InputField;
	
	let pwdStatus = 'Password must have';
	let showPwdStatus = false;
	let passwordValid = false;

	const validateForm = () => {
		formValid =
			Boolean(firstName) &&
			Boolean(lastName) &&
			Boolean(password) &&
			Boolean(reenterPassword) &&
			termsAgreed &&
			passwordsMatch &&
			passwordValid
	};

	const validatePassword = () => {
		passwordValid = false;
		pwdStatus = 'Password must contain';

		if (!/[A-Z]/.test(password)) pwdStatus += ' an uppercase letter,';
		if (!/[a-z]/.test(password)) pwdStatus += ' a lowercase letter,';
		if (!/[0-9]/.test(password)) pwdStatus += ' a number,';
		if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.`~<>\/?]/.test(password)) pwdStatus += ' a special character,';
		if (password.length < 8) pwdStatus += ' at least 8 characters,';

		pwdStatus = pwdStatus.replace(/,$/, '.').replace(/,(?=[^,]+$)/, ', and');

		if (password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.`~<>\/?]/.test(password)) {
			passwordValid = true;
		}
	};
	
	const highlightInvalidFields = () => {
		invalidFields = [];
		invalidComps = [];
		if (!firstName) invalidFields.push('firstName');
		if (!lastName) invalidFields.push('lastName');
		if (!password) invalidFields.push('password');
		if (!reenterPassword) invalidFields.push('reenterPassword');
		if (!passwordValid) invalidFields.push('password');
		if (!passwordsMatch) invalidFields.push('reenterPassword');
		if (!termsAgreed) invalidFields.push('termsAgreed');

		if (!firstName) invalidComps.push(firstNameComp);
		if (!lastName) invalidComps.push(lastNameComp);
		if (!password) invalidComps.push(passwordComp);
		if (!reenterPassword) invalidComps.push(reenterPasswordComp);
		if (!passwordValid) invalidComps.push(passwordComp);
		if (!passwordsMatch) invalidComps.push(reenterPasswordComp);

		if (invalidFields.length > 0) {
			const firstInvalidField = document.getElementById(invalidFields[0]);
			firstInvalidField?.scrollIntoView({ behavior: 'smooth' });
			for (let i = 0; i < invalidComps.length; i++){
				invalidComps[i].updateError();
			}
		}
	};

	const handleSubmit = () => {
		highlightInvalidFields();

		if (formValid) {
			// Submission logic goes here
			console.log({
				firstName,
				lastName,
				password,
				reenterPassword,
				termsAgreed,
			});
			alert('Form successfully submitted');
		}
	};

	function handlePasswordChange(showStatus: boolean = false){
		if (showStatus){
			showPwdStatus = true;
			validatePassword();
		} 
		passwordsMatch = password === reenterPassword;
		reenterPasswordComp.updateError();
		validateForm();
	}

	const passwordBlur = () => {
		if (passwordValid) showPwdStatus = false;
	};

	const handleInputChange = () => {
		validateForm();
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
		<!-- Middle section -->
		<div class="w-full lg:w-4/10 bg-white p-8 rounded-lg">
			<Text class="section mb-2 text-center">Join us today!</Text>

			<form on:submit|preventDefault={handleSubmit} class="space-y-4" novalidate>
				<!-- Org and Personnel Section -->
				<Text class="heading mb-2">Organization Information</Text>

				<div class="grid grid-cols-2 gap-4">
					<InputField
						id="firstName"
						label="First Name"
						placeholder="First Name"
						bind:value={firstName}
						bind:this={firstNameComp}
						invalid={invalidFields.includes('firstName')}
						onInput={handleInputChange}
						errorMsgs={["First name is required"]}
						errorBools={[invalidFields.includes('firstName')]}
						keepErrorSpacing={true}
						showErrorsWhen={true}
						keepErrorsOnBlur={false}
					/>
					<InputField
						id="lastName"
						label="Last Name"
						placeholder="Last Name"
						bind:value={lastName}
						bind:this={lastNameComp}
						invalid={invalidFields.includes('lastName')}
						onInput={handleInputChange}
					/>
				</div>

				<!-- Create Password Section -->
				<div style="margin-top: 2rem;">
					<Text class="heading mb-2">Create Password</Text>
				</div>
				<div class="relative">
					<InputField
						id="password"
						label="Password"
						placeholder="Password"
						type="password"
						bind:value={password}
						bind:this={passwordComp}
						invalid={invalidFields.includes('password')}
						errorMsgs={[
							"Password required",
							pwdStatus,
							"Looks good!"]}
						errorBools={[
							invalidFields.includes('password') && !password,
							password != '' && !passwordValid,
							passwordValid]}
						errorStyles={[
							'',
							'',
							"text-green-500"]}
						keepErrorSpacing={true}
						showErrorsWhen={showPwdStatus || password == ''}
						keepErrorsOnBlur={false}
						onInput={() => handlePasswordChange(true)}
						onBlur={passwordBlur}
					/>
					<InputField
						id="reenterPassword"
						label="Re-enter Password"
						placeholder="Re-enter Password"
						type="password"
						bind:value={reenterPassword}
						bind:this={reenterPasswordComp}
						invalid={invalidFields.includes('reenterPassword')}
						errorMsgs={[
							"Re-enter password required",
							"Passwords do not match"]}
						errorBools={[
							invalidFields.includes('reenterPassword') && !reenterPassword,
							!passwordsMatch]}
						errorStyles={[
							'',
							"text-red-500"]}
						keepErrorSpacing={true}
						keepErrorsOnBlur={true}
						onInput={() => handlePasswordChange()}
					/>
				</div>

				<!-- Terms and Conditions Section -->
				<div>
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

				<button
					type="submit"
					class={`w-full ${formValid ? 'bg-primaryYellow text-black' : 'bg-tagYellow text-altTextBrown'} py-2 mt-[2.5rem] px-4 rounded-lg mx-auto text`}
				>
					<Text>Sign Up</Text>
				</button>
			</form>
		</div>
	</div>
</div>

<Popup id="termsPopup" title="Terms & Conditions" type="terms" />
