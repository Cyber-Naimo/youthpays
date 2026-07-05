"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { brand } from "@/config/brand";
import { CountUp } from "@/components/ui/count-up";
import { Pingo } from "@/components/ui/pingo";
import { Check } from "@/components/ui/icons";

const CONFETTI = ["var(--color-red)", "var(--color-gold)", "var(--color-green)", "var(--color-cream)"];
const AUTO_FLIP_MS = 4000;
const BARCODE = "repeating-linear-gradient(90deg,#14161d 0 2px,transparent 2px 4px,#14161d 4px 5px,transparent 5px 8px,#14161d 8px 11px,transparent 11px 14px)";

const faceBase: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

function FauxQR({ data, size = 54 }: { data: string; size?: number }) {
  const N = 11;
  const cells: boolean[] = [];
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) {
      const c = data.charCodeAt((x * 3 + y * 5) % data.length) || 42;
      cells.push((c * (x + 2) * (y + 3)) % 5 < 2);
    }
  const finder = (x: number, y: number) => (x < 3 && y < 3) || (x > N - 4 && y < 3) || (x < 3 && y > N - 4);
  return (
    <div className="grid gap-px rounded-[3px] bg-cream p-1" style={{ gridTemplateColumns: `repeat(${N},1fr)`, width: size, height: size }}>
      {cells.map((on, i) => {
        const x = i % N, y = Math.floor(i / N);
        const f = finder(x, y);
        const fill = f ? (x === 0 || y === 0 || x === N - 1 || y === N - 1 || x === 2 || y === 2 || x === N - 3 || y === N - 3) : on;
        return <span key={i} className="aspect-square" style={{ background: fill ? "var(--color-navy)" : "transparent" }} />;
      })}
    </div>
  );
}

