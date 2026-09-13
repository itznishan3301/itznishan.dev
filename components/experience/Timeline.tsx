"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences, type Experience } from "@/data/experience";
import { education, type Education } from "@/data/education";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { cn } from "@/lib/utils/cn";
import { Briefcase, GraduationCap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── Unified timeline entry type ────────────────────────────── */

interface TimelineEntry {
  id: string;
  type: "experience" | "education";
  title: string;
  subtitle: string;
  description: string;
  dateRange: string;
  location: string;
  tags?: string[];
  highlights?: string[];
}

function buildTimeline(): TimelineEntry[] {
  const expEntries: TimelineEntry[] = experiences.map((exp) => ({
    id: exp.id,
    type: "experience" as const,
    title: exp.role,
    subtitle: exp.company,
    description: exp.description,
    dateRange: `${exp.startDate} — ${exp.endDate}`,
    location: exp.location,
    tags: exp.techStack,
    highlights: exp.highlights,
  }));

  const eduEntries: TimelineEntry[] = education.map((edu) => ({
    id: edu.id,
    type: "education" as const,
    title: `${edu.degree}${edu.field ? ` in ${edu.field}` : ""}`,
    subtitle: edu.institution,
    description: edu.gpa ? `GPA: ${edu.gpa}` : "",
    dateRange: `${edu.startDate} — ${edu.endDate}`,
    location: edu.location,
    highlights: edu.highlights,
  }));

  // Merge and sort by start date (most recent first)
  // For now, interleave experience and education
  return [...expEntries, ...eduEntries];
}

/* ── Main Timeline Component ────────────────────────────────── */

interface TimelineProps {
  className?: string;
}

export function Timeline({ className }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const entries = buildTimeline();

  // Scroll-driven line fill
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    gsap.set(line, { scaleY: 0, transformOrigin: "top center" });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 60%",
      end: "bottom 40%",
      onUpdate: (self) => {
        gsap.set(line, { scaleY: self.progress });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      id="experience"
      className={cn(
        "relative border-t border-[var(--color-border)]",
        className
      )}
    >
      <div className="section-container section-padding">
        {/* Header */}
        <div className="mb-12 flex items-center gap-4">
          <span className="text-label">04 — Experience</span>
          <div className="divider flex-1" />
        </div>

        <SectionReveal>
          <h2 className="mb-4 text-[var(--text-5xl)] font-medium tracking-[var(--tracking-tight)]">
            Where I&apos;ve Been
          </h2>
          <p className="mb-20 max-w-xl text-body">
            My professional journey and educational foundation.
          </p>
        </SectionReveal>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Timeline line — background */}
          <div className="absolute left-4 top-0 h-full w-px bg-[var(--color-border)] md:left-1/2 md:-translate-x-px" />

          {/* Timeline line — progress fill */}
          <div
            ref={lineRef}
            className="absolute left-4 top-0 h-full w-px bg-[var(--color-text-muted)] md:left-1/2 md:-translate-x-px"
            style={{ willChange: "transform" }}
          />

          {/* Entries */}
          <div className="relative flex flex-col gap-0">
            {entries.map((entry, i) => (
              <TimelineEntryItem
                key={entry.id}
                entry={entry}
                index={i}
                isLast={i === entries.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Individual Timeline Entry ──────────────────────────────── */

interface TimelineEntryItemProps {
  entry: TimelineEntry;
  index: number;
  isLast: boolean;
}

function TimelineEntryItem({ entry, index, isLast }: TimelineEntryItemProps) {
  const entryRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const entryEl = entryRef.current;
    const dot = dotRef.current;
    if (!entryEl || !dot) return;

    // Entry reveal
    gsap.set(entryEl, { opacity: 0, y: 30 });

    ScrollTrigger.create({
      trigger: entryEl,
      start: "top 80%",
      onEnter: () => {
        gsap.to(entryEl, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        });
      },
      once: true,
    });

    // Dot activation
    gsap.set(dot, { scale: 0, opacity: 0 });

    ScrollTrigger.create({
      trigger: entryEl,
      start: "top 75%",
      onEnter: () => {
        gsap.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(2)",
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === entryEl) t.kill();
      });
    };
  }, []);

  const Icon =
    entry.type === "experience" ? Briefcase : GraduationCap;

  return (
    <div
      ref={entryRef}
      className={cn(
        "relative grid items-start gap-8 pb-12",
        "md:grid-cols-2 md:gap-12"
      )}
    >
      {/* Timeline dot */}
      <div
        ref={dotRef}
        className={cn(
          "absolute left-4 top-1 z-20 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full",
          "border border-[var(--color-border)] bg-[var(--color-bg-primary)]",
          "md:left-1/2"
        )}
        style={{ willChange: "transform, opacity" }}
      >
        <Icon
          size={12}
          strokeWidth={1.5}
          className="text-[var(--color-text-tertiary)]"
        />
      </div>

      {/* Date — left on desktop, top on mobile */}
      <div
        className={cn(
          "pl-14 md:pl-0",
          isEven
            ? "md:text-right md:pr-12"
            : "md:order-2 md:text-left md:pl-12"
        )}
      >
        <p className="text-label mb-1">{entry.dateRange}</p>
        <p className="text-xs text-[var(--color-text-muted)]">
          {entry.location}
        </p>
      </div>

      {/* Content */}
      <div
        className={cn(
          "pl-14 md:pl-0",
          isEven
            ? "md:pl-12"
            : "md:order-1 md:text-right md:pr-12"
        )}
      >
        {/* Type badge */}
        <span className="mb-3 inline-block text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
          {entry.type === "experience" ? "Work" : "Education"}
        </span>

        <h3
          className={cn(
            "mb-1 text-[var(--text-xl)] font-medium text-[var(--color-text-primary)]",
            !isEven && "md:text-right"
          )}
        >
          {entry.title}
        </h3>

        <p
          className={cn(
            "mb-3 text-sm text-[var(--color-text-tertiary)]",
            !isEven && "md:text-right"
          )}
        >
          {entry.subtitle}
        </p>

        {entry.description && entry.description !== entry.title && (
          <p
            className={cn(
              "mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]",
              !isEven && "md:text-right"
            )}
          >
            {entry.description}
          </p>
        )}

        {/* Highlights */}
        {entry.highlights && entry.highlights.length > 0 && (
          <ul
            className={cn(
              "mb-4 flex flex-col gap-1.5",
              !isEven && "md:items-end"
            )}
          >
            {entry.highlights.map((highlight, hi) => (
              <li
                key={hi}
                className={cn(
                  "flex items-start gap-2 text-sm text-[var(--color-text-secondary)]",
                  !isEven && "md:flex-row-reverse"
                )}
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-text-muted)]" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech tags */}
        {entry.tags && entry.tags.length > 0 && (
          <div
            className={cn(
              "flex flex-wrap gap-2",
              !isEven && "md:justify-end"
            )}
          >
            {entry.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
