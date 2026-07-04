# YouthPay — Website & Waitlist Architecture v2.0
**Type:** Internal Spec — Design + Copy + Dev  
**Version:** 2.0 — July 2026  
**Audience:** Faiq Khan (CTO) · Lubaisha Shaikh (CEO)  
**Classification:** Confidential — Not for External Distribution

---

## ⚙️ FAIQ: READ THIS BLOCK FIRST

Everything below is an implementable spec. Section copy is final-draft unless marked `[PLACEHOLDER]`. Design tokens and tech decisions are non-negotiable without CEO sign-off.

---

### Brand Tokens

| Token | Hex | When to use |
|---|---|---|
| `--red` | `#D62828` | Primary CTA buttons, badge borders, error states |
| `--gold` | `#F7C948` | Wordmark, stat numbers, hover fills, active nav indicator |
| `--navy` | `#1B2A4A` | Body text, page backgrounds (inverted sections), all borders |
| `--cream` | `#FAF7EF` | Default page background, card fills |
| `--green` | `#2D7D46` | Compliance badges, success states, checkmarks |

### Shadow System (Mamdani Hard Shadow — Mandatory)

```css
/* Standard card / interactive element */
box-shadow: 4px 4px 0px #1B2A4A;

/* Small elements (badges, chips) */
box-shadow: 3px 3px 0px #1B2A4A;

/* Large hero elements */
box-shadow: 6px 6px 0px #1B2A4A;

/* Hover / pressed state — shadow "presses in" */
transform: translate(4px, 4px);
box-shadow: none;
transition: transform 0.1s ease, box-shadow 0.1s ease;
```

**Zero blur on all shadows. Zero gradients. Zero glassmorphism. No white backgrounds on components (use cream). No rounded corners beyond 2px.**

### Typography Stack

```css
/* Headlines — all weights 700–900 */
font-family: 'Poppins', sans-serif;
letter-spacing: -0.5px; /* -1px on display sizes ≥ 48px */

/* Body / long-form */
font-family: 'Lora', serif;
font-weight: 400;

/* First-person testimonials / human voice moments */
font-family: 'Lora', serif;
font-style: italic;

/* Urdu text — RTL only */
font-family: 'Noto Nastaliq Urdu', serif;
direction: rtl;
/* Wrap in: <span class="urdu" dir="rtl"> */
```

Google Fonts import string:
```
https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Lora:ital,wght@0,400;0,600;1,400&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap
```

### UI Rules (Non-Negotiable)

- **No emoji anywhere in the UI** — the only exception is the trophy icon `🏆` in the Awards row of Section 7 (traction). Nowhere else.
- **No exclamation marks** in any headline or body copy.
- **Single CTA label sitewide:** `Claim Your Spot` — do not use "Sign Up," "Join," "Get Access," or any other variant.
- **Error states:** `--red` border + small error text below field. Never a red background fill.
- All interactive elements: `cursor: pointer`, hard shadow resting, translate + shadow-remove on hover.
- **Section dividers:** 2.5px solid `--navy` horizontal rule. No fading dividers.

### Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSR for SEO-critical pages. Static generation for waitlist. |
| Styling | Tailwind CSS | Extend config with brand tokens above as CSS custom properties |
| Icons | Phosphor Icons (`@phosphor-icons/react`) | No Material Icons. No Heroicons. |
| Waitlist backend | Supabase | Migrate from artifact storage immediately — see schema below |
| Fonts | Google Fonts (preconnect) | Poppins + Lora + Noto Nastaliq Urdu |
| Animation | Framer Motion | Entrance only. No looping. No parallax. |
| Analytics | Vercel Analytics or Plausible | Privacy-first. No Google Analytics. |
| Deployment | Vercel (existing) | Edge runtime for `/api/waitlist` |

### Supabase Waitlist Schema

