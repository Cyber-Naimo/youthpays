import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { Bolt, Star, ShieldIcon, Check } from "@/components/ui/icons";

type P = {
  Icon: typeof Bolt;
  tile: string;
  ink: string;
  title: string;
  line: string;
  points: string[];
};

const who: P[] = [
  {
    Icon: Bolt,
    tile: "var(--color-red)",
    ink: "var(--color-cream)",
    title: "The freelancer",
    line: "You earn online, in your own name.",
    points: [
      "Sells on Fiverr, or takes clients abroad",
      "Gets paid online, tired of it landing in Dad's account",
      "Wants a card to pay for tools and subscriptions",
    ],
  },
  {
    Icon: Star,
    tile: "var(--color-gold)",
    ink: "var(--color-navy)",
    title: "The saver",
    line: "You're building toward something.",
    points: [
      "Makes videos, art, or sells small stuff online",
      "Saving for a phone, laptop, or a first big goal",
      "Learning to budget pocket money and Eidi",
    ],
  },
  {
    Icon: ShieldIcon,
    tile: "var(--color-green)",
    ink: "var(--color-cream)",
    title: "The parent",
    line: "You want them money-ready.",
    points: [
      "Wants their teen to learn money the safe way",
      "Sets limits and gets alerts in real time",
      "Stays in the loop without holding the reins",
    ],
  },
];

export function Personas() {
  return (
    <Section id="parents" tone="tint">
      <SectionHeading eyebrow="Who it's for" title={<>Built for you.</>} />
      <Stagger className="grid gap-5 md:grid-cols-3">
        {who.map((p) => (
          <StaggerItem key={p.title} className="h-full">
            <article className="card hard-navy flex h-full flex-col p-6">
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-[10px] border-2 border-navy hard-sm-navy" style={{ background: p.tile, color: p.ink }}>
                <p.Icon width={24} height={24} />
              </span>
              <h3 className="font-display text-[20px] font-extrabold text-navy">{p.title}</h3>
              <p className="mt-1 text-[15px] font-semibold text-red">{p.line}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5 text-[14.5px] leading-[1.45] text-ink2">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-green text-cream">
                      <Check width={12} height={12} />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
