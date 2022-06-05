<script lang="ts">
  import { onDestroy } from "svelte";
  import { headerState } from "$store";

  $headerState.pageTitle = "Products";

  onDestroy(() => {
    $headerState.pageTitle = "";
  });
</script>
