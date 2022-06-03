<script lang="ts">
  import clsx from "clsx";

  let barHeight: number = 64;

  $: headerClasses = clsx({
    "w-full flex items-center bg-white px-4 z-8": true,
    "border-b border-dark-100": true,
    "h-[64px] vw-700:h-[72px] transition-[left]": true,
  });
</script>

<div style={`height: ${barHeight}px`} />
<div class="fixed top-0 inset-x-0 flex flex-col" bind:clientHeight={barHeight}>
  <header class={headerClasses}>
    <div class="flex-1 flex items-center px-4">
      <a href="/">Dashboard</a>
    </div>

    <slot name="actions" />
  </header>
</div>
