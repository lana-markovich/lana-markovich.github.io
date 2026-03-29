<script lang="ts">
import BasePage from "$lib/components/layout/BasePage.svelte";
import HomeHero from "$lib/components/sections/HomeHero.svelte";
import HomeIntro from "$lib/components/sections/HomeIntro.svelte";
import AboutMe from "$lib/components/sections/AboutMe.svelte";
import ImageGallery from "$lib/components/sections/ImageGallery.svelte";
import Footer from "$lib/components/sections/Footer.svelte";
import CaptureEmotions from "$lib/components/sections/CaptureEmotions.svelte";
import Services from "$lib/components/sections/Services.svelte";
import Portfolio from "$lib/components/sections/Portfolio.svelte";
</script>

<BasePage>
	<HomeHero/>
	<HomeIntro/>
	<AboutMe/>
	<ImageGallery/>
	<CaptureEmotions/>
	<Services/>
	<Portfolio/>
	<Footer/>
</BasePage>
