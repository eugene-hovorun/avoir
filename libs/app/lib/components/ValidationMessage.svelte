<script lang="ts">
  import { fly } from "svelte/transition";

  export let errorMessage: string | undefined = undefined;
</script>

<span class="block h-4 text-xs text-warning-400 truncate">
  {#if !!errorMessage}
    <span transition:fly>{errorMessage}</span>
  {/if}
</span>
