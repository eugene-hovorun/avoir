<script lang="ts">
  export let light: boolean | undefined = false;
  export let small: boolean | undefined = false;
  export let large: boolean | undefined = false;

  const size = small ? "6" : large ? "16" : "10";
  const fill = light ? "gray-100" : "primary-500";
  const circles: Record<string, number>[] = [
    { x: 80, y: 50, opacity: 1, begin: -0.875 },
    { x: 71.2, y: 71.2, opacity: 0.875, begin: -0.75 },
    { x: 50, y: 80, opacity: 0.75, begin: -0.625 },
    { x: 28.8, y: 71.2, opacity: 0.625, begin: -0.5 },
    { x: 20, y: 50, opacity: 0.5, begin: -0.375 },
    { x: 28.8, y: 28.8, opacity: 0.375, begin: -0.25 },
    { x: 50, y: 20, opacity: 0.25, begin: -0.125 },
    { x: 71.2, y: 28.8, opacity: 0.125, begin: 0 },
  ];
</script>

<div class="h-{size} w-{size} text-{fill}">
  <svg viewBox="0 0 100 100" fill="currentColor">
    {#each circles as circle}
      <g transform="translate({circle.x},{circle.y})">
        <circle r="6" fill-opacity={circle.opacity}>
          <animateTransform
            attributeName="transform"
            type="scale"
            begin={circle.begin}
            values="1.5 1.5;1 1"
            dur="1s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            dur="1s"
            repeatCount="indefinite"
            values="1;0"
            begin={circle.begin}
          />
        </circle>
      </g>
    {/each}
  </svg>
</div>
