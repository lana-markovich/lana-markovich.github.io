<script lang="ts">
  import type { ResponsiveImageProps } from '$lib/types';

  let {
    imageName,
    alt,
    class: className = '',
    sizes = [2560, 1280, 720],
    loading = 'lazy',
    sizesAttr = '100vw'
  }: ResponsiveImageProps = $props();

  // Sort sizes in descending order for proper srcset
  const sortedSizes = $derived(sizes.toSorted((a, b) => b - a));

  // Generate srcset string
  const srcset = $derived(
    sortedSizes
      .map(width => `/images/${imageName}-${width}.webp ${width}w`)
      .join(', ')
  );

  // Fallback to smallest size
  const fallbackSrc = $derived(
    `/images/${imageName}-${sortedSizes[sortedSizes.length - 1]}.webp`
  );
</script>

<picture class={className}>
  <source
    type="image/webp"
    {srcset}
    sizes={sizesAttr}
  />
  <img
    src={fallbackSrc}
    {alt}
    {loading}
    decoding="async"
  />
</picture>

<style>
  picture {
    display: block;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
</style>
