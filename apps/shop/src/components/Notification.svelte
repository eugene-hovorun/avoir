<script lang="ts">
	import { alert } from '$store/alert';
	import { onDestroy } from 'svelte';

	export let ms = 3000;
	let visible: boolean = false;
	let timeout: any;

	const onMessageChange = (message: string, ms: number) => {
		clearTimeout(timeout);
		if (!message) {
			visible = false;
		} else {
			visible = true;
			if (ms > 0) timeout = setTimeout(() => (visible = false), ms);
		}
	};

	$: onMessageChange($alert, ms);

	onDestroy(() => clearTimeout(timeout));
</script>

{#if visible}
	<div role="alert" on:click={() => (visible = false)}>
		<p>{$alert}</p>
	</div>
{/if}

<style>
	div {
		position: fixed;
		cursor: pointer;
		margin-right: 1.5rem;
		margin-left: 1.5rem;
		margin-top: 1rem;
		right: 0;
		display: flex;
		align-items: center;
		border-radius: 0.2rem;
		background-color: #565656;
		color: #fff;
		font-size: 0.875rem;
		font-weight: 700;
		padding: 0.5rem 1.4rem;
		font-size: 1.5rem;
		z-index: 100;
		opacity: 95%;
	}
	div p {
		color: #fff;
	}
</style>
