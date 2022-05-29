<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { classMap } from "../utils";
  import ValidationMessage from "./ValidationMessage.svelte";

  export let color = "primary-500";
  export let value = false;
  export let disabled = false;
  export let hideDetails: boolean = false;
  export let errorMessage: string | undefined = undefined;

  const dispatch = createEventDispatcher();
  const id = `switch-${Math.random().toString(36).slice(-5)}`;

  const handleChange = () => {
    value = !value;
    dispatch("change", value);
  };

  const switchClasses = classMap({
    "relative mb-1 text-sm": true,
    "cursor-pointer": !disabled,
  });

  const inputClasses = classMap({
    "absolute w-full h-full opacity-0 select-none": true,
    "cursor-pointer": !disabled,
  });

  $: trackClasses = classMap({
    "absolute w-8 h-5 pointer-events-none": true,
    "rounded-full -left-1 transition-all": true,
    [`bg-${color}`]: value,
    "bg-dark-300": !value,
    "opacity-60 outline-none": disabled,
    "outline-primary-200": value && !disabled,
    "outline-dark-200": !value && !disabled,
  });

  $: thumbClasses = classMap({
    "relative pointer-events-none rounded-full top-3px": true,
    "bg-white w-14px h-14px transition-all": true,
    "translate-x-2.5": value,
  });

  $: labelClasses = classMap({
    "ml-2 text-dark-900 select-none": true,
    "opacity-60": disabled,
  });
</script>

<div class="{switchClasses} ">
  <div class="flex items-center">
    <div class="w-8 h-5">
      <input
        class={inputClasses}
        type="checkbox"
        role="switch"
        aria-checked={value}
        checked={value}
        {id}
        {disabled}
        on:change={handleChange}
      />
      <div class={trackClasses} />
      <div class={thumbClasses} />
    </div>

    {#if !!$$slots.default}
      <label for={id} class={labelClasses}>
        <slot />
      </label>
    {/if}
  </div>

  {#if !hideDetails}
    <ValidationMessage {errorMessage} />
  {/if}
</div>
