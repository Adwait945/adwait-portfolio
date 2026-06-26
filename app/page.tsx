import Hero from "@/components/home/Hero";
import HowIWork from "@/components/home/HowIWork";
import SelectedWork from "@/components/home/SelectedWork";
import CareerTrajectory from "@/components/home/CareerTrajectory";
import Skills from "@/components/home/Skills";
import Experience from "@/components/home/Experience";
import Education from "@/components/home/Education";
import About from "@/components/home/About";
import BeyondTheWork from "@/components/home/BeyondTheWork";
import ContactCTA from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <HowIWork />
      <SelectedWork />
      <CareerTrajectory />
      <Skills />
      <Experience />
      <Education />
      <About />
      <BeyondTheWork />
      <ContactCTA />
    </>
  );
}
