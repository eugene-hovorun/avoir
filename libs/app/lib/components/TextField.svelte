<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Icon from "./Icon.svelte";
  import ValidationMessage from "./ValidationMessage.svelte";
  import { classMap } from "../utils";

  export let value: string | undefined;
  export let label: string | undefined = undefined;
  export let placeholder: string | undefined = undefined;
  export let small: boolean = false;
  export let clearable: boolean = false;
  export let plain: boolean = false;
  export let readonly: boolean = false;
  export let selectMode: boolean = false;
  export let disabled: boolean = false;
  export let password: boolean = false;
  export let success: boolean = false;
  export let fail: boolean = false;
  export let errorMessage: string | undefined = undefined;
  export let hideDetails: boolean = false;
  export let counter: number | undefined = undefined;

  const dispatch = createEventDispatcher<{ input: string; change: string }>();
  const id: string = `textfield-${Math.random().toString(36).slice(-5)}`;
  let showPassword = false;
  $: type = !password ? "text" : showPassword ? "text" : "password";

  function onInput(event: Event) {
    const input = event.target as HTMLInputElement;

    value = input.value;
    dispatch("input", value);
  }

  function onChange() {
    dispatch("change", value);
  }

  function onClear() {
    value = "";
    dispatch("input", value);
  }

  function onTypeToggle() {
    showPassword = !showPassword;
  }

  const textfieldClasses = classMap({
    "tracking-tight": true,
    "text-dark-300": disabled || readonly,
    "text-dark-900": !disabled && !readonly,
    "cursor-pointer": selectMode,
  });

  const wrapperClasses = classMap({
    "flex items-center gap-1 border": true,
    "px-3 py-2.5 rounded": true,
    "focus-within:border-primary-500": true,
    "hover:focus-within:border-primary-500": true,
    "hover:border-primary-100": !disabled,
    "border-primary-100": readonly,
    "h-10": small,
    "h-12": !small,
    "border-dark-50 bg-dark-50": !plain,
    "border-transparent bg-transparent": plain,
    "outline outline-1": fail || success,
    "outline-warning-400": fail,
    "outline-green-400": success,
  });

  const slotsClasses = classMap({
    "text-warning-500": !!errorMessage,
  });

  const inputClasses = classMap({
    "grow bg-transparent caret-current outline-0": true,
    "cursor-pointer": selectMode,
  });

  const actionClasses = "cursor-pointer text-dark-300";
</script>

<div class={textfieldClasses}>
  {#if !!label}
    <label class="inline-flex mb-0.5" for={id}>{label}</label>
  {/if}

  <div class={wrapperClasses}>
    {#if !!$$slots.prepend}
      <div class="mr-1.5 {slotsClasses}">
        <slot name="prepend" />
      </div>
    {/if}

    <input
      class={inputClasses}
      {type}
      {placeholder}
      {id}
      readonly={readonly || selectMode}
      {disabled}
      {value}
      on:input={onInput}
      on:change={onChange}
      on:focus
      on:blur
      on:keypress
      on:keydown
      on:keyup
      {...$$restProps}
    />

    {#if !!$$slots.append}
      <div class="ml-1.5 {slotsClasses}">
        <slot name="append" />
      </div>
    {/if}

    {#if !!counter}
      <span
        class="mx-1 text-xs text-primary-500 whitespace-nowrap cursor-default"
      >
        {value?.length} / {counter}
      </span>
    {/if}

    {#if clearable && value !== ""}
      <div on:click={onClear} class={actionClasses}>
        <Icon name="close" />
      </div>
    {/if}

    {#if password}
      <div on:click={onTypeToggle} class={actionClasses}>
        <Icon name={showPassword ? "eye-off" : "eye"} />
      </div>
    {/if}
  </div>

  {#if !hideDetails}
    <ValidationMessage {errorMessage} />
  {/if}
</div>
