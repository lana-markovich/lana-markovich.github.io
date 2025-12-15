<div class="container">
	<slot />
</div>

<style>
	.container {
		max-width: calc(
			var(--container-max-width) + var(--container-padding-inline) * 2
		);
		padding-inline: var(--container-padding-inline);
	}
</style>