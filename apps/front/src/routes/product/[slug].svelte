<script lang="ts">
	import type { Product } from '$types/entity';
	import { page } from '$app/stores';

	export let product: Product;
</script>

<div class="container">
	<div class="py-8 text-xl">
		<a href="/">Home</a> / {$page.params.slug}
	</div>

	{JSON.stringify(product, null, 8)}
</div>
