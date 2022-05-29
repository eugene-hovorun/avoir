<script lang="ts">
  import type { Category } from "$lib/app";

  export let category: Category;
</script>

<a
  href={`category/${category.slug}`}
  class="d-flex flex-col text-center p-4 rounded-lg bg-dark-100 cursor-pointer hover:text-primary-500"
>
  <img class="w-full h-40 bg-attention-200" src={category.image} alt="" />
  <span>{category.name}</span>
</a>
