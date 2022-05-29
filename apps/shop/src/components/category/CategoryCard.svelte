<script lang="ts">
  import type { Category } from "$lib/app";

  export let category: Category;
</script>

<a
  href={`category/${category.slug}`}
  class="d-flex flex-col text-center p-4 cursor-pointer hover:text-primary-600"
>
  <img class="w-full h-40 bg-primary-50" src={category.image} alt="" />
  <span>{category.name}</span>
</a>
