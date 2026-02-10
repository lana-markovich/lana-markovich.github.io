<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let bg: string | null = null;
	export let dim: boolean = false;

	const dispatch = createEventDispatcher();

	function handleMouseEnter() {
		dispatch("mouseenter", bg);
	}

	function handleMouseLeave() {
		dispatch("mouseleave", null);
	}
</script>

<button
	type="button"
	class="badge {dim ? 'dim' : ''}"
	disabled  on:mouseenter={handleMouseEnter}
	 on:mouseleave={handleMouseLeave}>
	<div class="heading heading--xs">
		<slot />
	</div>
	<div class="text text--secondary">
		<slot name="text" />
	</div>
</button>

<style>
	.badge {
		background-color: var(--white);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
		gap: 0.5rem;
		padding: 0.5rem;
		width: fit-content;
		box-shadow: inset 2px 2px 15px 0px rgba(0, 0, 0, 0.45);
	}
	.badge.dim {
		 opacity: 0.2;
	 }

	.heading--xs,
	.text--secondary {
		white-space: nowrap;
		line-height: 1em;
	}
</style>