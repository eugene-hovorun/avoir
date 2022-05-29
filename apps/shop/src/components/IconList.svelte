<script lang="ts">
  import { iconNames, Icon } from "$lib/app";
  import type { IconName } from "$lib/app";

  // @ts-ignore
  const icons: IconName[] = Object.keys(iconNames);
</script>

<div class="flex flex-wrap p-4 gap-y-8 gap-x-2">
  {#each icons as name}
    <div class="flex flex-col items-center w-32">
      <Icon {name} />
      <span class="scale-75 text-dark-400">{name}</span>
    </div>
  {/each}
</div>
