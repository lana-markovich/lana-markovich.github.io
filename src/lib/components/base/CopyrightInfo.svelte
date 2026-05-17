<script>
	const links = [
		{ title: "Sviatlana Markovich © 2025", href: "/#" },
		{ title: "Privacy policy", href: "/#" },
		{ title: "Loyalty program regulation", href: "/#" },
	]
</script>

<ul class="links">
		{#each links as link}
			<li>
				<a class="text--secondary" href="{link.href}">{link.title}</a>
			</li>
		{/each}
</ul>

<style>
	.links {
		display: grid;
		grid-template-columns: var(--lines-columns-grid);
	}
</style>