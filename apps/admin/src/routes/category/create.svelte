<script lang="ts">
  import { onDestroy } from "svelte";
  import { headerState } from "$store";
  import { AppTextField, AppButton } from "$lib/app";

  $headerState.pageTitle = "New category";

  onDestroy(() => {
    $headerState.pageTitle = "";
  });

  const reset = () => {
    name = "";
    slug = "";
    image = "";
  };

  const validate = () => {
    // todo(Oxygene4): get root path dynamically
    fetch(
            'http://localhost:3000/api/category',
            {
              method: 'POST',
              body: JSON.stringify({
                name,
                slug,
                image
              })
            }
    ).then(res => res.json()).then(res => console.log('new category: ', res?.category));
  };

  let name = "";
  let slug = "";
  let image = "";
</script>

<div class="py-16">
  <div class="grid grid-cols-[repeat(auto-fit,minmax(320px,_1fr))] gap-4 mb-8">
    <AppTextField
      bind:value={name}
      counter={25}
      placeholder="Automotive Tools"
      label="Category name *"
    />

    <AppTextField
      bind:value={slug}
      counter={50}
      placeholder="automotive-tools"
      label="Category slug *"
    />

    <AppTextField
      bind:value={image}
      placeholder="https://example.com"
      label="Link to category image"
    />
  </div>

  <div class="flex ml-auto w-96 justify-center gap-8">
    <AppButton label="Reset form" type="ghost" block on:click={reset} />
    <AppButton label="Submit" block on:click={validate} />
  </div>
</div>
