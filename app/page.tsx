import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Solution } from "@/components/solution";
import { MeetPingo } from "@/components/meet-pingo";
import { HowItWorks } from "@/components/how-it-works";
import { Personas } from "@/components/personas";
import { Regulatory } from "@/components/regulatory";
import { Traction } from "@/components/traction";
import { Waitlist } from "@/components/waitlist";
import { Footer } from "@/components/footer";
import { StickyCta } from "@/components/sticky-cta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <MeetPingo />
        <HowItWorks />
        <Personas />
        <Regulatory />
        <Traction />
        <Waitlist />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
