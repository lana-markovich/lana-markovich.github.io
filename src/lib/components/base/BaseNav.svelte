<script lang="ts">
	import { seenSections } from '$lib/stores/seenSections.svelte';

	export let isInverted: boolean = false;
	const links = [
		{ title: "about me", href: "/#about", id: "about" },
		{ title: "services", href: "/#services", id: "services" },
		{ title: "portfolio", href: "/#portfolio", id: "portfolio" },
		{ title: "contacts", href: "/#contacts", id: "contacts" },
	]
</script>

<nav class="nav {isInverted? 'nav--is-inverted': ''}">
	<ul class="nav__list">
		{#each links as link}
			<li class="nav__item">
				<a class="nav__link" class:section-heading={seenSections.has(link.id)} href="{link.href}">-{link.title}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.nav__list {
		display: grid;
		grid-template-columns: var(--lines-columns-grid-nav);
	}

	.nav__item {
		&:last-child {
			text-align: end;
		}
	}

	.nav__link {
		font-weight: 600;
		letter-spacing: -0.02em;
		transition: color 0.7s ease;
		position: relative;
	}

	.nav__link::after {
		content: "";
		position: absolute;
		inset-inline-start: 0;
		inset-block-start: 50%;
		inline-size: 100%;
		block-size: 2px;
		background-color: currentColor;
		transform: scaleX(0);
		transform-origin: left center;
		pointer-events: none;
		transition: transform 800ms var(--easing-default);
	}

	.nav__link.section-heading::after {
		transform: scaleX(1);
	}

	.nav--is-inverted {
		.nav__link{
			color: var(--black-200);
		}
	}

	@media (width <= 65rem) {
		.nav__list {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			gap: 0.5rem 1rem;
		}

		.nav__link {
			font-size: 0.875rem;
		}
	}

</style>
