"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { brand } from "@/config/brand";
import { Pingo } from "@/components/ui/pingo";

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
    <div className="flex flex-col items-center gap-4">
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
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-cream/60">Card holder</span>
                    <span className="block font-display text-[16px] font-bold text-cream">{brand.persona}</span>
                    <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.14em] text-cream/60">Valid 04/28</span>
                  </div>
                  <Pingo size={46} silhouette />
                </div>
              </div>
            </div>
          </div>

          {/* ---------- BACK ---------- */}
          <div style={{ ...faceBase, background: "var(--color-navy)", border: "2px solid var(--color-navy)", transform: "rotateY(180deg)" }} className="hard-red">
            <div className="flex h-full flex-col text-cream">
              <div className="mt-5 h-9 w-full bg-black/80" />
              <div className="flex flex-1 flex-col px-5 pt-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="h-7 flex-1 rounded-[4px] bg-cream/90" />
                  <span className="ml-3 rounded-[4px] bg-cream px-2 py-1 font-display text-[12px] font-bold tracking-[2px] text-navy">{brand.cardBack.cvv}</span>
                </div>
                <ul className="space-y-1.5 text-[12.5px] font-medium text-cream/85">
                  {brand.cardBack.features.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between pb-4 pt-3">
                  <span className="font-display text-[13px] font-extrabold text-gold">{brand.name}</span>
                  <span className="text-[9px] uppercase tracking-[0.12em] text-cream/50">{brand.cardBack.note}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
