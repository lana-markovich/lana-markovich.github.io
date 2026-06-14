<script>
</script>

<div class="container">
	<div class="section__lines"></div>
	<slot />
</div>

<style>
	.container {
		width: min(100%, var(--container-max-width));
		padding-block: var(--container-padding-block);
		margin-inline: auto;
		position: relative;
		container-type: inline-size;
		container-name: base-container;
	}

	.section__lines {
		position: absolute;
		inset: 0;
		pointer-events: none;
		display: flex;
		justify-content: space-between;
	}
	.section__lines::before,
	.section__lines::after {
		content: "";
		display: block;
		height: 100%;
		border-inline: var(--border--secondary);
	}
	.section__lines::before {
		width: calc(100% * 408 / 1200);
	}
	.section__lines::after {
		width: calc(100% * 384 / 1200);
	}

	/* Tablets and below: only the two lines at the content edges */
	@container base-container (width <= 60rem) {
		.section__lines::before {
			width: 0;
			border-inline-end: none;
		}
		.section__lines::after {
			width: 0;
			border-inline-start: none;
		}
	}
</style>