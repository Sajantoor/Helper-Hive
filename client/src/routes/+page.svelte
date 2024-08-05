<script>
	import EventCard from '$lib/Components/EventCard.svelte';
	import CalendarEvent from '$lib/Components/CalendarEvent.svelte';
</script>

<EventCard
	img="https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg"
	title="Science World Children's Day"
	date={new Date()}
	organization="The City of Vancouver"
	location="Vancouver, BC 1455 Quebec St"
	organizationLogo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s"
/>

<CalendarEvent
	img="https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg"
	title="Science World Children's Day"
	date={new Date()}
	location="Vancouver, BC 1455 Quebec St"
/>

<!-- make the date today + a day -->
<CalendarEvent
	img="https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg"
	title="Science World Children's Day way longer"
	date={new Date(new Date().getTime() + 26 * 24 * 60 * 60 * 1000)}
	location="Vancouver, BC 1455 Quebec Stdfadsfl;kjadskf jkda;fjds"
/>
