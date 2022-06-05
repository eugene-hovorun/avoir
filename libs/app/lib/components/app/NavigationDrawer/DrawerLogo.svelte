<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import clsx from "clsx";
  import BaseIcon from "../../Icon.svelte";

  /**
   * If the drawer is minified or not.
   * @default false
   */
  export let isMinified = false;

  const dispatchToggle = createEventDispatcher<{ toggle: void }>();
  const dispatchClick = createEventDispatcher<{ click: void }>();
  const toggleMini = () => {
    handleMouseeleave();
    dispatchToggle("toggle");
  };

  let isHovering = false;

  const handleMouseenter = () => {
    isHovering = true;
  };

  const handleMouseeleave = () => {
    isHovering = false;
  };

  const handleLogoCLick = () => dispatchClick("click");

  $: logoClasses = clsx({
    "mx-auto mt-1 m-2 w-7": isMinified,
    "m-2 mt-1": !isMinified,
  });

  $: buttonClasses = clsx({
    "w-7 h-7 absolute": true,
    "flex justify-center rounded items-center": true,
    "bg-dark-300 hover:bg-gradient text-white": true,
  });
</script>

<div
  class="relative h-7 flex cursor-pointer {logoClasses}"
  on:click={handleLogoCLick}
  on:mouseenter={handleMouseenter}
  on:mouseleave={handleMouseeleave}
>
  <svg viewBox="0 0 500 500" class="text-primary-500" width="27">
    <g fill="currentColor" stroke="none">
      <path d="M5,85 L190,5 L225,65 L135,205 z" />
      <path d="M285,340 L355,275 L495,495 H450  z" />
      <path d="M5,495 L310,5 L495,85 L50,495 z" />
    </g>
  </svg>

  {#if !isMinified}
    <div class="flex items-center pl-4 text-text-200 font-medium text-2xl">
      AVOIR
    </div>

    <button
      class="{buttonClasses} -right-2"
      on:click|stopPropagation={toggleMini}
    >
      <BaseIcon name="arrow-left" size={5} on:click={toggleMini} />
    </button>
  {/if}

  {#if isMinified && isHovering}
    <button class={buttonClasses} on:click|stopPropagation={toggleMini}>
      <BaseIcon name="arrow-left" size={5} rotate={180} on:click={toggleMini} />
    </button>
  {/if}
</div>
