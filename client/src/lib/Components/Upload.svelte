<script lang="ts">
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import FileDropzone from 'svelte-file-dropzone';
  import UploadIcon from 'svelte-material-icons/TrayArrowUp.svelte';

  export let type: 'image' | 'file' = 'file';
  export let placeholder = 'Drop files here or click to upload';
  export let restrictions: string[] = [];
  const dispatch = createEventDispatcher();

  let mounted = false;

  onMount(() => {
    mounted = true;
  });

  const handleDrop = (files: File[]) => {
    dispatch('drop', { files });
  };
</script>

<style>
  .dropzone {
    @apply rounded border-2 border-dashed border-gray-400 bg-transparent text-gray-500 flex items-center justify-center;
  }
  .dropzone:hover {
    @apply border-solid;
  }
</style>

{#if mounted}
  <div class="dropzone p-4">
    <FileDropzone
      accept={type === 'image' ? 'image/*' : '*'}
      on:drop={handleDrop}
      {restrictions}
    >
      <div class="flex items-center">
        <span>{placeholder}</span>
        {#if type === 'file'}
          <UploadIcon class="ml-2" />
        {/if}
      </div>
    </FileDropzone>
  </div>
{/if}
