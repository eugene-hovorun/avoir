<script lang="ts">
  import { AppButton, AppTextField } from "$lib/app";
</script>

<div class="p-4 sm:p-8">
  <h1 class="text-center text-lg mb-4">Sign in</h1>

  <AppTextField value="" />
  <AppTextField value="" password />

  <div class="flex gap-4">
    <AppButton label="Forgot password" type="ghost" block />
    <AppButton label="Log in" block />
  </div>
</div>
