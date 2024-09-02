<script lang="ts">
	import NavBar from '$lib/Components/NavBar.svelte';
	import Section from '$lib/Components/Text/Section.svelte';
	import Heading from '$lib/Components/Text/Heading.svelte';
	import Text from '$lib/Components/Text/Text.svelte';
	import Pencil from 'svelte-material-icons/Pencil.svelte';
	import type { Event } from '$lib/Types/Events';
	import EventsContainer from '$lib/Components/EventsContainer.svelte';

	let profilePicSrc = 'https://cdn-icons-png.freepik.com/512/4032/4032866.png';
	let name = 'Jess Murray';
	let isCurrentUser = true;
	let bio =
		'Adventurous soul, avid learner, and always up for a good laugh. Living life one moment at a time.';
	let completedHours = 31;

	let events: Event[] = [
		{
			id: 1,
			img: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg',
			title: "1 World Children's Day",
			date: new Date(),
			organization: {
				id: 1,
				name: 'The City of Vancouver',
				logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s'
			},
			location: 'Vancouver, BC 1455 Quebec St'
		},
		{
			id: 1,
			img: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg',
			title: "2 World Children's Day",
			date: new Date(),
			organization: {
				id: 1,
				name: 'The City of Vancouver',
				logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s'
			},
			location: 'Vancouver, BC 1455 Quebec St'
		},
		{
			id: 1,
			img: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg',
			title: "3 World Children's Day",
			date: new Date(),
			organization: {
				id: 1,
				name: 'The City of Vancouver',
				logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s'
			},
			location: 'Vancouver, BC 1455 Quebec St'
		},
		{
			id: 1,
			img: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg',
			title: "4 Science World Children's Day",
			date: new Date(),
			organization: {
				id: 1,
				name: 'The City of Vancouver',
				logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s'
			},
			location: 'Vancouver, BC 1455 Quebec St'
		},
		{
			id: 1,
			img: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg',
			title: "5 Science World Children's Day",
			date: new Date(),
			organization: {
				id: 1,
				name: 'The City of Vancouver',
				logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s'
			},
			location: 'Vancouver, BC 1455 Quebec St'
		},
		{
			id: 1,
			img: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg',
			title: "1 World Children's Day",
			date: new Date(),
			organization: {
				id: 1,
				name: 'The City of Vancouver',
				logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s'
			},
			location: 'Vancouver, BC 1455 Quebec St'
		},
		{
			id: 1,
			img: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg',
			title: "2 World Children's Day",
			date: new Date(),
			organization: {
				id: 1,
				name: 'The City of Vancouver',
				logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s'
			},
			location: 'Vancouver, BC 1455 Quebec St'
		},
		{
			id: 1,
			img: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg',
			title: "5 Science World Children's Day",
			date: new Date(),
			organization: {
				id: 1,
				name: 'The City of Vancouver',
				logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s'
			},
			location: 'Vancouver, BC 1455 Quebec St'
		},
		{
			id: 1,
			img: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg',
			title: "1 World Children's Day",
			date: new Date(),
			organization: {
				id: 1,
				name: 'The City of Vancouver',
				logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s'
			},
			location: 'Vancouver, BC 1455 Quebec St'
		},
		{
			id: 1,
			img: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg',
			title: "2 World Children's Day",
			date: new Date(),
			organization: {
				id: 1,
				name: 'The City of Vancouver',
				logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s'
			},
			location: 'Vancouver, BC 1455 Quebec St'
		}
	];

	let hours = [
		{
			organization: 'The City of Vancouver',
			logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s',
			event: 'Science World Day',
			date: 'August 2, 2024',
			time: '7:30 AM to 8:30 AM',
			hours: 1.0,
			status: 'Verified'
		},
		{
			organization: 'The City of Vancouver',
			logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s',
			event: 'Science World Day',
			date: 'August 2, 2024',
			time: '7:30 AM to 8:30 AM',
			hours: 1.0,
			status: 'Not Verified'
		},
		{
			organization: 'The City of Vancouver',
			logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s',
			event: 'Science World Day',
			date: 'August 2, 2024',
			time: '7:30 AM to 8:30 AM',
			hours: 1.0,
			status: 'Verified'
		},
		{
			organization: 'The City of Vancouver',
			logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s',
			event: 'Science World Day',
			date: 'August 2, 2024',
			time: '7:30 AM to 8:30 AM',
			hours: 1.0,
			status: 'Not Verified'
		},
		{
			organization: 'The City of Vancouver',
			logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s',
			event: 'Science World Day',
			date: 'August 2, 2024',
			time: '7:30 AM to 8:30 AM',
			hours: 1.0,
			status: 'Verified'
		},
		{
			organization: 'The City of Vancouver',
			logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s',
			event: 'Science World Day',
			date: 'August 2, 2024',
			time: '7:30 AM to 8:30 AM',
			hours: 1.0,
			status: 'Not Verified'
		}
	];

	let showAllUpcoming = false;
	let showAllPast = false;
	let showAllHours = false;

	const toggleShowAllUpcoming = () => (showAllUpcoming = !showAllUpcoming);
	const toggleShowAllPast = () => (showAllPast = !showAllPast);
	const toggleShowAllHours = () => (showAllHours = !showAllHours);

	// Computed variables
	$: upcomingEventsToShow = showAllUpcoming ? events : events.slice(0, 8);
	$: pastEventsToShow = showAllPast ? events : events.slice(0, 8);
	$: hoursToShow = showAllHours ? hours : hours.slice(0, 2);
</script>

<NavBar />

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
		disabled={events.length <= 8 && !showAllUpcoming}
	>
		{showAllUpcoming && events.length > 2 ? 'Show Less' : 'More'}
	</button>
</div>

<!-- Hours Section -->
<div class="ml-10 mt-2 p-8 mr-10">
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
						<img src={hour.logo} alt="Logo" class="inline-block h-6 w-6 mr-1 rounded-full" />
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
</div>

<!-- Past Events Section -->
<div class="ml-10 mt-2 p-8 mr-10">
	<Heading>Your Past Events</Heading>
	<div class="mt-4">
		<EventsContainer events={pastEventsToShow} />
	</div>
	<button
		class="moreButton mt-4"
		on:click={toggleShowAllPast}
		disabled={events.length <= 8 && !showAllPast}
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