```sql
CREATE TABLE waitlist_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  age_band TEXT CHECK (age_band IN ('13-14', '15-16', '17-18', 'parent')),
  city TEXT,
  use_case TEXT CHECK (use_case IN ('freelancer', 'creator', 'student', 'parent', 'other')),
  referral_code TEXT,            -- UUID from the person who referred them
  own_referral_code TEXT UNIQUE, -- UUID generated on signup for sharing
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  position INTEGER GENERATED ALWAYS AS IDENTITY -- queue number, shown post-submit
);
```

**After submit:** Return `{success: true, position: n, referral_code: "uuid"}`. Display: `"You're #[n] on the list. Share your link to move up."`

Referral share URL: `https://youthpay.pk/?ref=[own_referral_code]`

### Open Technical Decisions for Faiq

These need a decision before build:

1. **Card mockup:** CSS card component (recommended for launch speed) or real card photography? Recommend CSS with brand colors and a placeholder name. Swap for real card render post-design milestone.
2. **Waitlist position:** Show real sequential count or seeded starting number (e.g., seed at 300 to reflect actual waitlist)? CEO to decide. Document in comments either way.
3. **Urdu toggle at launch:** Full bilingual toggle (v2) or key heading Urdu subtitles only (launch)? Recommend key headings only for August. Full toggle is a post-launch sprint.
4. **Parent landing page:** `/parents` route with section order inverted (parent controls first, teen card second). Flag for post-launch sprint — do not hold August launch for this.
5. **Card delivery:** Is physical card delivery mechanism confirmed? Do not publish "delivered to your door" copy until logistics confirmed with EMI partner.

---

## 🏗️ PAGE ARCHITECTURE

### Strategic Posture

This page serves three audiences simultaneously: **teens** (primary conversion), **parents** (trust + permission gate), **investors** (narrative + traction signal). The copy must work for all three without announcing it.

**Positioning pivot:** Lead with the exclusive angle — Pakistan's first card for the teen earner. This is the wedge. The broader teen banking mission is real and stated, but not the hero. The earner story creates urgency, specificity, and press narrative. The broader mission creates scale.

**Page goal:** One action. One CTA. `Claim Your Spot`.

---

### NAV

```
YouthPay                    [How It Works]  [For Parents]  [Claim Your Spot →]
```

- Wordmark: Poppins 900, `--gold` on `--navy` background
- Nav background: `--navy`, 2.5px border-bottom in `--navy`
- "Claim Your Spot" nav button: `--gold` fill, `--navy` text, hard shadow, 3px border `--navy`
- On mobile: hamburger, drawer from right. Bottom of drawer: full-width `Claim Your Spot` button
- **Fix carried forward from v1:** Nav must not overlap headline on scroll or on any viewport below 375px width

---

### SECTION 1 — HERO

**Purpose:** Land the hook before the scroll. Teen reads first line and recognizes themselves.

**Layout:** Full-viewport height. Left column: copy block (60%). Right column: YouthPay card mockup — card in cream, `--red` accent stripe, teen name "Hania Sheikh" or equivalent generic teen name. Hard shadow on card. Navy border bottom separating from next section.

---

**HEADLINE:**
```
Your Name.
Pakistan's First Teen Card.
```
`Poppins 800, 56px desktop / 36px mobile, --navy`

**SUBHEADLINE:**
```
You earn. You build. You create.
But every payment still lands in someone else's account —
because no bank in Pakistan will give you your own.

YouthPay is Pakistan's first card and wallet
built for ages 13 to 18.
In your name. Backed by the State Bank of Pakistan.
```
`Lora 400, 18px, --navy, line-height 1.7`

**CTA (single):**
```
Claim Your Spot →
```
`Button: --red fill, cream text, Poppins 700, 2.5px --navy border, 6px 6px 0 --navy shadow`

**Below CTA — trust microcopy (two lines):**
```
Spots are capped. First come, first carded.
300+ teens already on the waitlist.
```
`Poppins 500, 13px, --navy, opacity 0.65`

