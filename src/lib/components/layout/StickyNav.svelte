<script lang="ts">
	import BaseNav from "$lib/components/base/BaseNav.svelte";
	import BaseContainer from "$lib/components/layout/BaseContainer.svelte";

	let { target = "#hero" }: { target?: string } = $props();

	let visible = $state(false);

	$effect(() => {
		const el = document.querySelector(target);
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				visible = !entry.isIntersecting;
			},
			{ threshold: 0 }
		);
		observer.observe(el);

		return () => observer.disconnect();
	});
</script>

<header class="sticky-nav" class:sticky-nav--is-visible={visible} aria-hidden={!visible}>
	<BaseContainer>
		<BaseNav/>
	</BaseContainer>
</header>

<style>
	.sticky-nav {
		position: fixed;
		inset-block-start: 0;
		inset-inline: 0;
		z-index: 50;
		padding-inline: var(--section-padding-inline);
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(8px);
		border-block-end: 1px solid rgba(0, 0, 0, 0.06);

		opacity: 0;
		transform: translateY(-8px);
		pointer-events: none;
		transition:
			opacity 200ms var(--easing-default),
			transform 200ms var(--easing-default);
	}

	:global(.sticky-nav .container) {
		padding-block: 1rem;
	}

	.sticky-nav--is-visible {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
	}
</style>
