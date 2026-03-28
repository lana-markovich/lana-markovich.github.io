<script lang="ts">
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import BaseImage from "$lib/components/base/BaseImage.svelte";

</script>

<BaseSection class="services">
	<h2 class="heading heading--lg">Services</h2>
	<ol class="services__list">
		<li class="service">
			<header>
				<h3>Custom Paintings</h3>
			</header>
			<div class="service__main">
				<BaseImage
					class="service__image"
					name="deer"
					alt="Deer painting"
				/>
				<div class="service__text">
					<p class="text text--secondary">
						I bring interiors to life through custom hand-painted designs on furniture, walls, clothing,
						and various surfaces. From bold murals to delicate details.
					</p>
					<p class="text text--secondary">
						I transform everyday objects into unique art pieces
						that add personality and character to your space. Each project is tailored to complement your style
						and vision.
					</p>
				</div>
				<div class="service__tags">
					<p class="service__tag heading heading--lg">/wallart</p>
					<p class="service__tag heading heading--lg">/decor</p>
					<p class="service__tag heading heading--lg">/interior</p>
				</div>
			</div>
		</li>
	</ol>
</BaseSection>

<style>
	.service__main {
		display: grid;
		grid-template-areas: "image text"
		                     "image tags";
	}
	:global(.service__image) {
		grid-area: image;
	}
	.service__text {
		grid-area: text;
	}
	.service__tags {
		grid-area: tags;
	}
</style>