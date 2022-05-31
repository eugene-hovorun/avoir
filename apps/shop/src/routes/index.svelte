<script lang="ts">
  import CategoryList from "$components/category/CategoryList.svelte";

  export let categories: any[] = [];
</script>

<div class="container">
  <div class="py-8 text-xl">Categories</div>

  <CategoryList {categories} />
</div>
