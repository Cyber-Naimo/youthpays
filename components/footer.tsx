import { brand } from "@/config/brand";
import { Logo } from "@/components/ui/logo";
import { Pingo } from "@/components/ui/pingo";

const links = [
  { href: "#solution", label: "What you get" },
  { href: "#how", label: "How it works" },
  { href: "#parents", label: "Who it's for" },
  { href: "#waitlist", label: "Join the colony" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "var(--color-dark)" }}>
      <div className="wrap relative z-10 grid gap-10 pt-16 pb-8 md:grid-cols-[1.6fr_1fr_1.4fr]">
        <div>
          <Logo light />
          <p className="mt-3 max-w-[280px] text-[14px]" style={{ color: "rgba(250,247,239,.6)" }}>{brand.tagline}</p>
          <a href={`mailto:${brand.email}`} className="mt-3 inline-block text-[14px] font-bold text-gold">{brand.email}</a>
        </div>

        <div>
          <h4 className="mb-3.5 text-[12px] font-extrabold uppercase tracking-[0.1em]" style={{ color: "rgba(250,247,239,.5)" }}>Menu</h4>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="block py-1.5 text-[14.5px] font-medium transition-colors hover:text-cream" style={{ color: "rgba(250,247,239,.7)" }}>
              {l.label}
            </a>
          ))}
        </div>

        <div>
          <h4 className="mb-3.5 text-[12px] font-extrabold uppercase tracking-[0.1em]" style={{ color: "rgba(250,247,239,.5)" }}>The small print</h4>
          <p className="text-[13px] leading-[1.7]" style={{ color: "rgba(250,247,239,.5)" }}>
            {brand.name} is not a bank. Your card and wallet come from a licensed partner, watched by the State Bank of Pakistan.
          </p>
        </div>
      </div>

      <div className="wrap relative z-10 flex flex-col items-center justify-between gap-2 py-6 text-[13px] sm:flex-row" style={{ borderTop: "1px solid rgba(250,247,239,.12)", color: "rgba(250,247,239,.5)" }}>
        <span>© 2026 {brand.name}</span>
        <span>Made in Pakistan</span>
      </div>

      {/* giant clipped wordmark — static brand signature */}
      <div className="relative select-none" aria-hidden>
        <div
          className="pointer-events-none whitespace-nowrap text-center font-display font-black leading-[0.8] tracking-[-0.04em]"
          style={{ fontSize: "clamp(80px,20vw,260px)", color: "rgba(250,247,239,.05)", marginBottom: "-0.22em" }}
        >
          {brand.name}
        </div>
        {/* one Pingo peeking over the wordmark */}
        <div className="absolute bottom-0 right-[8%] md:right-[14%]">
          <Pingo size={72} />
        </div>
      </div>
    </footer>
  );
}
