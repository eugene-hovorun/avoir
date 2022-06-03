<script lang="ts">
  import { AppBar, AppDrawer } from "$components";
  import "../app.css";
</script>

<div class="text-text-400 h-screen">
  <AppBar />

  <div class="flex ">
    <AppDrawer />

    <div class="grow ">
      <slot />
    </div>
  </div>
</div>
