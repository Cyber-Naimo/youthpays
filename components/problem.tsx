"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { brand } from "@/config/brand";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Pingo } from "@/components/ui/pingo";

type Who = "teen" | "dad";
const chat: { from: Who; text: string }[] = [
  { from: "teen", text: "Abu, can I use your card?" },
  { from: "teen", text: "Need to pay for my hosting" },
  { from: "dad", text: "Beta I'm in a meeting" },
  { from: "teen", text: "Abu… the OTP?" },
  { from: "teen", text: "Abu??" },
];

// live sequence: type → send → type → send … → seen → banner → loop
type Step =
  | { t: "type"; who: Who; ms: number }
  | { t: "send"; ms: number }
  | { t: "seen"; ms: number }
  | { t: "banner"; ms: number }
  | { t: "reset"; ms: number };

const script: Step[] = [
  { t: "type", who: "teen", ms: 750 },
  { t: "send", ms: 550 },
  { t: "type", who: "teen", ms: 650 },
  { t: "send", ms: 650 },
  { t: "type", who: "dad", ms: 1200 },
  { t: "send", ms: 750 },
  { t: "type", who: "teen", ms: 700 },
  { t: "send", ms: 550 },
  { t: "type", who: "teen", ms: 550 },
  { t: "send", ms: 700 },
  { t: "seen", ms: 1000 },
  { t: "banner", ms: brand.chatHoldMs }, // hold on the payoff — configurable in config/brand.ts
  { t: "reset", ms: 0 },
];

function TypingDots() {
  return (
    <span className="flex items-center gap-1 px-3.5 py-2.5">
      {[0, 1, 2].map((d) => (
        <motion.span
          key={d}
          className="h-1.5 w-1.5 rounded-full bg-navy/50"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: d * 0.15 }}
        />
      ))}
    </span>
  );
}

function Bubble({ from, text }: { from: Who; text: string }) {
  const teen = from === "teen";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className={`flex ${teen ? "justify-end" : "justify-start"}`}
    >
      <span
        className={`max-w-[80%] rounded-[16px] px-3.5 py-2 text-[13.5px] font-medium leading-snug ${teen ? "text-cream" : "text-navy"}`}
        style={{
          background: teen ? "var(--color-red)" : "#e7e2d5",
          borderBottomRightRadius: teen ? 4 : 16,
          borderBottomLeftRadius: teen ? 16 : 4,
        }}
      >
        {text}
      </span>
    </motion.div>
  );
}

export function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const reduce = useReducedMotion();

  const [i, setI] = useState(0);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState<Who | null>(null);
  const [seen, setSeen] = useState(false);
  const [banner, setBanner] = useState(false);

  useEffect(() => {
    if (reduce) {
      setShown(chat.length);
      setSeen(true);
      setBanner(true);
      return;
    }
    if (!inView) return;
    const step = script[i];
    if (step.t === "type") setTyping(step.who);
    else if (step.t === "send") {
      setTyping(null);
      setShown((s) => Math.min(s + 1, chat.length));
    } else if (step.t === "seen") setSeen(true);
    else if (step.t === "banner") setBanner(true);
    else if (step.t === "reset") {
      setShown(0);
      setSeen(false);
      setBanner(false);
      setTyping(null);
    }
    const to = setTimeout(() => setI((n) => (n + 1) % script.length), step.ms);
    return () => clearTimeout(to);
  }, [i, inView, reduce]);

  return (
    <Section id="problem">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
        {/* copy */}
        <div>
          <Reveal>
            <span className="label">The problem</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h2 mt-3 max-w-[440px]">
              Still asking Abu
              <br />
              for his <span className="text-red tshadow-navy">OTP</span>?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede mt-5 max-w-[420px]">
              You earned the money. But it sits in a parent&apos;s account, so every
              time you spend, you wait, you ask, you explain.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[420px] font-display text-[22px] font-black leading-tight text-navy">
              Your money shouldn&apos;t need
              <br />
              permission. <span className="text-red">Now it doesn&apos;t.</span>
            </p>
          </Reveal>
        </div>

        {/* live phone chat */}
        <Reveal delay={0.1} className="mx-auto">
          <div ref={ref} className="w-[300px] overflow-hidden rounded-[28px] border-[3px] border-navy bg-cream" style={{ boxShadow: "6px 6px 0 var(--color-red)" }}>
            {/* header */}
            <div className="flex items-center gap-3 border-b-2 border-navy bg-navy px-4 py-3 text-cream">
              <span className="font-display text-[18px]">‹</span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gold font-display text-[14px] font-extrabold text-navy">A</span>
              <div className="leading-tight">
                <div className="font-display text-[14px] font-bold">Abu</div>
                <div className="flex items-center gap-1 text-[10px] text-cream/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-green" /> {typing ? "typing…" : "online"}
                </div>
              </div>
            </div>

            {/* message stream — grows from the bottom */}
            <div className="flex flex-col justify-end gap-2 px-3.5 py-4" style={{ height: 250 }}>
              {chat.slice(0, shown).map((m, idx) => (
                <Bubble key={idx} from={m.from} text={m.text} />
              ))}

              <AnimatePresence>
                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex ${typing === "teen" ? "justify-end" : "justify-start"}`}
                  >
                    <span
                      className="rounded-[16px]"
                      style={{ background: typing === "teen" ? "var(--color-red)" : "#e7e2d5" }}
                    >
                      <TypingDots />
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {seen && !typing && (
                  <motion.div key="seen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-end">
                    <span className="text-[11px] font-medium text-muted">Delivered · seen 2h ago</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* resolution banner */}
            <AnimatePresence>
              {banner && (
                <motion.div
                  key="banner"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 14 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="flex items-center gap-3 border-t-2 border-navy bg-gold px-4 py-3"
                >
                  <Pingo size={34} />
                  <span className="font-display text-[13px] font-extrabold leading-tight text-navy">
                    With {brand.name}, it&apos;s already your money.
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
