import { IMAGE_SOURCES } from './generated/constants.js';
import type { ImageEntry } from './types.js';

export const IMAGES = {
	'about-me': {
		...IMAGE_SOURCES['about-me'],
		alt: 'Sviatlana Markovich portrait',
		focalPoint: { x: 0.5, y: 0.76 },
		zoom: 1.0,
	},
	'abstract-1': {
		...IMAGE_SOURCES['abstract-1'],
		alt: 'Abstract artwork 1',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'abstract-2': {
		...IMAGE_SOURCES['abstract-2'],
		alt: 'Abstract artwork 2',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'abstract-3': {
		...IMAGE_SOURCES['abstract-3'],
		alt: 'Abstract artwork 3',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'anatomy-1': {
		...IMAGE_SOURCES['anatomy-1'],
		alt: 'Anatomy study 1',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'anatomy-2': {
		...IMAGE_SOURCES['anatomy-2'],
		alt: 'Anatomy study 2',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'capture-emotions': {
		...IMAGE_SOURCES['capture-emotions'],
		alt: 'Abstract digital art',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'confusion': {
		...IMAGE_SOURCES['confusion'],
		alt: 'Confusion',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'deer': {
		...IMAGE_SOURCES['deer'],
		alt: 'Deer painting',
		focalPoint: { x: 0.5, y: 0.18 },
		zoom: 1.0,
	},
	'forbidden-fruit-is-the-sweetest': {
		...IMAGE_SOURCES['forbidden-fruit-is-the-sweetest'],
		alt: 'Forbidden fruit is the sweetest',
		focalPoint: { x: 0.5, y: 0.53 },
		zoom: 1.0,
	},
	'intro': {
		...IMAGE_SOURCES['intro'],
		alt: 'Artist introduction background',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'isolation': {
		...IMAGE_SOURCES['isolation'],
		alt: 'Isolation',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'jacket-1-1': {
		...IMAGE_SOURCES['jacket-1-1'],
		alt: 'Hand-painted jacket front',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'jacket-1-2': {
		...IMAGE_SOURCES['jacket-1-2'],
		alt: 'Hand-painted jacket back',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'jacket-1-3': {
		...IMAGE_SOURCES['jacket-1-3'],
		alt: 'Hand-painted jacket detail',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'melancholy': {
		...IMAGE_SOURCES['melancholy'],
		alt: 'Melancholy',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'nostalgia': {
		...IMAGE_SOURCES['nostalgia'],
		alt: 'Nostalgia',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'nothing': {
		...IMAGE_SOURCES['nothing'],
		alt: 'Nothing',
		focalPoint: { x: 0.5, y: 0.32 },
		zoom: 1.0,
	},
	'portrait-1': {
		...IMAGE_SOURCES['portrait-1'],
		alt: 'Portrait 1',
		focalPoint: { x: 0.5, y: 0.25 },
		zoom: 1.0,
	},
	'portrait-2': {
		...IMAGE_SOURCES['portrait-2'],
		alt: 'Portrait 2',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'reality-doesnt-exist': {
		...IMAGE_SOURCES['reality-doesnt-exist'],
		alt: "Reality doesn't exist",
		focalPoint: { x: 0.5, y: 0.18 },
		zoom: 1.0,
	},
	'there-is-no-more-reality': {
		...IMAGE_SOURCES['there-is-no-more-reality'],
		alt: 'There is no more reality',
		focalPoint: { x: 0.5, y: 0.25 },
		zoom: 1,
	},
	'time-is-fleeting': {
		...IMAGE_SOURCES['time-is-fleeting'],
		alt: 'Time is fleeting',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
	'what-does-it-mean': {
		...IMAGE_SOURCES['what-does-it-mean'],
		alt: 'What does it mean',
		focalPoint: { x: 0.5, y: 0.5 },
		zoom: 1.0,
	},
} as const satisfies Record<string, ImageEntry>;
