"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { skills, type SkillCategory, type Skill } from "@/data/skills";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { cn } from "@/lib/utils/cn";

// Deterministic pseudo-random from string seed
function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 1000) / 1000;
}

// Pre-computed constellation positions for each skill (desktop only)
function computePositions(
  categories: SkillCategory[]
): Array<{ skill: Skill; category: SkillCategory; x: number; y: number }> {
  const positions: Array<{
    skill: Skill;
    category: SkillCategory;
    x: number;
    y: number;
  }> = [];
  const allSkills = categories.flatMap((cat) =>
    cat.skills.map((skill) => ({ skill, category: cat }))
  );

  // Distribute in a loose orbital layout
  const total = allSkills.length;
  const centerX = 50;
  const centerY = 50;

  allSkills.forEach(({ skill, category }, i) => {
    const seed = `${category.id}-${skill.name}-${i}`;
    const r1 = seededRandom(seed);
    const r2 = seededRandom(seed + "y");
    const r3 = seededRandom(seed + "r");

    // Create clustered orbits per category
    const categoryIndex = categories.indexOf(category);
    const categoryAngle =
      (categoryIndex / categories.length) * Math.PI * 2 + Math.PI / 4;
    const angleSpread = 0.6;
    const angle =
      categoryAngle + (r1 - 0.5) * angleSpread;

    const baseRadius = 22 + r3 * 18;
    const x = centerX + Math.cos(angle) * baseRadius + (r2 - 0.5) * 8;
    const y = centerY + Math.sin(angle) * baseRadius + (r1 - 0.5) * 8;

    positions.push({ skill, category, x, y });
  });

  return positions;
}

interface TechConstellationProps {
  className?: string;
}

