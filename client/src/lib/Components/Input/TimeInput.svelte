<script lang="ts">
	import SveltyPicker from 'svelty-picker';
	import SmallText from '../Text/SmallText.svelte';

	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let valid = true;
	let touched = false;

	function handleInput() {
		touched = true;
		valid = value ? true : false;
	}
</script>

<div class="w-full">
	<label for="div">
		<SmallText>{label}</SmallText>
	</label>
	<div class="relative inline-block w-full mb-2">
		<SveltyPicker
			{placeholder}
			bind:value
			on:input={handleInput}
			mode="time"
			format="H:i P"
			displayFormat="H:i P"
			manualInput={false}
			inputClasses="mt-1 pl-3 p-2 w-full bg-placeholderGray border-none rounded-lg placeholder:italic
			{touched && !valid && 'bg-tagYellow text-altTextBrown placeholder-altTextBrown'}"
		/>
	</div>
</div>
