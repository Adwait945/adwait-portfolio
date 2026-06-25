import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import TheBridge from "@/components/sections/TheBridge";
import BeyondTheWork from "@/components/sections/BeyondTheWork";
import TechnicalDNA from "@/components/sections/TechnicalDNA";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import CareerTrajectory from "@/components/sections/CareerTrajectory";
import SkillsTools from "@/components/sections/SkillsTools";
import Education from "@/components/sections/Education";
import AISandbox from "@/components/sections/AISandbox";
import Timeline from "@/components/sections/Timeline";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
      <Nav />
      <Hero />
      <TheBridge />
      <BeyondTheWork />
      <TechnicalDNA />
      <FeaturedProjects />
      <CareerTrajectory />
      <SkillsTools />
      <Education />
      <AISandbox />
      <Timeline />
      <Footer />
    </div>
  );
}