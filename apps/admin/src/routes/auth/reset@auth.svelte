<script lang="ts">
  import { AppButton, AppTextField } from "$lib/app";
  import { goto } from "$app/navigation";

  const goBack = () => goto("/auth");
  const goHome = () => goto("/");
</script>

<div class="p-4 sm:p-8">
  <h1 class="text-center text-lg mb-4">Forgot password</h1>

  <AppTextField value="" label="E-mail" />

  <div class="flex gap-4">
    <AppButton label="Log in" type="ghost" block on:click={goBack} />
    <AppButton label="Submit" block on:click={goHome} />
  </div>
</div>
