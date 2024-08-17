<script lang="ts">
	import EventScroller from '$lib/Components/EventScroller.svelte';
	import CalendarEvent from '$lib/Components/CalendarEvent.svelte';

	import type { Event } from '$lib/Types/Events';

	let events: Event[] = [
		{
			id: 1,
			img: 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg',
			title: "Science World Children's Day",
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
			title: "4 World Children's Day",
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
			title: "5 World Children's Day",
			date: new Date(),
			organization: {
				id: 1,
				name: 'The City of Vancouver',
				logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s'
			},
			location: 'Vancouver, BC 1455 Quebec St'
		}
	];
</script>

<EventScroller {events} />

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
