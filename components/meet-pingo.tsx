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
          className="grid items-center gap-8 rounded-[16px] border-2 border-navy p-6 sm:p-10 md:grid-cols-2 md:gap-12 md:p-12"
          style={{ background: "var(--color-gold)", boxShadow: "8px 8px 0 var(--color-red)" }}
        >
          {/* copy */}
          <div className="text-center md:text-left md:pr-4">
            <span className="label" style={{ color: "var(--color-navy)" }}>Meet Pingo</span>
            <h2 className="h2 mt-4 text-navy">Say hi to your money buddy.</h2>
            <p className="mx-auto mt-5 max-w-[420px] text-[17px] font-medium leading-[1.6] text-navy/80 md:mx-0">
              Pingo brings you Pakistan&apos;s first teen card, in your name.
              Tap in, waddle over, and join the herd.
            </p>
            <a href="#waitlist" className="btn btn-primary btn-lg mt-8">
              Claim your spot <ArrowRight />
            </a>
          </div>

          {/* card left, Pingo right — scales with the column width so it fits any screen */}
          <div className="flex flex-col items-center">
            {/* speech bubble. mb-* = gap below · sm:ml-* = shift toward Pingo on wider screens */}
            <div className="relative z-30 mb-2 sm:ml-24">
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

            <div className="flex w-full items-end justify-center gap-2 md:gap-4">
              {/* card — flippable (same as hero) */}
              <div className="mb-4 w-[46%] max-w-[280px] shrink-0">
                <CardMockup />
              </div>

              {/* Pingo — scales to its container (image has max-width:100%) */}
              <motion.div
                className="w-[46%] max-w-[320px] shrink-0"
                animate={reduce ? undefined : { rotate: [0, -5, 5, -3, 0], y: [0, -7, 0] }}
                transition={{ rotate: { duration: 1.8, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }, y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }}
                style={{ transformOrigin: "bottom center" }}
              >
                <Pingo size={320} className="drop-shadow-[5px_5px_0_rgba(15,25,37,0.18)]" />
              </motion.div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
