<script lang="ts">
	import SearchIcon from 'svelte-material-icons/Magnify.svelte';

	let searchQuery = '';
	let iconSize = 22;

	function handleSearch() {
		console.log('Search query:', searchQuery);
	}
</script>

<div class="search-bar">
	<input
		type="text"
		placeholder="Search events"
		bind:value={searchQuery}
		on:keydown={(e) => e.key === 'Enter' && handleSearch()}
	/>
	<button class="icon-container" on:click={handleSearch}>
		<SearchIcon size={iconSize} />
	</button>
</div>

<style>
	.search-bar {
		display: flex;
		align-items: center;
		width: 90%;
		margin: 0 auto;
		position: relative;
	}

	input {
		flex: 1;
		padding: 0.5rem 2.5rem 0.5rem 1rem; /* Add padding-right to make space for the icon */
		background-color: #f4f4f4;
		border-radius: 6px;
		outline: none;
	}

	.icon-container {
		position: absolute;
		right: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f4f4f4;
		border-radius: 6px;
		padding: 0.25rem;
		cursor: pointer;
	}
</style>
