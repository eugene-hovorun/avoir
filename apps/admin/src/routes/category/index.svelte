<script lang="ts">
  import { onDestroy } from "svelte";
  import { headerState, fetchURL } from "$store";
  import { AppLoading } from "$lib/app";

  $headerState.pageTitle = "Categories";
  const foo = process.env.BASE_URL;

  onDestroy(() => {
    $headerState.pageTitle = "";
  });

  interface Category {
    image: string;
    name: string;
    slug: string;
  }

  const {
    data: categories,
    isFetching,
    fetchError,
  } = fetchURL<Category>("http://localhost:3000/api/category");
</script>

<div class="py-8">
  {foo}
  {#if $categories.length}
    <div
      class="p-2 font-medium rounded grid grid-cols-[64px_1fr_1fr] gap-4 mb-4 items-center"
    >
      <span />
      <div>Category name</div>
      <div>Category slug</div>
    </div>
    {#each $categories as category, i}
      <div
        class="p-2 bg-gray-50 rounded grid grid-cols-[64px_1fr_1fr] gap-4 mb-4 items-center"
      >
        <img src="{category.image}?random={i}" alt="" />
        <div>{category.name}</div>
        <div>{category.slug}</div>
      </div>
    {/each}
  {:else if $isFetching}
    <div class="flex justify-center py-16">
      <AppLoading />
    </div>
  {:else if $fetchError}
    <div class="flex flex-col items-center py-16 text-text-300">
      Something went wrong while fetching
      <div class="py-4 text-xs text-warning-300">
        {$fetchError}
      </div>
    </div>
  {:else}
    <div class="text-center">No categories</div>
  {/if}
</div>
