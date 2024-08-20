<script lang="ts">
	import SearchIcon from 'svelte-material-icons/Magnify.svelte';
	let searchQuery = '';
    let iconSize = 22;
	function handleSearch() {
		console.log('Search query:', searchQuery);
	}
</script>

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
		padding: 0.5rem 2.5rem 0.5rem 0.5rem; /* Add padding-right to make space for the icon */
		border: 1px solid #ccc;
		background-color: #F4F4F4;
		border-radius: 6px;
		outline: none;
	}

	.icon-container {
		position: absolute;
		right: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #F4F4F4;
		border-radius: 6px;
		padding: 0.25rem;
		cursor: pointer;
	}
</style>

<div class="search-bar">
	<input
		type="text"
		placeholder="Search events"
		bind:value={searchQuery}
		on:keydown={(e) => e.key === 'Enter' && handleSearch()}
	/>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="icon-container" on:click={handleSearch}>
        <SearchIcon size={iconSize} />
    </div>
</div>
