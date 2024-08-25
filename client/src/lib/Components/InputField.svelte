<!--
Usage:
<InputField
  id="id"
  label="Text"
  placeholder="Text"
  bind:value={value}
  type="phone, date, or password" // optional, default is text 
  invalid={ boolean check for invalid input } // highlights the field when true
  onInput={ event for on:input, on:change, onChange }
/>
-->

<script>
  import Text from '$lib/Components/Text/Text.svelte';
  import EyeOutline from 'svelte-material-icons/EyeOutline.svelte';
  import EyeOffOutline from 'svelte-material-icons/EyeOffOutline.svelte';
  import Flatpickr from 'svelte-flatpickr';
  import 'flatpickr/dist/flatpickr.css';

  export let label = '';
  export let placeholder = '';
  export let value = '';
  export let invalid = false;
  export let onInput = () => {};
  export let showPassword = false;
  export let type = 'text';
  export let id = '';
  export let eyePosY = -40; // Pwd eye position, default -40%

  const handleInput = (event) => {
    if (type === 'phone') {
      const input = event.target.value;
      const formattedInput = input.replace(/[^0-9\s\+\(\)\-]/g, '');
      value = formattedInput;
    } else {
      value = event.target.value;
    }
    onInput(event);
  };

  const flatpickrOptions = {
    dateFormat: "d/m/Y",
    minDate: "01/01/1900",
    onChange: (selectedDates, dateStr, instance) => {
      value = dateStr;
      handleInput({ target: { value: dateStr } });
    }
  };
</script>

<style>
  .input-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .input-wrapper input {
    padding-right: 30px;
  }

  .toggle-password {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(var(--eye-pos-y, 0%));
    border: none;
    background: none;
    cursor: pointer;
  }
</style>

<div class="mb-4">
  <label for={id}>
    <Text class="smallText">{label}</Text>
  </label>
  <div class="input-wrapper">
    {#if type === 'password'}
      {#if showPassword}
        <input
          id={id}
          type="text"
          bind:value={value}
          placeholder={placeholder}
          class="mt-1 p-2 w-full bg-placeholderGray border-none rounded text {invalid ? 'bg-tagYellow text-altTextBrown placeholder-altTextBrown' : ''}"
          on:input={handleInput}
          on:change={handleInput}
        />
      {:else}
        <input
          id={id}
          type="password"
          bind:value={value}
          placeholder={placeholder}
          class="mt-1 p-2 w-full bg-placeholderGray border-none rounded text {invalid ? 'bg-tagYellow text-altTextBrown placeholder-altTextBrown' : ''}"
          on:input={handleInput}
          on:change={handleInput}
        />
      {/if}
      <button
        type="button"
        class="toggle-password"
        tabindex="-1"
        on:mousedown={() => showPassword = true}
        on:mouseup={() => showPassword = false}
        on:mouseleave={() => showPassword = false}
        style="--eye-pos-y: {eyePosY}%"
      >
        {#if showPassword}
          <EyeOutline class="text-altTextGray" />
        {:else}
          <EyeOffOutline class="text-altTextGray" />
        {/if}
      </button>
    {:else if type === 'phone'}
      <input
        id={id}
        type="text"
        bind:value={value}
        placeholder={placeholder}
        class="mt-1 p-2 w-full bg-placeholderGray border-none rounded text {invalid ? 'bg-tagYellow text-altTextBrown placeholder-altTextBrown' : ''}"
        on:input={handleInput}
        on:change={handleInput}
      />
    {:else if type === 'date'}
      <Flatpickr
        id={id}
        bind:value={value}
        placeholder={placeholder}
        options={flatpickrOptions}
        class="mt-1 p-2 w-full bg-placeholderGray border-none rounded text {invalid ? 'bg-tagYellow text-altTextBrown placeholder-altTextBrown' : ''}"
      />
    {:else}
      <input
        id={id}
        type="text"
        bind:value={value}
        placeholder={placeholder}
        class="mt-1 p-2 w-full bg-placeholderGray border-none rounded text {invalid ? 'bg-tagYellow text-altTextBrown placeholder-altTextBrown' : ''}"
        on:input={handleInput}
        on:change={handleInput}
      />
    {/if}
  </div>
</div>
