<script lang="ts">
  import type { BaseImageProps } from '$lib/types';

  type Size = NonNullable<BaseImageProps['sizes']>[number];

  let {
    name,
    alt,
    class: className = '',
    sizes = [2560, 1280, 720],
    loading = 'lazy',
    sizesAttr = '100vw'
  }: BaseImageProps = $props();

  // Sort sizes in descending order for proper srcset
  const sortedSizes = $derived(sizes.toSorted((a: Size, b: Size) => b - a)) satisfies number[];

  // Generate srcset string
  const srcset = $derived(
    sortedSizes
      .map((width: Size) => `/images/${name}-${width}.webp ${width}w`)
      .join(', ')
  );

  // Fallback to the smallest size
  const fallbackSrc = $derived(
    `/images/${name}-${sortedSizes.at(-1)}.webp`
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
