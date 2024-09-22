<script lang="ts">
	import Heading from './Text/Heading.svelte';
	import Text from './Text/Text.svelte';
	import SmallText from './Text/SmallText.svelte';

	export let type: 'terms' | 'liabilityOrg' | 'liabilityVol' = 'terms';
</script>

<div>
	{#if type === 'terms'}
		<Heading>Terms and Conditions</Heading>
		<SmallText>Effective Date: August 13, 2024</SmallText>
		<Text>
			<br />
			Welcome to Helper Hive Volunteer Network ("Helper Hive", "we, "us", or "our”). By accessing or
			using our website (the "Site"), you agree to comply with and be bound by the following terms and
			conditions (the "Terms"). Please read these Terms carefully before using the Site. If you do not
			agree to these Terms, you should not use the Site.

			<br /><br />
			<ol class="list-decimal">
				<li>
					Acceptance of Terms
					<br />
					By accessing or using Helper Hive, you acknowledge that you have read, understood, and agree
					to be bound by these Terms and our Privacy Policy, which is incorporated herein by reference.
					<br /> <br />
				</li>

				<li>
					Use of the Site
					<br />
					Helper Hive provides a platform for volunteers and organizations to connect and collaborate
					on various projects. You agree to use the Site in accordance with these Terms and applicable
					laws.
					<br /> <br />
				</li>

				<li>
					Respectful Use of the Platform We are committed to fostering a positive and inclusive
					community. You agree to use Helper Hive respectfully and in a manner that does not:
					<br />
					<ol class="alpha">
						<li>
							Harassment and Abuse: Engage in any form of harassment, abuse, or discriminatory
							behavior towards other users, including but not limited to language or actions that
							are threatening, demeaning, or derogatory.
						</li>
						<li>
							Illegal Activities: Use the Site for any illegal activities or to promote illegal
							actions.
						</li>
						<li>
							Misrepresentation: Provide false or misleading information, including but not limited
							to fraudulent claims about your identity, skills, or affiliations.
						</li>
						<li>
							Spamming and Solicitation: Engage in unsolicited or unauthorized advertising,
							promotional materials, or solicitation of any kind.
						</li>
						<li>
							Impersonation: Impersonate any person or entity or falsely state or misrepresent your
							affiliation with any person or entity.
						</li>
						<li>
							Disruption: Interfere with or disrupt the integrity or performance of the Site or any
							related services
						</li>

						<li>
							Intellectual Property: Violate or infringe upon the intellectual property rights of
							others, including but not limited to copyrights, trademarks, and trade secrets.
						</li>
					</ol>
					<br />
				</li>

				<li>
					User Accounts
					<br />
					To access certain features of the Site, you may be required to create an account. You are responsible
					for maintaining the confidentiality of your account credentials and for all activities that
					occur under your account. You agree to notify us immediately of any unauthorized use of your
					account.
					<br /> <br />
				</li>

				<li>
					Content
					<br />
					You retain ownership of any content you submit to Helper Hive. However, by submitting content,
					you grant Helper Hive a non-exclusive, royalty-free, worldwide, perpetual, and transferable
					license to use, reproduce, modify, publish, and distribute such content for the purposes of
					operating and promoting the Site.
					<br /> <br />
				</li>

				<li>
					Termination
					<br />
					We reserve the right to terminate or suspend your access to the Site, with or without cause,
					at our sole discretion. Termination of access may occur for violations of these Terms or any
					conduct that we believe is harmful to the Site or its users.
					<br /> <br />
				</li>

				<li>
					Disclaimer of Warranties
					<br />
					The Site is provided on an “as-is” and “as-available” basis. Helper Hive makes no representations
					or warranties of any kind, express or implied, regarding the operation or availability of the
					Site or the information, content, materials, or products included on the Site.
					<br /> <br />
				</li>

				<li>
					Limitation of Liability
					<br />
					To the fullest extent permitted by law, Helper Hive shall not be liable for any indirect, incidental,
					special, consequential, or punitive damages, including but not limited to loss of profits,
					data, or use, arising from or related to your use of the Site.
					<br /> <br />
				</li>

				<li>
					Indemnification
					<br />
					You agree to indemnify, defend, and hold harmless Helper Hive, its affiliates, and their respective
					officers, directors, employees, and agents from and against any claims, liabilities, damages,
					losses, costs, or expenses arising out of or related to your use of the Site or any violation
					of these Terms.
					<br /> <br />
				</li>

				<li>
					Changes to Terms
					<br />
					Helper Hive reserves the right to modify these Terms at any time. Any changes will be effective
					immediately upon posting on the Site. Your continued use of the Site following any changes
					constitutes your acceptance of the revised Terms.
					<br /> <br />
				</li>

				<li>
					Governing Law
					<br />
					These Terms shall be governed by and construed in accordance with the laws of British Columbia,
					Canada, without regard to its conflict of law principles.
					<br /> <br />
				</li>

				<li>
					Contact Information
					<br />
					If you have any questions or concerns about these Terms, please contact us at:
					<br />
					Helper Hive Volunteer Network
					<br />
					Email:
					<a href="mailto:helperhivevolunteer@gmail.com"> helperhivevolunteer@gmail.com </a>
				</li>
			</ol>
		</Text>
	{/if}

	{#if type === 'liabilityOrg'}
		<Heading>Organization Liability Waiver and Release</Heading>
		<Text>
			<ol class="list-decimal">
				<li>
					Acknowledgment and Assumption of Risk:
					<br />
					The undersigned organization acknowledges and understands that the use of volunteer services
					coordinated by Helper Hive may involve certain risks, including but not limited to, physical
					injury, illness, property damage, accidents, and unforeseen events. The organization voluntarily
					assumes all such risks, whether foreseeable or unforeseeable, and takes full responsibility
					for the participation of its employees, agents, representatives, and volunteers.
					<br /> <br />
				</li>

				<li>
					Release and Waiver:
					<br />
					In consideration of being allowed to recruit and receive volunteer services coordinated by
					Helper Hive, the undersigned business, for itself, its employees, agents, representatives,
					and assigns, hereby releases, waives, and discharges Helper Hive, its directors, officers,
					employees, agents, volunteers, and all other persons or entities acting on their behalf (collectively,
					"the Released Parties") from any and all liability, claims, demands, and causes of action of
					any kind arising out of or related to the business's use of volunteers, including but not limited
					to liability for personal injury, property damage, or wrongful death, whether caused by the
					negligence of the Released Parties or otherwise.
					<br /> <br />
				</li>

				<li>
					Indemnification:
					<br />
					The undersigned business agrees to indemnify and hold harmless the Released Parties from any
					and all claims, damages, losses, liabilities, and expenses (including attorney's fees) arising
					out of or related to the business's use of volunteers, including any claims brought by third
					parties, employees, agents, or representatives of the business.
					<br /> <br />
				</li>

				<li>
					Supervision and Responsibility:
					<br />
					The undersigned business acknowledges and agrees that it is responsible for the supervision
					and conduct of its employees, agents, representatives, and volunteers during events.
					<br /> <br />
				</li>

				<li>
					Confidentiality:
					<br />
					The undersigned business agrees to respect and maintain the confidentiality of any sensitive
					information accessed during events, including but not limited to personal information about
					clients, donors, volunteers, and other organizations.
					<br /> <br />
				</li>

				<li>
					Photographic Release:
					<br />
					The undersigned business grants Helper Hive permission to use its name and likeness, as well
					as the likenesses of its employees, agents, representatives, and volunteers, in photographs,
					videos, or other media taken during events for promotional purposes, without compensation or
					further approval.
					<br /> <br />
				</li>

				<li>
					Governing Law:
					<br />
					This release form shall be governed by and construed in accordance with the laws of the Province
					of British Columbia, without regard to its conflict of laws principles.
					<br /> <br />
				</li>

				<li>
					Entire Agreement:
					<br />
					This release form constitutes the entire agreement between the parties and supersedes any prior
					or contemporaneous understandings, whether written or oral, relating to the subject matter
					hereof.
				</li>
			</ol>
		</Text>
	{/if}

	{#if type === 'liabilityVol'}
		<Heading>Volunteer Liability Waiver and Release</Heading>
		<ol class="list-decimal">
			<li>
				Acknowledgment and Assumption of Risk:
				<br />
				I, the undersigned volunteer, acknowledge and understand that my participation in volunteer activities
				with Helper Hive and its affiliates may involve various risks, including but not limited to,
				physical injury, illness, and damage to personal property. I voluntarily assume all such risks,
				whether foreseeable or unforeseeable, and take full responsibility for my participation. I assume
				all liability in the event that I am injured while engaged in volunteer work with Helper Hive.
				<br /> <br />
			</li>

			<li>
				Release and Waiver:
				<br />
				In consideration of being allowed to participate in volunteer activities, I, for myself, my heirs,
				executors, administrators, and assigns, hereby release, waive, and discharge Helper Hive, its
				directors, officers, employees, agents, and volunteers (collectively, "the Released Parties")
				from any and all liability, claims, demands, and causes of action of any kind arising out of
				or related to my participation in volunteer activities, including but not limited to liability
				for personal injury, property damage, or wrongful death, whether caused by the negligence of
				the Released Parties or otherwise.
				<br /> <br />
			</li>

			<li>
				Indemnification:
				<br />
				I agree to indemnify and hold harmless the Released Parties from any and all claims, damages,
				losses, liabilities, and expenses (including attorney's fees) arising out of or related to my
				participation in volunteer activities, including any claims brought by third parties.
				<br /> <br />
			</li>

			<li>
				Confidentiality:
				<br />
				I agree to respect and maintain the confidentiality of any sensitive information I may have access
				to during my volunteer activities, including but not limited to personal information about clients,
				donors, and other volunteers.
				<br /> <br />
			</li>

			<li>
				Photographic Release:
				<br />
				I grant Helper Hive permission to use my likeness in photographs, videos, or other media taken
				during volunteer activities for promotional purposes, without compensation or further approval.
				<br /> <br />
			</li>

			<li>
				Governing Law:
				<br />
				This release form shall be governed by and construed in accordance with the laws of the Province
				of British Columbia, without regard to its conflict of laws principles.
				<br /> <br />
			</li>

			<li>
				Entire Agreement:
				<br />
				This release form constitutes the entire agreement between the parties and supersedes any prior
				or contemporaneous understandings, whether written or oral, relating to the subject matter hereof.
				<br /> <br />
			</li>
		</ol>
	{/if}
</div>

<style lang="postcss">
	ol {
		margin-left: 1.5rem;
	}

	.alpha {
		list-style-type: lower-alpha;
	}
</style>
