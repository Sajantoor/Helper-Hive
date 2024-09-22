<script lang="ts">
	import Section from '$lib/Components/Text/Section.svelte';
	import Heading from '$lib/Components/Text/Heading.svelte';
	import Text from '$lib/Components/Text/Text.svelte';
	import Pencil from 'svelte-material-icons/Pencil.svelte';
	import type { EventResponse } from '$common/types/eventResponse';
	import EventsContainer from '$lib/Components/EventsContainer.svelte';
	import { profileStore } from '$lib/stores/profileStore.js';

	export let data;

	let avatarSrc = data.profile.avatar;
	let name = data.profile.name;
	let isCurrentUser = true;
	let bio = '';
	let completedHours = 0;

	let upcomingEvents: EventResponse[] = data.futureEvents;
	let pastEvents: EventResponse[] = data.pastEvents;
	let isOrganization = $profileStore?.role === 'organization';

	let hours = data.pastEvents;

	let showAllHours = false;

	// Computed variables
	$: hoursToShow = showAllHours ? hours : hours.slice(0, 2);
</script>

<div class="ml-5 mr-5 desktop:ml-10 desktop:mr-10">
	<!-- Profile section -->
	<div class="mt-2 mb-5 desktop:p-4 flex flex-col desktop:flex-row">
		<div class="flex flex-row w-full">
			<!-- Profile picture  -->
			<div class="max-desktop:mt-2 max-mdlg:w-[32.5%] min-w-36 max-w-48 p-2">
				<img
					src={avatarSrc}
					alt="Profile"
					class="aspect-[1] w-full rounded-full object-cover"
				/>
			</div>
			<!-- Name & bio -->
			<div class="flex-1 p-2 desktop:pl-4">
				<Section class="block">{name}</Section>
				{#if bio}
					<Text class="desktop:w-[90%]">{bio}</Text>
				{/if}
			</div>
		</div>

		<div class="flex flex-row-reverse max-desktop:mt-2 justify-between desktop:flex-col desktop:w-1/4">
			<!-- Edit profile -->
			<div class="pl-2 pt-2 pb-2 desktop:pt-4 desktop:ml-auto">
				{#if isCurrentUser}
					<button class="editProfile flex border-2 rounded-full p-2 pl-4 pr-4">
						<Pencil size={25} class="mt-auto mb-auto"/>
						<Text class="ml-2">Edit Profile</Text>
					</button>
				{/if}
			</div>
			<!-- Completed hours -->
			<div class="p-2 content-center desktop:ml-auto">
				{#if completedHours}
					<div class="flex">
						<Heading class="desktop:text-right">
							Completed Hours:
							<a class="text-primaryYellow">{completedHours}</a>
							</Heading>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div class="sectionMarker"></div>

	<!-- Upcoming Events Section -->
	<div class="mt-2 p-8">
		<Heading class="mt-4">Your Upcoming Events</Heading>
		{#if isOrganization}
			<Text class="mt-4">
				Please ensure that all important pre-shift information is posted on the event page before the
				scheduled shift to help volunteers arrive fully prepared.
			</Text>
		{:else}
			<Text class="mt-4">
				Reminder to view the important Pre-Shift Information listed on each event page prior to your
				shift.
			</Text>
		{/if}
		<div class="mt-4">
			<EventsContainer events={upcomingEvents} />
		</div>
	</div>

	<!-- Hours Section -->
	<!-- <div class="mt-2 p-8">
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
	<div class="mt-2 p-8">
		<Heading>Your Past Events</Heading>
		<div class="mt-4">
			<EventsContainer events={pastEvents} />
		</div>
	</div>
</div>

<style lang="postcss">
	.sectionMarker {
		width: 95%;
		margin: 0 auto;
		border-bottom: 1px solid #999999;
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
