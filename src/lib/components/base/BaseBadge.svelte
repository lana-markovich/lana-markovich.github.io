<script>
</script>

<div class="badge">
	<div class="heading heading--xs">
		<slot />
	</div>
	<div class="text text--secondary">
		<slot name="text" />
	</div>
</div>

<style>
	.badge {
		background-color: var(--white);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem;
		width: fit-content;
		box-shadow: inset 2px 2px 15px 0px rgba(0, 0, 0, 0.45);
	}

	.heading--xs,
	.text--secondary {
		white-space: nowrap;
		line-height: 1em;
	}
</style>