<script lang="ts">
	import BaseNav from "$lib/components/base/BaseNav.svelte";
	import BaseContainer from "$lib/components/layout/BaseContainer.svelte";
	import { portfolioCategory } from "$lib/stores/portfolioCategory.svelte";
	import { fade } from "svelte/transition";

	let { target = "#hero" }: { target?: string } = $props();

	let visible = $state(false);
	let displayValue = $state<string | null>(portfolioCategory.value);
	let collapseTimer: ReturnType<typeof setTimeout> | null = null;

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

	$effect(() => {
		const next = portfolioCategory.value;
		if (collapseTimer) { clearTimeout(collapseTimer); collapseTimer = null; }
		if (next !== null) {
			displayValue = next;
		} else {
			collapseTimer = setTimeout(() => { displayValue = null; }, 350);
		}
		return () => { if (collapseTimer) clearTimeout(collapseTimer); };
	});
</script>

<header class="sticky-nav" class:sticky-nav--is-visible={visible} aria-hidden={!visible}>
	<BaseContainer>
		<BaseNav/>
	</BaseContainer>
	<div
		class="sticky-nav__subheading"
		class:sticky-nav__subheading--is-visible={portfolioCategory.value !== null}
		aria-hidden={portfolioCategory.value === null}
	>
		<BaseContainer>
			<span class="sticky-nav__subheading-text">
				{#key displayValue}
					{#if displayValue !== null}
						{@const label = displayValue}
						<span
							class="heading heading--lg sticky-nav__subheading-value"
							in:fade|global={{ duration: 150, delay: 150 }}
							out:fade|global={{ duration: 150 }}
						>{label}</span>
					{/if}
				{/key}
			</span>
		</BaseContainer>
	</div>
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

	.sticky-nav__subheading {
		border-block-start: 1px solid rgba(0, 0, 0, 0.06);
		margin-inline: calc(var(--section-padding-inline) * -1);
		padding-inline: var(--section-padding-inline);
		font-weight: 600;
		letter-spacing: -0.02em;
		max-height: 0;
		opacity: 0;
		overflow: hidden;
		transition:
			max-height 600ms var(--easing-default),
			opacity 350ms var(--easing-default);
	}

	.sticky-nav__subheading--is-visible {
		max-height: 6rem;
		opacity: 1;
	}

	:global(.sticky-nav__subheading .container) {
		padding-block: 0.5rem;
	}

	.sticky-nav__subheading-text {
		display: grid;
		grid-template-areas: "cell";
		min-height: 3.19rem; /* heading--lg: 2.75rem × 1.16 line-height */
	}

	.sticky-nav__subheading-text > :global(*) {
		grid-area: cell;
	}

	.sticky-nav__subheading-value {
		white-space: nowrap;
		margin-block: 0;
	}

	.sticky-nav__subheading-value:global(::after) {
		display: none;
	}
</style>
