<script lang="ts">
  import type { Product } from "$lib/app";
  import ProductCard from "./ProductCard.svelte";

  export let products: Product[];
</script>

<div class="grid grid-cols-[repeat(auto-fit,minmax(227px,_1fr))] gap-4 mb-16">
  {#each products as product}
    <ProductCard {product} />
  {/each}
</div>
