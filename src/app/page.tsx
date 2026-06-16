import { About } from "@/components/sections/About";
import { BentoSkills } from "@/components/sections/BentoSkills";
import { Education } from "@/components/sections/Education";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <Projects />
      <BentoSkills />
    </>
  );
}
