import { brand } from "@/config/brand";
import { Section, SectionHeading } from "@/components/ui/section";

const items = [
  {
    q: "Is this allowed for teens?",
    a: `Yes. The State Bank of Pakistan says teens ages ${brand.ages} can have their own account. ${brand.name} follows those rules.`,
  },
  {
    q: "Is my money safe?",
    a: "Yes. A licensed partner holds your money, watched by the State Bank of Pakistan.",
  },
  {
    q: "Do my parents need to help?",
    a: "A parent signs on and can set limits. But the card is in your name, and you choose how to spend.",
  },
  {
    q: "Can I get paid from Fiverr or Upwork?",
    a: "Yes. Your pay comes straight to you, in your name. Keep it in dollars or change it to rupees.",
  },
  {
    q: "Does it cost money?",
    a: `Free to start. Extra features later cost ${brand.price} a month. We always tell you first.`,
  },
  {
    q: "When do I get my card?",
    a: `${brand.launch}. People who join first get their card first.`,
  },
];

export function Faq() {
  return (
    <Section id="faq">
      <SectionHeading eyebrow="Questions" title={<>Good to know.</>} />
      <div className="mx-auto flex max-w-[720px] flex-col gap-3">
        {items.map((it) => (
          <details key={it.q} className="faq-item rounded-[16px] border-2 border-navy bg-surface overflow-hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-display text-[16.5px] font-bold">
              {it.q}
              <span className="faq-plus grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primarysoft text-[20px] font-normal leading-none text-primary600">+</span>
            </summary>
            <p className="px-5 pb-5 text-[15.5px] leading-[1.65] text-ink2">{it.a}</p>
          </details>
        ))}
      </div>

      <style>{`
        .faq-item summary{list-style:none}
        .faq-item summary::-webkit-details-marker{display:none}
        .faq-item .faq-plus{transition:transform .25s var(--ease-out2)}
        .faq-item[open] .faq-plus{transform:rotate(45deg)}
        .faq-item[open]{box-shadow:3px 3px 0 var(--color-red)}
      `}</style>
    </Section>
  );
}
