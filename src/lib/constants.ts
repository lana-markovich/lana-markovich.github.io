import type { ArtPiece } from './types.js';
import { IMAGES } from './images.js';

export * from "./generated/constants";
export { IMAGES } from './images.js';

export const ART_PIECES = {
	'melancholy': {
		id: 'melancholy',
		name: "Melancholy",
		year: 2020,
		shortDescription: "100*70 cm, charcoal on paper",
		description: `
			<p></p>
			<p></p>
		`,
		image: IMAGES['melancholy'],
	},
	'nostalgia': {
		id: 'nostalgia',
		name: "nostalgia",
		year: 2020,
		shortDescription: "100*70 cm, mixed media",
		description: `
			<p></p>
			<p></p>
		`,
		image: IMAGES['nostalgia'],
	},
	'isolation': {
		id: 'isolation',
		name: "isolation",
		year: 2018,
		shortDescription: "100*140 cm, mixed media",
		description: `
			<p>The work “Isolation” tells a story of solitude, withdrawal, 
and inner silence, inviting the viewer to confront moments 
of fragility and detachment that belong to the human experience. The human figure conveys a sense of vulnerability; the face 
is almost hidden, reinforcing the idea of a loss of identity 
and a distance from the external world</p>
		`,
		image: IMAGES['isolation'],
	},
	'confusion': {
		id: 'confusion',
		name: "confusion",
		year: 2020,
		shortDescription: "100*70 cm, charcoal on paper",
		description: `
			<p></p>
			<p></p>
		`,
		image: IMAGES['confusion'],
	},
	'what-does-it-mean': {
		id: 'what-does-it-mean',
		name: "what does it mean to see",
		year: 2019,
		shortDescription: "100*70 cm, mixed media",
		description: `
			<p>“What Does It Mean to See” poses a question to the viewer: 
is what we see around us reality, or merely a fixation on the external form of things? The image is not presented as a whole; 
it remains fragmented and open to interpretation.</p>
			<p>If we turn to Aristotle’s philosophy, to see means 
to perceive form but not essence. Truth begins 
where vision encounters its own limits.
</p>
			<p>The viewer is invited to mentally complete the image, becoming aware that any understanding remains subjective and incomplete. In this way, the work engages not only 
the eye but also the mind, moving the viewer from a simple act of seeing to a process of reflection.</p>
		`,
		image: IMAGES['what-does-it-mean'],
	},
	'there-is-no-more-reality': {
		id: 'there-is-no-more-reality',
		name: "there is no more reality",
		year: 2020,
		shortDescription: "100*70 cm, mixed media",
		description: `
			<p></p>
			<p></p>
		`,
		image: IMAGES['there-is-no-more-reality'],
	},
	'time-is-fleeting': {
		id: 'time-is-fleeting',
		name: "time is fleeting",
		year: 2019,
		shortDescription: "70*50 cm, mixed media",
		description: `
			<p></p>
			<p></p>
		`,
		image: IMAGES['time-is-fleeting'],
	},
	'reality-doesnt-exist': {
		id: 'reality-doesnt-exist',
		name: "Reality doesn't exist",
		year: 2020,
		shortDescription: "100*70 cm, charcoal on paper",
		description: `
			<p>“Reality doesn't exist” establishes a dialogue between the viewer and the image, calling into question the very notion of reality.
It prompts reflection on what can be considered real today 
and what is merely an image, projection, or interpretation.</p>
			<p>Through a melancholic portrait of a person 
gazing at the viewer, the work raises the question: 
where is reality, and where is illusion?</p>
		`,
		image: IMAGES['reality-doesnt-exist'],
	},
	'nothing': {
		id: 'nothing',
		name: "nothing",
		year: 2018,
		shortDescription: "100*140 cm, mixed media",
		description: `
			<p>The work “Nothing” speaks of nothingness as a state of inner emptiness and loss of meaning. The face becomes a sign 
of absence—it is still recognizable, yet no longer whole. Nothing does not depict a specific person, but rather a condition 
in which identity loses its definition and becomes almost anonymous.
</p>
			<p>The work leaves the viewer in silence and pause, inviting not 
the search for explanations, but a direct encounter with a sense of emptiness that can be both unsettling and strangely familiar</p>
		`,
		image: IMAGES['nothing'],
	},
	'portrait-1': {
		id: 'portrait-1',
		name: "portrait",
		year: 2021,
		shortDescription: "100*70 cm, mixed media",
		description: `
			<p></p>
			<p></p>
		`,
		image: IMAGES['portrait-1'],
	},
	'portrait-2': {
		id: 'portrait-2',
		name: "portrait 2",
		year: 2022,
		shortDescription: "21*29,7 cm, pencil",
		description: `
			<p></p>
			<p></p>
		`,
		image: IMAGES['portrait-2'],
	},
	'anatomy-1': {
		id: 'anatomy-1',
		name: "anatomy 1",
		year: 2022,
		shortDescription: "21*29,7 cm, mixed media",
		description: `
			<p></p>
			<p></p>
		`,
		image: IMAGES['anatomy-1'],
	},
	'anatomy-2': {
		id: 'anatomy-2',
		name: "anatomy 2",
		year: 2023,
		shortDescription: "21*29,7 cm, mixed media",
		description: `
			<p></p>
			<p></p>
		`,
		image: IMAGES['anatomy-2'],
	},
	'deer': {
		id: 'deer',
		name: "deer",
		year: 2022,
		shortDescription: "140*200 cm, mixed media",
		description: `
			<p></p>
			<p></p>
		`,
		image: IMAGES['deer'],
	},
	'abstract-1': {
		id: 'abstract-1',
		name: "abstract-1",
		image: IMAGES['abstract-1'],
	},
	'abstract-2': {
		id: 'abstract-2',
		name: "abstract-2",
		image: IMAGES['abstract-2'],
	},
	'abstract-3': {
		id: 'abstract-3',
		name: "The cracks",
		year: 2019,
		shortDescription: "100*70 cm, mixed media",
		image: IMAGES['abstract-3'],
	},
	'body-1': {
		id: 'body-1',
		name: "body",
		year: 2025,
		shortDescription: "mixed media",
		description: `
			<p>The poster Body focuses specifically on the theme of violence, understood both in its physical form and in its verbal form, which is subtle yet equally invasive, such as control and fear. The central image is the digital scan of the artist’s face, transformed to break with the idea of recognizability and perfection.</p>
		`,
		image: IMAGES['body-1'],
		additionalImages: [IMAGES['body-2'], IMAGES['body-3'], IMAGES['body-4']],
	},
	'copy-la-grenouillere': {
		id: 'copy-la-grenouillere',
		name: "copy of \"La Grenouillere\"",
		year: 2019,
		shortDescription: "50*70  cm, acrylic",
		description: `
			<p>A copy of the work “Le Grenouillère” by Claude Monet was painted in oil on canvas for a painting technique lesson, inspired by Impressionism.</p>
		`,
		image: IMAGES['copy-la-grenouillere'],
	},
	'dresser-decoration-storks': {
		id: 'dresser-decoration-storks',
		name: "dresser decoration \"storks\"",
		year: 2025,
		shortDescription: "200*60  cm, acrylic",
		description: `
			<p>The chest of drawers “Storks” is painted with acrylic paints. 
I wanted to convey the atmosphere of my homeland, Belarus. 
In Belarus, the stork symbolizes purity and rebirth.</p>
		`,
		image: IMAGES['dresser-decoration-storks'],
	},
	'imagination': {
		id: 'imagination',
		name: "imagination",
		year: 2015,
		shortDescription: "100*30 cm, oil",
		description: `
			<p>The painting “Imagination” depicts a girl sitting with flowers in anticipation. Imagination is not only the creation of images from the past but also the generation of new forms in the mind.</p>
		`,
		image: IMAGES['imagination'],
	},
	'iris': {
		id: 'iris',
		name: "iris",
		year: 2023,
		shortDescription: "50*50 cm, oil",
		description: `
			<p>The painting “Iris”, created in oil on canvas, symbolizes life energy, movement, and spiritual strength. Here, the iris is not just a flower, but an expression of energy that one wants to share with the world.</p>
		`,
		image: IMAGES['iris'],
	},
	'landscape-1': {
		id: 'landscape-1',
		name: "landscape 1",
		year: 2022,
		shortDescription: "50*70  cm, acrylic",
		description: `
			<p>The landscape with aerial perspective was painted in 2023 using acrylics for a color theory course at the Academy of Arts.</p>
		`,
		image: IMAGES['landscape-1'],
	},
	'pikoala': {
		id: 'pikoala',
		name: "children's art set packaging \"Pikoala\"",
		year: 2000,
		shortDescription: "illustrator and photoshop",
		description: `
			<p>The project involved designing a children's art set packaging 
for the Packaging course. The name of the mascot, PIKOALA, 
is a combination of two characters: the Cubist artist Picasso 
and the Koala animal. The color box and the coloring book 
were developed for children in a Cubist style. A bright color palette was selected to convey a playful and artistic atmosphere.</p>
		`,
		image: IMAGES['pikoala-1'],
		additionalImages: [IMAGES['pikoala-2'], IMAGES['pikoala-3']],
	},
	'still-life': {
		id: 'still-life',
		name: "still life",
		year: 2016,
		shortDescription: "100*100  cm, oil",
		description: `
			<p>The still life was painted from life in 2016 at the College of Arts during a painting class, using oil on canvas and a palette knife.</p>
		`,
		image: IMAGES['still-life'],
	},
	'jacket-1': {
		id: 'jacket-1',
		name: "The hand-painted jacket",
		year: 2024,
		shortDescription: "acrylic for custom",
		description: `
			<p>A hand-painted jacket, inspired by the work "The Great Wave" by the artist Utagawa Hiroshige. In the original print, Mount Fuji appears in the background, a sacred symbol of Japan.</p>
			<p>Despite the threatening wave, the sky remains calm and bright, reflecting the Zen idea of maintaining serenity even amid storms. The design of the jacket conveys this same message: staying calm and centered even in the face of life's difficulties.</p>
		`,
		image: IMAGES['jacket-1-1'],
		additionalImages: [IMAGES['jacket-1-2'], IMAGES['jacket-1-3']],
	},
	'shopper-bag-design-noise': {
		id: 'shopper-bag-design-noise',
		name: "Shopper bag design \"Noise\"",
		year: 2025,
		shortDescription: "35*38 cm, illustrator and photoshop",
		description: `
			<p>The design of the Noise shopper bag is inspired by a distinctive architectural element of Caffè Florian: the eight-pointed star. The threads that emerge from this visual element are intended to tangibly represent Noise. This design conveys the message that Noise should not only be perceived in a negative sense, but can also carry positive connotations.</p>
		`,
		image: IMAGES['shopper-bag-design-noise-1'],
		additionalImages: [IMAGES['shopper-bag-design-noise-2'], IMAGES['shopper-bag-design-noise-3']],
	}
} satisfies Record<string, ArtPiece>;

export type ArtPieceId = keyof typeof ART_PIECES;
