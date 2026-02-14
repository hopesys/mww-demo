import { HeroSection } from "@/components/marketing/hero-section";
import { PhilosophySection } from "@/components/marketing/philosophy-section";
import { PastWinnersSection } from "@/components/marketing/past-winners-section";
import { CtaBanner } from "@/components/marketing/cta-banner";

export default function HomePage(): React.ReactElement {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <PastWinnersSection />
      <CtaBanner />
    </>
  );
}
