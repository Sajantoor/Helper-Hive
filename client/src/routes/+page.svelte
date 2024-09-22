<script lang="ts">
	import Section from '$lib/Components/Text/Section.svelte';
	import LargeHeading from '$lib/Components/Text/LargeHeading.svelte';
	import LargeText from '$lib/Components/Text/LargeText.svelte';
	import Heading from '$lib/Components/Text/Heading.svelte';
	import Text from '$lib/Components/Text/Text.svelte';
	import logoSrc from '$lib/assets/Logo.png';
	import EventScroller from '$lib/Components/EventScroller.svelte';

	export let data;

	let events = data.events;
</script>

<div class="header">
	<div class="flex items-center">
		<img src={logoSrc} alt="Logo" class="h-16 ml-5" />

		<Text class="ml-5">Helper Hive</Text>
	</div>

	<div class="flex items-center gap-5">
		<!-- <Text class="ml-5">Home</Text>
		<Text class="ml-5">About Us</Text>
		<Text class="ml-5">Our Team</Text>
		<Text class="ml-5">Sponsor</Text>
		<Text class="ml-5">Contact</Text> -->

		<a href="/login">
			<button class="ml-5 bg-transparent border border-black py-2 px-4 rounded-full">
				<Text>Login</Text>
			</button>
		</a>
	</div>
</div>

<div class="join-container">
	<LargeHeading>Start Volunteering Today!</LargeHeading>
	<Text class="w-1/3 text-center mt-2">
		Dive into the hive of local opportunities, pick what sparks your curiosity, and join in—it's as
		easy as gathering nectar!

		<br /> <br />
		Thank you for your interest in Helper Hive! We are currently not launched yet. Please check back
		later.
	</Text>
	<a href="/registration/volunteer">
		<button class="bg-primaryYellow text-black py-2 px-4 mt-8 rounded-lg">
			<Heading>JOIN NOW</Heading>
		</button>
	</a>
</div>

<div class="impact-container">
	<Section class="text-center">Our Impact</Section>
	<div class="hexagons">
		<div class="hexagon">
			<Section class="hex-text">
				<div class="hex-content">X<br />Volunteers</div>
			</Section>
		</div>
		<div class="hexagon">
			<Section class="hex-text">
				<div class="hex-content">X<br />Organizations</div>
			</Section>
		</div>
		<div class="hexagon">
			<Section class="hex-text">
				<div class="hex-content">X<br />Hours Volunteered</div>
			</Section>
		</div>
	</div>
</div>

<div class="mb-8">
	<Section class="text-center mb-8">Upcoming Events</Section>
	<EventScroller events={events.slice(0, 6)} />
</div>

<div class="mb-16">
	<Section class="text-center">Join a Community</Section>

	<div class="flex justify-center">
		<Text class="text-center w-5/6 mt-8">
			Join our hive, where volunteers and organizations come together for more than just service.
			Experience streamlined volunteering, build lasting community connections, and network with
			local leaders. Together, let's create a buzzing new volunteer community!
		</Text>
	</div>
</div>

<div>
	<Section class="text-center">Frequently Asked Questions</Section>
	<div class="faq-item">
		<LargeText class="font-bold">What is Helper Hive?</LargeText>
		<Text>
			Helper Hive Volunteer Network is a vibrant community hub where you can easily find flexible
			drop-in volunteer opportunities that fit into your busy schedule. Our platform offers a
			variety of unique roles with respected organizations, removing the hassle of lengthy
			onboarding and training. At Helper Hive, you can engage freely and flexibly in activities that
			spark your passion, whenever it suits you. Explore local opportunities, sign up effortlessly,
			and bring along your friends, family, and neighbors. Together, let's BEE more involved and
			make a positive impact in our community!
		</Text>
	</div>
	<div class="faq-item">
		<LargeText class="font-bold">Who can join?</LargeText>
		<Text>
			Helper Hive Volunteer Network warmly welcomes individuals from all walks of life to join our
			community. We believe that everyone has unique skills and perspectives to offer, and we
			encourage people of all ages and backgrounds to sign up and contribute. For children under the
			age of 16, we require parental permission to ensure a supportive and safe volunteer
			experience. By embracing diversity and inclusively, we strive to create meaningful
			opportunities for all to engage in service and make a positive impact together.
		</Text>
	</div>
	<div class="faq-item">
		<LargeText class="font-bold">How do I join?</LargeText>
		<Text>
			Joining Helper Hive is easy! Just click the "Register" or "Login" buttons at the top of the
			page to get started. You'll need to create an account using a valid email address, and once
			your email is verified, you can optionally set up your user profile. After that, you'll have
			full access to all the opportunities on our network. It's that simple—sign up and you're ready
			to dive into your volunteering journey!
		</Text>
	</div>
	<div class="faq-item">
		<LargeText class="font-bold">Will my hours be recorded?</LargeText>
		<Text>
			Your volunteer hours will be automatically tracked on our website for your convenience. Once
			you sign up for an event, you can view your pending hours on your personal user dashboard.
			After your hours are approved, they will be updated to a verified status and added to your
			total count. You'll see a comprehensive breakdown of your hours, including the total completed
			on Helper Hive Network, as well as a detailed view by organization and event. This system
			ensures you have a clear and accurate record of all your volunteering activities.
		</Text>
	</div>
</div>

<div class="footer-container">
	<!-- Container for gradient -->
	<div class="flex justify-center pt-32">
		<a href="/registration/volunteer">
			<button class="bg-black text-white py-4 px-12 rounded-lg"><Heading>JOIN NOW</Heading></button>
		</a>
	</div>
	<div class="footer">
		<div>
			<Heading class="mb-4">Got Questions?</Heading>

			<a href="mailto:helperhivevolunteer@gmail.com">
				<Text class="text-orange-800">helperhivevolunteer@gmail.com</Text>
			</a>

			<a href="https://instagram.com/helper.hive">
				<Text class="text-orange-800">@helper.hive</Text>
			</a>
			<a href="https://github.com/Sajantoor/Helper-Hive/issues">
				<!-- make the it a blue color -->

				<Text class="text-orange-800">Report a Bug</Text>
			</a>
		</div>

		<div class="flex items-center">
			<Text class="text-center">Helper Hive Volunteer Network</Text>
			<img src={logoSrc} alt="Logo" class="h-16 ml-5" />
		</div>
	</div>
</div>

<style lang="postcss">
	.header {
		margin-top: 1rem;
		margin-right: 4rem;
		display: flex;
		justify-content: space-between;
	}

	.join-container {
		margin-top: 8rem;
		margin-right: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.impact-container {
		margin-top: 8rem;
		padding-bottom: 16rem;
		background: linear-gradient(to bottom, white, #fabd22, white);
	}

	.hexagons {
		display: flex;
		justify-content: center;
		margin-top: 4rem;
		gap: 4rem; /* Space between hexagons */
	}

	.hexagon {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 250px; /* adjust to control the size  */
		aspect-ratio: 1 / cos(30deg);
		clip-path: polygon(50% -50%, 100% 50%, 50% 150%, 0 50%);
		background: #ffffff;
	}

	.hex-content {
		text-align: center;
		padding: 10px;
		word-wrap: break-word;
		word-break: break-word;
	}

	.faq-item {
		margin: 4rem auto;
		width: 80%;
	}

	.footer {
		margin: 0 auto;
		display: flex;
		width: 90%;
		justify-content: space-between;
	}

	.footer-container {
		padding-bottom: 2rem;
		margin-bottom: 0;
		background: linear-gradient(to bottom, white, #fabd22);
	}
</style>
