"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CardIcon, WalletIcon, ShieldIcon, Bolt, Star, Globe } from "@/components/ui/icons";

export type Tone = "red" | "gold" | "green" | "navy";

const iconMap = {
  card: CardIcon,
  wallet: WalletIcon,
  shield: ShieldIcon,
  bolt: Bolt,
  star: Star,
  globe: Globe,
} as const;
export type IconKey = keyof typeof iconMap;

const tones: Record<Tone, { tile: string; ink: string }> = {
  red: { tile: "var(--color-red)", ink: "var(--color-cream)" },
  gold: { tile: "var(--color-gold)", ink: "var(--color-navy)" },
  green: { tile: "var(--color-green)", ink: "var(--color-cream)" },
  navy: { tile: "var(--color-navy)", ink: "var(--color-gold)" },
};

/** Card: rests flat with border, presses UP into a hard shadow on hover. */
export function FeatureCard({
  icon,
  title,
  body,
  tone = "red",
}: {
  icon: IconKey;
  title: string;
  body: string;
  tone?: Tone;
}) {
  const t = tones[tone];
  const Icon = iconMap[icon];
  const reduce = useReducedMotion();
  return (
    <motion.article
      whileHover={reduce ? undefined : { x: -3, y: -3, boxShadow: "4px 4px 0 var(--color-navy)" }}
      transition={{ duration: 0.12 }}
      className="h-full rounded-[16px] border-2 border-navy bg-surface p-6"
    >
      <span
        className="mb-4 grid h-12 w-12 place-items-center rounded-[10px] border-2 border-navy hard-sm-navy"
        style={{ background: t.tile, color: t.ink }}
      >
        <Icon width={24} height={24} />
      </span>
      <h3 className="mb-1.5 font-display text-[19px] font-extrabold text-navy">{title}</h3>
      <p className="text-[15px] leading-[1.55] text-ink2">{body}</p>
    </motion.article>
  );
}
