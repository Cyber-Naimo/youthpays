import { Section, SectionHeading } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { FeatureCard, type IconKey, type Tone } from "@/components/ui/feature-card";

const features: { icon: IconKey; title: string; body: string; tone: Tone }[] = [
  { icon: "card", title: "Your card", body: "A real card with your name on it. Use it online or in shops.", tone: "red" },
  { icon: "wallet", title: "Your wallet", body: "Get paid from anywhere. Save it, spend it — your call.", tone: "gold" },
  { icon: "shield", title: "Parents help", body: "Mom and Dad can set limits and see spending. You stay in charge.", tone: "green" },
];

export function Solution() {
  return (
    <Section id="solution" tone="tint">
      <SectionHeading eyebrow="Your toolkit" title={<>Small card. Big freedom.</>} />
      <Stagger className="grid gap-5 md:grid-cols-3">
        {features.map((f) => (
          <StaggerItem key={f.title} className="h-full">
            <FeatureCard {...f} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
