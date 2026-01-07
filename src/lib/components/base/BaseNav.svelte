<script>
	const links = [
		{ title: "about", href: "/#about" },
		{ title: "services", href: "/#services" },
		{ title: "portfolio", href: "/#portfolio" },
		{ title: "contacts", href: "/#contacts" },
	]
</script>

<nav class="nav">
	<ul class="nav__list">
		{#each links as link}
			<li class="nav__item">
				<a class="nav__link" href="{link.href}">{link.title}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.nav__list {
		display: grid;
		grid-template-columns: 1fr 1fr 0.5fr 0.5fr;
	}

	.nav__item {
		&:last-child {
			text-align: end;
		}
	}

	.nav__link {
		font-weight: 600;
		letter-spacing: -0.02em;
	}
</style>