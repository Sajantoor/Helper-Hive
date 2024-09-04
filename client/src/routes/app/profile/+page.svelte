<script lang="ts">
	import NavBar from '$lib/Components/NavBar.svelte';
	import Section from '$lib/Components/Text/Section.svelte';
	import Heading from '$lib/Components/Text/Heading.svelte';
	import Text from '$lib/Components/Text/Text.svelte';
	import Pencil from 'svelte-material-icons/Pencil.svelte';
	import type { EventContent } from '$lib/Types/Events';
	import EventsContainer from '$lib/Components/EventsContainer.svelte';

	export let data;

	let profilePicSrc = data.profile.profilePicture;
	let name = data.profile.name;
	let isCurrentUser = true;
	let bio = '';
	let completedHours = 0;

	let upcomingEvents: EventContent[] = data.futureEvents;
	let pastEvents: EventContent[] = data.pastEvents;

	let hours = data.pastEvents;

	let showAllUpcoming = false;
	let showAllPast = false;
	let showAllHours = false;

	const toggleShowAllUpcoming = () => (showAllUpcoming = !showAllUpcoming);
	const toggleShowAllPast = () => (showAllPast = !showAllPast);
	const toggleShowAllHours = () => (showAllHours = !showAllHours);

	// Computed variables
	$: upcomingEventsToShow = showAllUpcoming ? upcomingEvents : upcomingEvents.slice(0, 8);
	$: pastEventsToShow = showAllPast ? pastEvents : pastEvents.slice(0, 8);
	$: hoursToShow = showAllHours ? hours : hours.slice(0, 2);
</script>

<div class="ml-10 mt-2 p-8 mr-10 pb-28">
	{#if isCurrentUser}
		<div class="editProfile float-right">
			<button class="editProfile flex border-2 rounded-full p-2 pl-4 pr-4">
				<Pencil size={25} />
				<Text class="ml-2">Edit Profile</Text>
			</button>
		</div>
	{/if}

	<img
		src={profilePicSrc}
		alt="Profile"
		class="h-40 w-40 mr-10 rounded-full object-cover float-left"
	/>
	<Section class="block">{name}</Section>

	{#if bio}
		<Text class="bioText">{bio}</Text>
	{/if}

	{#if completedHours}
		<div class="float-right">
			<Heading>Completed Hours:</Heading>
			<Heading class="float-right text-primaryYellow">{completedHours}</Heading>
		</div>
	{/if}
</div>

<div class="sectionMarker"></div>

<!-- Upcoming Events Section -->
<div class="ml-10 mt-2 p-8 mr-10">
	<Heading class="mt-4">Your Upcoming Events</Heading>
	<Text class="mt-4">
		Reminder to view the Important Pre-Shift Information listed on each event page prior to your
		shift.
	</Text>
	<div class="mt-4">
		<EventsContainer events={upcomingEventsToShow} />
	</div>
	<button
		class="moreButton mt-4"
		on:click={toggleShowAllUpcoming}
		disabled={upcomingEvents.length <= 8 && !showAllUpcoming}
	>
		{showAllUpcoming && upcomingEvents.length > 2 ? 'Show Less' : 'More'}
	</button>
</div>

<!-- Hours Section -->
<!-- <div class="ml-10 mt-2 p-8 mr-10">
	<Heading>Your Hours</Heading>
	<table class="table-auto w-full">
		<thead>
			<tr>
				<th>Organization</th>
				<th>Event</th>
				<th>Date</th>
				<th>Time</th>
				<th>Hours</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			{#each hoursToShow as hour}
				<tr>
					<td>
						<img
							src={hour.organization.logo}
							alt="Logo"
							class="inline-block h-6 w-6 mr-1 rounded-full"
						/>
						{hour.organization}
					</td>
					<td>{hour.event}</td>
					<td>{hour.date}</td>
					<td>{hour.time}</td>
					<td>{hour.hours}</td>
					<td class="statusCell">
						<span
							class:verified={hour.status === 'Verified'}
							class:notVerified={hour.status === 'Not Verified'}
						>
							{hour.status}
						</span>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<button
		class="moreButton mt-6"
		on:click={toggleShowAllHours}
		disabled={hours.length <= 2 && !showAllHours}
	>
		{showAllHours ? 'Show Less' : 'More'}
	</button>
</div> -->

<!-- Past Events Section -->
<div class="ml-10 mt-2 p-8 mr-10">
	<Heading>Your Past Events</Heading>
	<div class="mt-4">
		<EventsContainer events={pastEventsToShow} />
	</div>
	<button
		class="moreButton mt-4"
		on:click={toggleShowAllPast}
		disabled={pastEvents.length <= 8 && !showAllPast}
	>
		{showAllPast ? 'Show Less' : 'More'}
	</button>
</div>

<style lang="postcss">
	.sectionMarker {
		width: 90%;
		margin: 0 auto;
		border-bottom: 1px solid #999999;
	}
	.moreButton {
		background-color: #fabd22;
		border: none;
		padding: 10px 30px;
		border-radius: 20px;
		color: black;
		font-weight: bold;
		cursor: pointer;
	}
	button:disabled {
		cursor: not-allowed;
	}
	.table-auto {
		margin-top: 1%;
		border-radius: 10px;
		overflow: hidden;
	}

	.table-auto th {
		padding-left: 3px;
		background-color: #fabd22;
		color: black;
		padding: 10px;
		text-align: left;
		border: 1px solid #ddd;
		font-weight: normal;
	}

	.table-auto td {
		border: 1px solid #ddd;
		padding: 10px;
	}
	.statusCell span {
		padding: 10px 20px;
		border-radius: 20px;
		color: black;

		display: inline-block;
	}

	.verified {
		background-color: #a6ffb0;
	}

	.notVerified {
		background-color: #ffa6a6;
	}
</style>
