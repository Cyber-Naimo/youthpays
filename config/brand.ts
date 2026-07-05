/* =============================================================
   BRAND CONFIG — SINGLE SOURCE OF TRUTH
   Change `name` once → nav, hero, copy, FAQ, footer, <title>,
   OG tags and share links all update across the whole site.
   ============================================================= */

export const brand = {
  // --- Identity (the one that matters) ---
  name: "YouthPay",
  tagline: "Pakistan's First Teen Financial Platform",
  hook: "Your Name. Your Money. Your Card.",

  // --- Contact / links ---
  email: "admin@youthpay.pk",
  domain: "getyouthpay.com", // used in share links: https://<domain>/?ref=...

  // --- Launch + traction ---
  launch: "Soon",
  waitlistSeed: 300, // starting queue number shown after signup
  batchCap: 500, // founding-batch size — drives the "seats left" FOMO bar
  price: "Rs. 99", // premium subscription / month

  // --- Regulatory ---
  circular: "SBP BPRD Circular No. 01 of 2026",
  ages: "13 to 18", // SBP-mandated teen band

  // --- Motion timing ---
  // How long the "…already your money" banner holds before the chat replays (ms).
  chatHoldMs: 30000,
  // How long each "how it works" milestone holds before moving to the next (ms).
  journeyStepMs: 3000,
  // How long the final "Get your card" step holds (ms) — the finished card lingers.
  journeyFinalHoldMs: 7000,

  // --- Pingo mascot ---
  // Want a real penguin image? Drop a PNG/SVG in /public (e.g. public/pingo.png)
  // and set this to "/pingo.png". Leave null to use the built-in vector Pingo.
  pingoImage: "/pingo.png" as string | null,

  // --- Hero card back (configurable) ---
  cardBack: {
    features: [
      "Works online and in shops",
      "Holds USD and PKR",
      "In your name, not a guardian's",
    ],
    cvv: "221",
    note: "SBP-licensed partner",
  },

  // --- Demo persona (shown on the card + testimonial) ---
  persona: "Hania Sheikh",
  personaAge: 17,
  personaCity: "Karachi",

  // --- Team (centralised; not shown on landing) ---
  ceo: "Lubaisha Shaikh",
  cto: "Muhammad Naimatullah Khan",

  // --- Theme: change the primary brand colour in one place ---
  // Any valid CSS color. Drives buttons, accents, gradients.
  primaryColor: "#D62828",
} as const;

export type Brand = typeof brand;