export function TechConstellation({ className }: TechConstellationProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [focusedSkill, setFocusedSkill] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Pre-compute positions
  const positioned = useMemo(() => computePositions(skills), []);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Mouse parallax for constellation layer
  useEffect(() => {
    if (isMobile) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const container = containerRef.current;
    const layer = parallaxRef.current;
    if (!container || !layer) return;

    let raf = 0;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      currentX += (mouseX - currentX) * 0.04;
      currentY += (mouseY - currentY) * 0.04;
      layer.style.transform = `translate(${currentX * 12}px, ${currentY * 12}px)`;
      raf = requestAnimationFrame(animate);
    };

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    raf = requestAnimationFrame(animate);
    container.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("mousemove", handleMove);
    };
  }, [isMobile]);

  const activeSkill = hoveredSkill || focusedSkill;

  // Category color mapping
  const categoryColors: Record<string, string> = {
    frontend: "var(--color-text-primary)",
    backend: "var(--color-text-secondary)",
    tools: "var(--color-text-tertiary)",
    other: "var(--color-text-muted)",
  };

  return (
    <section
      id="skills"
      className={cn(
        "relative border-t border-[var(--color-border)]",
        className
      )}
    >
      <div className="section-container section-padding">
        {/* Header */}
        <div className="mb-12 flex items-center gap-4">
          <span className="text-label">02 — Skills</span>
          <div className="divider flex-1" />
        </div>

        <SectionReveal>
          <h2 className="mb-4 text-[var(--text-5xl)] font-medium tracking-[var(--tracking-tight)]">
            What I Work With
          </h2>
          <p className="mb-16 max-w-xl text-body">
            The technologies and tools I use to build modern digital experiences.
          </p>
        </SectionReveal>

        {/* Category legend */}
        <SectionReveal delay={0.1}>
          <div className="mb-12 flex flex-wrap gap-6">
            {skills.map((cat) => (
              <div key={cat.id} className="flex items-center gap-2.5">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: categoryColors[cat.id] }}
                />
                <span className="text-xs tracking-wider text-[var(--color-text-tertiary)]">
                  {cat.category}
                </span>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* Desktop: Spatial constellation */}
        {!isMobile ? (
          <SectionReveal delay={0.2} direction="none">
            <div
              ref={containerRef}
              className="relative h-[500px] w-full lg:h-[550px]"
              role="list"
              aria-label="Technology constellation"
            >
              {/* Connecting lines (subtle) */}
              <svg
                className="pointer-events-none absolute inset-0 z-0 h-full w-full"
                aria-hidden="true"
              >
                {positioned.map((item, i) => {
                  // Connect to next item in same category
                  const nextInCategory = positioned
                    .slice(i + 1)
                    .find((p) => p.category.id === item.category.id);
                  if (!nextInCategory) return null;
                  return (
                    <line
                      key={`line-${i}`}
                      x1={`${item.x}%`}
                      y1={`${item.y}%`}
                      x2={`${nextInCategory.x}%`}
                      y2={`${nextInCategory.y}%`}
                      stroke="var(--color-border)"
                      strokeWidth="0.5"
                      opacity={activeSkill ? 0.03 : 0.15}
                      style={{ transition: "opacity 0.4s ease" }}
                    />
                  );
                })}
              </svg>

              {/* Parallax layer */}
              <div ref={parallaxRef} className="absolute inset-0 z-10">
                {positioned.map(
                  ({ skill, category, x, y }, i) => {
                    const id = `${category.id}-${skill.name}-${i}`;
                    const isActive = activeSkill === id;
                    const isDimmed =
                      activeSkill !== null && activeSkill !== id;

                    return (
                      <div
                        key={id}
                        role="button"
                        className={cn(
                          "absolute flex flex-col items-center gap-1.5",
                          "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          "outline-none",
                          "focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)]"
                        )}
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: `translate(-50%, -50%) scale(${isActive ? 1.2 : 1})`,
                          opacity: isDimmed ? 0.2 : 1,
                          zIndex: isActive ? 20 : 10,
                          willChange: "transform, opacity",
                        }}
                        tabIndex={0}
                        aria-label={`${skill.name} — ${category.category}`}
                        onMouseEnter={() => setHoveredSkill(id)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        onFocus={() => setFocusedSkill(id)}
                        onBlur={() => setFocusedSkill(null)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setFocusedSkill(focusedSkill === id ? null : id);
                          }
                        }}
                      >
                        {/* Node */}
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-full",
                            "border transition-all duration-300",
                            isActive
                              ? "border-[var(--color-text-primary)] bg-[var(--color-accent-muted)]"
                              : "border-[var(--color-border)] bg-[var(--color-bg-secondary)]"
                          )}
                        >
                          <span
                            className="font-mono text-[10px] font-medium uppercase tracking-wider"
                            style={{
                              color: categoryColors[category.id],
                            }}
                          >
                            {skill.name.slice(0, 2)}
                          </span>
                        </div>

                        {/* Label */}
                        <span
                          className={cn(
                            "whitespace-nowrap font-mono text-[10px] tracking-wider transition-all duration-300",
                            isActive
                              ? "text-[var(--color-text-primary)]"
                              : "text-[var(--color-text-muted)]"
                          )}
                        >
                          {skill.name}
                        </span>

                        {/* Description tooltip on hover */}
                        {isActive && category.description && (
                          <div className="absolute left-1/2 top-full z-30 mt-1 w-40 -translate-x-1/2 rounded border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-2 text-center">
                            <p className="text-[10px] leading-relaxed text-[var(--color-text-secondary)]">
                              {category.description}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </SectionReveal>
        ) : (
          /* Mobile: Simplified category grid */
          <div className="flex flex-col gap-8">
            {skills.map((category, ci) => (
              <SectionReveal key={category.id} delay={ci * 0.1}>
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: categoryColors[category.id],
                    }}
                  />
                  <h4 className="text-sm font-medium text-[var(--color-text-primary)]">
                    {category.category}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, si) => (
                    <span key={si} className="tag">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </SectionReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
