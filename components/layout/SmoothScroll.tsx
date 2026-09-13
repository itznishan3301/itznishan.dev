"use client";

import { useEffect, useRef, useCallback, type ReactNode } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Lenis smooth scroll provider integrated with GSAP ScrollTrigger.
 * - Syncs Lenis scroll events with ScrollTrigger
 * - Uses GSAP ticker for consistent animation timing
 * - Disables smooth scroll on mobile and reduced-motion
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);
  const isReducedMotion = useRef(false);
  const isMobile = useRef(false);

  useEffect(() => {
    isReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    isMobile.current =
      window.innerWidth < 768 ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
  }, []);

  // Sync Lenis with GSAP ScrollTrigger
  const onLenisScroll = useCallback(() => {
    ScrollTrigger.update();
  }, []);

  // GSAP ticker integration for smooth Lenis rAF sync
  useEffect(() => {
    if (isReducedMotion.current) return;

    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    lenis.on("scroll", onLenisScroll);

    const gsapTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(gsapTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(gsapTicker);
    };
  }, [onLenisScroll]);

  // Disable smooth scroll for reduced motion or mobile
  const shouldSmooth = !isReducedMotion.current && !isMobile.current;

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        smoothWheel: shouldSmooth,
        touchMultiplier: 1.5,
        infinite: false,
        syncTouch: false,
        lerp: 0.1,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
}
