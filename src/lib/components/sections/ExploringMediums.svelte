<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
</script>

<BaseSection class="exploring-mediums" id="exploring-mediums" tracked>
	<div class="exploring-mediums__text">
		<h2 class="heading heading--lg">
			Exploring Mediums From Canvas to Everyday Objects
		</h2>
		<p class="text text--secondary">
			I work with pigments, oil, and acrylic in abstract pieces, paint furniture and home decor, and create wearable art on clothing. My artwork also weaves social and ecological themes, revealing forces shaping modern life.
		</p>
	</div>
</BaseSection>

<style>
	:global(.exploring-mediums .container) {
		padding-block: 0;
	}
	.exploring-mediums__text {
		display: grid;
		grid-template-columns: var(--lines-columns-grid);
		grid-template-areas: "heading heading heading"
		                     ".       text    text";
		row-gap: 1.5rem;
		text-wrap-style: pretty;
		@media (width <= 65rem) {
			grid-template-areas: "heading heading"
			                     ".       text";
		}
		@media (width <= 35rem) {
			grid-template-areas: "heading"
			                     "text";
		}

		.heading {
			grid-area: heading;
			max-width: 25ch;
			margin-block-end: 0;
		}
		.text {
			grid-area: text;
			max-width: 52ch;
			margin-block: 0;
		}
	}
</style>
