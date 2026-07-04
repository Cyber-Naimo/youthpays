"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { brand } from "@/config/brand";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { Pingo } from "@/components/ui/pingo";
import { ArrowRight, Check } from "@/components/ui/icons";

type Errors = { name?: string; age?: string; email?: string };
const AGES = ["13", "14", "15", "16", "17", "18", "Parent"];
const CONFETTI = ["var(--color-red)", "var(--color-gold)", "var(--color-green)", "var(--color-cream)"];

export function Waitlist() {
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<null | { position: number; ref: string }>(null);
  const [copied, setCopied] = useState(false);

  const shareUrl = done ? `https://${brand.domain}/?ref=${done.ref}` : "";
  const waHref = done
    ? `https://wa.me/?text=${encodeURIComponent(`I just joined the ${brand.name} colony — Pakistan's first teen card. Join me: ${shareUrl}`)}`
    : "";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = "Add your name";
    if (!age) next.age = "Pick one";
    if (!email.trim()) next.email = "Add your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Check your email";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    let position = brand.waitlistSeed + 1;
    let ref = `${brand.name.toLowerCase().replace(/\s/g, "")}-${Math.random().toString(36).slice(2, 8)}`;
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, email }),
      });
      if (res.ok) {
        const json = await res.json();
        position = json.position ?? position;
        ref = json.ref ?? ref;
      }
    } catch {}
    try {
      const KEY = "wl_signups_v1";
      const list = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (!list.some((x: { email: string }) => x.email === email.toLowerCase())) {
        list.push({ name, age, email: email.toLowerCase(), ref, at: new Date().toISOString() });
        localStorage.setItem(KEY, JSON.stringify(list));
      }
    } catch {}
    setLoading(false);
    setDone({ position, ref });
  }

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  return (
    <section id="waitlist" className="relative overflow-hidden py-20 text-white md:py-28" style={{ background: "var(--color-dark)" }}>
      {/* drifting colony in the background */}
      {!reduce &&
        [
          { l: "6%", t: "18%", s: 40, d: 6, delay: 0 },
          { l: "88%", t: "26%", s: 52, d: 7, delay: 1 },
          { l: "12%", t: "72%", s: 34, d: 8, delay: 0.6 },
          { l: "82%", t: "70%", s: 44, d: 6.5, delay: 1.4 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute opacity-[0.12]"
            style={{ left: p.l, top: p.t }}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          >
            <Pingo size={p.s} silhouette />
          </motion.div>
        ))}

      <div className="wrap relative z-10 mx-auto max-w-[560px]">
        <Reveal className="mb-8 text-center">
          <span className="label" style={{ color: "var(--color-gold)" }}>The waitlist</span>
          <h2 className="h2 mt-3 text-white">Join Pingo&apos;s herd.</h2>
          <p className="mt-3 text-[16px]" style={{ color: "rgba(250,247,239,.72)" }}>
            Be the first penguin. Launching {brand.launch}. You&apos;ll be around{" "}
            <b className="text-gold">#<CountUp to={brand.waitlistSeed + 1} /></b>.
          </p>
        </Reveal>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              noValidate
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="rounded-[16px] border-2 border-navy bg-surface p-6 text-ink hard-red sm:p-7"
            >
              {/* name */}
              <motion.label variants={item} className="mb-4 block text-left">
                <span className="mb-1.5 block text-[13px] font-bold text-ink2">Your name</span>
                <input
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors((x) => ({ ...x, name: undefined })); }}
                  autoComplete="name"
                  placeholder="e.g. Hania Sheikh"
                  className="wl-in"
                  style={errors.name ? { borderColor: "var(--color-danger)" } : undefined}
                  suppressHydrationWarning
                />
                {errors.name && <span className="mt-1 block text-[12px] font-medium text-danger">{errors.name}</span>}
              </motion.label>

              {/* age — segmented chips */}
              <motion.div variants={item} className="mb-4 text-left">
                <span className="mb-1.5 block text-[13px] font-bold text-ink2">Your age</span>
                <div className="flex flex-wrap gap-2">
                  {AGES.map((a) => {
                    const on = age === a;
                    return (
                      <button
                        key={a}
                        type="button"
                        onClick={() => { setAge(a); setErrors((x) => ({ ...x, age: undefined })); }}
                        className="min-w-[44px] rounded-[10px] border-2 border-navy px-3 py-2 font-display text-[14px] font-bold transition-transform active:translate-y-[1px]"
                        style={{ background: on ? "var(--color-red)" : "var(--color-cream)", color: on ? "var(--color-cream)" : "var(--color-navy)", boxShadow: on ? "2px 2px 0 var(--color-navy)" : "none" }}
                      >
                        {a}
                      </button>
                    );
                  })}
                </div>
                {errors.age && <span className="mt-1 block text-[12px] font-medium text-danger">{errors.age}</span>}
              </motion.div>

              {/* email */}
              <motion.label variants={item} className="mb-5 block text-left">
                <span className="mb-1.5 block text-[13px] font-bold text-ink2">Email</span>
                <input
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((x) => ({ ...x, email: undefined })); }}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  className="wl-in"
                  style={errors.email ? { borderColor: "var(--color-danger)" } : undefined}
                  suppressHydrationWarning
                />
                {errors.email && <span className="mt-1 block text-[12px] font-medium text-danger">{errors.email}</span>}
              </motion.label>

              <motion.button variants={item} type="submit" disabled={loading} className="btn btn-primary btn-lg btn-block disabled:opacity-70">
                {loading ? (
                  <span className="flex items-center gap-2">
                    Waddling you in
                    <span className="flex gap-1">
                      {[0, 1, 2].map((d) => (
                        <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-cream" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }} />
                      ))}
                    </span>
                  </span>
                ) : (
                  <>Claim your spot <ArrowRight /></>
                )}
              </motion.button>
              <motion.p variants={item} className="mt-3.5 text-center text-[12.5px]" style={{ color: "rgba(20,22,29,.5)" }}>
                Free to join. We never sell your info.
              </motion.p>
            </motion.form>
          ) : (
            /* ---------- COLONY PASS ---------- */
            <motion.div
              key="pass"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="relative overflow-hidden rounded-[16px] border-2 border-navy bg-surface text-ink hard-red"
            >
              {/* confetti burst */}
              {!reduce &&
                Array.from({ length: 16 }).map((_, i) => {
                  const ang = (i / 16) * Math.PI * 2;
                  return (
                    <motion.span
                      key={i}
                      className="absolute left-1/2 top-16 h-2 w-2 rounded-[2px]"
                      style={{ background: CONFETTI[i % CONFETTI.length] }}
                      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      animate={{ x: Math.cos(ang) * 150, y: Math.sin(ang) * 120 - 20, opacity: 0, rotate: 180, scale: 0.5 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  );
                })}

              <div className="relative px-8 pt-8 text-center">
                <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.15 }} className="mx-auto w-fit">
                  <Pingo size={72} />
                </motion.div>
                <h3 className="mt-3 font-display text-[24px] font-black text-navy">You&apos;re in the colony!</h3>
                <p className="mt-1 text-[14px] text-muted">Welcome aboard. Here&apos;s your pass.</p>
              </div>

              {/* ticket divider */}
              <div className="relative my-5 flex items-center">
                <span className="absolute -left-3 h-6 w-6 rounded-full bg-[var(--color-dark)]" />
                <span className="absolute -right-3 h-6 w-6 rounded-full bg-[var(--color-dark)]" />
                <span className="mx-6 flex-1 border-t-2 border-dashed border-line2" />
              </div>

              <div className="px-8 pb-8 text-center">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Your spot</span>
                <div className="font-display text-[52px] font-black leading-none text-red tshadow-navy">
                  #<CountUp to={done.position} />
                </div>
                <p className="mx-auto mt-3 max-w-[300px] text-[14px] text-ink2">Share your link — every friend who joins moves you up the line.</p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <button
                    className="btn btn-ghost"
                    onClick={() => { navigator.clipboard?.writeText(shareUrl).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }}
                  >
                    {copied ? <span className="flex items-center gap-1.5"><Check width={16} height={16} /> Copied</span> : "Copy link"}
                  </button>
                  <a className="btn btn-wa" href={waHref} target="_blank" rel="noopener noreferrer">Share on WhatsApp</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .wl-in{width:100%;height:52px;padding:0 16px;font:inherit;font-size:16px;color:var(--color-ink);background:#fff;border:2px solid var(--color-line2);border-radius:12px;transition:border-color .15s,box-shadow .15s}
        .wl-in::placeholder{color:#9aa1ad}
        .wl-in:focus{outline:none;border-color:var(--color-red);box-shadow:0 0 0 4px var(--color-primarysoft)}
      `}</style>
    </section>
  );
}