**Compliance signal (bottom of hero, inline row):**
```
● Compliant with SBP BPRD Circular No. 01 of 2026
```
`--green dot, Poppins 500, 11px, --navy opacity 0.7, letter-spacing 0.06em`

---

### SECTION 2 — THE PROBLEM

**Purpose:** Make the pain specific and recognizable. Teens see themselves. Parents understand the gap.

**Layout:** Two-column. Left: narrative copy block. Right: "broken flow" visual diagram — two-column comparison card with hard shadow.

**Section label (small caps, above headline):**
```
THE GAP NOBODY HAS FILLED
```
`Poppins 700, 10px, letter-spacing 0.14em, --red`

**Headline:**
```
You already earned it.
Why is it in someone else's account?
```
`Poppins 800, 36px`

**Body copy:**
```
You finished a project for a client in Dubai.
Rs. 45,000. Two months of work.
It landed in your father's account.

Now you need his OTP to renew your hosting.
His permission to pay for the tools you need.
His patience, every single time you want to spend what you already earned.

He's not the problem. The system is.

No Pakistani bank, neobank, or telco has ever issued
a debit card to someone under 18.
Not one.

Not because the will wasn't there —
because the infrastructure never existed to verify you.

In April 2026, the State Bank of Pakistan issued a formal directive:
every licensed bank and Electronic Money Institution must now
offer teenager accounts for ages 13 to 18.

Nobody has built one.

That's YouthPay.
```
`Lora 400, 16px, --navy, line-height 1.75`

**Diagram component (right column):**

```
┌─────────────────────────────┬──────────────────────────────┐
│  WITHOUT YOUTHPAY           │  WITH YOUTHPAY               │
├─────────────────────────────┼──────────────────────────────┤
│  Fiverr/Upwork payout       │  Fiverr/Upwork payout        │
│         ↓                   │         ↓                    │
│  Parent's account           │  Your YouthPay wallet        │
│  (not your name)            │  (your name)                 │
│         ↓                   │         ↓                    │
│  OTP request → waiting      │  Spend. Save. Send.          │
│         ↓                   │  Done.                       │
│  Delay · Friction · Depend  │                              │
└─────────────────────────────┴──────────────────────────────┘
```

Left column: `--red` 2.5px border highlight, `--cream` fill, hard shadow
Right column: `--green` 2.5px border highlight, `--gold` accent on "Done"

---

### SECTION 3 — THE SOLUTION

**Purpose:** Show the product clearly. Three things: card, wallet, parent safety net.

**Layout:** Headline + subhead, then three-card grid with hard shadow tiles.

**Section label:**
```
WHAT YOUTHPAY GIVES YOU
```

**Headline:**
```
Your first card.
Your first wallet.
Your first real relationship with money.
```
`Poppins 800, 36px`

**Three-card grid (`gap: 16px, border: 2.5px --navy, box-shadow: 4px 4px 0 --navy`):**

**Card 1 — The Teen Card**
```
[Icon: CreditCard from Phosphor]

Teen Card

A real debit card in your name.
Not your parent's. Not a guardian's.
Yours — linked to your own YouthPay wallet.

Works online. Works in-store.
Verified using your NADRA B-Form
(Pakistan's under-18 identity document).
No CNIC required.
```

**Card 2 — The Dual-Currency Wallet**
```
[Icon: Wallet from Phosphor]

Dual-Currency Wallet

Receive international payments directly
into your own wallet.

Keep earnings in USD when you need to pay
for global tools — software subscriptions,
cloud storage, online courses.

Convert to PKR when you're ready
for local spending.
```

**Card 3 — Parent Controls**
```
[Icon: ShieldCheck from Phosphor]

Parent Controls

Real-time spending alerts.
Spending limits set by you and your parent, together.
One-tap top-ups from any account.

Parents stay informed.
You stay in charge.
It's not surveillance — it's a safety net.
```

---

### SECTION 4 — HOW IT WORKS

**Purpose:** Remove "but how do I actually get this" friction. Three steps. No jargon.

