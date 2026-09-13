"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personal } from "@/data/personal";
import { SectionReveal } from "@/components/ui/SectionReveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * Editorial About experience with scroll-driven reveals.
 * Multi-layered: opening statement → bio → approach → closing.
 */
export function AboutExperience() {
  return (
    <section id="about" className="relative border-t border-[var(--color-border)]">
      {/* ── Opening Statement ───────────────────────────────── */}
      <div className="section-container section-padding">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-label">01 — About</span>
          <div className="divider flex-1" />
        </div>

        <ScrollStatement text={personal.about.opening} />
      </div>

      {/* ── Bio: Who I Am ───────────────────────────────────── */}
      <div className="section-container pb-[var(--section-padding)]">
        <div className="grid items-start gap-12 lg:grid-cols-[0.35fr_1fr] lg:gap-20">
          <SectionReveal>
            <h3 className="text-[var(--text-xl)] font-medium text-[var(--color-text-primary)]">
              Who I Am
            </h3>
          </SectionReveal>

          <div className="flex flex-col gap-8">
            {personal.about.bio.map((paragraph, i) => (
              <SectionReveal key={i} delay={i * 0.12}>
                <p className="text-[var(--text-xl)] leading-[var(--leading-relaxed)] text-[var(--color-text-secondary)]">
                  {paragraph}
                </p>
              </SectionReveal>
            ))}

            <SectionReveal delay={0.25}>
              <div className="mt-2 flex flex-wrap gap-3">
                <span className="badge">{personal.location}</span>
                <span className="badge">{personal.availability}</span>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>

      {/* ── Approach: How I Work ────────────────────────────── */}
      <div className="border-t border-[var(--color-border)]">
        <div className="section-container section-padding">
          <div className="grid items-start gap-12 lg:grid-cols-[0.35fr_1fr] lg:gap-20">
            <SectionReveal>
              <h3 className="text-[var(--text-xl)] font-medium text-[var(--color-text-primary)]">
                How I Work
              </h3>
            </SectionReveal>

            <div className="flex flex-col gap-0">
              {personal.about.approach.map((point, i) => (
                <SectionReveal key={i} delay={i * 0.1}>
                  <ApproachItem index={i + 1} text={point} />
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Closing Statement ───────────────────────────────── */}
      <div className="border-t border-[var(--color-border)]">
        <div className="section-container section-padding">
          <ScrollClosingStatement text={personal.about.closing} />
        </div>
      </div>
    </section>
  );
}

/* ── Opening scroll statement ──────────────────────────────── */

function ScrollStatement({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    // Split text into words for per-word reveal
    const words = text.split(" ");
    textEl.innerHTML = words
      .map(
        (word) =>
          `<span class="scroll-word inline-block"><span class="scroll-word__inner inline-block">${word}</span></span>`
      )
      .join(" ");

    const wordEls = textEl.querySelectorAll(".scroll-word__inner");

    gsap.set(wordEls, { opacity: 0.12, y: 0 });

    ScrollTrigger.create({
      trigger: container,
      start: "top 70%",
      end: "bottom 30%",
      onUpdate: (self) => {
        const progress = self.progress;
        wordEls.forEach((el, i) => {
          const wordProgress = i / wordEls.length;
          const visibility = gsap.utils.clamp(
            0,
            1,
            (progress - wordProgress * 0.6) / 0.4
          );
          gsap.set(el, {
            opacity: gsap.utils.interpolate(0.12, 1, visibility),
          });
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill();
      });
    };
  }, [text]);

  return (
    <div ref={containerRef} className="max-w-5xl">
      <h2
        ref={textRef}
        className="text-[var(--text-6xl)] font-medium leading-[1.15] tracking-[var(--tracking-tight)] text-[var(--color-text-primary)]"
        aria-label={text}
      >
        {text}
      </h2>
    </div>
  );
}

/* ── Approach item ─────────────────────────────────────────── */

function ApproachItem({ index, text }: { index: number; text: string }) {
  return (
    <div className="group flex items-start gap-6 border-t border-[var(--color-border)] py-7 transition-colors hover:border-[var(--color-border-hover)]">
      <span className="font-mono text-xs tracking-widest text-[var(--color-text-muted)] tabular-nums">
        {String(index).padStart(2, "0")}
      </span>
      <p className="text-[var(--text-lg)] leading-[var(--leading-relaxed)] text-[var(--color-text-secondary)] transition-colors group-hover:text-[var(--color-text-primary)]">
        {text}
      </p>
    </div>
  );
}

/* ── Closing scroll statement ──────────────────────────────── */

function ScrollClosingStatement({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    gsap.set(textEl, { opacity: 0.1 });

    ScrollTrigger.create({
      trigger: container,
      start: "top 75%",
      end: "center center",
      onUpdate: (self) => {
        const opacity = gsap.utils.interpolate(0.1, 1, self.progress);
        gsap.set(textEl, { opacity });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill();
      });
    };
  }, [text]);

  return (
    <div ref={containerRef} className="text-center">
      <p className="text-label mb-8">What Drives Me</p>
      <p
        ref={textRef}
        className="mx-auto max-w-3xl text-[var(--text-4xl)] font-medium leading-[1.2] tracking-[var(--tracking-tight)] text-[var(--color-text-primary)]"
      >
        {text}
      </p>
    </div>
  );
}
