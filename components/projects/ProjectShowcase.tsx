"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featuredProjects, type Project } from "@/data/projects";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { TextLink } from "@/components/ui/TextLink";
import { cn } from "@/lib/utils/cn";


gsap.registerPlugin(ScrollTrigger);

interface ProjectShowcaseProps {
  className?: string;
}

export function ProjectShowcase({ className }: ProjectShowcaseProps) {
  return (
    <section
      id="projects"
      className={cn(
        "relative border-t border-[var(--color-border)]",
        className
      )}
    >
      {/* Header */}
      <div className="section-container section-padding pb-8">
        <div className="mb-12 flex items-center gap-4">
          <span className="text-label">03 — Projects</span>
          <div className="divider flex-1" />
        </div>

        <SectionReveal>
          <h2 className="mb-4 text-[var(--text-5xl)] font-medium tracking-[var(--tracking-tight)]">
            Selected Work
          </h2>
          <p className="max-w-xl text-body">
            A selection of projects that demonstrate my approach to solving real
            problems with technology.
          </p>
        </SectionReveal>
      </div>

      {/* Project entries */}
      <div className="flex flex-col">
        {featuredProjects.map((project, index) => (
          <ProjectEntry
            key={project.id}
            project={project}
            index={index}
            reversed={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
}

/* ── Individual project entry with scroll-driven animation ── */

interface ProjectEntryProps {
  project: Project;
  index: number;
  reversed: boolean;
}

function ProjectEntry({ project, index, reversed }: ProjectEntryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const container = containerRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!container || !image || !content) return;

    // Image entrance with scale and parallax
    gsap.set(image, { opacity: 0, scale: 0.95, y: 30 });

    const imageTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      onEnter: () => {
        gsap.to(image, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        });
      },
      once: true,
    });

    // Content stagger reveal
    const contentEls = content.querySelectorAll(".project-reveal");
    gsap.set(contentEls, { opacity: 0, y: 25 });

    const contentTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top 70%",
      onEnter: () => {
        gsap.to(contentEls, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        });
      },
      once: true,
    });

    // Subtle parallax on image while scrolling through
    const parallaxTrigger = gsap.to(image, {
      y: -30,
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      imageTrigger.kill();
      contentTrigger.kill();
      parallaxTrigger.scrollTrigger?.kill();
    };
  }, []);

  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      ref={containerRef}
      className="border-t border-[var(--color-border)]"
    >
      <div className="section-container section-padding">
        <div
          className={cn(
            "grid items-center gap-10 lg:gap-16",
            reversed
              ? "lg:grid-cols-[1fr_0.85fr]"
              : "lg:grid-cols-[0.85fr_1fr]"
          )}
        >
          {/* Image */}
          <div
            ref={imageRef}
            className={cn(
              "relative overflow-hidden",
              reversed && "lg:order-2"
            )}
          >
            <div
              className="project-image group relative aspect-[16/10] w-full cursor-pointer overflow-hidden"
              data-cursor="view"
            >
              {/* Placeholder / background */}
              <div className="absolute inset-0 bg-[var(--color-bg-tertiary)]" />

              {/* Project image */}
              <img
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                className="relative z-10 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 z-20 bg-[var(--color-bg-primary)]/0 transition-colors duration-500 group-hover:bg-[var(--color-bg-primary)]/10" />

              {/* Project number */}
              <span className="absolute left-4 top-4 z-30 font-mono text-xs tracking-widest text-[var(--color-text-muted)]">
                {projectNumber}
              </span>

              {/* Border frame */}
              <div className="absolute inset-0 z-30 border border-[var(--color-border)] transition-colors duration-300 group-hover:border-[var(--color-border-hover)]" />
            </div>
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className={cn(
              "flex flex-col",
              reversed && "lg:order-1"
            )}
          >
            {/* Year + Role */}
            <div className="project-reveal mb-4 flex items-center gap-3">
              <span className="text-label">{project.year}</span>
              {project.role && (
                <>
                  <span className="text-[var(--color-text-muted)]">·</span>
                  <span className="text-xs text-[var(--color-text-tertiary)]">
                    {project.role}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h3 className="project-reveal mb-5 text-[var(--text-4xl)] font-medium leading-tight tracking-[var(--tracking-tight)]">
              {project.title}
            </h3>

            {/* Description */}
            <p className="project-reveal mb-6 max-w-lg text-[var(--text-lg)] leading-relaxed text-[var(--color-text-secondary)]">
              {project.description}
            </p>

            {/* Problem / Solution — if provided */}
            {(project.problem || project.solution) && (
              <div className="project-reveal mb-6 flex flex-col gap-4 border-l border-[var(--color-border)] pl-5">
                {project.problem && (
                  <div>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                      Problem
                    </p>
                    <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {project.problem}
                    </p>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                      Solution
                    </p>
                    <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Tech stack */}
            <div className="project-reveal mb-8 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="project-reveal flex items-center gap-5">
              {project.liveUrl && (
                <TextLink href={project.liveUrl} external>
                  Live Site
                </TextLink>
              )}
              {project.githubUrl && (
                <TextLink href={project.githubUrl} external>
                  Source
                </TextLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
