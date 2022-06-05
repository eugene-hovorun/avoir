<script lang="ts">
  import { onDestroy } from "svelte";
  import { headerState } from "$store";

  $headerState.pageTitle = "Categories";

  onDestroy(() => {
    $headerState.pageTitle = "";
  });

  // todo(Leonid): get categories
  const categories = [
    {
      name: "Automotive Tools",
      slug: "automotive-tools",
      image: "https://picsum.photos/100",
    },
    {
      name: "Foo bar",
      slug: "foo-bar",
      image: "https://picsum.photos/100",
    },
  ];
</script>

<div class="py-8">
  {#if categories.length}
    <div
      class="p-2 font-medium rounded grid grid-cols-[64px_1fr_1fr] gap-4 mb-4 items-center"
    >
      <span />
      <div>Category name</div>
      <div>Category slug</div>
    </div>
    {#each categories as category, i}
      <div
        class="p-2 bg-gray-50 rounded grid grid-cols-[64px_1fr_1fr] gap-4 mb-4 items-center"
      >
        <img src="{category.image}?random={i}" alt="" />
        <div>{category.name}</div>
        <div>{category.slug}</div>
      </div>
    {/each}
  {:else}
    <div class="text-center">No categories</div>
  {/if}
</div>
