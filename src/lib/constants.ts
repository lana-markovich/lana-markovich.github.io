import type { ArtPiece } from './types.js';
import { IMAGES } from './images.js';

export * from "./generated/constants";
export { IMAGES } from './images.js';

export const ART_PIECES = {
	'melancholy': {
		name: "Melancholy",
		year: 2020,
		shortDescription: "100*70 cm, charcoal on paper",
		image: IMAGES['melancholy'],
	},
	'nostalgia': {
		name: "nostalgia",
		year: 2020,
		shortDescription: "100*70 cm, mixed media",
		image: IMAGES['nostalgia'],
	},
	'isolation': {
		name: "isolation",
		year: 2020,
		shortDescription: "100*140 cm, mixed media",
		image: IMAGES['isolation'],
	},
	'confusion': {
		name: "confusion",
		year: 2020,
		shortDescription: "100*70 cm, charcoal on paper",
		image: IMAGES['confusion'],
	},
	'what-does-it-mean': {
		name: "what does it mean",
		year: 2020,
		shortDescription: "100*70 cm, mixed media",
		image: IMAGES['what-does-it-mean'],
	},
	'there-is-no-more-reality': {
		name: "there is no more reality",
		year: 2020,
		shortDescription: "100*70 cm, mixed media",
		image: IMAGES['there-is-no-more-reality'],
	},
	'time-is-fleeting': {
		name: "time is fleeting",
		year: 2019,
		shortDescription: "70*50 cm, mixed media",
		image: IMAGES['time-is-fleeting'],
	},
	'reality-doesnt-exist': {
		name: "reality doesn't exist",
		year: 2020,
		shortDescription: "100*70 cm, charcoal on paper",
		image: IMAGES['reality-doesnt-exist'],
	},
	'nothing': {
		name: "nothing",
		year: 2018,
		shortDescription: "100*140 cm, mixed media",
		image: IMAGES['nothing'],
	},
	'forbidden-fruit-is-the-sweetest': {
		name: "forbidden fruit is the sweetest",
		year: 2015,
		shortDescription: "120*60 cm, mixed media",
		image: IMAGES['forbidden-fruit-is-the-sweetest'],
	},
	'portrait-1': {
		name: "portrait 1",
		year: 2021,
		shortDescription: "100*70 cm, mixed media",
		image: IMAGES['portrait-1'],
	},
	'portrait-2': {
		name: "portrait 2",
		year: 2022,
		shortDescription: "21*29,7 cm, pencil",
		image: IMAGES['portrait-2'],
	},
	'anatomy-1': {
		name: "anatomy 1",
		year: 2022,
		shortDescription: "21*29,7 cm, mixed media",
		image: IMAGES['anatomy-1'],
	},
	'anatomy-2': {
		name: "anatomy 2",
		year: 2023,
		shortDescription: "21*29,7 cm, mixed media",
		image: IMAGES['anatomy-2'],
	},
	'deer': {
		name: "deer",
		year: 2022,
		shortDescription: "140*200 cm, mixed media",
		image: IMAGES['deer'],
	},
	'abstract-1': {
		name: "abstract-1",
		image: IMAGES['abstract-1'],
	},
	'abstract-2': {
		name: "abstract-2",
		image: IMAGES['abstract-2'],
	},
	'abstract-3': {
		name: "abstract-3",
		image: IMAGES['abstract-3'],
	},
	'jacket-1': {
		name: "The hand-painted jacket",
		year: 2024,
		shortDescription: "acrylic for custom",
		description: `
			<p>A hand-painted jacket, inspired by the work "The Great Wave" by the artist Utagawa Hiroshige. In the original print, Mount Fuji appears in the background, a sacred symbol of Japan.</p>
			<p>Despite the threatening wave, the sky remains calm and bright, reflecting the Zen idea of maintaining serenity even amid storms. The design of the jacket conveys this same message: staying calm and centered even in the face of life's difficulties.</p>
		`,
		image: IMAGES['jacket-1-1'],
		additionalImages: [IMAGES['jacket-1-2'], IMAGES['jacket-1-3']],
	}
} satisfies Record<string, ArtPiece>;

export type ArtPieceId = keyof typeof ART_PIECES;
