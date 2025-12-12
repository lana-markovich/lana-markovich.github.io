export interface ArtPiece {
	name: string;
	description: string;
	image: string;
	year: number;
}

export interface ResponsiveImageProps {
	/** Base image name (without size suffix or extension) */
	imageName: string;
	/** Alt text for accessibility */
	alt: string;
	/** Optional CSS class */
	class?: string;
	/** Available sizes (default: [2560, 1280, 720]) */
	sizes?: number[];
	/** Loading strategy */
	loading?: "lazy" | "eager";
	/** Sizes attribute for responsive images (e.g., "(min-width: 1280px) 50vw, 100vw") */
	sizesAttr?: string;
}
