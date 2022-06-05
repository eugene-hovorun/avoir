<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import clsx from "clsx";
  import AppBarDrawerButton from "./AppBarDrawerButton.svelte";
  import AppBarAvatar from "./AppBarAvatar.svelte";

  /**
   * The visiblity of the notification hamburger icon in the left corner.
   * @default true
   */
  export let showDrawerButton = true;

  /**
   * Sets the left offset for fixed bar.
   * @default false
   */
  export let left: number | undefined = undefined;

  let barHeight: number;
  const dispatchDrawer = createEventDispatcher<{ toggleDrawer: void }>();
  const dispatchNotifications = createEventDispatcher<{
    toggleNotifications: void;
  }>();
  const toggleDrawer = () => dispatchDrawer("toggleDrawer");
  const toggleNotifications = () =>
    dispatchNotifications("toggleNotifications");

  $: headerClasses = clsx({
    "w-full flex items-center bg-white px-4 z-8": true,
    "border-b border-dark-100": true,
    "h-[64px] vw-700:h-[72px] transition-[left]": true,
  });
</script>

<!--
@component
The base app bar component.
- usage:

	```svelte
	<AppBar name="App name">
		<span slot="spacer">
		<span slot="left">
  		The left side of the app bar
		</span>
		
		<span slot="actions">
	  	The actions of the app bar (after the right slot)
		</span>
	</AppBar>

	<span slot="banner">
	```
-->

<div style={`height: ${barHeight}px`} />
<div class="fixed top-0 inset-x-0 flex flex-col" bind:clientHeight={barHeight}>
  <header class={headerClasses}>
    {#if left}
      <div style={`width: ${left}px;`} />
    {/if}

    {#if showDrawerButton}
      <span class="vw-700:hidden">
        <AppBarDrawerButton on:click={toggleDrawer} />
      </span>
    {/if}

    <div class="flex-1 flex items-center px-4">
      <div class="hidden sm:block sm:ml-6">
        <div class="flex space-x-4">
          <span>
            <slot name="left" />
          </span>
        </div>
      </div>
    </div>

    <slot name="actions" />

    <div class="flex gap-3 ml-4 pl-4 border-l border-dark-100">
      <AppBarAvatar />
    </div>
  </header>

  <slot name="banner" />
</div>
