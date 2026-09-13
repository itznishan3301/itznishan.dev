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
      <Section id="contact" bordered className="min-h-[70vh] flex flex-col justify-center">
        <div className="text-center">
          <Reveal>
            <Heading label="05 — Contact" as="h2" gradient>
              Let&apos;s Work Together
            </Heading>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-body mx-auto mt-6 max-w-lg">
              [ADD CONTACT INTRODUCTION — a brief message inviting visitors to
              reach out. Mention what kind of opportunities you&apos;re looking
              for.]
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton>
                <Button
                  href="mailto:[ADD YOUR EMAIL]"
                  variant="primary"
                  icon={<ArrowUpRight size={16} strokeWidth={1.5} />}
                >
                  Send Email
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button href="[ADD YOUR LINKEDIN URL]" variant="outline">
                  LinkedIn
                </Button>
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <p className="mt-16 text-label">
              [ADD YOUR EMAIL]
            </p>
          </Reveal>
        </div>
      </Section>

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
