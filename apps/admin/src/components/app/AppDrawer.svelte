<script lang="ts">
  import { page } from "$app/stores";
  import { drawerItems } from "$components";
  import AppDrawerListItem from "./AppDrawerListItem.svelte";
  import clsx from "clsx";

  const width = 224;
  const transition = "transition-drawer duration-200";

  $: drawerClasses = clsx({
    "w-56 p-4": true,
    "flex flex-col bg-drawer": true,
    "fixed left-0 h-screen overflow-hidden z-4": true,
    "will-change-transform transition-drawer duration-200": true,
  });

  $: titleClasses = clsx({
    "pl-4 pb-1 pt-3 text-xs	text-dark-600": true,
  });
</script>

<div class="foo" style={`width: ${width}px`} />
<aside class={`${drawerClasses} ${transition}`} style={`width: ${width}px`}>
  <slot name="prepend" />

  <div class="h-full py-6 overflow-y-auto overflow-x-hidden overscroll-contain">
    {#each drawerItems as item, index}
      <div class={titleClasses}>{item.text}</div>

      {#if item.subItems}
        {#each item.subItems as subItem}
          <AppDrawerListItem
            drawerItem={subItem}
            active={$page.url.pathname.includes(subItem.to)}
          />
        {/each}
      {/if}
    {/each}
  </div>

  <slot name="append" />
</aside>
