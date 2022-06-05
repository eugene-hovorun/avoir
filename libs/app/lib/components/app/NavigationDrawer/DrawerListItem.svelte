<script lang="ts">
  import type { AppDrawerItem } from "../../../types";
  import clsx from "clsx";
  import BaseIcon from "../../Icon.svelte";

  /**
   * The app drawer item.
   * @type {AppDrawerItem}
   * @required
   */
  export let drawerItem: AppDrawerItem;
  /**
   * If the user is on the current page of the drawer item.
   * @default false
   */
  export let active: boolean = false;
  /**
   * If the drawer is minified or not.
   * @default false
   */
  export let isMinified: boolean = false;

  const handleClick = (event: MouseEvent) => {
    if (drawerItem.click || drawerItem.locked) {
      event.preventDefault();
    }

    if (drawerItem.click) {
      drawerItem.click();
    }
  };

  $: itemClasses = clsx({
    "bg-gradient text-white": active,
    "text-text-200 hover:bg-dark-100": !active,
    "relative h-12 px-4 flex items-center text-sm": true,
    rounded: !isMinified,
    "cursor-pointer": !drawerItem.locked,
  });
</script>

<a class={itemClasses} href={drawerItem.to} on:click={handleClick}>
  <span class="block mr-2">
    <BaseIcon name={drawerItem.icon} />
  </span>
  {#if !isMinified}
    <span class={`font-medium truncate`}>
      {drawerItem.text}
    </span>
  {/if}
</a>
