<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { classMap } from "../utils";
  import ValidationMessage from "./ValidationMessage.svelte";

  export let value: string | undefined = undefined;
  export let placeholder: string | undefined = undefined;
  export let rows: number = 3;
  export let noResize: boolean = false;
  export let autoGrow: boolean = true;
  export let disabled: boolean = false;
  export let readonly: boolean = false;
  export let errorMessage: string | undefined = undefined;
  export let hideDetails: boolean = false;

  const dispatch = createEventDispatcher();
  const id: string = `textarea-${Math.random().toString(36).slice(-5)}`;
  let textarea: HTMLTextAreaElement | null = null;

  function onInput() {
    if (textarea) {
      value = textarea.value;
      dispatch("input", value);
    }
  }

  function onChange() {
    dispatch("change", value);
  }

  function updateTextareaHeight(_: string) {
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  $: if (textarea && autoGrow) updateTextareaHeight(value as string);
  $: enabled = !disabled && !readonly;

  $: wrapperClasses = classMap({
    "flex tracking-tight border border-dark-100 rounded": true,
    "hover:border-primary-500/20 focus-within:border-primary-500": enabled,
    "hover:focus-within:border-primary-500": enabled,
    "bg-dark-50": disabled || readonly,
    "border-dark-100": readonly,
    "border-dark-50": disabled,
  });

  const textareaClasses = classMap({
    "w-full px-4 py-3 min-h-[80px] bg-transparent": true,
    "caret-current text-sm leading-6 outline-none": true,
    "resize-none": disabled || readonly || noResize,
    "text-dark-300": disabled,
    "text-dark-900": !disabled,
  });
</script>

<div class={wrapperClasses}>
  <textarea
    bind:this={textarea}
    class={textareaClasses}
    {value}
    {id}
    {placeholder}
    {disabled}
    {readonly}
    {rows}
    on:input={onInput}
    on:change={onChange}
    {...$$restProps}
  />
</div>
{#if !hideDetails}
  <ValidationMessage {errorMessage} />
{/if}
