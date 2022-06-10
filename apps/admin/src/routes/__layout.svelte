<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import {
    NavigationDrawer,
    BaseLayout,
    AppButton,
    AppBar,
    MergingTitle,
    useMediaQuery,
    breakpoint,
  } from "$lib/app";
  import drawerItems from "./navigation";
  import { headerState } from "$store";
  import "../app.css";

  let drawerOffset = 0;
  let isMobile = false;
  let isNavigationDrawerActive = true;

  const toggleNavigationDrawer = () => {
    isNavigationDrawerActive = !isNavigationDrawerActive;
  };

  const goHome = () => goto("/");
  const logout = () => goto("/auth");
  const addCategory = () => goto("/category/create");

  onMount(() => {
    useMediaQuery(breakpoint.xs).subscribe((xs) => {
      isMobile = xs;
      isNavigationDrawerActive = !isMobile;
    });
  });
</script>

<BaseLayout {drawerOffset} class="text-text-200">
  <AppBar
    slot="app-bar"
    left={drawerOffset}
    showDrawerButton={isMobile}
    on:toggleDrawer={toggleNavigationDrawer}
  >
    <span slot="left">
      <MergingTitle title={$headerState.pageTitle} />
    </span>

    <span slot="actions">
      <div class="flex gap-2">
        {#if $headerState.pageTitle === "Categories"}
          <AppButton
            label="Add category"
            icon="plus"
            type="secondary"
            on:click={addCategory}
          />
        {/if}
        <AppButton label="Log out" type="ghost" on:click={logout} />
      </div>
    </span>
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

  <div class="container">
    <slot />
  </div>
</BaseLayout>
