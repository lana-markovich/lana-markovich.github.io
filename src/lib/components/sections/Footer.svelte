<script>
import BaseSection from "$lib/components/layout/BaseSection.svelte";
import CopyrightInfo from "$lib/components/base/CopyrightInfo.svelte";
import DecorationWrapper from "$lib/components/base/DecorationWrapper.svelte";
import BaseImage from "$lib/components/base/BaseImage.svelte";

const contacts = [
	{ href: "/#", name: "tg", alt:"tg"},
	{ href: "/#", name: "inst", alt:"inst"},
	{ href: "/#", name: "behance", alt:"behance" },
	{ href: "/#", name: "mail", alt:"mail"},
	{ href: "/#", name: "in", alt:"in"},
]
</script>

<BaseSection type="section" class="footer">
	<h2 class="heading heading--md footer__subheading">Contacts</h2>
	<p class="text footer__text">You can ask anything about my work and how you can coloborate with me</p>
	<div class="contacts-section">
		{#each contacts as contact}
			<div>
			<DecorationWrapper decorationPosition="bottom-left" width="2.5em" height="2.5em">
				<DecorationWrapper decorationPosition="top-right" width="2.5em" height="2.5em">
					<a class="contact-img" href="{contact.href}">
						<BaseImage
							name={contact.name}
							alt={contact.alt}
							sizes={[160]}
						/>
					</a>
				</DecorationWrapper>
			</DecorationWrapper>
			</div>
		{/each}
	</div>
	<CopyrightInfo/>
</BaseSection>

<style>
	.footer__subheading {
		margin-block-end: 1.5em;
		grid-area: subheading;
	}
	.footer__text {
		grid-area: text;
		max-width: 25ch;
		margin-block-end: 4.7em;
	}
	.contacts-section{
		display: flex;
		justify-content: space-between;
		margin-block-end: 12em;
	}
	.contact-img {
		width: 132px;
		height: 132px;
	}
</style>