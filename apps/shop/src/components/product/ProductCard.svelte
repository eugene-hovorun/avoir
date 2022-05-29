<script lang="ts">
  import type { Product } from "$lib/app";

  export let product: Product;
</script>

<a
  href={`/product/${product.slug}`}
  class="d-flex flex-col text-center p-4 cursor-pointer hover:text-primary-600"
>
  <img class="w-full h-40 bg-primary-50" src={product.image} alt="" />
  <span>{product.name}</span>
</a>
