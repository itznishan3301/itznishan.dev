"use client";

import { personal } from "@/data/personal";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { ArrowUpRight, Download, FileText, Eye } from "lucide-react";

interface ResumeSectionProps {
  className?: string;
}

export function ResumeSection({ className }: ResumeSectionProps) {
  const resumePath = personal.resumePath;
  const resumeFileName = "Nuruzzaman_Nishan_Resume.pdf";

  return (
    <section
      id="resume"
      className={cn(
        "relative border-t border-[var(--color-border)]",
        className
      )}
    >
      <div className="section-container section-padding">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-label">06 — Resume</span>
          <div className="divider flex-1" />
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.6fr] lg:gap-20">
          {/* Left: Content */}
          <div>
            <SectionReveal>
              <h2 className="mb-4 text-[var(--text-5xl)] font-medium tracking-[var(--tracking-tight)]">
                Get My Resume
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <p className="mb-8 max-w-lg text-body">
                Download my resume for a comprehensive overview of my skills,
                experience, and qualifications. Available in PDF format.
              </p>
            </SectionReveal>

            {/* CTA buttons */}
            <SectionReveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton>
                  <Button
                    href={resumePath}
                    variant="primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={<Eye size={16} strokeWidth={1.5} />}
                    aria-label="View resume in new tab"
                  >
                    View Resume
                  </Button>
                </MagneticButton>

                <MagneticButton>
                  <Button
                    href={resumePath}
                    variant="outline"
                    download={resumeFileName}
                    icon={<Download size={16} strokeWidth={1.5} />}
                    aria-label="Download resume as PDF"
                  >
                    Download PDF
                  </Button>
                </MagneticButton>
              </div>
            </SectionReveal>
          </div>

          {/* Right: Visual resume card */}
          <SectionReveal delay={0.3} direction="right">
            <a
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-secondary)] transition-colors hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-tertiary)]"
              aria-label="Open resume PDF in new tab"
            >
              {/* Document icon area */}
              <div className="flex aspect-[3/4] flex-col items-center justify-center p-6 md:p-8">
                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center border border-[var(--color-border)]">
                  <FileText
                    size={28}
                    strokeWidth={1}
                    className="text-[var(--color-text-tertiary)] transition-colors group-hover:text-[var(--color-text-secondary)]"
                  />
                </div>

                {/* Filename */}
                <p className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">
                  {resumeFileName}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  PDF Document
                </p>

                {/* Open indicator */}
                <div className="mt-6 flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-text-secondary)]">
                  <span>Open</span>
                  <ArrowUpRight
                    size={12}
                    strokeWidth={1.5}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>


            </a>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
