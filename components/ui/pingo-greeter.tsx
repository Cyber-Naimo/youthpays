"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { brand } from "@/config/brand";
import { Pingo } from "@/components/ui/pingo";

/* Waving Pingo mascot with a cycling speech bubble. Standalone — drop anywhere.
   bubbleSide: which side of Pingo the speech bubble sits on. */
export function PingoGreeter({ size = 104, bubbleSide = "right" }: { size?: number; bubbleSide?: "left" | "right" }) {
  const reduce = useReducedMotion();
  const lines = ["Hi there!", "I'm Pingo", `Welcome to ${brand.name}`, "Your card awaits"];
  const [i, setI] = useState(0);
  const left = bubbleSide === "left";

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % lines.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <motion.div
      className={`flex items-center gap-3 ${left ? "flex-row-reverse" : ""}`}
      initial={reduce ? false : { opacity: 0, scale: 0.5, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.35 }}
    >
      {/* penguin — bobs + waves */}
      <motion.div
        animate={reduce ? undefined : { rotate: [0, -10, 10, -6, 0], y: [0, -5, 0] }}
        transition={{ rotate: { duration: 1.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }, y: { duration: 2.2, repeat: Infinity, ease: "easeInOut" } }}
        style={{ transformOrigin: "bottom center" }}
        className="shrink-0 drop-shadow-[3px_3px_0_rgba(15,25,37,0.22)]"
      >
        <Pingo size={size} />
      </motion.div>

      {/* speech bubble — tail points left toward Pingo */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={reduce ? false : { opacity: 0, x: 8, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
            className="whitespace-nowrap rounded-[14px] border-2 border-navy bg-cream px-4 py-2.5 font-display text-[15px] font-extrabold text-navy hard-sm-navy"
          >
            {lines[i]}
          </motion.div>
        </AnimatePresence>
        <span
          className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-navy bg-cream ${left ? "-right-[7px] border-r-2 border-t-2" : "-left-[7px] border-b-2 border-l-2"}`}
        />
      </div>
    </motion.div>
  );
}
