<script>
  import { blur } from "svelte/transition";

  export let title = "";
</script>

<div class="relative h-8 whitespace-nowrap text-2xl">
  <div class="opacity-0">{title}</div>
  {#key title}
    <div class="absolute top-0" transition:blur>{title}</div>
  {/key}
</div>
