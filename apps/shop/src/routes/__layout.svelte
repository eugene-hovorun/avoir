<script context="module" lang="ts">
  import { Header, Footer } from "$components";
</script>

<script lang="ts">
  import "../app.css";
</script>

<div class="flex flex-col h-screen text-dark-800">
  <Header />

  <div class="grow">
    <slot />
  </div>

  <Footer />
</div>
