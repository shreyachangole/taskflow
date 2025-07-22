import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { CTASection } from "@/components/landing/cta-section";

export function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-black">
      <Navbar isAuthenticated={false} />
      
      <main className="flex-1 bg-black">
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}
