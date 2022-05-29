<script context="module" lang="ts">
	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';
</script>

<script lang="ts">
	import '../app.css';
</script>

<div class="flex flex-col h-screen">
	<Header />

	<div class="grow">
		<slot />
	</div>

	<Footer />
</div>
