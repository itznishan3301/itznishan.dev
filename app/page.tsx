import { Hero } from "@/components/hero";
import { AboutExperience } from "@/components/about";
import { TechConstellation } from "@/components/skills";
import { ProjectShowcase } from "@/components/projects";
import { Timeline } from "@/components/experience";
import { BuildingNow } from "@/components/building";
import { ResumeSection } from "@/components/resume";
import { ContactExperience } from "@/components/contact";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Hero />

      {/* ── About ────────────────────────────────────────────── */}
      <AboutExperience />

      {/* ── Skills ───────────────────────────────────────────── */}
      <TechConstellation />

      {/* ── Projects ─────────────────────────────────────────── */}
      <ProjectShowcase />

      {/* ── Experience ───────────────────────────────────────── */}
      <Timeline />

      {/* ── Currently Building ───────────────────────────────── */}
      <BuildingNow />

      {/* ── Resume ──────────────────────────────────────────── */}
      <ResumeSection />

      {/* ── Contact ──────────────────────────────────────────── */}
      <ContactExperience />

      {/* ── Footer ───────────────────────────────────────────── */}
      <Footer />
    </main>
    </>
  );
}
