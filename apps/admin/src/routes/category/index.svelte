<script lang="ts">
  import { onDestroy } from "svelte";
  import { headerState } from "$store";

  $headerState.pageTitle = "Categories";

  onDestroy(() => {
    $headerState.pageTitle = "";
  });
</script>
