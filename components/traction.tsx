import { brand } from "@/config/brand";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";

export function Traction() {
  return (
    <Section id="traction">
      <SectionHeading eyebrow="Growing fast" title={<><CountUp to={brand.waitlistSeed} /> teens. Zero ads.</>} />

      <div className="mx-auto grid max-w-[720px] gap-4 sm:grid-cols-3">
        {[
          { num: <><CountUp to={brand.waitlistSeed} />+</>, cap: "Teens joined" },
          { num: "0", cap: "Money on ads" },
          { num: brand.launch, cap: "We launch" },
        ].map((s, i) => (
          <Reveal key={i} delay={i * 0.08} className="card hard-navy p-6 text-center">
            <span className="block font-display text-[clamp(26px,4vw,40px)] font-black leading-none text-red">{s.num}</span>
            <span className="mt-2.5 block text-[13.5px] font-semibold text-ink2">{s.cap}</span>
          </Reveal>
        ))}
      </div>

      <Reveal className="mx-auto mt-10 max-w-[620px]">
        <blockquote className="card hard-gold px-8 py-7 text-center" style={{ background: "var(--color-goldsoft)" }}>
          <p className="font-serif text-[20px] italic leading-[1.5] text-navy">
            &ldquo;For 8 months my pay went to my dad. I can&apos;t wait to have my own card.&rdquo;
          </p>
          <cite className="mt-4 block font-display text-[14px] font-bold not-italic text-red">
            {brand.persona.split(" ")[0]}, {brand.personaAge}, {brand.personaCity}
          </cite>
        </blockquote>
      </Reveal>
    </Section>
  );
}