**Layout:** Numbered horizontal flow on desktop, vertical stack on mobile. Numbered step containers with hard shadow and arrow connectors.

**Section label:**
```
THREE STEPS TO YOUR CARD
```

**Headline:**
```
From the waitlist to your wallet
in three steps.
```

**Step 1:**
```
① Claim your spot

Join the waitlist with your name, age, and email.
You'll get early access before the public launch.
```

**Step 2:**
```
② Verify with your B-Form

We use your NADRA B-Form —
Pakistan's identity document for under-18s.
Your identity. Your account. No adult proxy needed.
```

**Step 3:**
```
③ Get your card

Your card is issued in your name.
Linked to your YouthPay wallet.
Ready to use online and in-store.
```

---

### SECTION 5 — WHO THIS IS FOR

**Purpose:** Signal exclusivity with the earner angle (wedge). Then open to broader teen audience. Then speak to parents as a third persona.

**Layout:** Headline + three persona tiles with hard shadow.

**Section label:**
```
WHO YOUTHPAY IS BUILT FOR
```

**Headline:**
```
You don't have to be earning in dollars
to deserve your own card.

But if you are — this was built for you first.
```
`Poppins 800, 32px desktop`

**Three persona tiles:**

**Tile 1 — The Teen Earner (lead tile, slightly larger):**
```
The Earner

You freelance. You create. You tutor.
Fiverr, Upwork, YouTube — your money comes from everywhere.
It doesn't have to land in someone else's account anymore.

YouthPay gives you a card in your name,
a wallet that holds USD and PKR,
and the identity verification to make it legal.
```
`--gold` top border accent on this tile

**Tile 2 — The Teen Learner:**
```
The Learner

You want to buy your own course subscriptions.
Pay for your own tools. Save toward something that matters.
YouthPay gives you the account to do it —
without needing a parent's card every single time.
```

**Tile 3 — The Parent:**
```
For Parents

You want your teenager to learn money before the world
teaches them the wrong way.

YouthPay puts you in the loop — spending alerts,
limits, and full visibility — without putting you in the way.

They get their independence. You get your peace of mind.
```

---

### SECTION 6 — REGULATORY ANCHOR

**Purpose:** Convert parental skepticism. Build institutional credibility. Signal investor legitimacy.

**Layout:** Navy background section (inverted). Cream text. Gold CTA.

**Section label (cream, opacity 0.55):**
```
BACKED BY THE STATE BANK OF PAKISTAN
```

**Headline:**
```
This isn't a workaround.
It's what the regulator asked for.
```
`Poppins 800, 36px, --cream`

**Body copy:**
```
In April 2026, the State Bank of Pakistan issued BPRD Circular No. 01 —
formally requiring all licensed banks, microfinance banks,
and Electronic Money Institutions to offer teenager accounts
for ages 13 to 18, with full digital onboarding.

YouthPay is built on that foundation.

We operate as a technology and product layer
on top of a licensed Electronic Money Institution.
Your wallet is issued, your card is backed,
and your money is held by a fully licensed financial institution.
We make it work for you — for the first time in Pakistan's history.
```
`Lora 400, 16px, --cream, line-height 1.75`

**Compliance badge row (4 badges, `--green` left border, `--navy` interior, `--cream` text, hard shadow):**
```
● SBP BPRD Circular 01/2026 Compliant
● B-Form / NADRA Verified Onboarding
● Licensed EMI Partner — Card Issuance
● Parental Guardian Framework Built In
```
`Poppins 600, 11px, letter-spacing 0.08em`

**Note for Faiq — CRITICAL:** Do not use SBP logo without confirmed written clearance. Reference the circular by name and number. Do not imply SBP "endorses" YouthPay — say "operating under" or "compliant with." Legal distinction matters here.

---

### SECTION 7 — TRACTION

**Purpose:** Validate urgency. Show momentum without overstating. Speaks to teens (social proof), parents (credibility), investors (traction).

