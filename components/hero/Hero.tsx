"use client";

import { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { personal } from "@/data/personal";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroPortrait } from "./HeroPortrait";
import { ScrollIndicator } from "./ScrollIndicator";
import { useHeroAnimation } from "./HeroAnimation";

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Add animation class on mount (CSS hides elements, GSAP reveals them)
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!reducedMotion && containerRef.current) {
      containerRef.current.classList.add("hero-animate");
    }
  }, []);

  // GSAP entrance animation — respects prefers-reduced-motion
  useHeroAnimation({ containerRef });

  return (
    <section
      id="hero"
      ref={containerRef}
      className={cn(
        "hero relative flex min-h-screen w-full items-center overflow-hidden",
        className
      )}
    >
      {/* Background gradient — subtle atmospheric depth */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 70% 40%, rgba(240, 236, 228, 0.015) 0%, transparent 60%),
            radial-gradient(ellipse 50% 80% at 20% 80%, rgba(155, 151, 142, 0.02) 0%, transparent 50%)
          `,
        }}
      />

      {/* Main content grid */}
      <div className="section-container relative z-10 w-full">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.55fr] lg:gap-12 xl:gap-20">
          {/* Left: Typography */}
          <div className="order-2 flex flex-col lg:order-1">
            {/* Label */}
            <p className="hero-label mb-5 text-label">
              {personal.title}
            </p>

            {/* Name — split into lines for per-line animation */}
            <div className="hero-name overflow-hidden" aria-label={personal.name}>
              <h1 className="text-[var(--text-8xl)] font-medium leading-[0.95] tracking-[var(--tracking-tighter)]">
                <span className="hero-name__line block">
                  {personal.firstName}
                </span>
                <span className="hero-name__line block">
                  {personal.lastName}
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <p className="hero-tagline mt-6 max-w-xl text-body-large lg:mt-8">
              {personal.tagline}
            </p>

            {/* CTAs */}
            <div className="hero-cta-group mt-10 flex flex-wrap items-center gap-4 lg:mt-12">
              <div className="hero-cta">
                <MagneticButton>
                  <Button
                    href="#projects"
                    variant="primary"
                    icon={<ArrowUpRight size={16} strokeWidth={1.5} />}
                    aria-label="View my work"
                  >
                    View My Work
                  </Button>
                </MagneticButton>
              </div>

              <div className="hero-cta">
                <MagneticButton>
                  <Button
                    href={personal.resumePath}
                    variant="outline"
                    aria-label="Download CV as PDF"
                  >
                    Download CV
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Right: Portrait */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <HeroPortrait className="aspect-[3/4] w-[260px] sm:w-[300px] md:w-[340px] lg:max-w-[420px]" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-8 left-0 lg:bottom-12">
          <div className="section-container">
            <ScrollIndicator />
          </div>
        </div>
      </div>
    </section>
  );
}
