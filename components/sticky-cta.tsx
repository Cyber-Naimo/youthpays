import { ArrowRight } from "@/components/ui/icons";

export function StickyCta() {
  return (
    <a
      href="#waitlist"
      className="btn btn-primary fixed inset-x-4 bottom-4 z-[90] md:hidden"
    >
      Claim your spot <ArrowRight />
    </a>
  );
}
