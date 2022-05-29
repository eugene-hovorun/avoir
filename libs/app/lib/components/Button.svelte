<script lang="ts">
  import { classMap } from "../utils";
  import type { ButtonType, IconName, Size } from "../types";
  import Loading from "./Loading.svelte";
  import Icon from "./Icon.svelte";

  export let type: ButtonType = "primary";
  export let size: Size = "medium";
  export let icon: IconName | undefined = undefined;
  export let block = false;
  export let disabled = false;
  export let loading = false;
  export let label: string | undefined = undefined;

  const isPrimary = type === "primary";
  const isAccent = type === "accent";
  const isSecondary = type === "secondary";
  const isTertiary = type === "tertiary";
  const isGhost = type === "ghost";

  const isBase = size === "medium";
  const isXSmall = size === "x-small";
  const isSmall = size === "small";
  const isLarge = size === "large";
  const isXLarge = size === "x-large";

  const buttonClasses = classMap({
    "relative flex justify-center items-center": true,
    "rounded font-medium tracking-tight leading-none": true,
    "outline-offset-2 outline-2": true,
    "w-full": block,

    "h-7.5 px-4 text-xs": isXSmall,
    "h-9 px-4 text-xs": isSmall,
    "h-10 px-4 text-sm": isBase,
    "h-12 px-4 text-sm": isLarge,
    "h-14 px-8 text-sm": isXLarge,

    "text-white": isPrimary || isAccent,

    "bg-gradient hover:bg-gradient-dark": isPrimary && !disabled,
    "focus:outline outline-blue-200": isPrimary,

    "bg-success-600 hover:bg-success-700": isAccent && !disabled,
    "focus:outline outline-success-200": isAccent,
    "bg-dark-300": disabled && (isPrimary || isAccent),

    "bg-white border": isSecondary,
    "focus:border-primary-500": isSecondary,
    "text-dark-900 border-dark-100 hover:bg-dark-50": isSecondary && !disabled,
    "text-dark-300 border-dark-100": isSecondary && disabled,

    "text-primary-500 bg-primary-50 hover:bg-primary-100":
      isTertiary && !disabled,
    "focus:outline outline-primary-100": isTertiary,
    "text-dark-300 bg-dark-50": isTertiary && disabled,

    "text-primary-500 hover:bg-primary-50 border border-transparent":
      isGhost && !disabled,
    "focus:border-dark-100 focus:bg-transparent": isGhost,
    "text-dark-300": isGhost && disabled,
  });

  const contentClasses = classMap({
    "flex items-center": true,
    "opacity-0": loading,
  });
</script>

<button
  type="button"
  class={buttonClasses}
  disabled={disabled || loading}
  on:click
>
  {#if loading}
    <span class="absolute m-auto">
      <Loading light={isPrimary || isAccent} small />
    </span>
  {/if}

  <span class={contentClasses}>
    {#if icon}
      <span class="mr-2">
        <Icon name={icon} />
      </span>
    {/if}
    {#if label}
      {label}
    {/if}
  </span>
</button>
