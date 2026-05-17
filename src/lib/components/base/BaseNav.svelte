<script lang="ts">
	export let isInverted: boolean = false;
	const links = [
		{ title: "about me", href: "/#about" },
		{ title: "services", href: "/#services" },
		{ title: "portfolio", href: "/#portfolio" },
		{ title: "contacts", href: "/#contacts" },
	]
</script>

<nav class="nav {isInverted? 'nav--is-inverted': ''}">
	<ul class="nav__list">
		{#each links as link}
			<li class="nav__item">
				<a class="nav__link" href="{link.href}">-{link.title}</a>
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
	}
	.nav--is-inverted {
		.nav__link{
			color: var(--black-200);
		}
	}

</style>