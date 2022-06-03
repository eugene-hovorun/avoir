<script lang="ts">
  import type { AppDrawerItem } from "$lib/app";
  import { Icon } from "$lib/app";
  import clsx from "clsx";

  export let drawerItem: AppDrawerItem;
  export let active: boolean = false;
  export let isMinified: boolean = false;

  const handleClick = (event: MouseEvent) => {
    if (drawerItem.click || drawerItem.locked) {
      event.preventDefault();
    }

    if (drawerItem.click) {
      drawerItem.click();
    }
  };

  const transition = "duration-200 transition-colors";

  $: itemClasses = clsx({
    "bg-text-400 text-white": active,
    "text-text-200 hover:bg-dark-100": !active,
    "relative h-12 px-4 flex items-center text-sm": true,
    rounded: !isMinified,
    "cursor-pointer": !drawerItem.locked,
  });
</script>

<a
  class="{itemClasses} {transition}"
  href={drawerItem.to}
  on:click={handleClick}
>
  {#if drawerItem.icon}
    <span class="block mr-2 {transition}">
      <Icon name={drawerItem.icon} />
    </span>
  {/if}

  {#if !isMinified}
    <span class={`font-medium truncate ${transition}`}>
      {drawerItem.text}
    </span>
  {/if}
</a>
