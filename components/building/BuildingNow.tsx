"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { cn } from "@/lib/utils/cn";

/* ── Building item data ─────────────────────────────────────── */

interface BuildingItem {
  id: string;
  name: string;
  description: string;
  status: "exploring" | "building" | "experimenting" | "learning";
  tags: string[];
}

const buildingItems: BuildingItem[] = [
  {
    id: "item-1",
    name: "AI-Driven Full-Stack Engineering",
    description: "Developing modern web applications using AI-native development workflows — AI-assisted coding, debugging, review and refactoring as core engineering practice.",
    status: "building",
    tags: ["Next.js", "TypeScript", "AI Workflows"],
  },
  {
    id: "item-2",
    name: "AsyncTechBD — 3D Printing & Maker Tech",
    description: "Building an independent maker technology project exploring product development from digital design to physical manufacturing using CAD, AI-assisted 3D modeling and 3D printing.",
    status: "building",
    tags: ["3D Printing", "Fusion 360", "Meshy AI"],
  },
  {
    id: "item-3",
    name: "Interactive 3D Web Experiences",
    description: "Experimenting with Three.js, React Three Fiber and GSAP to build immersive interactive web experiences that push the boundaries of frontend development.",
    status: "experimenting",
    tags: ["Three.js", "R3F", "GSAP"],
  },
  {
    id: "item-4",
    name: "Programming Hero — Web Development",
    description: "Currently completing the full-stack web development curriculum covering React, Next.js, Node.js, MongoDB, authentication, deployment and AI-native workflows.",
    status: "learning",
    tags: ["React", "Node.js", "MongoDB"],
  },
];

const statusConfig: Record<
  BuildingItem["status"],
  { label: string; color: string; pulse: boolean }
> = {
  exploring: {
    label: "Exploring",
    color: "bg-[#c9a96e]/60",
    pulse: false,
  },
  building: {
    label: "Building",
    color: "bg-[#7a9e7e]/60",
    pulse: true,
  },
  experimenting: {
    label: "Experimenting",
    color: "bg-[#7a8fa0]/60",
    pulse: false,
  },
  learning: {
    label: "Learning",
    color: "bg-[#9a8ab0]/60",
    pulse: false,
  },
};

/* ── Main Component ─────────────────────────────────────────── */

interface BuildingNowProps {
  className?: string;
}

export function BuildingNow({ className }: BuildingNowProps) {
  return (
    <section
      id="building"
      className={cn(
        "relative border-t border-[var(--color-border)]",
        className
      )}
    >
      <div className="section-container section-padding">
        {/* Header */}
        <div className="mb-12 flex items-center gap-4">
          <span className="text-label">05 — Now</span>
          <div className="divider flex-1" />
        </div>

        <SectionReveal>
          <h2 className="mb-4 text-[var(--text-5xl)] font-medium tracking-[var(--tracking-tight)]">
            Currently Building
          </h2>
          <p className="mb-16 max-w-xl text-body">
            What I&apos;m exploring, building, and learning right now.
          </p>
        </SectionReveal>

        {/* Workspace grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {buildingItems.map((item, i) => (
            <SectionReveal key={item.id} delay={i * 0.08}>
              <WorkspaceNode item={item} />
            </SectionReveal>
          ))}
        </div>

        {/* Status legend */}
        <SectionReveal delay={0.4}>
          <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-[var(--color-border)] pt-8">
            {Object.entries(statusConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-block h-1.5 w-1.5 rounded-full",
                    config.color
                  )}
                />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
                  {config.label}
                </span>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ── Workspace Node ─────────────────────────────────────────── */

function WorkspaceNode({ item }: { item: BuildingItem }) {
  const status = statusConfig[item.status];

  return (
    <div
      className={cn(
        "group relative border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5",
        "transition-colors duration-300",
        "hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-tertiary)]"
      )}
    >
      {/* Status indicator */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            {status.pulse && (
              <span
                className={cn(
                  "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                  status.color
                )}
              />
            )}
            <span
              className={cn(
                "relative inline-flex h-2 w-2 rounded-full",
                status.color
              )}
            />
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
            {status.label}
          </span>
        </div>

        {/* Decorative terminal-style dots */}
        <div className="flex items-center gap-1 opacity-30">
          <span className="h-1 w-1 rounded-full bg-[var(--color-text-muted)]" />
          <span className="h-1 w-1 rounded-full bg-[var(--color-text-muted)]" />
          <span className="h-1 w-1 rounded-full bg-[var(--color-text-muted)]" />
        </div>
      </div>

      {/* Name */}
      <h4 className="mb-2 text-[var(--text-lg)] font-medium text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-accent-hover)]">
        {item.name}
      </h4>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {item.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Decorative corner accent */}
      <div className="absolute right-0 top-0 h-6 w-6 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute right-0 top-0 h-px w-4 bg-[var(--color-text-muted)]" />
        <div className="absolute right-0 top-0 h-4 w-px bg-[var(--color-text-muted)]" />
      </div>
    </div>
  );
}
