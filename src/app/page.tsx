import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const TrustBar = dynamic(() => import("./components/TrustBar"));
const Features = dynamic(() => import("./components/Features"));
const ProductPreview = dynamic(() => import("./components/ProductPreview"));
const ScrollText = dynamic(() => import("./components/ScrollText"));
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
      <TrustBar />
      <Features />
      <ProductPreview />
      <ScrollText />
      <WhyUs />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <Integrations />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
