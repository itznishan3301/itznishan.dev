"use client";

import { personal } from "@/data/personal";
import { socialLinks } from "@/data/social";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { ArrowUpRight, Mail } from "lucide-react";
import dynamic from "next/dynamic";

const SceneCanvas = dynamic(
  () =>
    import("@/components/three/SceneCanvas").then((mod) => mod.SceneCanvas),
  { ssr: false }
);

const ContactOrbScene = dynamic(
  () =>
    import("./ContactOrb").then((mod) => mod.ContactOrbScene),
  { ssr: false }
);

interface ContactExperienceProps {
  className?: string;
}

export function ContactExperience({ className }: ContactExperienceProps) {
  return (
    <section
      id="contact"
      className={cn(
        "relative border-t border-[var(--color-border)] md:min-h-[85vh]",
        className
      )}
    >
      {/* 3D Orb — background atmosphere */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40" aria-hidden="true">
        <SceneCanvas cameraPosition={[0, 0, 5]}>
          <ContactOrbScene />
        </SceneCanvas>
      </div>

      <div className="section-container section-padding relative z-10 flex min-h-[60vh] md:min-h-[80vh] flex-col items-center justify-center">
        {/* Header */}
        <div className="mb-12 flex w-full items-center gap-4">
          <span className="text-label">07 — Contact</span>
          <div className="divider flex-1" />
        </div>

        {/* Central content */}
        <div className="flex flex-col items-center text-center">
          <SectionReveal>
            <h2 className="mb-6 text-[var(--text-7xl)] font-medium leading-[1.05] tracking-[var(--tracking-tighter)]">
              <span className="text-gradient">Let&apos;s Build</span>
              <br />
              <span className="text-gradient">Something.</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="mx-auto mb-12 max-w-xl text-body">
              {personal.description}
            </p>
          </SectionReveal>

          {/* Primary CTA */}
          <SectionReveal delay={0.25}>
            <div className="mb-16">
              <MagneticButton>
                <Button
                  href={`mailto:${personal.email}`}
                  variant="primary"
                  size="lg"
                  icon={<Mail size={18} strokeWidth={1.5} />}
                  aria-label={`Send email to ${personal.email}`}
                >
                  Get in Touch
                </Button>
              </MagneticButton>
            </div>
          </SectionReveal>

          {/* Contact details */}
          <SectionReveal delay={0.35}>
            <div className="mb-12 flex flex-col items-center gap-3">
              <a
                href={`mailto:${personal.email}`}
                className="text-lg text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                aria-label={`Email ${personal.email}`}
              >
                {personal.email}
              </a>
              {personal.location && (
                <p className="text-sm text-[var(--color-text-muted)]">
                  {personal.location}
                </p>
              )}
              {personal.availability && (
                <span className="badge">{personal.availability}</span>
              )}
            </div>
          </SectionReveal>

          {/* Social links */}
          <SectionReveal delay={0.45}>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)]"
                  aria-label={`Visit ${link.name} profile`}
                >
                  <span>{link.name}</span>
                  <ArrowUpRight
                    size={12}
                    strokeWidth={1.5}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
