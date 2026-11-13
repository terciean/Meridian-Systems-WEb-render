export type SkillVariant = 'mesh' | 'halftone' | 'deco' | 'brutal';

export interface SkillShowcaseItem {
  title: string;
  body: string;
  variant: SkillVariant;
}

const VARIANT_CYCLE: SkillVariant[] = ['mesh', 'halftone', 'deco', 'brutal'];

function variantFor(index: number): SkillVariant {
  return VARIANT_CYCLE[index % VARIANT_CYCLE.length];
}

// Each card's animated visual is a placeholder slot (see SkillCard.tsx) — the content here is
// the brief for whoever builds the actual animation, not a description of something already built.
export const SKILL_SHOWCASE: SkillShowcaseItem[] = [
  { variant: variantFor(0), title: 'Particles', body: 'A floating particle field — quiet, ambient motion in the background.' },
  { variant: variantFor(1), title: 'Liquid morph', body: 'A soft shape that flows and reshapes itself, never sitting still.' },
  { variant: variantFor(2), title: 'Holographic', body: 'An iridescent surface that shifts colour as it moves.' },
  { variant: variantFor(3), title: 'Neon glow', body: 'A bold, glowing accent built for a site that wants to stand out after dark.' },
  { variant: variantFor(4), title: 'Wireframe 3D', body: 'A rotating 3D wireframe with a precise, engineered feel.' },
  { variant: variantFor(5), title: 'Glassmorphism', body: 'A frosted glass panel with real depth, light and a subtle sheen.' },
  { variant: variantFor(6), title: 'Kinetic type', body: 'Typography that moves with the same energy as the brand behind it.' },
  { variant: variantFor(7), title: 'Isometric', body: 'A clean isometric illustration — structured and product-led.' },
  { variant: variantFor(8), title: 'Clay 3D', body: 'A soft, tactile 3D shape with a friendly, approachable feel.' },
  { variant: variantFor(9), title: 'ASCII art', body: 'A playful, text-based animation — a nod to the terminal with real character.' },
];
