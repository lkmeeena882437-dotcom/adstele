# Adstele Agency — Premium Ads Management Website

Marketing site for **Adstele Agency** — Meta Ads, Google Ads & Telegram Ads management.

## Stack

- **React 19 + TypeScript + Vite 7**
- **Tailwind CSS 4** (custom ice/cyan/violet design system, glassmorphism)
- **React Three Fiber + three.js** — bespoke procedural "Ad Constellation" 3D hero (no external assets)
- **Framer Motion** — scroll reveals, accordions, staggered entrances

## Performance & quality details

- 3D scene is **lazy-loaded** in its own chunk; initial bundle stays small
- Adaptive quality: DPR capped at 1.8, `performance.min` regression, fewer particles on mobile, scene auto-scales for narrow viewports
- Pure-CSS starfield fallback while the chunk loads, and for `prefers-reduced-motion` / no-WebGL devices
- Scroll-linked canvas fade, inertial mouse parallax, 3D tilt cards (disabled for reduced motion)
- CMS-ready content layer in `src/data/content.ts` (services, pricing, FAQs, workflow)

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
