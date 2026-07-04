import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { Check } from "@/components/ui/icons";

const points = ["Follows State Bank rules", "Money held by a licensed partner", "B-Form verified"];

export function Regulatory() {
  return (
    <Section id="regulatory" tone="dark">
      <SectionHeading
        dark
        eyebrow="Safe & legal"
        title={<>This is the real deal.</>}
        lead="Partnered with SBP-licensed EMIs to make sure your money stays secure in the vault."
      />
      <Stagger className="mx-auto flex max-w-[720px] flex-wrap justify-center gap-3">
        {points.map((p) => (
          <StaggerItem key={p}>
            <span
              className="flex items-center gap-2.5 rounded-full px-5 py-3 text-[14px] font-semibold"
              style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)", color: "#fff" }}
            >
              <span className="grid h-5 w-5 place-items-center rounded-full text-[#0b6b4e]" style={{ background: "var(--color-accent)" }}>
                <Check width={13} height={13} />
              </span>
              {p}
            </span>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
