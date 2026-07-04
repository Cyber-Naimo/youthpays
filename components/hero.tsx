import { brand } from "@/config/brand";
import { Reveal } from "@/components/ui/reveal";
import { CardMockup } from "@/components/ui/card-mockup";
import { CountUp } from "@/components/ui/count-up";
import { ArrowRight } from "@/components/ui/icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-14 md:pb-24" id="top">
      {/* flat brand color blocks (no gradients) */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/25" aria-hidden />
      <div className="pointer-events-none absolute -left-20 top-52 h-52 w-52 rounded-full bg-red/10" aria-hidden />

      <div className="wrap relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <Reveal>
            <span className="eyebrow"><span className="dot dot-green" /> Pakistan&apos;s first teen card</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-[clamp(44px,7.5vw,72px)] font-black leading-[1] tracking-[-0.03em] text-navy">
              Your money.
              <br />
              Your card.
              <br />
              <span className="text-red tshadow-navy">Your name.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[420px] text-[18px] font-medium leading-[1.55] text-ink2">
              Get paid, save, and spend on your own. A real card, made for teens.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <a href="#waitlist" className="btn btn-primary btn-lg">
                Claim your spot <ArrowRight />
              </a>
              <span className="text-[14px] font-semibold text-ink2">
                <b className="text-navy"><CountUp from={brand.waitlistSeed} to={brand.waitlistSeed} />+</b> teens joined
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="order-first lg:order-none">
          <CardMockup />
        </Reveal>
      </div>
    </section>
  );
}