**Layout:** Three stat boxes + one testimonial quote block + awards row.

**Section label:**
```
THE WAITLIST IS MOVING
```

**Headline:**
```
300 teens on the list.
Zero ads spent.
```

**Three stat boxes (hard shadow, `--gold` stat numbers):**

```
┌─────────────┬─────────────┬─────────────┐
│    300+     │      0      │   Aug 2026  │
│             │             │             │
│  Teens on   │  Ad spend   │  Launch     │
│  waitlist   │  to get     │  target     │
│             │  there      │             │
└─────────────┴─────────────┴─────────────┘
```

**Quote block (Lora Italic, `--navy` left border 4px, `--cream` background):**
```
"I've been getting paid on Fiverr for eight months.
Every rupee has gone through my dad's account.
I can't wait to have my own."

— Zara, 17, Karachi
```
`[PLACEHOLDER — replace with real waitlist testimonial before publish. Do not publish fabricated quotes.]`

**Awards row (single line, centered):**
```
🏆 IBA Karachi Best Innovation Award   ·   🏆 Junior CEO Pakistan Finalist
```
`[Trophy emoji permitted here only. Nowhere else on the page.]`
`Poppins 600, 13px`

---

### SECTION 8 — WAITLIST CAPTURE (Final CTA)

**Purpose:** Convert. One action. Maximum friction removal.

**Layout:** Full-width. `--navy` background. Gold headline. Cream body. Red bottom border.

**Headline:**
```
Pakistan's first teen card launches August 2026.
```
`Poppins 800, 36px, --gold`

**Subhead:**
```
We're starting with a limited group.
Be among the first to get access.
```
`Lora 400, 16px, --cream`

**Form fields (inline on desktop, stacked on mobile):**
```
[ Your Full Name ]   [ Your Age ]   [ Your Email Address ]

                [ Claim Your Spot → ]
```

All fields: `--cream` background, 2.5px `--navy` border, no border-radius, Poppins 400, `--navy` placeholder text at 0.5 opacity.
Button: `--gold` fill, `--navy` text, Poppins 700, 2.5px `--navy` border, 4px 4px 0 `--navy` shadow.

**Age field:** Dropdown. Options: `13`, `14`, `15`, `16`, `17`, `18`, `I'm a parent`.

**Post-submit state (replaces form):**
```
You're in. #[position] on the list.

Share your link — move up the queue.
[Copy link button]  [WhatsApp share button]
```

**Microcopy below button:**
```
Spots are capped. First come, first carded.
We will never sell your information.
```
`Lora 400, 12px, --cream, opacity 0.65`

---

### SECTION 9 — FAQ (COLLAPSIBLE)

**Purpose:** Handle parent objections. Handle teen questions. Reduce waitlist drop-off.

**Layout:** Single column, accordion. Each item: 2.5px `--navy` border, cream background, hard shadow on open state.

**Q1: Is this legal for someone under 18 in Pakistan?**
```
Yes. The State Bank of Pakistan's BPRD Circular No. 01 of April 2026
formally mandates that licensed banks and Electronic Money Institutions
offer teenager accounts for ages 13 to 18 using NADRA B-Form verification.
YouthPay is built specifically to comply with this framework.
```

**Q2: Who actually holds the money? Is it safe?**
```
Your wallet and card are issued and held by a licensed Electronic Money
Institution (EMI) — a regulated financial institution under SBP supervision.
YouthPay is the product and technology layer. We don't hold funds directly.
Your money sits with a licensed institution.
```
`[PLACEHOLDER: Update with specific EMI partner name once confirmed]`

**Q3: Do parents have to be involved?**
```
Yes — and that's by design, not restriction. Under Pakistani regulation,
a parent or guardian co-signs as the account's legal guardian.
They get real-time spending alerts and can set limits. But the card
is in your name, the wallet is controlled by you, and you're the one
making the spending decisions.
```