export function ETicket({ name, position, refCode }: { name: string; position: number; refCode: string }) {
  const reduce = useReducedMotion();
  const [flip, setFlip] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const shareUrl = `https://${brand.domain}/?ref=${refCode}`;
  const waHref = `https://wa.me/?text=${encodeURIComponent(`I just booked my seat on ${brand.name} — Pakistan's first teen card. Grab yours: ${shareUrl}`)}`;
  const copy = () => navigator.clipboard?.writeText(shareUrl).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });

  function startTimer() {
    if (timer.current) clearInterval(timer.current);
    if (reduce) return;
    timer.current = setInterval(() => setFlip((f) => !f), AUTO_FLIP_MS);
  }
  useEffect(() => {
    startTimer();
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [reduce]);

  return (
    <motion.div initial={reduce ? false : { opacity: 0, y: 24, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 210, damping: 20 }}>
      <div className="relative">
        {/* confetti */}
        {!reduce &&
          Array.from({ length: 18 }).map((_, k) => {
            const ang = (k / 18) * Math.PI * 2;
            return (
              <motion.span key={k} className="absolute left-1/2 top-4 z-30 h-2 w-2 rounded-[2px]" style={{ background: CONFETTI[k % CONFETTI.length] }}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }} animate={{ x: Math.cos(ang) * 175, y: Math.sin(ang) * 110 - 10, opacity: 0, rotate: 220, scale: 0.4 }} transition={{ duration: 1.1, ease: "easeOut" }} />
            );
          })}

        {/* flip stage */}
        <div style={{ perspective: 1500 }} className="cursor-pointer" onClick={() => { setFlip((f) => !f); startTimer(); }}>
          <motion.div className="relative h-[264px] w-full" style={{ transformStyle: "preserve-3d" }} animate={{ rotateY: flip ? 180 : 0 }} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 18 }}>

            {/* ============ FRONT (unchanged) ============ */}
            <div style={faceBase} className="flex items-stretch overflow-hidden rounded-[16px] border-2 border-navy hard-red">
              {!reduce && (
                <motion.div className="pointer-events-none absolute inset-y-0 z-20 w-1/3" style={{ background: "linear-gradient(105deg,transparent,rgba(255,255,255,0.35),transparent)" }}
                  initial={{ x: "-140%" }} animate={{ x: "420%" }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.6, ease: "easeInOut" }} />
              )}

              <div className="relative flex flex-1 flex-col justify-between bg-surface p-5 text-ink">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[15px] font-extrabold text-navy">{brand.name}</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-red">Waitlist Pass</span>
                </div>

                <motion.div initial={reduce ? false : { opacity: 0, scale: 1.7, rotate: -22 }} animate={{ opacity: 1, scale: 1, rotate: -11 }} transition={{ type: "spring", stiffness: 240, damping: 12, delay: 0.4 }}
                  className="pointer-events-none absolute right-4 top-11 z-10 rounded-[5px] border-2 px-1.5 py-0.5 font-display text-[10px] font-black uppercase tracking-[0.12em]" style={{ color: "var(--color-green)", borderColor: "var(--color-green)" }}>
                  Confirmed
                </motion.div>

                <div className="flex items-center gap-2.5">
                  <Pingo size={38} />
                  <div className="min-w-0">
                    <span className="block text-[8.5px] font-bold uppercase tracking-[0.16em] text-muted">Passenger</span>
                    <span className="block truncate font-display text-[17px] font-black leading-tight text-navy" style={{ maxWidth: 180 }}>{name || "Member"}</span>
                    <span className="block text-[9px] font-bold uppercase tracking-[0.1em] text-red">Launch-day access</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="block text-[8px] font-bold uppercase tracking-[0.14em] text-muted">Launches</span>
                    <span className="block font-display text-[12.5px] font-bold text-navy">{brand.launch}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold uppercase tracking-[0.14em] text-muted">Gate</span>
                    <span className="block font-display text-[12.5px] font-bold text-navy">Founding</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold uppercase tracking-[0.14em] text-muted">Class</span>
                    <span className="block font-display text-[12.5px] font-bold text-navy">Early</span>
                  </div>
                </div>

                <div className="h-6 w-full" style={{ background: BARCODE }} />
              </div>

              <div className="relative w-0">
                <span className="absolute -top-3.5 left-1/2 z-10 h-7 w-7 -translate-x-1/2 rounded-full bg-[var(--color-dark)]" />
                <span className="absolute -bottom-3.5 left-1/2 z-10 h-7 w-7 -translate-x-1/2 rounded-full bg-[var(--color-dark)]" />
                <span className="block h-full border-l-2 border-dashed border-cream/40" />
              </div>

              <div className="flex w-[104px] shrink-0 flex-col items-center justify-center gap-1.5 bg-navy px-2 py-4 text-cream">
                <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-cream/60">Seat</span>
                <span className="font-display text-[26px] font-black leading-none text-gold">#<CountUp from={brand.waitlistSeed} to={position} /></span>
                <FauxQR data={refCode} size={54} />
                <span className="text-[7px] font-bold uppercase tracking-[0.14em] text-cream/50">Scan at launch</span>
              </div>
            </div>

            {/* ============ BACK ============ */}
            <div style={{ ...faceBase, transform: "rotateY(180deg)" }} className="flex flex-col overflow-hidden rounded-[16px] border-2 border-navy bg-navy text-cream hard-red">
              <div className="flex items-center justify-between px-5 pt-3">
                <span className="font-display text-[15px] font-extrabold text-gold tshadow-red">{brand.name}</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-cream/60">Skip the line</span>
              </div>

              <div className="flex flex-1 flex-col px-5 pb-6 pt-2">
                <span className="text-center text-[10px] font-bold uppercase tracking-[0.16em] text-cream/55">A sneak peek at your card</span>

                {/* mini reserved-card preview — small credit-card shape */}
                <div className="mx-auto mt-1.5 flex aspect-[1.586/1] w-[196px] flex-col justify-between rounded-[10px] border border-cream/20 p-2.5" style={{ background: "linear-gradient(135deg,#0f1925,#1b2a4a)" }}>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[11px] font-extrabold text-gold">{brand.name}</span>
                    <span className="rounded-full border border-gold/40 px-1.5 py-0.5 text-[6.5px] font-bold uppercase tracking-[0.14em] text-gold">Founding</span>
                  </div>
                  <span className="h-3.5 w-5 rounded-[3px]" style={{ background: "linear-gradient(135deg,#ffd976,#e8b23c)" }} />
                  <div className="flex items-end justify-between">
                    <div className="min-w-0">
                      <span className="block text-[6px] font-bold uppercase tracking-[0.16em] text-cream/50">Reserved for</span>
                      <span className="block truncate font-display text-[10px] font-bold uppercase tracking-[0.03em] text-cream" style={{ maxWidth: 120 }}>{name || "Member"}</span>
                    </div>
                    <span className="font-display text-[12px] font-black leading-none text-gold">#{position}</span>
                  </div>
                </div>

                {/* 2 buttons */}
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); copy(); }}
                    className="flex items-center justify-center gap-1.5 rounded-[10px] border-2 border-cream/30 bg-transparent py-2.5 font-display text-[13px] font-bold text-cream"
                  >
                    {copied ? <><Check width={15} height={15} /> Copied</> : "Copy link"}
                  </button>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center rounded-[10px] py-2.5 font-display text-[13px] font-bold text-white"
                    style={{ background: "#25d366" }}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* caption */}
        <p className="mt-4 text-center text-[13.5px]" style={{ color: "rgba(250,247,239,.75)" }}>
          You&apos;re booked, <b className="text-gold">{(name || "Member").split(" ")[0]}</b> — seat <b className="text-gold">#{position}</b>. Tap the ticket to flip.
        </p>
      </div>
    </motion.div>
  );
}
