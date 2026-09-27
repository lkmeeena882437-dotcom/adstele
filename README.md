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

## Tracking & search visibility setup

- Meta Pixel is consent-gated. After consent, it sends `PageView` plus one custom signal: `TelegramChannelClick`. Support/DM, form, pricing, and calendar actions are deliberately not sent to Meta for this subscriber-focused funnel. The event means a visitor clicked the channel link—not that Telegram confirmed a join. In Events Manager, create a custom conversion from `TelegramChannelClick` before selecting it as an ad-set optimization event.
- First-touch `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, and `utm_term` are retained for up to 90 days only after consent, then attached to Pixel events. Example campaign URL: `?utm_source=meta&utm_medium=paid_social&utm_campaign=campaign-name&utm_content=ad-name&utm_term=ad-set-name`. Form names and phone numbers are never sent to Meta.
- To separate actual channel joins by ad campaign, create a distinct Telegram invite link for each campaign and set the optional `VITE_TELEGRAM_INVITE_LINKS` JSON map. Use lower-case `utm_campaign` values as keys; optional fallbacks are `source:meta`, `source:google`, and `default`. If no invite map is configured, the site falls back to the public channel link, so it can count link clicks but not campaign-specific joins.
- A website Pixel cannot see what happens inside Telegram. To attribute channel joins, use separate Telegram invite links per campaign. To confirm actual Telegram DMs as conversions, route through a Telegram bot with campaign start parameters and a webhook; sending those conversions to Meta also requires a secured Meta Conversions API token and a suitable first-party store. Do not count channel/DM link clicks as completed leads.
- Copy `.env.example` to `.env.local` for local testing and set `VITE_META_PIXEL_ID` to the Pixel ID. For Vercel, add `VITE_META_PIXEL_ID` as an environment variable and redeploy. Pixel IDs are public browser IDs; do not put account passwords or access tokens in frontend code.
- `VITE_SITE_URL` supplies the canonical, Open Graph, structured-data and sitemap origin. It defaults to `https://adstele.vercel.app`. Keep that value until the custom domain is purchased, connected in Vercel, and serving the site. Then set it to `https://adstele.in` and redeploy so canonical tags, `robots.txt` and `sitemap.xml` all move together.
- Once the custom domain is live, add/verify its Domain property in Google Search Console through DNS, submit `/sitemap.xml`, and request indexing for the homepage. The current Vercel Search Console property does not automatically verify the future domain.
- SEO work provides correct technical signals, not a ranking guarantee. Keep service/location claims accurate; do not add a physical business address unless it is a real, customer-facing location.
