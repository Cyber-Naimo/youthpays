"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { brand } from "@/config/brand";
import { SectionHeading } from "@/components/ui/section";
import { Check } from "@/components/ui/icons";

const steps = [
  { title: "Join the list", body: "Add your name and email. Takes 30 seconds." },
  { title: "Show your B-Form", body: "It proves who you are. No CNIC needed." },
  { title: "Get your card", body: "Yours, in your name. Ready to spend." },
];

/* the card assembles as `stage` (0,1,2) advances */
function BuildCard({ stage, reduce }: { stage: number; reduce: boolean | null }) {
  const pop = reduce
    ? { initial: false as const, animate: { opacity: 1, scale: 1 } }
    : { initial: { opacity: 0, scale: 0.85 }, animate: { opacity: 1, scale: 1 } };
  const spr = { type: "spring" as const, stiffness: 320, damping: 20 };

  return (
    <div className="relative aspect-[1.585/1] w-[min(360px,100%)] overflow-hidden rounded-[16px] border-2 border-navy bg-navy p-5 text-cream hard-red">
      {/* dashed placeholder while empty */}
      {stage === 0 && (
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-3 grid place-items-center rounded-[12px] border-2 border-dashed border-cream/30"
        >
          <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-cream/50">Reserving your card…</span>
        </motion.div>
      )}

      {/* top row */}
      <div className="relative flex items-start justify-between">
        <AnimatePresence>
          {stage >= 2 && (
            <motion.div key="chip" {...pop} exit={{ opacity: 0 }} transition={spr} className="h-9 w-12 rounded-[6px] border border-black/20" style={{ background: "linear-gradient(135deg,#ffd976,#e8b23c)" }} />
          )}
        </AnimatePresence>
        <span className="ml-auto font-display text-[19px] font-extrabold text-gold tshadow-red">{brand.name}</span>
      </div>

      {/* verified stamp — only during the B-Form step, cleared on the finished card */}
      <AnimatePresence>
        {stage === 1 && (
          <motion.div
            key="stamp"
            initial={reduce ? false : { opacity: 0, scale: 1.6, rotate: -18 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
            className="absolute left-4 top-14 flex items-center gap-1.5 rounded-[6px] border-2 border-green px-2 py-1"
            style={{ color: "#7fe0a1" }}
          >
            <Check width={13} height={13} />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.12em]">B-Form verified</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* bottom */}
      <div className="absolute inset-x-5 bottom-5">
        <AnimatePresence>
          {stage >= 2 && (
            <motion.div key="num" {...pop} exit={{ opacity: 0 }} transition={spr} className="mb-3 font-display text-[18px] font-semibold tracking-[2px]" style={{ fontVariantNumeric: "tabular-nums" }}>
              ••••&nbsp;&nbsp;••••&nbsp;&nbsp;••••&nbsp;&nbsp;4221
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-end justify-between">
          <div>
            <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-cream/60">Card holder</span>
            <AnimatePresence mode="wait">
              {stage >= 1 ? (
                <motion.span key="name" initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="block font-display text-[16px] font-bold text-cream">
                  {brand.persona}
                </motion.span>
              ) : (
                <span key="dash" className="block font-display text-[16px] font-bold text-cream/30">— — — —</span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ready badge */}
      <AnimatePresence>
        {stage >= 2 && (
          <motion.span
            key="ready"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-4 top-14 rounded-full border-2 border-navy bg-gold px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-navy"
          >
            Ready
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  // reschedule whenever the active step changes; last step holds longer
  useEffect(() => {
    const last = active === steps.length - 1;
    const dur = last ? brand.journeyFinalHoldMs : brand.journeyStepMs;
    const t = setTimeout(() => setActive((a) => (a + 1) % steps.length), dur);
    return () => clearTimeout(t);
  }, [active]);
  const go = (i: number) => setActive(i);

  return (
    <section id="how" className="py-20 md:py-28">
      <div className="wrap">
        <SectionHeading eyebrow="The journey" title={<>Watch your card come to life.</>} />

        <div className="mx-auto grid max-w-[880px] items-center gap-10 md:grid-cols-2">
          {/* vertical stepper */}
          <ol className="relative flex flex-col gap-7 pl-2">
            {/* track */}
            <span className="absolute left-[19px] top-3 bottom-3 w-[3px] rounded-full bg-line" aria-hidden />
            <motion.span
              className="absolute left-[19px] top-3 w-[3px] rounded-full bg-red"
              aria-hidden
              animate={{ height: `${(active / (steps.length - 1)) * 100}%` }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 24 }}
              style={{ maxHeight: "calc(100% - 24px)" }}
            />
            {steps.map((s, i) => {
              const done = i < active;
              const on = i === active;
              return (
                <li key={i}>
                  <button onClick={() => go(i)} className="group flex items-start gap-4 text-left" aria-label={`Step ${i + 1}: ${s.title}`}>
                    <motion.span
                      animate={{ scale: on ? 1.1 : 1 }}
                      transition={{ type: "spring", stiffness: 340, damping: 18 }}
                      className="relative z-[1] grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-navy font-display text-[15px] font-extrabold"
                      style={{
                        background: done ? "var(--color-red)" : on ? "var(--color-gold)" : "var(--color-cream)",
                        color: done ? "var(--color-cream)" : "var(--color-navy)",
                        boxShadow: on ? "3px 3px 0 var(--color-navy)" : "none",
                      }}
                    >
                      {done ? <Check width={18} height={18} /> : i + 1}
                    </motion.span>
                    <div className="pt-1">
                      <h3 className="font-display text-[19px] font-extrabold text-navy" style={{ opacity: on || done ? 1 : 0.5 }}>{s.title}</h3>
                      <p className="mt-0.5 text-[14.5px] leading-[1.5] text-ink2" style={{ opacity: on ? 1 : 0.55 }}>{s.body}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* assembling card */}
          <div className="flex justify-center md:justify-end">
            <BuildCard stage={active} reduce={reduce} />
          </div>
        </div>
      </div>
    </section>
  );
}
