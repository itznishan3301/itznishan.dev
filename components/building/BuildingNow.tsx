"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { cn } from "@/lib/utils/cn";

gsap.registerPlugin(ScrollTrigger);

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
    name: "[ADD PROJECT OR TOPIC]",
    description: "[ADD WHAT YOU ARE EXPLORING OR BUILDING — e.g. Exploring WebGL shaders for generative art]",
    status: "exploring",
    tags: ["[TECH1]", "[TECH2]"],
  },
  {
    id: "item-2",
    name: "[ADD PROJECT OR TOPIC]",
    description: "[ADD WHAT YOU ARE EXPLORING OR BUILDING — e.g. Building a design system component library]",
    status: "building",
    tags: ["[TECH1]"],
  },
  {
    id: "item-3",
    name: "[ADD PROJECT OR TOPIC]",
    description: "[ADD WHAT YOU ARE EXPLORING OR BUILDING — e.g. Experimenting with server-side rendering patterns]",
    status: "experimenting",
    tags: ["[TECH1]", "[TECH2]"],
  },
  {
    id: "item-4",
    name: "[ADD LEARNING TOPIC]",
    description: "[ADD WHAT YOU ARE LEARNING — e.g. Studying advanced animation techniques with GSAP]",
    status: "learning",
    tags: ["[TECH1]"],
  },
];

const statusConfig: Record<
  BuildingItem["status"],
  { label: string; color: string; pulse: boolean }
> = {
  exploring: {
    label: "Exploring",
    color: "bg-amber-500/60",
    pulse: false,
  },
  building: {
    label: "Building",
    color: "bg-emerald-500/60",
    pulse: true,
  },
  experimenting: {
    label: "Experimenting",
    color: "bg-sky-500/60",
    pulse: false,
  },
  learning: {
    label: "Learning",
    color: "bg-violet-500/60",
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
        <div className="grid gap-4 sm:grid-cols-2">
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
  const nodeRef = useRef<HTMLDivElement>(null);
  const status = statusConfig[item.status];

  // Subtle entrance animation
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const node = nodeRef.current;
    if (!node) return;

    const handleEnter = () => {
      gsap.to(node, {
        borderColor: "rgba(240, 236, 228, 0.15)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(node, {
        borderColor: "rgba(240, 236, 228, 0.08)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    node.addEventListener("mouseenter", handleEnter);
    node.addEventListener("mouseleave", handleLeave);

    return () => {
      node.removeEventListener("mouseenter", handleEnter);
      node.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={nodeRef}
      className={cn(
        "group relative border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5",
        "transition-colors duration-300",
        "hover:bg-[var(--color-bg-tertiary)]"
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
