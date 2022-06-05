<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import {
    NavigationDrawer,
    BaseLayout,
    AppBar,
    useMediaQuery,
    breakpoint,
  } from "$lib/app";
  import drawerItems from "./navigation";
  import "../app.css";

  let drawerOffset = 0;
  let isMobile = false;
  let isNavigationDrawerActive = true;

  const toggleNavigationDrawer = () => {
    isNavigationDrawerActive = !isNavigationDrawerActive;
  };

  const goHome = () => goto("/");

  onMount(() => {
    useMediaQuery(breakpoint.xs).subscribe((xs) => {
      isMobile = xs;
      isNavigationDrawerActive = !isMobile;
    });
  });
</script>

<BaseLayout {drawerOffset}>
  <AppBar
    slot="app-bar"
    left={drawerOffset}
    showDrawerButton={isMobile}
    on:toggleDrawer={toggleNavigationDrawer}
  >
    <span slot="left">Page title</span>
  </AppBar>

  <NavigationDrawer
    slot="drawer-left"
    {drawerItems}
    pathname={$page.url.pathname}
    isTemporary={isMobile}
    bind:isDrawerActive={isNavigationDrawerActive}
    bind:drawerOffset
    on:click={goHome}
  />

  <slot />
</BaseLayout>
