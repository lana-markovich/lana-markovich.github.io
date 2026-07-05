<script>
	import BaseSection from "$lib/components/layout/BaseSection.svelte";
	import CopyrightInfo from "$lib/components/base/CopyrightInfo.svelte";
	import DecorationWrapper from "$lib/components/base/DecorationWrapper.svelte";
	import { dockEffect } from "$lib/utilities/dockEffect";
	import { scrollDockEffect } from "$lib/utilities/scrollDockEffect";
	import telegram from "../../../assets/images/contact-icons/telegram.svg";
	import instagram from "../../../assets/images/contact-icons/instagram.svg";
	import behance from "../../../assets/images/contact-icons/behance.svg";
	import mail from "../../../assets/images/contact-icons/mail.svg";
	import linkedin from "../../../assets/images/contact-icons/link.svg";

	const contacts = [
		{ href: "https://t.me/LanaMarkArt", src: telegram, alt: "telegram" },
		{ href: "https://www.instagram.com/lanamarkovichart", src: instagram, alt: "instagram" },
		{ href: "https://www.behance.net/sviatlanam395c", src: behance, alt: "behance" },
		{ href: "mailto:sviatlana.markovich1996@gmail.com", src: mail, alt: "mail" },
		{ href: "https://www.linkedin.com/in/sviatlana-markovich-3a39b7209", src: linkedin, alt: "linkedin" },
	]
</script>

<BaseSection class="footer" id="contacts" tracked>
	<div
		class="contacts-section"
		use:dockEffect={{ maxScale: 1.5, affectedNeighbors: 2, spreadFactor: 20, breakpoint: "(min-width: 65.0625rem)" }}
		use:scrollDockEffect={{ maxScale: 1.5, minScale: 0.6, affectedNeighbors: 2, spreadFactor: 20, breakpoint: "(max-width: 65rem)" }}
	>
		{#each contacts as contact}
			<div>
				<DecorationWrapper decorationPosition="bottom-left" size="small">
					<DecorationWrapper decorationPosition="top-right" size="small">
						<a class="contact-img" target="_blank" href={contact.href}>
							<img class="contact-img" src={contact.src} alt={contact.alt}/>
						</a>
					</DecorationWrapper>
				</DecorationWrapper>
			</div>
		{/each}
	</div>
	<p class="heading heading--xl footer__name">sviatlana markovich</p>
<!--	<CopyrightInfo/>-->
</BaseSection>

<style>
	:global(.footer .container) {
		padding-block-end: 0.5rem;
	}

	.contacts-section {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-block-end: 7.5rem;
	}

	.contacts-section > div {
		transform-origin: center;
		will-change: transform;
		transition: transform 0.5s ease-out, margin-inline 0.5s ease-out, margin-block 0.5s ease-out;
	}

	.contacts-section:hover > div {
		transition: transform 0.15s ease-out, margin-inline 0.15s ease-out;
	}

	.contact-img {
		width: 8rem;
		height: 8rem;
	}

	@media (width <= 65rem) {
		.contacts-section {
			flex-direction: column;
			align-items: center;
			gap: 2.5rem;
			margin-block-end: 4rem;
		}
	}

	/* Phones: match the hero heading size (see HomeHero.svelte) */
	@media (width <= 35rem) {
		.footer__name {
			margin-inline-end: 0;
		}
	}
</style>