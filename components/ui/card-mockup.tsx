"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { brand } from "@/config/brand";

const faceBase: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  borderRadius: 18,
  overflow: "hidden",
};

export function CardMockup() {
  const [rot, setRot] = useState(0); // degrees; +180 per flip (keeps rolling one way)
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const flip = () => setRot((r) => r + 180);

  function start() {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setRot((r) => r + 180), 3600);
  }
  useEffect(() => {
    if (reduce) return;
    start();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [reduce]);

  return (
    <div className="relative flex flex-col items-center gap-4">
      <div
        className="w-[min(380px,100%)] cursor-pointer select-none"
        style={{ perspective: 1300 }}
        onClick={() => {
          flip();
          start();
        }}
        role="button"
        tabIndex={0}
        aria-label="Flip card"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            flip();
            start();
          }
        }}
      >
        <motion.div
          className="relative aspect-[1.585/1] w-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={reduce ? { rotateY: 0 } : { rotateY: rot, y: [0, -9, 0], rotateZ: [-1.5, 1.5, -1.5] }}
          transition={{
            rotateY: { type: "spring", stiffness: 90, damping: 16 },
            y: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
            rotateZ: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          {/* ---------- FRONT ---------- */}
          <div style={{ ...faceBase, background: "var(--color-navy)", border: "2px solid var(--color-navy)" }} className="hard-red">
            <div className="relative flex h-full flex-col p-5 text-cream">
              <div className="flex items-start justify-between">
                <div className="h-9 w-12 rounded-[6px] border border-black/20" style={{ background: "linear-gradient(135deg,#ffd976,#e8b23c)" }} />
                <span className="font-display text-[19px] font-extrabold text-gold tshadow-red">{brand.name}</span>
              </div>
              <div className="mt-auto">
                <div className="font-display text-[19px] font-semibold tracking-[2px] text-cream" style={{ fontVariantNumeric: "tabular-nums" }}>
                  ••••&nbsp;&nbsp;••••&nbsp;&nbsp;••••&nbsp;&nbsp;4221
                </div>
                <div className="mt-3">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-cream/60">Card holder</span>
                  <span className="block font-display text-[16px] font-bold text-cream">{brand.persona}</span>
                  <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.14em] text-cream/60">Valid 04/28</span>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- BACK ---------- */}
          <div style={{ ...faceBase, background: "var(--color-navy)", border: "2px solid var(--color-navy)", transform: "rotateY(180deg)" }} className="hard-red">
            <div className="relative flex h-full flex-col overflow-hidden text-cream">
              {/* subtle diagonal sheen */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{ background: "repeating-linear-gradient(115deg,#fff 0 1px,transparent 1px 9px)" }}
              />

              {/* magnetic stripe */}
              <div className="relative mt-4 h-8 w-full bg-black/85" />

              <div className="relative flex flex-1 flex-col px-4 pb-4 pt-3">
                {/* signature panel + CVV box */}
                <div className="flex items-stretch gap-2">
                  <div
                    className="h-7 flex-1 rounded-[3px]"
                    style={{ background: "repeating-linear-gradient(45deg,#faf7ef,#faf7ef 3px,#e7e2d5 3px,#e7e2d5 6px)" }}
                  />
                  <div className="flex w-11 flex-col items-center justify-center rounded-[3px] bg-cream leading-none text-navy">
                    <span className="text-[5px] font-bold uppercase tracking-[0.1em] opacity-60">CVV</span>
                    <span className="font-display text-[12px] font-bold tracking-[1px]">{brand.cardBack.cvv}</span>
                  </div>
                </div>

                {/* card number + contactless */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-display text-[12.5px] font-semibold tracking-[1.5px] text-cream/90" style={{ fontVariantNumeric: "tabular-nums" }}>
                    ••••&nbsp;••••&nbsp;••••&nbsp;4221
                  </span>
                  {/* contactless (NFC) icon */}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-cream/70">
                    <path d="M7 8.5a7 7 0 0 1 0 7" />
                    <path d="M10.5 6a11 11 0 0 1 0 12" />
                    <path d="M14 3.5a15 15 0 0 1 0 17" />
                  </svg>
                </div>

                {/* issuer + hologram + Visa flag */}
                <div className="mt-auto flex items-end justify-between pt-3">
                  <div>
                    <span className="block font-display text-[13px] font-extrabold text-gold">{brand.name}</span>
                    <span className="text-[8px] uppercase tracking-[0.12em] text-cream/50">{brand.cardBack.note}</span>
                  </div>
                  <div className="relative h-5 w-[34px]">
                    <span className="absolute left-0 top-0 h-5 w-5 rounded-full bg-red" />
                    <span className="absolute right-0 top-0 h-5 w-5 rounded-full bg-gold" style={{ mixBlendMode: "multiply" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
