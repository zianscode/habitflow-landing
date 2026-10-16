import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScrollReveal from "./components/ScrollReveal";

const TrustBar = dynamic(() => import("./components/TrustBar"));
const Features = dynamic(() => import("./components/Features"));
const ProductPreview = dynamic(() => import("./components/ProductPreview"));
const WhyUs = dynamic(() => import("./components/WhyUs"));
const HowItWorks = dynamic(() => import("./components/HowItWorks"));
const Testimonials = dynamic(() => import("./components/Testimonials"));
const Pricing = dynamic(() => import("./components/Pricing"));
const Integrations = dynamic(() => import("./components/Integrations"));
const FAQ = dynamic(() => import("./components/FAQ"));
const FinalCTA = dynamic(() => import("./components/FinalCTA"));
const Footer = dynamic(() => import("./components/Footer"));

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      
      <Hero />
      
      <ScrollReveal>
        <TrustBar />
      </ScrollReveal>

      <ScrollReveal parallax={true}>
        <Features />
      </ScrollReveal>

      <ScrollReveal parallax={true}>
        <ProductPreview />
      </ScrollReveal>

      <ScrollReveal>
        <WhyUs />
      </ScrollReveal>

      <ScrollReveal parallax={true}>
        <HowItWorks />
      </ScrollReveal>

      <ScrollReveal parallax={true}>
        <Pricing />
      </ScrollReveal>

      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>

      <ScrollReveal>
        <Integrations />
      </ScrollReveal>

      <ScrollReveal>
        <FAQ />
      </ScrollReveal>

      <ScrollReveal>
        <FinalCTA />
      </ScrollReveal>

      <Footer />
    </main>
  );
}
