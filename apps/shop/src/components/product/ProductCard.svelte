<script lang="ts">
  import type { Product } from "$lib/app";

  export let product: Product;
</script>

<a
  href={`/product/${product.slug}`}
  class="d-flex flex-col text-center p-4 rounded-lg bg-dark-100 cursor-pointer hover:text-primary-500"
>
  <img class="w-full h-40 bg-attention-200" src={product.image} alt="" />
  <span>{product.name}</span>
</a>
