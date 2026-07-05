"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { brand } from "@/config/brand";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { Pingo } from "@/components/ui/pingo";
import { ETicket } from "@/components/ui/e-ticket";
import { ArrowRight } from "@/components/ui/icons";

type Errors = { name?: string; age?: string; email?: string };
const AGES = ["13", "14", "15", "16", "17", "18", "Parent"];

export function Waitlist() {
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<null | { position: number; ref: string }>(null);
  const [liveCount, setLiveCount] = useState<number | null>(null);
  const [referrer, setReferrer] = useState<string | null>(null);

  // live "displayed" count from the API (seed + real signups)
  useEffect(() => {
    fetch("/api/waitlist")
      .then((r) => r.json())
      .then((d) => { if (typeof d?.displayed === "number") setLiveCount(d.displayed); })
      .catch(() => {});
  }, []);

  // capture ?ref=... so referrals actually count (who invited this person)
  useEffect(() => {
    try {
      const r = new URLSearchParams(window.location.search).get("ref");
      if (r) setReferrer(r);
    } catch {}
  }, []);

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
    let position = (liveCount ?? brand.waitlistSeed) + 1; // fallback matches the header estimate
    let ref = `${brand.name.toLowerCase().replace(/\s/g, "")}-${Math.random().toString(36).slice(2, 8)}`;
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, email, referred_by: referrer }),
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
    setLiveCount(position); // keep header + FOMO in sync with the assigned seat
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
          { l: "5%", t: "16%", s: 64, d: 6, delay: 0, o: 0.6 },
          { l: "86%", t: "22%", s: 84, d: 7, delay: 1, o: 0.7 },
          { l: "10%", t: "70%", s: 52, d: 8, delay: 0.6, o: 0.5 },
          { l: "84%", t: "68%", s: 70, d: 6.5, delay: 1.4, o: 0.6 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute"
            style={{ left: p.l, top: p.t, opacity: p.o }}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          >
            <Pingo size={p.s} />
          </motion.div>
        ))}

      <div className="wrap relative z-10 mx-auto max-w-[560px]">
        <Reveal className="mb-8 text-center">
          <span className="label" style={{ color: "var(--color-gold)" }}>The waitlist</span>
          <h2 className="h2 mt-3 text-white">Join Pingo&apos;s herd.</h2>
          <p className="mt-3 text-[16px]" style={{ color: "rgba(250,247,239,.72)" }}>
            Be the first penguin. Launching {brand.launch}. You&apos;ll be around{" "}
            <b className="text-gold">#<CountUp from={brand.waitlistSeed} to={done ? done.position : (liveCount ?? brand.waitlistSeed) + 1} /></b>.
          </p>

          {/* FOMO — founding batch filling up */}
          {(() => {
            const claimed = liveCount ?? brand.waitlistSeed;
            const left = Math.max(0, brand.batchCap - claimed);
            const pct = Math.min(100, Math.round((claimed / brand.batchCap) * 100));
            return (
              <div className="mx-auto mt-6 max-w-[380px]">
                <div className="mb-1.5 flex items-center justify-between text-[12px] font-bold">
                  <span className="flex items-center gap-1.5 text-red">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-red" /> Filling fast
                  </span>
                  <span className="text-cream/70">Only <b className="text-gold">{left}</b> seats left</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full border border-cream/15 bg-white/5">
                  <motion.div className="h-full rounded-full bg-gold" initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} />
                </div>
                <p className="mt-1.5 text-[11px] text-cream/50">{claimed} of {brand.batchCap} founding seats claimed</p>
              </div>
            );
          })()}
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
            /* ---------- WAITLIST E-TICKET (separate component) ---------- */
            <ETicket key="pass" name={name} position={done.position} refCode={done.ref} />
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
