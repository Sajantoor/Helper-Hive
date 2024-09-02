<script lang="ts">
	import EventPage from '$lib/Components/EventPage/EventPage.svelte';
	import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';

	export let data;

	function formatTime(hours: number, minutes: number): string {
		const period = hours >= 12 ? 'PM' : 'AM';
		const formattedHours = hours % 12 || 12; // Convert to 12-hour format
		const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure two digits for minutes
		return `${formattedHours}:${formattedMinutes} ${period}`;
	}

	function getTime(start: Date, end: Date): string {
		const startHours = start.getHours();
		const startMinutes = start.getMinutes();
		const endHours = end.getHours();
		const endMinutes = end.getMinutes();

		const formattedStart = formatTime(startHours, startMinutes);
		const formattedEnd = formatTime(endHours, endMinutes);

		return `${formattedStart} - ${formattedEnd}`;
	}
</script>

<button class="absolute" on:click={() => window.history.back()}>
	<ArrowLeft size={20} class="ml-10 mt-10 absolute" />
</button>

<EventPage
	id={data._id}
	eventTitle={data.name}
	eventImage={data.details.photo}
	tags={data.details.tags}
	files={data.details.files}
	spotsAvailable={data.registration.totalSpots - data.registration.totalRegistered}
	startDate={data.date.startDay}
	endDate={data.date.endDay}
	location={data.details.location}
	hours={getTime(data.date.startTime, data.date.endTime)}
	hostImage={data.organization.logo}
	hostName={data.organization.name}
	eventDescription={data.details.description}
	preShiftInfo={data.details.preShiftInfo}
/>
