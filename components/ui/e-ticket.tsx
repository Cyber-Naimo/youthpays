"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { toPng } from "html-to-image";
import { brand } from "@/config/brand";
import { Pingo } from "@/components/ui/pingo";
import { Check } from "@/components/ui/icons";

const CONFETTI = ["var(--color-red)", "var(--color-gold)", "var(--color-green)", "var(--color-cream)"];
const AUTO_FLIP_MS = 4000;

const faceBase: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};


export function ETicket({ name, position, refCode }: { name: string; position: number; refCode: string }) {
  const reduce = useReducedMotion();
  const [flip, setFlip] = useState(false);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const frontRef = useRef<HTMLDivElement>(null);

  const shareUrl = `https://${brand.domain}/?ref=${refCode}`;
  const waHref = `https://wa.me/?text=${encodeURIComponent(`I just booked my seat on ${brand.name} — Pakistan's first teen card. Grab yours: ${shareUrl}`)}`;
  const copy = () => navigator.clipboard?.writeText(shareUrl).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });

  // capture the ticket front as a PNG and share it (or download as fallback)
  async function shareTicket() {
    if (timer.current) clearInterval(timer.current);
    setFlip(false);
    setBusy(true);
    setCapturing(true); // play the shutter + "say cheese" Pingo
    await new Promise((r) => setTimeout(r, 620)); // let flash play + settle on front
    setCapturing(false);
    try {
      const node = frontRef.current;
      if (!node) return;
      const dataUrl = await toPng(node, { pixelRatio: 2.5, cacheBust: true, backgroundColor: "#101124" });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `${brand.name}-ticket.png`, { type: "image/png" });
      const text = `I booked seat #${position} on ${brand.name} — Pakistan's first teen card. Reserve yours: ${shareUrl}`;
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: `${brand.name} waitlist`, text });
      } else {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = file.name;
        a.click();
      }
    } catch {
      /* user cancelled or capture failed */
    }
    setBusy(false);
    startTimer();
  }

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
              <motion.span key={k} className="pointer-events-none absolute left-1/2 top-4 z-30 h-2 w-2 rounded-[2px]" style={{ background: CONFETTI[k % CONFETTI.length] }}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }} animate={{ x: Math.cos(ang) * 175, y: Math.sin(ang) * 110 - 10, opacity: 0, rotate: 220, scale: 0.4 }} transition={{ duration: 1.1, ease: "easeOut" }} />
            );
          })}

        {/* flip stage */}
        <div style={{ perspective: 1500 }} className="relative cursor-pointer" onClick={() => { setFlip((f) => !f); startTimer(); }}>
          {/* capture: shutter flash + "say cheese" Pingo */}
          <AnimatePresence>
            {capturing && (
              <>
                <motion.div key="flash" className="pointer-events-none absolute inset-0 z-40 rounded-[16px] bg-white" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.9, 0] }} transition={{ duration: 0.5, times: [0, 0.35, 1] }} />
                <motion.div key="cheese" className="pointer-events-none absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  initial={{ scale: 0, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 16 }}>
                  <Pingo size={70} />
                  <span className="mt-1 rounded-full bg-navy px-3 py-1 font-display text-[12px] font-bold text-cream hard-sm-navy">Say cheese!</span>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <motion.div className="relative h-[264px] w-full" style={{ transformStyle: "preserve-3d" }} animate={{ rotateY: flip ? 180 : 0 }} transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 18 }}>

            {/* ============ FRONT — campaign pass ============ */}
            <div ref={frontRef} style={{ ...faceBase, pointerEvents: flip ? "none" : "auto" }} className="relative flex items-stretch overflow-hidden rounded-[16px] border-2 border-navy hard-red">
              {/* warm gradient */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#f7c948 0%,#f2a83c 40%,#e2622a 74%,#d62828 100%)" }} />
              {/* grain */}
              <div className="absolute inset-0 mix-blend-overlay" style={{ opacity: 0.2, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "140px 140px" }} />
              {/* light bloom */}
              <div className="pointer-events-none absolute -left-6 bottom-2 h-40 w-40 rounded-full" style={{ background: "radial-gradient(circle,rgba(255,255,255,.4),transparent 60%)" }} />

              {/* main */}
              <div className="relative z-10 flex flex-1 flex-col justify-between p-5 text-navy">
                <div className="leading-[1.35]">
                  <p className="font-display text-[10.5px] font-bold uppercase tracking-[0.18em] text-navy/75">{brand.name} presents</p>
                  <p className="font-display text-[10.5px] font-bold uppercase tracking-[0.18em] text-navy/75">The Founding Waitlist</p>
                </div>

                <h3 className="font-display text-[clamp(20px,6vw,32px)] font-black uppercase leading-[0.98] tracking-[-0.01em] text-navy" style={{ overflowWrap: "normal", wordBreak: "keep-all" }}>
                  {name || "Member"}
                </h3>

                <p className="font-display text-[11px] font-bold uppercase tracking-[0.1em] text-navy/85">
                  Launches {brand.launch} · Seat #{position}
                </p>
              </div>

              {/* perforation */}
              <div className="relative z-10 w-0">
                <span className="absolute -top-3.5 left-1/2 h-7 w-7 -translate-x-1/2 rounded-full bg-[var(--color-dark)]" />
                <span className="absolute -bottom-3.5 left-1/2 h-7 w-7 -translate-x-1/2 rounded-full bg-[var(--color-dark)]" />
                <span className="block h-full border-l-2 border-dashed border-navy/35" />
              </div>

              {/* stub — vertical ADMIT ONE + seat number */}
              <div className="relative z-10 flex w-[58px] flex-col items-center justify-center gap-3">
                <span className="font-display text-[14px] font-black uppercase tracking-[0.28em] text-navy" style={{ writingMode: "vertical-rl" }}>Admit One</span>
                <span className="font-display text-[13px] font-black text-navy" style={{ writingMode: "vertical-rl" }}>#{position}</span>
              </div>
            </div>

            {/* ============ BACK — same skin as front ============ */}
            <div style={{ ...faceBase, transform: "rotateY(180deg)", pointerEvents: flip ? "auto" : "none" }} className="relative flex flex-col overflow-hidden rounded-[16px] border-2 border-navy hard-red">
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#f7c948 0%,#f2a83c 40%,#e2622a 74%,#d62828 100%)" }} />
              <div className="absolute inset-0 mix-blend-overlay" style={{ opacity: 0.2, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "140px 140px" }} />

              <div className="relative z-10 flex flex-1 flex-col px-5 pb-6 pt-3 text-navy">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[15px] font-extrabold text-navy">{brand.name}</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-navy/70">Skip the line</span>
                </div>

                <div className="flex flex-1 flex-col justify-center py-1 text-center">
                  <h3 className="font-display text-[18px] font-black leading-tight text-navy">Share your pass.</h3>
                  <p className="mx-auto mt-1.5 max-w-[240px] text-[12.5px] font-medium leading-[1.45] text-navy/80">
                    Post it on your stories, get noticed — you might get featured on ours.
                  </p>
                </div>

                {/* screenshot + share the whole ticket */}
                <button
                  onClick={(e) => { e.stopPropagation(); shareTicket(); }}
                  disabled={busy}
                  className="flex items-center justify-center gap-1.5 rounded-[10px] border-2 border-navy bg-navy py-2.5 font-display text-[13.5px] font-bold text-cream disabled:opacity-70"
                >
                  {busy ? "Preparing…" : "Share my ticket ↗"}
                </button>

                {/* copy + whatsapp */}
                <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                  <button
                    onClick={(e) => { e.stopPropagation(); copy(); }}
                    className="flex items-center justify-center gap-1.5 rounded-[10px] border-2 border-navy bg-transparent py-2.5 font-display text-[13px] font-bold text-navy"
                  >
                    {copied ? <><Check width={15} height={15} /> Copied</> : "Copy link"}
                  </button>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center rounded-[10px] border-2 border-navy py-2.5 font-display text-[13px] font-bold text-white"
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
          You&apos;re booked, <b className="text-gold">{(name || "Member").split(" ")[0]}</b> — seat <b className="text-gold">#{position}</b>. Tap the card to flip.
        </p>
      </div>
    </motion.div>
  );
}
