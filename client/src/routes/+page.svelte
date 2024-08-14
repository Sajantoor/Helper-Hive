<script lang="ts">
	import EventCard from '$lib/Components/EventCard.svelte';
	import EventScroller from '$lib/Components/EventScroller.svelte';
	import CalendarEvent from '$lib/Components/CalendarEvent.svelte';
	import EventPage from '$lib/Components/event_page/EventPage.svelte';

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

<!-- <EventPage
	eventTitle="Science World Children's Day"
	eventImage="https://assets.simpleviewinc.com/simpleview/image/upload/crm/vancouverbc/Science-World-03-large_7A18828C-0A13-47CD-92DB4404AE5A222C_fb32edf9-a996-4f5f-a2aaa1980fe8d6b7.jpg"
	tags={['tag1', 'tag2', 'tag3']}
	startDate={new Date('2024-01-07')}
	endDate={new Date('2024-01-09')}
	location="Vancouver, BC 1455 Quebec St"
	hours="10am - 5pm"
	hostImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46Pp3V6MJmwjab7ghq7TSOu5COQongTQ83Q&s"
	hostName="The City of Vancouver"
	eventDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan purus vel elit scelerisque faucibus. Vestibulum et suscipit ante. Ut quam elit, mollis vel justo sit amet, viverra varius elit. Pellentesque at augue nec dolor viverra laoreet. Nulla mattis felis ligula, id consectetur nisl ornare at. Morbi bibendum ante non dolor posuere commodo. Maecenas at felis diam. Quisque fermentum auctor ullamcorper. In nunc sapien, consectetur vitae interdum nec, ultrices ac nisl. Vivamus rutrum leo felis, vel maximus neque luctus vitae. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque ac iaculis mi. Morbi eros est, condimentum vel ligula sit amet, iaculis eleifend diam. Sed pretium arcu at velit molestie eleifend. Aenean aliquet mauris porta efficitur consequat. Etiam suscipit at turpis a luctus.Vivamus convallis magna a tellus cursus venenatis. Maecenas dignissim non purus mollis dapibus. Cras lacinia magna id placerat vestibulum. Ut elementum neque quis venenatis condimentum. Phasellus dui tellus, consequat in nisi vel, pulvinar elementum nisi. Proin interdum urna non orci congue pretium. Nulla orci diam, posuere sed dolor eget, eleifend accumsan felis. Vivamus lacinia iaculis faucibus. Fusce varius est vitae diam pharetra varius. Etiam bibendum dictum tempus.Nulla imperdiet massa ligula, vitae cursus ante venenatis vel. Cras ornare tempor tortor eget maximus. Curabitur quis hendrerit felis. Morbi luctus ante vitae nunc vulputate, nec commodo ante volutpat. Fusce ultricies porta mi, ac vulputate erat posuere et. Vestibulum vehicula, enim ultrices aliquam aliquet, est lacus rutrum tortor, at faucibus libero velit id metus. Integer consectetur vitae neque at condimentum. Nunc ultricies iaculis mi aliquet rutrum. Sed porttitor odio id semper mollis. Curabitur at mi sit amet erat congue tempor. Duis faucibus, turpis id aliquet porta, turpis ligula vulputate metus, non interdum purus arcu eu eros. Pellentesque malesuada ultricies ipsum, a volutpat justo porttitor eget. Vestibulum nec ante leo. Quisque sit amet tristique odio. Cras et feugiat turpis."
	preShiftInfo="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan purus vel elit scelerisque faucibus. Vestibulum et suscipit ante. Ut quam elit, mollis vel justo sit amet, viverra varius elit. Pellentesque at augue nec dolor viverra laoreet. Nulla mattis felis ligula, id consectetur nisl ornare at. Morbi bibendum ante non dolor posuere commodo. Maecenas at felis diam. Quisque fermentum auctor ullamcorper. In nunc sapien, consectetur vitae interdum nec, ultrices ac nisl. Vivamus rutrum leo felis, vel maximus neque luctus vitae. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque ac iaculis mi. Morbi eros est, condimentum vel ligula sit amet, iaculis eleifend diam. Sed pretium arcu at velit molestie eleifend. Aenean aliquet mauris porta efficitur consequat. Etiam suscipit at turpis a luctus. Vivamus convallis magna a tellus cursus venenatis. Maecenas dignissim non purus mollis dapibus. Cras lacinia magna id placerat vestibulum. Ut elementum neque quis venenatis condimentum. Phasellus dui tellus, consequat in nisi vel, pulvinar elementum nisi. Proin interdum urna non orci congue pretium. Nulla orci diam, posuere sed dolor eget, eleifend accumsan felis. Vivamus lacinia iaculis faucibus. Fusce varius est vitae diam pharetra varius. Etiam bibendum dictum tempus."
/> -->
