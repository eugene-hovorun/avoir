<script lang="ts">
  import CategoryList from "$components/category/CategoryList.svelte";
  import { sraka } from "$lib/api";

  export let categories: any[] = [];

  console.log(sraka);
</script>

<div class="container">
  <div class="py-8 text-xl">Categories</div>

  <CategoryList {categories} />
</div>
