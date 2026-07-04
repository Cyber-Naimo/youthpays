import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

type Tone = "plain" | "tint" | "dark";

const toneStyle: Record<Tone, React.CSSProperties | undefined> = {
  plain: undefined,
  tint: { background: "var(--color-panel)" },
  dark: { background: "var(--color-dark)" },
};

/** One wrapper for every section: consistent padding + optional tone. */
export function Section({
  id,
  tone = "plain",
  children,
  className = "",
}: {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 ${tone === "dark" ? "text-white" : ""} ${className}`}
      style={toneStyle[tone]}
    >
      <div className="wrap">{children}</div>
    </section>
  );
}

/** Shared eyebrow + title + optional lead, centered. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  dark?: boolean;
}) {
  return (
    <Reveal className="mx-auto mb-14 max-w-[680px] text-center">
      <span className="label" style={dark ? { color: "var(--color-gold)" } : undefined}>
        {eyebrow}
      </span>
      <h2 className={`h2 mt-4 ${dark ? "text-white" : ""}`}>{title}</h2>
      {lead && (
        <p
          className="lede mx-auto mt-4 max-w-[560px]"
          style={dark ? { color: "rgba(250,247,239,.8)" } : undefined}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
