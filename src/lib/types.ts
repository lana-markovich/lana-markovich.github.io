type ArtPieceName = string;

export interface ArtPiece {
	name: ArtPieceName;
	description: string;
	image: string;
	year: number;
}

export interface BaseImageProps {
	/** Base image name (without size suffix or extension) */
	name: ArtPieceName;
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
