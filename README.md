# Teen Card — Waitlist Site

Next.js 15 (App Router) · TypeScript · Tailwind v4 · Framer Motion.
Minimal, teen-friendly (13–17) waitlist landing page.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
# prod:
npm run build && npm run start
```

## Change the brand name (the important bit)
Everything reads from **`config/brand.ts`**. Edit one field:
```ts
export const brand = {
  name: "YouthPay",   // <-- change → nav, hero, copy, FAQ, footer, <title>, OG, share links, API all update
  ...
}
```
Also centralised there: `tagline`, `email`, `domain`, `launch`, `waitlistSeed`, `price`, `circular`, `ages`, `ceo`, `cto`, and `primaryColor` (recolours the whole theme in one place).

## Structure
```
config/brand.ts          single source of truth
app/layout.tsx           fonts + metadata (from brand) + primary-colour injection
app/page.tsx             composes the sections
app/globals.css          design tokens (Tailwind v4 @theme) + primitives
app/api/waitlist/route.ts POST endpoint (in-memory; swap for DB)
components/               nav, hero, problem, solution, how-it-works,
                         personas, regulatory, traction, waitlist, faq, footer
components/ui/            reveal (framer-motion), count-up, card-mockup, icons
```

## Waitlist backend
`app/api/waitlist/route.ts` stores signups in memory (resets on restart) and
returns `{ success, position, ref }`. Client also mirrors to `localStorage`.
Swap the `Map` for Supabase/Postgres when ready — response shape stays the same.

## What's polished vs v1 (static)
Real components, TS types, SSR (better SEO), Framer Motion reveals + staggered
grids, count-up stats, interactive 3D tilt card, animated aurora hero, scroll-aware
nav, API route. Design = clean/minimal (not the spec's brutalist), copy kept from spec.

## Before publish
- Replace placeholder testimonial + awards (traction section).
- Wire real DB in the API route.
- Old static version archived in `legacy/`.
- Pitch deck (`YouthPay_PitchDeck_PWC_PitchPerfect.md`) still lists Faiq as CTO — update if used.
