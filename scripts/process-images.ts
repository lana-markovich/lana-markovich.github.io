import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, parse, extname } from "node:path";
import { config } from "./image-config.js";

interface ProcessedImage {
	original: string;
	outputs: string[];
}

async function ensureOutputDir(): Promise<void> {
	if (!existsSync(config.outputDir)) {
		await mkdir(config.outputDir, { recursive: true });
	}
}

async function getSourceImages(): Promise<string[]> {
	if (!existsSync(config.inputDir)) {
		return [];
	}
	const files = await readdir(config.inputDir);
	return files.filter((file) =>
		config.inputExtensions.includes(extname(file).toLowerCase()),
	);
}

async function processImage(filename: string): Promise<ProcessedImage> {
	const inputPath = join(config.inputDir, filename);
	const { name } = parse(filename);
	const outputs: string[] = [];

	const image = sharp(inputPath);
	const metadata = await image.metadata();
	const originalWidth = metadata.width ?? 0;

	for (const width of config.sizes) {
		// Skip sizes larger than original
		if (width > originalWidth) {
			console.log(
				`  Skipping ${width}px (larger than original ${originalWidth}px)`,
			);
			continue;
		}

		const outputFilename = `${name}-${width}.webp`;
		const outputPath = join(config.outputDir, outputFilename);

		await sharp(inputPath)
			.resize(width, null, {
				withoutEnlargement: true,
				fit: "inside",
			})
			.webp({ quality: config.quality })
			.toFile(outputPath);

		outputs.push(outputFilename);
		console.log(`  Generated: ${outputFilename}`);
	}

	return { original: filename, outputs };
}

async function main(): Promise<void> {
	console.log("Image Processing Pipeline");
	console.log("========================");
	console.log(`Input: ${config.inputDir}`);
	console.log(`Output: ${config.outputDir}`);
	console.log(`Sizes: ${config.sizes.join(", ")}px`);
	console.log(`Quality: ${config.quality}%`);
	console.log("");

	await ensureOutputDir();
	const sourceImages = await getSourceImages();

	if (sourceImages.length === 0) {
		console.log("No source images found.");
		return;
	}

	console.log(`Found ${sourceImages.length} source image(s):`);

	const results: ProcessedImage[] = [];

	for (const filename of sourceImages) {
		console.log(`\nProcessing: ${filename}`);
		const result = await processImage(filename);
		results.push(result);
	}

	console.log("\n========================");
	console.log(`Processed ${results.length} image(s)`);
	console.log(
		`Generated ${results.reduce((sum, r) => sum + r.outputs.length, 0)} WebP file(s)`,
	);
}

main().catch(console.error);
