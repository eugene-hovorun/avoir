<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { IconName } from "../types";
  // @ts-ignore
  import icons from "./icons.svg";

  export let name: IconName;
  export let size = 5;
  export let color: string = "inherit";
  export let rotate = 0;

  const dispatch = createEventDispatcher<{ click: void }>();
</script>

<svg
  class="w-{size} h-{size} text-{color} transition-transform"
  stroke="currentColor"
  style="transform: rotate({rotate}deg)"
  on:click|stopPropagation={() => dispatch("click")}
>
  <use href={`${icons}#${name}`} />
</svg>

<style>
  use {
    fill: none;
    stroke-width: 1.25;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
</style>
