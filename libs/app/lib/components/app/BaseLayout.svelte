<script>
	export let drawerOffset = 0;
</script>

<div class="h-screen w-full flex">
	<div class="z-10">
		<slot name="drawer-left" />
		<slot name="drawer-right" />
	</div>

	<div style="padding-left: {drawerOffset}px" class="box-border grow">
		<slot name="app-bar" />
		<slot />
	</div>

	<slot name="fab" />
	<slot name="snackbar" />
	<slot name="banner" />
	<slot name="notification" />

	<slot name="footer" />
</div>
