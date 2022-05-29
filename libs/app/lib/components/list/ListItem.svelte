<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { classMap } from "../../utils/";
  import type { IconName } from "../../types";
  import BaseIcon from "../Icon.svelte";

  export let label: string;
  export let icon: IconName | undefined = undefined;
  export let active: boolean = false;

  const dispatch = createEventDispatcher();

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") dispatch("click");
  };

  $: classes = classMap({
    "flex px-4 py-3 border-dark-100": true,
    "bg-white cursor-pointer": true,
    "focus:outline-primary-500 outline-1": true,
    "hover:bg-dark-50": !active,
    "bg-dark-50 text-primary-500": active,
  });
</script>

<div
  class={classes}
  tabindex="0"
  on:keypress={onKeyPress}
  on:click={() => dispatch("click")}
>
  {#if icon}
    <span class="mr-2">
      <BaseIcon name={icon} />
    </span>
  {/if}
  <span class="text-sm">
    {label}
  </span>
</div>
