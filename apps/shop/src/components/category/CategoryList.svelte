<script lang="ts">
  import type { Category } from "$lib/app";
  import CategoryCard from "./CategoryCard.svelte";

  export let categories: Category[];
</script>

<div class="grid grid-cols-[repeat(auto-fit,minmax(227px,_1fr))] gap-4 mb-16">
  {#each categories as category}
    <CategoryCard {category} />
  {/each}
</div>
