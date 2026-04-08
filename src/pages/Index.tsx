import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ScreenshotsSection from "@/components/ScreenshotsSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="relative min-h-screen overflow-x-hidden">
    <ParticleBackground />
    <Navbar />
    <HeroSection />
    <FeaturesSection />
    <ScreenshotsSection />
    <Footer />
  </div>
);

export default Index;
