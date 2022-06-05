<script lang="ts">
	/**
	 * The app logo
	 * @required
	 */
	export let logo: string;

	/**
	 * The app name
	 * @required
	 */
	export let name: string;
</script>

<div class="flex-shrink-0 flex items-center">
	<img class="block h-8 w-8" width="100" height="100" src={logo} alt={name} />
</div>
