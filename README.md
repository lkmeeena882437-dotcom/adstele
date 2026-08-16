# Adstele Agency — Premium Ads Management Website

Marketing site for **Adstele Agency** — Meta Ads, Google Ads & Telegram Ads management.

## Stack

- **React 19 + TypeScript + Vite 7**
- **Tailwind CSS 4** (custom ice/cyan/violet design system, glassmorphism)
- **React Three Fiber + three.js** — one global procedural 3D environment, zero external assets
- **Framer Motion** — scroll reveals, accordions, staggered entrances

## Full-site 3D (single WebGL context)

One fixed canvas runs behind the entire page and morphs per section:

| Section | 3D accent | Palette |
|---|---|---|
| Hero | Ad Constellation — 3 platform nodes orbiting a glass core on curved light-lines | ice/cyan/violet (dark) |
| Problem | Fractured rose wireframe with leaking bits | rose/amber |
| Services | Gyroscope of three platform rings | ice/cyan |
| Workflow | Comet tracing a lissajous light-trail | violet |
| Pricing | Ascending glowing growth bars | emerald |
| Contact | Pulsing signal rings | cyan/violet |

Accents travel with their section (screen-space mapping), scale to zero off-screen, and are disabled on mobile. Aurora glow + particle tints lerp to each section's palette while scrolling.

## Performance & quality details

- 3D ships in its own **lazy chunk** (~244 KB gzip); initial bundle stays ~115 KB gzip, first paint is a pure-CSS starfield
- Adaptive quality: DPR capped at 1.5, `performance.min` regression, fewer particles + no section accents on mobile
- `prefers-reduced-motion` / no-WebGL devices get a static CSS fallback
- Static gradient text (no continuous repaint), `antialiased` typography, solid dark chips instead of backdrop-blur over the scene — text stays sharp over 3D
- 3D buttons (`btn-3d` bevel + hover lift + press depth + shine sweep), 3D tilt cards, CSS 3D workflow cubes
- CMS-ready content layer in `src/data/content.ts` including per-section `SCENE_THEMES`

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
npm run preview
```
