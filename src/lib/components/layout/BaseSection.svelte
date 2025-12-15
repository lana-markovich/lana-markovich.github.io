<script>
	import BaseContainer from "$lib/components/layout/BaseContainer.svelte";
</script>

<section class="section">
	<BaseContainer>
		<slot />
	</BaseContainer>
</section>

<style>
	.section {
		padding-block: var(--section-padding-block);
	}
</style>