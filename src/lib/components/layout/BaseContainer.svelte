<script>
</script>

<div class="container">
	<div class="section__lines"></div>
	<slot />
</div>

<style>
	.container {
		max-width: var(--container-max-width);
		padding-block: var(--container-padding-block);
		margin-inline: auto;
		position: relative;
		container-type: inline-size;
		container-name: base-container;

		--lines-columns-grid: repeat(3, 1fr);
	}

	.section__lines {
		position: absolute;
		inset: 0;
		opacity: 0.1;
		pointer-events: none;
		display: flex;
		justify-content: space-between;
	}
	.section__lines::before,
	.section__lines::after {
		content: "";
		display: block;
		height: 100%;
		width: calc(100% / 3);
		border-inline: var(--black-800) 1px solid;
	}
</style>