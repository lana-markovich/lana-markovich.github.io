export interface ImageProcessingConfig {
	/** Input directory relative to project root */
	inputDir: string;
	/** Output directory relative to project root */
	outputDir: string;
	/** Array of widths to generate */
	sizes: number[];
	/**
	 * WebP quality (0-100) per output width. Wide renditions are always shown
	 * downscaled, so compression artefacts are far less visible in them than in
	 * the small ones — hence the lower quality the larger the width.
	 */
	quality: Record<number, number>;
	/** Quality for widths missing from `quality` */
	fallbackQuality: number;
	/** Supported input extensions */
	inputExtensions: string[];
}

export const config: ImageProcessingConfig = {
	inputDir: "src/assets/images",
	outputDir: "public/images",
	sizes: [2560, 1280, 720],
	quality: {
		2560: 75,
		1280: 85,
		720: 90,
	},
	fallbackQuality: 85,
	inputExtensions: [".png", ".jpg", ".jpeg"],
};
