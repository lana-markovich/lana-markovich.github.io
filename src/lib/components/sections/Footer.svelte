<script>
import BaseSection from "$lib/components/layout/BaseSection.svelte";
import CopyrightInfo from "$lib/components/base/CopyrightInfo.svelte";
import DecorationWrapper from "$lib/components/base/DecorationWrapper.svelte";
import telegram from "../../../assets/images/contact-icons/telegram.svg";
import instagram from "../../../assets/images/contact-icons/instagram.svg";
import behance from "../../../assets/images/contact-icons/behance.svg";
import mail from "../../../assets/images/contact-icons/mail.svg";
import linkedin from "../../../assets/images/contact-icons/link.svg";

const contacts = [
	{ href: "https://t.me/LanaMarkArt", src: telegram, alt:"telegram"},
	{ href: "https://www.instagram.com/lanamarkovichart", src: instagram, alt:"instagram"},
	{ href: "https://www.behance.net/sviatlanam395c", src: behance, alt:"behance" },
	{ href: "mailto:sviatlana.markovich1996@gmail.com", src: mail, alt:"mail"},
	{ href: "https://www.linkedin.com/in/sviatlana-markovich-3a39b7209", src: linkedin, alt:"linkedin"},
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
					<a class="contact-img" target="_blank" href={contact.href}>
						<img class="contact-img" src={contact.src} alt={contact.alt} />
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
		width: 8rem;
		height: 8rem;
	}
</style>