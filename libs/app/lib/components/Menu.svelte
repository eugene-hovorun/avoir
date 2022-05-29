<script lang="ts">
  import { ClickOutside } from "../utils";
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  export let active = false;
  export let absolute = false;
  export let transition = fade;
  export let offsetX = false;
  export let offsetY = true;
  export let nudgeX = 0;
  export let nudgeY = 0;
  export let closeOnClickOutside = true;
  export let closeOnClick = true;
  export let bottom = false;
  export let right = false;
  export let disabled = false;
  export let index = 8;

  let origin = "top left";
  let position: string;
  let wrapper: HTMLDivElement;

  const dispatch = createEventDispatcher();
  const transitionOpts = { duration: 150 };
  const align = { x: right ? "right" : "left", y: bottom ? "bottom" : "top" };

  function open(posX = 0, posY = 0) {
    active = true;
    const rect = wrapper.getBoundingClientRect();
    let x = nudgeX;
    let y = nudgeY;

    if (absolute) {
      x += posX;
      y += posY;
    } else {
      if (offsetX) x += rect.width;
      if (offsetY) y += rect.height;
    }

    position = `${align.y}:${y}px;${align.x}:${x}px`;
    origin = `${align.y} ${align.x}`;

    dispatch("open");
  }

  function close() {
    active = false;
    dispatch("close");
  }

  function triggerClick(e: MouseEvent) {
    if (!disabled) {
      if (active) {
        close();
      } else {
        open(e.offsetX, e.offsetY);
      }
    }
  }

  function menuClick() {
    console.log("menuClick");
    if (active && closeOnClick) close();
  }

  function clickOutsideMenu() {
    if (active && closeOnClickOutside) close();
  }

  onMount(() => {
    const trigger = wrapper.querySelector("[slot='activator']");

    if (active) {
      open();
    }

    if (!trigger) {
      return;
    }

    trigger.addEventListener("click", triggerClick, { passive: true });

    return () => {
      trigger?.removeEventListener("click", triggerClick);
    };
  });
</script>

<div
  class="s-menu__wrapper"
  bind:this={wrapper}
  use:ClickOutside
  on:clickOutside={clickOutsideMenu}
>
  <slot name="activator" />

  {#if active}
    <div
      class="s-menu"
      role="menu"
      on:click={menuClick}
      in:transition={transitionOpts}
      out:transition={transitionOpts}
      style="{position};transform-origin:{origin};z-index:{index}"
    >
      <slot />
    </div>
  {/if}
</div>

<style>
  .s-menu__wrapper {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  .s-menu__wrapper [role="menu"] {
    width: 100%;
  }

  .s-menu {
    position: absolute;
    max-height: 300px;
    overflow: auto;
    box-shadow: 2px 2px 5px #777;
    border-radius: 4px;
  }
</style>
