import { ArrowUpRight, ArrowDown } from "lucide-react";
import {
  Section,
  Heading,
  Button,
  MagneticButton,
  Card,
  Reveal,
  TextLink,
} from "@/components/ui";
import { Hero } from "@/components/hero";
import { AboutExperience } from "@/components/about";
import { TechConstellation } from "@/components/skills";
import { ProjectShowcase } from "@/components/projects";
import { Timeline } from "@/components/experience";
import { BuildingNow } from "@/components/building";
import { ResumeSection } from "@/components/resume";
import { ContactExperience } from "@/components/contact";

export default function Home() {
  return (
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
      <footer className="border-t border-[var(--color-border)]">
        <div className="section-container flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
          <p className="text-xs text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} Nuruzzaman Nishan. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            {["GitHub", "LinkedIn", "Twitter"].map((name) => (
              <a
                key={name}
                href="#"
                className="text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-secondary)]"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
