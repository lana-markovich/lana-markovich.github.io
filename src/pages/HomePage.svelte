<script lang="ts">
import { MediaQuery } from "svelte/reactivity";
import BasePage from "$lib/components/layout/BasePage.svelte";
import StickyNav from "$lib/components/layout/StickyNav.svelte";
import HomeHero from "$lib/components/sections/HomeHero.svelte";
import HomeIntro from "$lib/components/sections/HomeIntro.svelte";
import AboutMe from "$lib/components/sections/AboutMe.svelte";
import ImageGallery from "$lib/components/sections/ImageGallery.svelte";
import Footer from "$lib/components/sections/Footer.svelte";
import CaptureEmotions from "$lib/components/sections/CaptureEmotions.svelte";
import Services from "$lib/components/sections/Services.svelte";
import Portfolio from "$lib/components/sections/Portfolio.svelte";
import ExploringMediums from "$lib/components/sections/ExploringMediums.svelte";

const isCompact = new MediaQuery("(max-width: 65rem)");
</script>

<BasePage>
	<StickyNav target="#hero"/>
	<HomeHero/>
	<HomeIntro/>
	<AboutMe/>
	{#if isCompact.current}
		<ExploringMediums/>
	{/if}
	<ImageGallery/>
	<CaptureEmotions/>
	<Services/>
	{#if !isCompact.current}
		<ExploringMediums/>
	{/if}
	<Portfolio/>
	<Footer/>
</BasePage>
