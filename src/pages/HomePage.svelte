<script lang="ts">
import BasePage from "$lib/components/layout/BasePage.svelte";
import HomeHero from "$lib/components/sections/HomeHero.svelte";
import HomeIntro from "$lib/components/sections/HomeIntro.svelte";
</script>

<BasePage>
	<HomeHero/>
	<HomeIntro/>
</BasePage>

<style>
  .home {
    padding: 2rem;
  }
</style>
