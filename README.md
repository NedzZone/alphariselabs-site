# AlphaRise Labs — Website

Personal/venture site for Ned Shoaei (AlphaRise Labs) — a therapeutic neurofeedback game studio. Built with React + Vite + Tailwind, with a reduced-motion-aware scroll-motion system (motion/react).

## Running the code

- `npm i` — install dependencies
- `npm run dev` — start the dev server
- `npm run build` — production build (outputs to `dist/`)

## Sections (nav order)

`Start` (hero) · `Story` (bio + keynote photo) · `Process` (photo timeline, Spring 2025 → Summer 2026) · `AlphaRise` (project card with The Idea / Design Philosophy / Recognition tabs) · `Connect` (contact + LinkedIn).

Component map: `src/app/components/` — `Hero`, `Story`, `Process`, `Portfolio` (AlphaRise), `Contact` (Connect), `Nav`, plus the shared `motion.tsx` (FadeIn / RevealSide / RevealZoom / Stagger, all `prefers-reduced-motion` aware). Assets live in `src/assets/<Section>/`.

## Checkpoints

- **`website-iteration-1`** (2026-06-24) — first full iteration of the rebuilt AlphaRise Labs site: 5-section structure, process photo timeline with credits, AlphaRise tabs (zooming brain, starfield backgrounds), and the cinematic scroll-motion system. Restore with `git checkout website-iteration-1`.
- **`iteration-2-locked`** (2026-06-10) — earlier locked checkpoint (original Figma export baseline). Restore with `git checkout iteration-2-locked`.
