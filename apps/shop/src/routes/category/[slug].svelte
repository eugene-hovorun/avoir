<script lang="ts">
  import type { Product } from "$lib/app";
  import { page } from "$app/stores";
  import { ProductList } from "$components";

  export let products: Product[];
</script>

<div class="container">
  <div class="py-8 text-xl">
    <a href="/">Home</a> / {$page.params.slug}
  </div>

  <ProductList {products} />
</div>
