# Teen Card — Waitlist Landing Page

Minimal, teen-friendly (13–17) waitlist site. Static — no build step.

## Run it
```bash
cd website
python3 -m http.server 5173
# open http://localhost:5173
```
Or just double-click `index.html`.

## Change the brand name (the important bit)
Everything reads from **`config.js`**. Edit one field:
```js
window.BRAND = {
  name: "YouthPay",   // <-- change this → nav, hero, copy, FAQ, footer, <title>, share links all update
  ...
}
```
Nothing else to touch. In `index.html` the name appears as `{{brand}}` tokens; `app.js` swaps them on load. Same for `{{tagline}}`, `{{email}}`, `{{domain}}`, `{{launch}}`, `{{count}}` (waitlist seed), `{{price}}`, `{{circular}}`, `{{ages}}`.

Optional: set `primaryColor` in `config.js` to recolour the whole theme.

## Files
| File | Purpose |
|---|---|
| `config.js` | Brand config — single source of truth |
| `index.html` | Page markup (9 sections + nav + footer) |
| `styles.css` | Design tokens + all styling |
| `app.js` | Token injection, nav, scroll reveal, waitlist form |

## Waitlist
Submissions save to `localStorage` (`wl_signups_v1`) — no backend yet.
Swap the marked block in `app.js` for an API/Supabase call when the backend is ready.

## Notes
- Design deviates from the neo-brutalist v2 spec on purpose → minimal/clean per current direction. Copy is kept from the spec.
- Testimonial + awards are placeholders — replace before publish.
- Team (CEO / CTO) is stored in `config.js`; CTO = Muhammad Naimatullah Khan.
