<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import clsx from "clsx";
  import BaseIcon from "./Icon.svelte";
  import type { IconName } from "../types";

  export let color: string = "transparent";
  export let iconColor: string = "dark-900";
  export let size: number = 11;
  export let elevated: boolean = false;
  export let icon: IconName;
  export let disabled = false;

  const dispatch = createEventDispatcher<{ click: void }>();
  const handleClick = () => dispatch("click");

  const rippleClasses = [
    "after:scale-0",
    "hover:after:scale-100",
    "after:transition-transform",
    "after:w-full",
    "after:h-full",
    "after:rounded-full",
    "after:absolute",
    "after:bg-dark-900/10",
    "after:pointer-events-none",
  ].join(" ");

  $: buttonClasses = clsx({
    "relative flex justify-center items-center": true,
    [`rounded-full outline-none bg-${color}`]: true,
    [`h-${size} w-${size}`]: true,
    "shadow-lg": elevated,
    "opacity-75": disabled,
    [`${rippleClasses}`]: !disabled,
  });
</script>

<button type="button" class={buttonClasses} {disabled} on:click={handleClick}>
  <span class="scale-[0.65]">
    <BaseIcon name={icon} color={iconColor} {size} on:click />
  </span>
</button>
