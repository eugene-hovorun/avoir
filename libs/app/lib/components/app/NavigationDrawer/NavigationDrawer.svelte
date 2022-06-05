<script lang="ts">
  import clsx from "clsx";
  import type { AppDrawerItem } from "../../../types";
  import BaseDrawer from "../BaseDrawer.svelte";
  import DrawerLogo from "./DrawerLogo.svelte";
  import DrawerListItem from "./DrawerListItem.svelte";

  /**
   * A temporary drawer sits above the app and uses an overlay to darken the background.
   * type {boolean}
   * @default false
   */
  export let isTemporary = false;

  /**
   * Controls whether the drawer is visible or hidden.
   * type {boolean}
   * @default true
   */
  export let isDrawerActive = false;

  /**
   * Reflects the drawer width to use as content offset in parent node.
   * type {number}
   */
  export let drawerOffset = 0;

  /**
   * Navigation items.
   * type {AppDrawerItem[]}
   * @default []
   */
  export let drawerItems: AppDrawerItem[] = [];

  let isMinified = false;
  let toggle: () => void;

  $: titleClasses = clsx({
    "w-0 opacity-0": isMinified,
    "pl-4 pb-1 pt-3 text-xs	text-dark-600": true,
  });

  $: isDrawerMinified = isMinified && !isTemporary;

  const toggleDrawer = () => toggle();
</script>

<BaseDrawer
  {isTemporary}
  bind:isActive={isDrawerActive}
  bind:isMinified
  bind:drawerOffset
  bind:toggle
>
  <slot name="prepend">
    <DrawerLogo isMinified={isDrawerMinified} on:toggle={toggleDrawer} />
  </slot>

  {#each drawerItems as item, index}
    <div class={titleClasses}>{item.text}</div>

    {#each item.subItems as subItem, subIndex}
      <DrawerListItem
        drawerItem={subItem}
        active={!index && subIndex === 1}
        isMinified={isDrawerMinified}
      />
    {/each}
  {/each}
</BaseDrawer>
