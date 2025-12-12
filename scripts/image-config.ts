export interface ImageProcessingConfig {
	/** Input directory relative to project root */
	inputDir: string;
	/** Output directory relative to project root */
	outputDir: string;
	/** Array of widths to generate */
	sizes: number[];
	/** WebP quality (0-100) */
	quality: number;
	/** Supported input extensions */
	inputExtensions: string[];
}

export const config: ImageProcessingConfig = {
	inputDir: "src/assets/images",
	outputDir: "public/images",
	sizes: [2560, 1280, 720],
	quality: 95,
	inputExtensions: [".png", ".jpg", ".jpeg"],
};
