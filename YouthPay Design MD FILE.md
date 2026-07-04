# YouthPay Design System
**Version 1.0 — Developer Handoff Document**
*Internal — Confidential*

---

## Table of Contents

1. [Philosophy & North Star](#1-philosophy--north-star)
2. [Color Tokens — Light & Dark Mode](#2-color-tokens--light--dark-mode)
3. [Typography System](#3-typography-system)
4. [Spacing & Layout Grid](#4-spacing--layout-grid)
5. [The Signature: Mamdani Shadow Treatment](#5-the-signature-mamdani-shadow-treatment)
6. [Component Library](#6-component-library)
7. [Motion & Animation](#7-motion--animation)
8. [Iconography](#8-iconography)
9. [Illustration Style](#9-illustration-style)
10. [Pingo Usage Rules](#10-pingo-usage-rules)
11. [Screen-by-Screen Design Guide](#11-screen-by-screen-design-guide)
12. [Microcopy Voice](#12-microcopy-voice)
13. [Accessibility](#13-accessibility)
14. [Anti-Patterns — What to Never Build](#14-anti-patterns--what-to-never-build)

---

## 1. Philosophy & North Star

### The Design Thesis

YouthPay does not look like a fintech app. It looks like a movement.

The reference is the Zohran Mamdani NYC mayoral campaign — designed by the co-op Forge. Vibrant colored panels, bold drop-shadowed type, hand-lettered energy, Bollywood poster drama. It felt like something you'd tape to a shopfront, not something a bank made. It was loud enough to stop a New Yorker mid-stride. YouthPay should stop a Pakistani teen mid-scroll.

The visual thesis: **financial literacy, made to feel like it belongs to you.** Not beige, not corporate, not clinical. A product that a 15-year-old in Karachi looks at and thinks "this was made for me" — and a parent looks at and still trusts with their money.

### Three Audiences, One Design System

Every design decision passes through three lenses simultaneously:

| Audience | What they feel when they open the app | Design signal that achieves it |
|---|---|---|
| **Teen (13–17)** | "This is mine. It gets me." | Bold color, expressive type, personality |
| **Parent** | "This is serious. I trust it." | Structure, clarity, green accent = trust, data legibility |
| **Investor/Partner** | "This is built by people who know their market." | Cultural specificity, not imported Western defaults |

### The Single Design Rule

Before shipping any screen, ask: **"Would this get taped to a shopfront in Lahore's Liberty Market?"** If yes — it has enough energy. If it looks like a Chase Bank notification — rethink.

---

## 2. Color Tokens — Light & Dark Mode

### Brand Palette (Immutable)

These five colors are non-negotiable across all modes and contexts.

```css
--brand-red:   #D62828;   /* Tomato Red — primary accent, urgency, action */
--brand-gold:  #F7C948;   /* Gold — reward, achievement, AI insight */
--brand-navy:  #1B2A4A;   /* Deep Navy — authority, text, dark backgrounds */
--brand-cream: #FAF7EF;   /* Cream — warmth, light backgrounds */
--brand-green: #2D7D46;   /* Forest Green — trust, growth, parent view */
```

### Light Mode Tokens

```css
/* Backgrounds */
--bg-base:          #FAF7EF;   /* Cream — main app background */
--bg-elevated:      #FFFFFF;   /* White — cards, modals, sheets */
--bg-panel:         #F0EDE3;   /* Warm off-white — secondary panels */
--bg-panel-navy:    #1B2A4A;   /* Navy panels (hero sections, card widget) */
--bg-panel-red:     #D62828;   /* Red panels (CTAs, alerts) */
--bg-panel-gold:    #F7C948;   /* Gold panels (AI insight cards) */

/* Text */
--text-primary:     #1B2A4A;   /* Deep Navy — all body copy */
--text-secondary:   #4A5568;   /* Medium gray-navy — secondary info */
--text-muted:       #8896A7;   /* Muted — captions, placeholders */
--text-on-dark:     #FAF7EF;   /* Cream — text on navy/red backgrounds */
--text-on-gold:     #1B2A4A;   /* Navy — text on gold panels */

/* Borders */
--border-default:   #E2DDD0;   /* Warm gray — dividers, card borders */
--border-strong:    #C8C2B4;   /* Stronger divider */
--border-navy:      #2D3F5C;   /* Navy border for dark panels */

/* Interactive */
--interactive-primary:    #D62828;   /* Red — primary buttons, links */
--interactive-secondary:  #1B2A4A;   /* Navy — secondary buttons */
--interactive-success:    #2D7D46;   /* Green — success states, parent controls */
--interactive-warning:    #F7C948;   /* Gold — warnings, nudges */
--interactive-error:      #C0392B;   /* Dark red — error states */

/* Focus ring */
--focus-ring:       #D62828;   /* Red focus ring, 2px solid, 2px offset */
```

### Dark Mode Tokens

Dark mode is **not** just inverted. It uses a deeper navy base, keeps the same brand accents, and makes the gold pop even harder.

```css
/* Backgrounds */
--bg-base:          #0F1925;   /* Darkest navy — main dark background */
--bg-elevated:      #1B2A4A;   /* Brand navy — elevated surfaces */
--bg-panel:         #243550;   /* Lighter navy — secondary panels */
--bg-panel-red:     #D62828;   /* Red panels unchanged */
--bg-panel-gold:    #F7C948;   /* Gold panels unchanged */

/* Text */
--text-primary:     #FAF7EF;   /* Cream — primary text on dark */
--text-secondary:   #B8C4D0;   /* Muted blue-white */
--text-muted:       #6B7A8D;   /* Further muted */
--text-on-dark:     #FAF7EF;   /* Same cream */
--text-on-gold:     #1B2A4A;   /* Navy on gold unchanged */

/* Borders */
--border-default:   #2D3F5C;
--border-strong:    #3D5070;
--border-navy:      #3D5070;

/* Interactive (slightly brightened for dark contrast) */
--interactive-primary:    #E03434;   /* Slightly brighter red */
--interactive-secondary:  #FAF7EF;   /* Cream — secondary on dark */
--interactive-success:    #3D9A57;   /* Brighter green */
--interactive-warning:    #F7C948;
--interactive-error:      #E84040;

--focus-ring:       #F7C948;   /* Gold focus ring in dark mode */
```

### Mode Implementation

```css
/* Apply in your root CSS */
:root {
  color-scheme: light;
  /* Light tokens here */
}

@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
    /* Dark tokens here */
  }
}

/* Manual override class — for the in-app toggle */
[data-theme="dark"] {
  /* Dark tokens here */
}

[data-theme="light"] {
  /* Light tokens here */
}
```

### Color Usage Rules

- **Red** is action and urgency. Primary buttons. CTAs. "Send money" type moments. Never use it for decorative backgrounds that span full screens (except the card widget).
- **Gold** is reward and insight. Every AI-generated insight card uses a gold background. Achievement badges. "Your money is working" moments. Do not use gold for errors.
- **Navy** is authority. The main text color in light mode. Hero panels. The dark mode background. When in doubt between navy and black, choose navy.
- **Cream** is home. The main background in light mode. The "exhale" color. Never use cream text on a white background.
- **Green** is trust and growth. Reserved almost entirely for parent-facing UI, success states, savings progress, and spending-under-budget indicators.

---

## 3. Typography System

### Typeface Stack

```css
/* Display — the personality voice */
--font-display: 'Poppins', sans-serif;
/* Used at ExtraBold (800) and Black (900) for all hero headings.
   This is where the Mamdani drop shadow treatment lives.
   Never use Poppins Display at weights below 700. */

/* Body — the conversational voice */
--font-body: 'Poppins', sans-serif;
/* Regular (400) for reading, Medium (500) for labels and emphasis */

/* Serif accent — the warmth voice */
--font-serif: 'Lora', serif;
/* Used sparingly for pull quotes, insight captions, "human" moments.
   Bold (700) or Regular (400) only. Never in UI controls. */

/* Urdu support */
--font-urdu: 'Noto Nastaliq Urdu', serif;
/* Load via Google Fonts. Used for any Urdu-language text content.
   Right-to-left. See Section 13 for RTL layout guidance. */

/* Data/numbers */
/* Use Poppins SemiBold (600) for all financial figures.
   Tabular numbers: font-variant-numeric: tabular-nums; */
```

### Type Scale

```css
/* All sizes assume a 16px root */
--text-display:    3rem;       /* 48px — balance hero, splash screens */
--text-hero:       2.25rem;    /* 36px — screen section heroes */
--text-h1:         2rem;       /* 32px — page titles */
--text-h2:         1.5rem;     /* 24px — section headers */
--text-h3:         1.25rem;    /* 20px — card titles, tab labels */
--text-h4:         1.0625rem;  /* 17px — list headers, sub-labels */
--text-body-lg:    1.0625rem;  /* 17px — comfortable reading */
--text-body:       0.9375rem;  /* 15px — default body */
--text-body-sm:    0.8125rem;  /* 13px — secondary info, descriptions */
--text-caption:    0.6875rem;  /* 11px — timestamps, legal, microlabels */

/* Line heights */
--leading-tight:   1.1;    /* Display headings only */
--leading-snug:    1.25;   /* Sub-headers */
--leading-normal:  1.5;    /* Body copy */
--leading-relaxed: 1.65;   /* Long-form text, insight explanations */

/* Letter spacing */
--tracking-tight:  -0.02em;  /* Display text — pulls letters together for impact */
--tracking-normal:  0em;
--tracking-wide:    0.06em;  /* ALL-CAPS labels, category tags */
--tracking-wider:   0.1em;   /* Eyebrow labels above sections */
```

### Typography Rules

1. **Display text (48px, 36px) is always ExtraBold (800) or Black (900), with tight tracking (-0.02em).** Never display at Regular weight — it loses its presence.

2. **Financial numbers always use SemiBold (600) with tabular-nums.** "Rs. 12,450" should never shift width as digits change.

3. **Lora is for moments, not for UI.** Use it for AI insight explanations, onboarding story paragraphs, and section intro text. Never on buttons, nav labels, or form inputs.

4. **Urdu text must use `noto nastaliq urdu` and never `poppins`.** Always RTL. Minimum size 16px for Urdu body (Nastaliq is harder to read small).

5. **Never set body copy below 13px.** On mobile, 15px is the minimum for anything a user reads to understand their finances.

---

## 4. Spacing & Layout Grid

### Base Unit: 4px

All spacing uses multiples of 4px.

```css
--space-1:   4px;
--space-2:   8px;
--space-3:   12px;
--space-4:   16px;
--space-5:   20px;
--space-6:   24px;
--space-8:   32px;
--space-10:  40px;
--space-12:  48px;
--space-16:  64px;
--space-20:  80px;
--space-24:  96px;
```

### Mobile Layout Grid

YouthPay is **mobile-first and mobile-only** for the teen product. No desktop app.

```
Screen width: 375px reference (iPhone SE)
Safe horizontal padding: 20px (--space-5) each side
Content column: 335px
Gutter between columns (if 2-col): 12px

Bottom navigation bar height: 80px
  (includes system home indicator space on newer phones)
Top safe area: respect device notch/island
  Use: padding-top: env(safe-area-inset-top)
```

### Border Radius

```css
--radius-sm:   8px;    /* Tags, chips, small badges */
--radius-md:   12px;   /* Buttons */
--radius-lg:   16px;   /* Cards, panels */
--radius-xl:   24px;   /* Bottom sheets, modals */
--radius-full:  9999px; /* Pill buttons, avatar rings */
```

**Note:** Do not give cards border-radius larger than 16px. At 24px+ they start to feel like a medical app, not a fintech. We want the slight sharpness.

---

## 5. The Signature: Mamdani Shadow Treatment

This is YouthPay's single most distinctive design move. It must be applied consistently and never used as decoration — only on **hero type** and **bold UI elements**.

### What It Is

Hard offset drop shadows with zero blur. Inspired by Bollywood poster typography and the Zohran Mamdani campaign visual language. Not a soft box-shadow. A flat, color-matched hard shadow that makes type feel like it was screen-printed.

### CSS Definitions

```css
/* TEXT SHADOWS — for display headings */

/* Gold text on Navy panel — red hard shadow */
.shadow-text-gold-on-navy {
  color: #F7C948;
  text-shadow: 3px 3px 0px #D62828;
}

/* Cream text on Navy panel — red shadow */
.shadow-text-cream-on-navy {
  color: #FAF7EF;
  text-shadow: 3px 3px 0px #D62828;
}

/* Red text on Cream background — navy shadow */
.shadow-text-red-on-cream {
  color: #D62828;
  text-shadow: 4px 4px 0px #1B2A4A;
}

/* Navy text on Gold panel — red shadow */
.shadow-text-navy-on-gold {
  color: #1B2A4A;
  text-shadow: 3px 3px 0px #D62828;
}


/* BOX SHADOWS — for cards and buttons */

/* Red hard shadow (most prominent) */
.shadow-hard-red {
  box-shadow: 4px 4px 0px #D62828;
}

/* Navy hard shadow */
.shadow-hard-navy {
  box-shadow: 4px 4px 0px #1B2A4A;
}

/* Small hard shadow (UI controls) */
.shadow-hard-sm-navy {
  box-shadow: 2px 2px 0px #1B2A4A;
}

.shadow-hard-sm-red {
  box-shadow: 2px 2px 0px #D62828;
}

/* Soft shadow — for modals, sheets, floating elements only */
.shadow-soft {
  box-shadow: 0 4px 24px rgba(27, 42, 74, 0.12);
}
```

### When to Use

| Element | Shadow Rule |
|---|---|
| Home screen balance figure | `shadow-text-gold-on-navy` (cream background panel, large text) |
| Primary CTA button | `shadow-hard-sm-navy` on press (idle: navy fill only) |
| AI Insight card | `shadow-hard-red` on the entire gold card |
| Section headings | `shadow-text-red-on-cream` (light mode) |
| Category badge / chip | No shadow — too small |
| Modals / bottom sheets | `shadow-soft` only |
| Charts | No shadow — data clarity first |
| Nav bar | No shadow — flat |

### When NOT to Use

- Never apply text shadows to body text (15px and below)
- Never apply hard box shadows to every card on a list — reserve for 1–2 hero cards per screen
- Never use the shadow on red text on a red background
- Never blur the shadow — it must be `blur: 0`

---

## 6. Component Library

### 6.1 Buttons

#### Primary Button

```css
.btn-primary {
  background: var(--brand-red);       /* #D62828 */
  color: var(--brand-cream);          /* #FAF7EF */
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-body-lg);     /* 17px */
  padding: 16px 24px;
  border-radius: var(--radius-md);    /* 12px */
  border: 2px solid var(--brand-navy);
  box-shadow: 3px 3px 0px var(--brand-navy);
  letter-spacing: 0;
  cursor: pointer;
  transition: transform 100ms ease, box-shadow 100ms ease;
}

.btn-primary:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px var(--brand-navy);
}

.btn-primary:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}
```

The "press down" active state — where the button physically shifts into its shadow — is the critical interaction. It makes the button feel like a stamp. This is intentional and must not be removed.

#### Secondary Button

```css
.btn-secondary {
  background: var(--brand-navy);
  color: var(--brand-cream);
  font-weight: 600;
  font-size: var(--text-body);        /* 15px */
  padding: 14px 22px;
  border-radius: var(--radius-md);
  border: 2px solid var(--brand-navy);
  box-shadow: 3px 3px 0px var(--brand-red);
  transition: transform 100ms ease, box-shadow 100ms ease;
}

.btn-secondary:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px var(--brand-red);
}
```

#### Ghost Button

```css
.btn-ghost {
  background: transparent;
  color: var(--brand-navy);
  font-weight: 600;
  font-size: var(--text-body);
  padding: 14px 22px;
  border-radius: var(--radius-md);
  border: 2px solid var(--brand-navy);
  box-shadow: none;
}

/* Dark mode */
[data-theme="dark"] .btn-ghost {
  color: var(--brand-cream);
  border-color: var(--brand-cream);
}
```

#### Destructive Button

```css
.btn-destructive {
  background: transparent;
  color: var(--brand-red);
  border: 2px solid var(--brand-red);
  padding: 14px 22px;
  border-radius: var(--radius-md);
  font-weight: 600;
}
```

#### Icon Action Button (Quick Actions Row)

Small, square, used in the home dashboard quick actions row.

```css
.btn-icon-action {
  width: 64px;
  height: 64px;
  background: var(--bg-elevated);
  border-radius: var(--radius-lg);    /* 16px */
  border: 2px solid var(--border-default);
  box-shadow: 2px 2px 0px var(--brand-navy);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.btn-icon-action span {
  font-size: 10px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
```

---

### 6.2 Cards

#### Balance Card (Hero Widget — Teen View)

This is the most visible card in the app. Navy background, bold gold balance, Mamdani text shadow.

```
┌────────────────────────────────────────────┐
│ [Navy Background]                          │
│                                            │
│  MY BALANCE          [Card chip indicator] │
│  ─────────────────────────────────         │
│                                            │
│  Rs. 12,450                                │
│  [48px Poppins ExtraBold, Gold,            │
│   red drop shadow 3px 3px]                 │
│                                            │
│  + Rs. 500 this week  ▲ 12%               │
│  [13px Cream text]                         │
│                                            │
└────────────────────────────────────────────┘
  4px 4px 0px #D62828 (red hard shadow on card)
```

```css
.card-balance {
  background: var(--brand-navy);
  border-radius: var(--radius-xl);    /* 24px */
  border: 2px solid var(--brand-navy);
  box-shadow: 4px 4px 0px var(--brand-red);
  padding: 24px;
}

.card-balance__label {
  font-size: var(--text-caption);     /* 11px */
  font-weight: 700;
  letter-spacing: var(--tracking-wider);
  color: rgba(250, 247, 239, 0.6);
  text-transform: uppercase;
}

.card-balance__amount {
  font-size: var(--text-display);     /* 48px */
  font-weight: 800;
  color: var(--brand-gold);
  text-shadow: 3px 3px 0px var(--brand-red);
  letter-spacing: var(--tracking-tight);
  font-variant-numeric: tabular-nums;
}

.card-balance__delta {
  font-size: var(--text-body-sm);
  color: rgba(250, 247, 239, 0.8);
  margin-top: 4px;
}

.card-balance__delta--positive { color: #5FCA7E; }
.card-balance__delta--negative { color: #FF7070; }
```

#### AI Insight Card

This is YouthPay's product core — the AI-generated money insight. Must feel like the "smart friend" version of a bank statement.

```
┌────────────────────────────────────────────┐
│ [Gold Background #F7C948]                  │
│                                 [AI icon]  │
│  ⚡ SPENDING INSIGHT                       │
│  ─────────────────────────────             │
│                                            │
│  You spent 3x more on                     │
│  food this week.                           │
│  [24px Poppins Bold, Navy text,            │
│   red drop shadow]                         │
│                                            │
│  Most of it went to Careem Eats on        │
│  weekdays between 1–3 PM.                  │
│  [15px Poppins Regular, Navy]              │
│                                            │
│  [See full breakdown →]                    │
│                                            │
└────────────────────────────────────────────┘
  box-shadow: 4px 4px 0px #D62828
```

```css
.card-insight {
  background: var(--brand-gold);
  border-radius: var(--radius-lg);
  border: 2px solid var(--brand-navy);
  box-shadow: 4px 4px 0px var(--brand-red);
  padding: 20px;
}

.card-insight__eyebrow {
  font-size: var(--text-caption);
  font-weight: 700;
  letter-spacing: var(--tracking-wider);
  color: var(--brand-navy);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;
}

.card-insight__headline {
  font-size: var(--text-h2);           /* 24px */
  font-weight: 700;
  color: var(--brand-navy);
  text-shadow: 2px 2px 0px var(--brand-red);
  margin: 12px 0 8px;
  line-height: var(--leading-snug);
}

.card-insight__body {
  font-size: var(--text-body);
  color: var(--brand-navy);
  line-height: var(--leading-normal);
  opacity: 0.85;
}

.card-insight__cta {
  margin-top: 16px;
  font-size: var(--text-body-sm);
  font-weight: 600;
  color: var(--brand-navy);
  text-decoration: underline;
  text-underline-offset: 3px;
}
```

#### Standard Transaction Card

```css
.card-transaction {
  background: var(--bg-elevated);
  border-radius: var(--radius-md);
  border: 1.5px solid var(--border-default);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Left: category color dot + merchant icon */
.card-transaction__icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  /* Background color set by category (see Category Colors below) */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Center: merchant name + date */
/* Right: amount (tabular-nums, red if debit, green if credit) */
.card-transaction__amount--debit  { color: var(--brand-red); }
.card-transaction__amount--credit { color: var(--brand-green); }
```

**Category Colors for Transaction Icons:**

| Category | Background | Icon Color |
|---|---|---|
| Food & Dining | #FFF3E0 | #E65100 |
| Transport | #E3F2FD | #1565C0 |
| Shopping | #FCE4EC | #880E4F |
| Entertainment | #EDE7F6 | #4527A0 |
| Education | #E8F5E9 | #2D7D46 |
| Top-up / Received | #F1F8E9 | #33691E |
| Other | #F5F5F5 | #616161 |

#### Spending Category Summary Card

```css
.card-category {
  background: var(--bg-elevated);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--category-color);   /* 4px colored left bar */
  border-top: 1.5px solid var(--border-default);
  border-right: 1.5px solid var(--border-default);
  border-bottom: 1.5px solid var(--border-default);
  padding: 14px 16px;
}
```

#### Achievement / Milestone Card

```css
.card-achievement {
  background: var(--brand-navy);
  border-radius: var(--radius-lg);
  border: 2px solid var(--brand-navy);
  box-shadow: 4px 4px 0px var(--brand-gold);
  padding: 20px;
  text-align: center;
}
```

---

### 6.3 Bottom Navigation Bar

```
┌──────┬──────┬──────┬──────┐
│  🏠  │  📊  │  📖  │  👤  │
│ Home │Spend │Learn │  Me  │
└──────┴──────┴──────┴──────┘
```

4 tabs only. No 5th. Labels in sentence case, not ALL CAPS.

```css
.nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  padding-bottom: env(safe-area-inset-bottom);
  background: var(--bg-elevated);
  border-top: 2px solid var(--border-default);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.nav-bar__tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 4px;
}

.nav-bar__tab--active .nav-bar__label {
  color: var(--brand-red);
  font-weight: 700;
}

.nav-bar__tab--active .nav-bar__icon-bg {
  /* Bold red indicator above active icon — Mamdani-style color block */
  background: var(--brand-red);
  width: 32px;
  height: 3px;
  border-radius: 2px;
  position: absolute;
  top: 0;
}
```

Navigation tab names:
- **Home** — Dashboard, balance, quick actions
- **Spend** — Transaction history, category breakdown, charts
- **Learn** — Financial literacy modules
- **Me** — Profile, settings, achievements, parent view toggle

---

### 6.4 Forms & Inputs

```css
.input-field {
  width: 100%;
  padding: 14px 16px;
  font-family: var(--font-body);
  font-size: var(--text-body-lg);     /* 17px — readable on mobile keyboard */
  color: var(--text-primary);
  background: var(--bg-elevated);
  border: 2px solid var(--border-default);
  border-radius: var(--radius-md);
  outline: none;
  transition: border-color 150ms ease;
}

.input-field:focus {
  border-color: var(--brand-red);
  box-shadow: 0 0 0 3px rgba(214, 40, 40, 0.12);
}

.input-field::placeholder {
  color: var(--text-muted);
}

/* Label above input */
.input-label {
  font-size: var(--text-body-sm);
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 6px;
  display: block;
}

/* Error state */
.input-field--error {
  border-color: var(--interactive-error);
}

.input-error-text {
  font-size: var(--text-caption);
  color: var(--interactive-error);
  margin-top: 4px;
}
```

**OTP / PIN Entry:**

```css
.input-pin-box {
  width: 52px;
  height: 60px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  border: 2px solid var(--border-default);
  border-radius: var(--radius-md);
  background: var(--bg-elevated);
}

.input-pin-box--filled {
  border-color: var(--brand-red);
  box-shadow: 2px 2px 0px var(--brand-red);
}
```

---

### 6.5 Charts (Recharts)

**Override all Recharts defaults.** Never use the library's default color array (#8884d8 etc).

```javascript
// Brand color array for Recharts
const CHART_COLORS = [
  '#D62828',   // Red — primary category
  '#F7C948',   // Gold — secondary
  '#2D7D46',   // Green — third
  '#1B2A4A',   // Navy — fourth
  '#8896A7',   // Muted — overflow
];

// Recharts default override
const chartBaseConfig = {
  style: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '13px',
  }
};
```

**Donut Chart — Spending Breakdown:**
- Used on the Spend tab
- No legend inside the chart — use a separate list below
- Center label: current month name in Poppins Medium
- Stroke between segments: 2px in var(--bg-base) color

**Bar Chart — Weekly Spending:**
- Vertical bars, no horizontal gridlines (use subtle background banding instead)
- Today's bar: `var(--brand-red)` fill
- Past days: `var(--border-strong)` fill with opacity 0.6
- Bar radius: `[4, 4, 0, 0]` (rounded top corners only)

**Line Chart — Balance Trend:**
- Single line in `var(--brand-green)` for upward trend, `var(--brand-red)` for downward
- No dots unless on the last point (current balance)
- Area fill: same color at 10% opacity

**Tooltip Style:**
```css
.recharts-tooltip-wrapper .custom-tooltip {
  background: var(--bg-elevated);
  border: 2px solid var(--brand-navy);
  box-shadow: 3px 3px 0px var(--brand-navy);
  border-radius: var(--radius-sm);
  padding: 8px 12px;
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  font-weight: 600;
}
```

---

### 6.6 Progress & Streak Elements

```css
/* Progress bar */
.progress-track {
  width: 100%;
  height: 10px;
  background: var(--border-default);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--brand-green);
  border-radius: var(--radius-full);
  transition: width 400ms var(--ease-spring);
}

/* Streak badge */
.streak-badge {
  background: var(--brand-red);
  color: var(--brand-cream);
  font-weight: 800;
  font-size: var(--text-body-sm);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  border: 2px solid var(--brand-navy);
  box-shadow: 2px 2px 0px var(--brand-navy);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
```

---

### 6.7 Tags, Chips & Badges

```css
/* Category chip */
.chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: var(--text-body-sm);
  font-weight: 600;
  border: 1.5px solid currentColor;
}

.chip--red   { color: var(--brand-red);   background: rgba(214,40,40,0.08); }
.chip--gold  { color: #B8880A;            background: rgba(247,201,72,0.2); }
.chip--green { color: var(--brand-green); background: rgba(45,125,70,0.08); }
.chip--navy  { color: var(--brand-navy);  background: rgba(27,42,74,0.06); }

/* Notification dot */
.dot-notification {
  width: 8px;
  height: 8px;
  background: var(--brand-red);
  border-radius: 50%;
  border: 2px solid var(--bg-base);
}
```

---

### 6.8 Bottom Sheet / Modal

```css
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-elevated);
  border-radius: 24px 24px 0 0;
  border-top: 2px solid var(--border-default);
  border-left: 2px solid var(--border-default);
  border-right: 2px solid var(--border-default);
  box-shadow: var(--shadow-soft);
  padding: 16px 20px 32px;
}

/* Drag handle */
.bottom-sheet__handle {
  width: 40px;
  height: 4px;
  background: var(--border-strong);
  border-radius: var(--radius-full);
  margin: 0 auto 20px;
}
```

---

## 7. Motion & Animation

### Duration Tokens

```css
--duration-instant:  100ms;    /* Button press feedback */
--duration-fast:     150ms;    /* Hover states, micro-interactions */
--duration-base:     250ms;    /* Standard transitions */
--duration-slow:     400ms;    /* Progress bars, chart drawing */
--duration-enter:    350ms;    /* Screen entrances */
```

### Easing Tokens

```css
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);   /* Bouncy — badge pop, button press */
--ease-smooth:  cubic-bezier(0.4, 0.0, 0.2, 1);       /* Standard Material-like */
--ease-out:     cubic-bezier(0.0, 0.0, 0.2, 1);       /* Entrances */
--ease-in:      cubic-bezier(0.4, 0.0, 1.0, 1);       /* Exits */
```

### Animation Principles

**The one rule: every animation must serve a purpose.** If removing it makes no difference to understanding, remove it.

| Moment | Animation | Duration | Easing |
|---|---|---|---|
| Screen push navigation | Slide in from right | 300ms | ease-out |
| Screen pop navigation | Slide out to right | 250ms | ease-in |
| Bottom sheet open | Slide up + fade in | 350ms | ease-out |
| Bottom sheet close | Slide down | 250ms | ease-in |
| Balance number update | Counter roll up | 600ms | ease-smooth |
| Button press | Translate(2px, 2px) | 100ms | instant |
| AI insight card appear | Fade in + slide up 12px | 400ms | ease-out |
| Achievement unlock | Scale 0.8→1 + bounce | 400ms | ease-spring |
| Progress bar fill | Width transition | 500ms | ease-out |
| Chart bar draw | Height from 0 | 600ms | ease-out, staggered 50ms |
| Tab switch | Icon scale 0.9→1 | 150ms | ease-spring |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This is non-negotiable. Implement it from day one.

---

## 8. Iconography

### Icon Style: Outlined with 2px stroke

Use a consistent outlined icon library. Recommended: **Phosphor Icons** (MIT license, good Urdu/Arabic direction support, large library). Do not mix icon styles — never outlined + filled in the same screen.

```javascript
// Install: npm install phosphor-react-native (for React Native)
// or phosphor-icons (for web)
import { Wallet, ChartBar, BookOpen, UserCircle } from 'phosphor-react-native';
```

### Icon Sizing

```
Navigation bar icons:   24px
Card action icons:      20px
Inline body icons:      16px
Tiny inline (caption):  12px
```

### Icon Color Rules

- Icons inside colored panels take the panel's text color (cream on navy, navy on gold)
- Icons in default UI use `var(--text-secondary)`
- Active/selected icons use `var(--brand-red)`
- Never use gold icons on cream — insufficient contrast

### Custom Icons

Three icons must be custom-designed (not sourced from a library):

1. **Pingo head** — used as the app icon and in the loading state
2. **RAAST logo mark** — for payment rail indicator
3. **YouthPay "YP" monogram** — for small branding moments in the UI

---

## 9. Illustration Style

### Reference: Bollywood Poster × Pakistani Street Typography

The illustration style must feel hand-crafted, bold, and culturally specific. Not clip art. Not 3D render. Not AI image generation.

### Style Characteristics

- **Flat with outlines** — all shapes have a 2–3px dark border, no gradients
- **Bold color blocks** — shapes are filled with flat brand colors, no shading
- **Drop shadow treatment** — key illustrated elements get the same hard offset shadow as UI type
- **Limited palette** — each illustration uses maximum 4 colors from the brand palette
- **Slightly imperfect geometry** — deliberately not pixel-perfect; small wobbles make it feel hand-made

### Where Illustrations Appear (3 locations only)

1. **Onboarding screens** (3 slides, one illustration each):
   - Slide 1: A teen's hand holding the YouthPay card, stylized, from above
   - Slide 2: A mobile screen showing money flowing in (parents → teen), illustrated as bold arrows
   - Slide 3: A simplified cityscape of Pakistan (rickshaw, shopfront, mosque silhouette) with financial data overlaid

2. **Empty states:**
   - No transactions yet: simple illustrated envelope/wallet with "Your money story starts here"
   - No insights yet: simple chart with a question mark

3. **Achievement unlocked modal:**
   - Bold starburst / confetti in brand colors

### What to Never Illustrate

- Realistic human faces
- Photographic assets
- Generic stock illustration (people at desks, light bulbs, handshakes)

---

## 10. Pingo Usage Rules

Pingo is the YouthPay penguin mascot — mountain-climbing narrative, SVG format.

### Pingo IS

- The app icon (every phone home screen)
- The physical + virtual card design (small, bottom-left corner, mountain climbing pose)
- Marketing materials, social media, pitch decks
- The OG meta image for the web presence
- The loading indicator animation (Pingo waddling in place, 3-frame loop, shown for <2 seconds)
- The push notification avatar

### Pingo IS NOT

- A UI element inside screen flows
- A chat companion or AI voice avatar (YouthPay's AI speaks through insight cards, not a character)
- A guide that appears at every step
- Part of the navigation, charts, or transaction list
- Used more than once per screen, ever

### Pingo on the Card

```
┌──────────────────────────────────────┐
│                                      │
│  YOUTHPAY                            │
│                                      │
│  [Visa/Mastercard network logo]      │
│                                      │
│  **** **** **** 4221                 │
│                                      │
│  FATIMA SHAIKH              [Pingo]  │
│  VALID 04/28               [small,   │
│                             climbing]│
└──────────────────────────────────────┘
```

Pingo on the physical card: white silhouette version on the brand navy background card. On the virtual card: original color version.

### The Loading Screen (the only Pingo in-app moment)

Show Pingo for a maximum of 1.5 seconds on app cold launch, then transition to the home screen. No Pingo after this unless the user goes to the "Me" tab where their profile badge may include a small Pingo.

---

## 11. Screen-by-Screen Design Guide

### 11.1 Splash / First Launch

**Duration:** Shows for 1.5s on cold launch only. Not shown on subsequent opens.

```
[Deep Navy background — full bleed]

           [Center]
         [Pingo SVG]
        (160px × 160px)

      YouthPay
  [36px Poppins Black]
  [Gold, red drop shadow]

  [Fade out → Home screen]
```

No buttons. No copy. Just the mark.

---

### 11.2 Onboarding (3 Screens)

New user only. Skip button top-right throughout.

**Screen 1 — "Your money. Your rules."**
```
[Cream background]
[Illustration: hand holding card]

  Your money.
  Your rules.
  [32px Poppins ExtraBold, Navy, red shadow]

  Connect your JazzCash or NayaPay
  account. We turn your spending into
  something you can actually learn from.
  [15px Poppins Regular, Navy]

  [Next →]  [Primary Button]
```

**Screen 2 — "Your parents. Under control."**
```
[Navy background]
[Illustration: money flow arrows]

  Your parents
  stay in the loop.
  [32px ExtraBold, Cream, gold shadow]

  They see summaries. Not every text.
  You stay in charge of your money.
  [15px Poppins Regular, muted cream]

  [Next →]  [Primary Button — cream fill]
```

**Screen 3 — "Money advice that actually makes sense."**
```
[Gold background]
[Illustration: Pakistan cityscape + data]

  Money advice
  that actually
  makes sense.
  [32px ExtraBold, Navy, red shadow]

  No boring bank talk. Just real
  insights about where your money
  goes and what to do about it.
  [15px Poppins Regular, Navy]

  [Get started →]  [Primary Button — red]
```

Progress indicators: 3 dots, current dot is red and 2× wider. Not numbered.

---

### 11.3 Home Dashboard — Teen View

This is the most visited screen. Design it to be **instantly scannable**, not content-heavy.

```
┌─────────────────────────────────────────┐
│ Good morning, Fatima ☀           🔔    │
│ [17px Poppins Medium, text-secondary]   │
│                                         │
│ ┌───────────────────────────────────┐   │
│ │ [BALANCE CARD — see 6.2]          │   │
│ │ Rs. 12,450                        │   │
│ │ +Rs.500 this week                 │   │
│ └───────────────────────────────────┘   │
│                                         │
│ [Quick Actions: 4 icon buttons]         │
│  Send   Request  Top-up  History        │
│                                         │
│ ──────────────────────────────────────  │
│ THIS WEEK'S INSIGHT                     │
│ [Gold AI Insight Card — see 6.2]        │
│ "You spent 3× more on food..."          │
│                                         │
│ ──────────────────────────────────────  │
│ RECENT SPENDING                         │
│ [Last 3 transactions — card-transaction]│
│ [See all →]                             │
│                                         │
│                                         │
└─────────────────────────────────────────┘
  [Bottom Nav: Home | Spend | Learn | Me]
```

**Design rules for this screen:**
- Balance card spans full width (20px margin each side)
- Quick actions row: 4 buttons with 12px gaps, centered
- Only 1 AI insight card on home — the most recent/most important
- "This week's insight" label: uppercase, --text-caption, navy, --tracking-wider
- "Recent spending" shows max 3 items — "See all" links to Spend tab
- No more than 4 sections on this screen. Resist the urge to add more.

**Greeting logic:**
- Before noon: "Good morning"
- Noon to 5PM: "What's up" (Gen Z language)
- After 5PM: "Good evening"
- Eid/festival: Override with "Eid Mubarak! 🌙" (contextual, culturally specific)

---

### 11.4 Spend Tab — Spending Analysis

```
┌──────────────────────────────────────────┐
│  Your spending                           │
│  [28px ExtraBold, Navy]                  │
│                                          │
│  June 2026         [This month ▾]        │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ [Donut chart — 200px diameter]     │  │
│  │  Rs. 8,240 center label            │  │
│  └────────────────────────────────────┘  │
│                                          │
│  [Category list with colored bars]       │
│  🍕 Food         Rs. 3,100    38%        │
│  🚗 Transport    Rs. 2,050    25%        │
│  🛍 Shopping     Rs. 1,890    23%        │
│  📚 Education    Rs. 1,200    14%        │
│                                          │
│  ──────────────────────────────────────  │
│  WEEKLY PATTERN                          │
│  [Bar chart — 7 bars, Mon–Sun]           │
│                                          │
│  ──────────────────────────────────────  │
│  AI INSIGHTS FOR THIS MONTH              │
│  [2–3 AI Insight Cards stacked]          │
│                                          │
└──────────────────────────────────────────┘
```

---

### 11.5 Learn Tab — Financial Literacy

Design as a **progress-first view**, not a content dump. Teens should open this and immediately feel like they are on a journey, not opening a textbook.

```
┌──────────────────────────────────────────┐
│  Learn                                   │
│  [28px ExtraBold]                        │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ 🔥 3-day streak                    │  │
│  │ [Streak badge — red]               │  │
│  │ Keep it going. 4 more = badge.     │  │
│  └────────────────────────────────────┘  │
│                                          │
│  CONTINUE WHERE YOU LEFT OFF             │
│  [Single card — current module]          │
│  ┌────────────────────────────────────┐  │
│  │ Module 2: Budgeting               │  │
│  │ [Progress bar — 60% green]         │  │
│  │ 3 of 5 lessons done               │  │
│  │ [Continue →]  [Primary Button]     │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ALL MODULES                             │
│  [Module cards — 5 total]               │
│  1. What is money?      ✓ Done           │
│  2. Budgeting           ◐ 60%            │
│  3. Saving goals        🔒 Locked        │
│  4. Smart spending      🔒 Locked        │
│  5. Investing basics    🔒 Locked        │
│                                          │
└──────────────────────────────────────────┘
```

**Module card states:**
- Done: Navy background, gold checkmark, "Completed" label
- In progress: Cream background, progress bar in green
- Locked: Muted background, lock icon, slightly desaturated — not scary, just clear

---

### 11.6 Parent Dashboard

The parent view is intentionally **calmer and more structured** than the teen view. Less maximalism, more trust signals. Same color system, but green takes a more prominent role and red is reserved for alerts only.

Toggle between teen view and parent view is on the "Me" tab.

```
┌──────────────────────────────────────────┐
│ Fatima's account                         │
│ Parent overview  [Switch to teen view]   │
│                                          │
│ ┌────────────────────────────────────┐   │
│ │ THIS MONTH                         │   │
│ │ Rs. 8,240 spent of Rs. 15,000      │   │
│ │ [Progress bar in green]            │   │
│ │ Rs. 6,760 remaining                │   │
│ └────────────────────────────────────┘   │
│                                          │
│ SPENDING BY CATEGORY                     │
│ [Clean horizontal bar chart]             │
│                                          │
│ SPENDING LIMITS                          │
│ Food & Dining      Rs. 3,000  [Edit]     │
│ Shopping           Rs. 2,000  [Edit]     │
│ Entertainment      Rs. 1,500  [Edit]     │
│                                          │
│ RECENT TRANSACTIONS                      │
│ [Last 5 transactions]                    │
│                                          │
│ ALERTS                                   │
│ ⚠ Fatima spent 80% of food budget       │
│ [Gold alert banner, not red]             │
│                                          │
└──────────────────────────────────────────┘
```

**Parent view design rules:**
- Forest Green is the primary accent here, not Red
- No expressive text shadows on parent-facing UI — keep headings clean
- "Alert" cards use gold (warning), never red (would alarm parents unnecessarily)
- "Edit" controls for spending limits: right-aligned, ghost button style

---

### 11.7 Me Tab — Profile & Settings

Simple, utility-first. Minimal personality here — the rest of the app carries the energy.

```
┌──────────────────────────────────────────┐
│ ┌──────────────────┐                     │
│ │  [Avatar circle] │  Fatima Shaikh      │
│ │  Poppins 600     │  @fatima_sp         │
│ │                  │  Member since Aug 26 │
│ └──────────────────┘                     │
│                                          │
│ [Achievement badges row — scrollable]    │
│ 🏅 First spend  ⭐ 7-day streak  🎯 ...  │
│                                          │
│ ──────────────────────────────────────   │
│ ACCOUNT                                  │
│ Edit profile                        →    │
│ My card                             →    │
│ Notifications                       →    │
│ Switch to parent view               →    │
│                                          │
│ PREFERENCES                             │
│ Dark mode                    [Toggle]    │
│ Language                   English  →    │
│ Urdu                                     │
│                                          │
│ SUPPORT                                  │
│ Help center                         →    │
│ Report a problem                    →    │
│                                          │
│ Log out                                  │
│ [Ghost button — red text]                │
└──────────────────────────────────────────┘
```

**Avatar:** No Pingo here. The avatar is the user's initials on a navy background, or their uploaded photo. Achievement badge section can include a small Pingo badge if they've unlocked "First transaction" milestone.

---

## 12. Microcopy Voice

### Core Principles

1. **Teen voice, not bank voice.** Never write "Transaction successfully processed." Write "Money sent."
2. **Short.** Every label, toast, and error should be readable in under 2 seconds.
3. **Specific.** "You've spent 80% of your food budget" beats "Budget limit approaching."
4. **Active voice always.** "Set a limit" not "A limit can be set."
5. **No corporate words.** Never: transaction, funds, account holder, authorized, portal.

### Vocabulary Reference

| Corporate Version | YouthPay Version |
|---|---|
| Transaction | Spend / Payment / Transfer |
| Insufficient funds | Not enough in your account |
| Account balance | Your money |
| Authorize | Confirm |
| Financial literacy | Money skills |
| Spending limit | Limit |
| Dashboard | Home |
| Profile | Me |
| Error occurred | Something went wrong — try again |

### Toast Message Templates

- Success: "Sent! Rs. 500 to Ali."
- Error: "Couldn't send. Try again."
- Limit alert: "You've hit your food limit for the month."
- Achievement: "🎯 First week streak! You're on it."
- Empty state: "No spends yet this week. Money in your pocket."

### AI Insight Headline Formula

`[Pattern you did]` + `[how big it was]`

- "You spend 40% more on weekends."
- "Careem Eats is your #1 monthly spend."
- "You saved Rs. 800 more than last month."
- "Food takes up almost half your budget."

Then the body explains why it matters. Keep AI insight headlines to 8 words or fewer.

---

## 13. Accessibility

### Contrast Requirements (WCAG AA)

All color combinations must pass these minimums before shipping:

| Combo | Ratio Required | YouthPay Pair |
|---|---|---|
| Body text on background | 4.5:1 | Navy #1B2A4A on Cream #FAF7EF ✓ (~14:1) |
| Gold on Navy | 3:1 (large) | #F7C948 on #1B2A4A ✓ (~7:1) |
| Cream on Red | 4.5:1 | #FAF7EF on #D62828 ✓ (~4.8:1) |
| Red on Cream | 4.5:1 | #D62828 on #FAF7EF ✓ (~4.8:1) |
| Navy on Gold | 4.5:1 | #1B2A4A on #F7C948 ✓ (~7:1) |

Use [Colour Contrast Checker](https://colourcontrast.cc/) before any new color pair.

### Touch Targets

Minimum 44×44px for all interactive elements. Quick action buttons are 64×64px — already over the threshold.

### RTL (Urdu Language Support)

When the user selects Urdu in Settings:

```css
[lang="ur"] {
  direction: rtl;
  font-family: 'Noto Nastaliq Urdu', serif;
}

/* Flip directional icons (back arrows, chevrons) */
[lang="ur"] .icon-directional {
  transform: scaleX(-1);
}

/* Note: Hard shadows on type don't change direction in RTL */
```

All Urdu strings must be provided by a native Urdu speaker. Never auto-translate financial terminology.

### Minimum Font Sizes

- Body: 15px (never go below)
- Urdu body: 17px (Nastaliq renders smaller optically)
- Captions: 11px (only for non-critical metadata — timestamps, legal)

---

## 14. Anti-Patterns — What to Never Build

These are the exact defaults a developer or AI tool will reach for. They are explicitly banned from YouthPay.

| Pattern | Why It's Banned | YouthPay Alternative |
|---|---|---|
| **Glassmorphism / frosted glass** | AI-generated default since 2023, overused. Feels like a screen saver. | Solid panels with hard shadows |
| **Gradients as primary backgrounds** | AI default. NayaPay just moved away from it for a reason. Reads as dated within 18 months. | Flat brand colors, texture via grain if needed |
| **Soft card shadows (0 4px 20px rgba)** | Every Tailwind template uses this. Invisible against cream backgrounds. | Hard offset shadows at 2–4px |
| **White app background (#FFFFFF)** | Cold, clinical, banking app from 2012. | Cream #FAF7EF — always |
| **Rounded corners above 16px on cards** | Feels like a children's hospital app | max 16px radius on cards |
| **Five or more bottom nav tabs** | Too cognitively heavy for the main user (teen, distracted, thumb-navigating) | 4 tabs maximum |
| **Animated loading skeleton in every screen** | Over-engineering that reads as corporate polish, not teen energy | Fast loads + brief Pingo fade |
| **Emoji in UI controls** | Emoji render differently per device, date quickly | Phosphor icons only |
| **"Submit" on buttons** | Never acceptable | Describe the action: "Send", "Save", "Done" |
| **Pingo as a chatbot avatar** | Reduces Pingo to a gimmick | Pingo is silent. AI speaks through insight cards. |
| **Inter or Roboto as body font** | Every app ever. | Poppins — already in brand system |
| **Dark gray (#333) as "dark mode"** | Lazy dark mode. Not the same as Deep Navy. | Must use #0F1925 as dark base |
| **Gradient buttons** | AI-generated SaaS button default | Flat fill + hard shadow |
| **Full-width alerts in red for everything** | Alarm fatigue — teens will tune them out | Gold for warnings, red only for actual errors |

---

## Appendix: Quick Reference Card

```
COLORS
  Red:    #D62828   Gold:  #F7C948
  Navy:   #1B2A4A   Cream: #FAF7EF
  Green:  #2D7D46

FONTS
  Display:  Poppins ExtraBold (800) / Black (900)
  Body:     Poppins Regular (400) / Medium (500)
  Serif:    Lora Bold (700) — sparingly
  Urdu:     Noto Nastaliq Urdu

SHADOWS (the signature move)
  Hard text shadow:  3px 3px 0px [color] — no blur
  Hard box shadow:   4px 4px 0px [color] — no blur
  Soft shadow:       0 4px 24px rgba(27,42,74,0.12) — modals only

RADIUS
  sm: 8px   md: 12px   lg: 16px   xl: 24px

SPACING (4px base)
  Common: 8 / 12 / 16 / 20 / 24 / 32 / 48

THE ONE RULE
  Before shipping any screen:
  "Would this get taped to a shopfront in Liberty Market, Lahore?"
  If yes → ship it. If it looks like a Chase notification → rethink.
```

---

*YouthPay Design System v1.0 — June 2026*
*For questions: Lubaisha Shaikh (Founder/CEO)*
*Next review: September 2026 (post-beta feedback round)*