**Q4: I'm a freelancer on Fiverr or Upwork. Can I receive payments directly?**
```
Yes. YouthPay is designed specifically to solve this problem.
Your account is in your name — matching your platform profile —
which prevents the identity mismatch that gets accounts flagged
or payments frozen when teens route earnings through parent accounts.
The dual-currency wallet lets you keep USD earnings in USD
and convert to PKR when you need to spend locally.
```
`[Note: Confirm with EMI partner which specific international platforms are supported before publishing this answer verbatim]`

**Q5: Is there a monthly fee?**
```
Basic access is free at launch. A premium subscription becomes
available once you're an active user. Pricing starts at Rs. 99/month.
We'll tell you before anything costs money.
```

**Q6: When exactly is the launch?**
```
August 2026. Waitlist members get access first, in order of signup.
Spots are capped for the initial batch. That's why the list is moving.
```

---

### FOOTER

**Layout:** Three columns on desktop, stacked on mobile. `--navy` background, `--cream` text.

**Column 1 — Brand:**
```
YouthPay
Pakistan's First Teen Financial Platform

admin@youthpay.pk
```

**Column 2 — Links:**
```
How It Works
For Parents
FAQ
[Claim Your Spot]
```

**Column 3 — Regulatory Disclosure:**
```
YouthPay is not a bank.
Card and wallet services are provided by a licensed
Electronic Money Institution regulated by the
State Bank of Pakistan.

Operating under SBP BPRD Circular No. 01 of 2026.
```
`Lora 400, 11px, opacity 0.65`

**Bottom bar:**
```
© 2026 YouthPay.  All rights reserved.
```

---

## 📱 MOBILE SPECIFICATIONS

- **Hero:** Single column. Card mockup below copy block. Headline max 36px. CTA full-width.
- **Problem diagram:** Stack vertically. "Without" first, "With" second.
- **Three-card grid:** Single column scroll. Cards full-width.
- **Persona tiles:** Single column scroll.
- **Regulatory section:** Full-width. Compliance badges stack 2×2.
- **Stat boxes:** 3-column on mobile still (numbers are short enough).
- **Waitlist form:** Three fields stacked. CTA full-width. 48px min tap height on all inputs and button.
- **Nav:** Hamburger drawer. Pinned bottom bar: full-width `Claim Your Spot` button in `--red`.
- **Viewport safety:** Test at 375px, 390px, 414px. No element overflow. No horizontal scroll.

---

## 🌐 BILINGUAL NOTES (URDU)

At August launch: Add Urdu subtitle beneath hero headline and beneath the regulatory section headline only. Full Urdu toggle is a post-launch sprint — do not delay August launch for it.

Hero headline Urdu subtitle:
```
پاکستان کا پہلا ٹین کارڈ
```
`Noto Nastaliq Urdu, 18px, dir="rtl", --navy, opacity 0.7`

Regulatory section Urdu subtitle:
```
اسٹیٹ بینک آف پاکستان کے تحت کام کرتا ہے
```

---

## 📊 DATA SOURCES USED IN THIS DOCUMENT

| Claim | Figure | Source |
|---|---|---|
| Waitlist size | 300+ | Internal (organic, zero ad spend) |
| SBP directive | BPRD Circular No. 01 of April 2026 | State Bank of Pakistan |
| Pakistan under-18 population | ~90 million (40%+) | YouthPay Competitive Analysis 2026 (internal) |
| Pakistan teen unbanked status | No existing under-18 card product | YouthPay Competitive Analysis 2026 (internal) |
| Awards | IBA Best Innovation, Junior CEO Pakistan Finalist | Internal records |
| Launch target | August 2026 | Internal planning |
| Subscription price | Rs. 99/month | Internal pricing decision |

**Note:** The `YouthPay_Financial_Report_Updated.pdf` project file returned empty — no figures could be extracted. All financial data in this document is sourced from the Strategic Blueprint and Competitive Analysis only.

---

*YouthPay · Website Architecture v2.0 · July 2026 · Confidential*
