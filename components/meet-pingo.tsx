"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Pingo } from "@/components/ui/pingo";
import { CardMockup } from "@/components/ui/card-mockup";
import { ArrowRight } from "@/components/ui/icons";

const lines = ["Hi there!", "I'm Pingo", "Ready to join the herd?"];

export function MeetPingo() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % lines.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <Section id="pingo">
      <Reveal>
        <div
          className="rounded-[16px] border-2 border-navy p-6 sm:p-10 md:p-12"
          style={{ background: "var(--color-gold)", boxShadow: "8px 8px 0 var(--color-red)" }}
        >
          {/* copy */}
          <div className="mx-auto max-w-[560px] text-center">
            <span className="label" style={{ color: "var(--color-navy)" }}>Meet Pingo</span>
            <h2 className="h2 mt-4 text-navy">Say hi to your money buddy.</h2>
            <p className="mx-auto mt-4 max-w-[440px] text-[17px] font-medium leading-[1.6] text-navy/80">
              Pingo brings you Pakistan&apos;s first teen card, in your name.
              Tap in, waddle over, and join the herd.
            </p>
            <a href="#waitlist" className="btn btn-primary btn-lg mt-7">
              Claim your spot <ArrowRight />
            </a>
          </div>

          {/* scene — card + Pingo side by side, wraps to stack on small screens */}
          <div className="mt-10 flex flex-wrap items-end justify-center gap-6 sm:gap-10">
            {/* card — flippable (same as hero), full design size so content fits */}
            <div className="mb-3 w-full max-w-[300px]">
              <CardMockup />
            </div>

            {/* Pingo + bubble */}
            <div className="flex w-full max-w-[300px] flex-col items-center">
              <div className="relative z-30 mb-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={i}
                    initial={reduce ? false : { opacity: 0, y: 8, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0, scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 320, damping: 20 }}
                    className="whitespace-nowrap rounded-[14px] bg-navy px-5 py-3 font-display text-[15px] font-extrabold leading-none text-cream"
                  >
                    {lines[i]}
                  </motion.div>
                </AnimatePresence>
              </div>
              <motion.div
                className="w-[280px] max-w-full"
                animate={reduce ? undefined : { rotate: [0, -5, 5, -3, 0], y: [0, -7, 0] }}
                transition={{ rotate: { duration: 1.8, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }, y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }}
                style={{ transformOrigin: "bottom center" }}
              >
                <Pingo size={280} className="drop-shadow-[5px_5px_0_rgba(15,25,37,0.18)]" />
              </motion.div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
