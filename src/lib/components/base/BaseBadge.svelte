<script lang="ts">
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	function handleMouseEnter() {
		dispatch("mouseenter");
	}

	function handleMouseLeave() {
		dispatch("mouseleave", null);
	}
</script>

<button
	type="button"
	class="badge"
	disabled
	on:mouseenter={handleMouseEnter}
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
		transition: opacity 0.7s ease;
	}

	.heading--xs,
	.text--secondary {
		white-space: nowrap;
		line-height: 1em;
	}
</style>