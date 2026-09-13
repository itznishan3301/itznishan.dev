"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

interface HeroAnimationProps {
  /** Container ref to scope animations */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Whether animations are enabled */
  enabled?: boolean;
}

/**
 * GSAP-powered cinematic entrance sequence for the hero.
 * Sequence: name reveal → portrait → tagline → CTAs → scroll indicator
 * All elements start hidden (CSS opacity:0, transform) and animate in.
 */
export function useHeroAnimation({
  containerRef,
  enabled = true,
}: HeroAnimationProps) {
  const timeline = useRef<gsap.core.Timeline | null>(null);

  const initAnimation = useCallback(() => {
    if (!containerRef.current || !enabled) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 1,
        },
      });

      // Phase 1: Name reveal — each line clips in from bottom
      tl.fromTo(
        ".hero-name .hero-name__line",
        {
          yPercent: 110,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: "expo.out",
        },
        0.3
      );

      // Phase 2: Portrait reveal — scale up from slightly smaller + fade
      tl.fromTo(
        ".hero-portrait",
        {
          scale: 0.92,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
        },
        0.5
      );

      // Phase 3: Label/tagline
      tl.fromTo(
        ".hero-label",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        0.8
      );

      tl.fromTo(
        ".hero-tagline",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        1.0
      );

      // Phase 4: CTAs — reveal the group container, then stagger children
      tl.fromTo(
        ".hero-cta-group",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
        },
        1.15
      );

      tl.fromTo(
        ".hero-cta",
        {
          y: 15,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
        },
        1.2
      );

      // Phase 5: Scroll indicator
      tl.fromTo(
        ".hero-scroll",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.6,
        },
        1.6
      );

      timeline.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, enabled]);

  useEffect(() => {
    const cleanup = initAnimation();
    return () => {
      cleanup?.();
      timeline.current?.kill();
    };
  }, [initAnimation]);

  return timeline;
}
