/* =============================================================
   BRAND CONFIG — SINGLE SOURCE OF TRUTH
   Change the name here ONCE. It updates everywhere on the site
   (nav, hero, copy, FAQ, footer, page <title>, share links).

   How the tokens work: anywhere in index.html you see {{brand}},
   {{tagline}}, {{email}} etc., app.js swaps it for the values below
   when the page loads.
   ============================================================= */

window.BRAND = {
  // --- Identity (the important one) ---
  name: "YouthPay",                 // <-- change this to rebrand everything
  tagline: "Pakistan's First Teen Financial Platform",
  hook: "Your Name. Your Money. Your Card.",

  // --- Contact / links ---
  email: "admin@youthpay.pk",
  domain: "youthpay.pk",            // used in share links: https://<domain>/?ref=...

  // --- Launch + traction (edit as reality changes) ---
  launch: "August 2026",
  waitlistSeed: 300,                // starting queue number shown after signup
  price: "Rs. 99",                  // premium subscription /month

  // --- Regulatory ---
  circular: "SBP BPRD Circular No. 01 of 2026",
  ages: "13 to 18",                 // SBP-mandated teen band

  // --- Team (not shown on landing, kept here so it's centralised) ---
  ceo: "Lubaisha Shaikh",
  cto: "Muhammad Naimatullah Khan",

  // --- Theme accent (optional): change primary brand colour in one place ---
  // Leave null to use the CSS default (#5B4BFF). Set a hex to override.
  primaryColor: null,
};
