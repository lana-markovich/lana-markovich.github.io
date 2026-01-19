<script lang="ts">
import BasePage from "$lib/components/layout/BasePage.svelte";
import HomeHero from "$lib/components/sections/HomeHero.svelte";
import HomeIntro from "$lib/components/sections/HomeIntro.svelte";
import AboutMe from "$lib/components/sections/AboutMe.svelte";
</script>

<BasePage>
	<HomeHero/>
	<HomeIntro/>
	<AboutMe/>
</BasePage>

<style>
  .home {
    padding: 2rem;
  }
</style>
