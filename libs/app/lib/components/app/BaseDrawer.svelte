<script>
  import clsx from "clsx";
  import BaseOverlay from "./BaseOverlay.svelte";

  /**
   * Sets the width for the component.
   * type {number}
   * @default 228
   */
  export let width = 228;

  /**
   * Designates the width assigned when the drawer is minified.
   * type {number}
   * @default 56
   */
  export let miniWidth = 56;

  /**
   * Reflects the drawer width to use as content offset in parent node.
   * type {number}
   */
  export let drawerOffset = width;

  /**
   * Controls whether the drawer is visible or hidden.
   * type {boolean}
   * @default true
   */
  export let isActive = true;

  /**
   * A temporary drawer sits above the app and uses an overlay to darken the background.
   * type {boolean}
   * @default false
   */
  export let isTemporary = false;

  /**
   * Places the drawer on the right.
   * type {boolean}
   * @default false
   */
  export let isRight = false;

  /**
   * Condenses navigation drawer width.
   * type {boolean}
   * @default false
   */
  export let isMinified = false;

  /**
   * Controls whether the border is visible or hidden.
   * type {boolean}
   * @default false
   */
  export let hasBorder = false;

  /**
   * Sets the background color for the component.
   * type {string}
   * @default 'drawer'
   */
  export let background = "drawer";

  let clientWidth = width;

  export const toggle = () => {
    if (isTemporary) {
      isActive = !isActive;
    } else {
      isMinified = !isMinified;
    }
  };

  $: drawerOffset = isTemporary ? 0 : clientWidth;
  $: isCollapsed = isMinified && !isTemporary;

  $: drawerClasses = clsx({
    "fixed top-0 flex flex-col max-w-full h-full overflow-hidden": true,
    "flex flex-col": true,
    "transition-drawer duration-200 x-4": true,
    [`bg-${background}`]: true,
    "py-4": isCollapsed,
    "p-4": !isMinified || isTemporary,
    "right-0": isRight,
    "left-0": !isRight,
    "-translate-x-full": !isActive && !isRight,
    "translate-x-full": !isActive && isRight,
  });

  const contentClasses = clsx({
    "grow overflow-y-auto overflow-x-hidden overscroll-contain": true,
  });

  const borderClasses = clsx({
    "absolute top-0 h-full w-px	bg-dark-400": true,
    "right-0": !isRight,
    "left-0": isRight,
  });
</script>

<!--
@component
The base drawer component.
- usage:

	```svelte
	<BaseDrawer>
		<span slot="prepend">

		<slot>
  		    Drawer content
		</slot>
		
		<span slot="append">
	</BaseDrawer>
	```
-->

<BaseOverlay
  isActive={isActive && isTemporary}
  on:click={() => (isActive = false)}
>
  <aside
    class={drawerClasses}
    style="width: {isCollapsed ? miniWidth : width}px;"
    bind:clientWidth
  >
    <slot name="prepend" />

    <div class={contentClasses}>
      <slot />
    </div>

    <slot name="append" />

    {#if hasBorder}
      <div class={borderClasses} />
    {/if}
  </aside>
</BaseOverlay>
