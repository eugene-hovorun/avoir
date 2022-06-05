<script lang="ts">
	import clsx from 'clsx';

	/**
	 * Controls whether the ovaerlay is visible or hidden.
	 * type {boolean}
	 * @default false
	 */
	export let isActive = false;

	$: overlayClasses = clsx({
		'transition-colors duration-200': true,
		'fixed h-full w-screen bg-text-400/70 z-10': isActive,
	});
</script>

<div class={overlayClasses} on:click|self on:wheel|self|preventDefault>
	<slot />
</div>
