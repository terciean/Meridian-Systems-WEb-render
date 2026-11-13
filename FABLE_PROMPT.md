# Prompt for Fable 5.2 — "Proof of skill" card animations

Paste the section below to Fable 5.2. Everything else in this file is context for you (Claude), not part of the prompt.

---

## Prompt

You're adding 10 distinct animated visuals to an existing React + Tailwind site (Ethos Creative Systems — steel blue `#507289`, graphite `#171B20`, slate `#242B33`, silver `#C8CED5`, cool white `#F7FAFD`; Barlow Condensed for display type, Source Sans 3 for body). The site is light-themed.

**Where:** `src/components/home/SkillCard.tsx` renders a 3D stacked card carousel on the homepage ("Proof of skill" section). Each card has an empty placeholder slot:

```tsx
<div
  data-animation-slot={animationSlot}
  className="flex h-full max-h-48 w-full max-w-48 items-center justify-center rounded-2xl border border-dashed border-ink-500/50 text-xs font-semibold uppercase tracking-[0.2em] text-ink-400 transition-transform duration-500 ease-out group-hover:scale-105"
>
  {skill.title}
</div>
```

**Your job:** replace the placeholder content of each slot with a real, polished, distinct animation — nothing else. Don't touch the card's outer tilt/3D-stack mechanics, the carousel logic (`SkillShowcaseSection.tsx`), routing, or any other part of the site.

**The 10 slots**, identified by `data-animation-slot` value, each needs its own animation matching this one-line creative brief (from `src/data/skillShowcase.ts`):

| `data-animation-slot` | Style | Brief |
|---|---|---|
| `particles` | Particles | A floating particle field — quiet, ambient motion in the background. |
| `liquid-morph` | Liquid morph | A soft shape that flows and reshapes itself, never sitting still. |
| `holographic` | Holographic | An iridescent surface that shifts colour as it moves. |
| `neon-glow` | Neon glow | A bold, glowing accent built for a site that wants to stand out after dark. |
| `wireframe-3d` | Wireframe 3D | A rotating 3D wireframe with a precise, engineered feel. |
| `glassmorphism` | Glassmorphism | A frosted glass panel with real depth, light and a subtle sheen. |
| `kinetic-type` | Kinetic type | Typography that moves with the same energy as the brand behind it. |
| `isometric` | Isometric | A clean isometric illustration — structured and product-led. |
| `clay-3d` | Clay 3D | A soft, tactile 3D shape with a friendly, approachable feel. |
| `ascii-art` | ASCII art | A playful, text-based animation — a nod to the terminal with real character. |

**Constraints:**
- Each animation must fit inside a ~12rem × 12rem (192px) box and look intentional at that size, not cramped.
- The card background behind the slot cycles through 4 different textured surfaces (see `FRAME_CLASS`/`SURFACE_STYLE` in `SkillCard.tsx` — "mesh", "halftone", "deco", "brutal"). Make sure each animation reads clearly against the specific surface its card uses — a few of these are busy/textured, and a few (not all) are intentionally dark. Check contrast per card rather than assuming one background.
- No new npm dependencies unless genuinely necessary — pure CSS/SVG animation is strongly preferred; a small amount of JS (e.g. canvas particles) is fine if it's self-contained and lightweight.
- The site already globally disables animation under `prefers-reduced-motion: reduce` (in `src/index.css`) for anything using CSS `animation`/`transition`. If you use a JS-driven animation loop (e.g. `requestAnimationFrame` for particles), you must check `window.matchMedia('(prefers-reduced-motion: reduce)')` yourself and freeze/skip it — the global CSS override won't catch JS-driven motion.
- This is a Vite + React (TypeScript) project with a custom lightweight router — not Next.js. Don't assume any Next-specific APIs.
- Run `npm run typecheck`, `npm run build`, and `npm run lint` when done and fix anything that breaks.

---

## Notes for you (Claude), not part of the Fable prompt

- `src/data/skillShowcase.ts` holds the 10 titles/briefs and which of the 4 frame variants each card cycles through (`variant: 'mesh' | 'halftone' | 'deco' | 'brutal'`, assigned round-robin by index).
- `src/components/home/SkillCard.tsx`'s `slugify()` function is what turns a title like "Liquid morph" into the `data-animation-slot` value `liquid-morph` — if Fable renames a card title later, the slug changes too, so keep them in sync.
- The earlier rough CSS-based versions of these 10 animations (built for a since-removed showcase grid on the Website Design & SEO page) were deleted entirely, on your instruction, so Fable starts clean rather than anchored to a rougher first draft.
