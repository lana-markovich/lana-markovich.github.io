<script lang="ts">
  import type { BaseImageProps } from '$lib/types';
  import { IMAGES } from '$lib/generated/constants.js';

  type Size = NonNullable<BaseImageProps['sizes']>[number];

  let {
    name,
    alt,
    class: className = '',
    sizes = [...IMAGES[name].sizes],
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

<picture class="image image--{name} {className}">
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
	.image, img {
		display: block;
		width: 100%;
		height: auto;
		max-height: 100%
	}
	img {
		object-fit: inherit;
		object-position: inherit;
	}
</style>
