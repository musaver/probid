import Home1Faq from "@/components/faq/Home1Faq";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import HeroSection from "@/components/homepage/HeroSection";
import LogosSection from "@/components/homepage/LogosSection";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Home1Faq />
      <LogosSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
