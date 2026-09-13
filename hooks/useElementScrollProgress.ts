"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ElementScrollState {
  progress: number;
  isVisible: boolean;
  isInView: boolean;
}

/**
 * Per-element scroll progress hook.
 * Uses refs and GSAP ScrollTrigger — no React re-renders during scroll.
 * Calls onProgress callback with 0-1 progress value.
 */
export function useElementScrollProgress(
  onProgress?: (state: ElementScrollState) => void
) {
  const ref = useRef<HTMLDivElement>(null);
  const stateRef = useRef<ElementScrollState>({
    progress: 0,
    isVisible: false,
    isInView: false,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        stateRef.current.progress = self.progress;
        stateRef.current.isInView = self.isActive;
        onProgress?.(stateRef.current);
      },
      onEnter: () => {
        stateRef.current.isVisible = true;
        onProgress?.(stateRef.current);
      },
      onLeave: () => {
        stateRef.current.isVisible = false;
        onProgress?.(stateRef.current);
      },
      onEnterBack: () => {
        stateRef.current.isVisible = true;
        onProgress?.(stateRef.current);
      },
      onLeaveBack: () => {
        stateRef.current.isVisible = false;
        onProgress?.(stateRef.current);
      },
    });

    return () => trigger.kill();
  }, [onProgress]);

  return ref;
}

/**
 * Create a GSAP timeline that plays based on scroll progress.
 * The timeline is scrubbed — position maps directly to scroll progress.
 */
export function useScrubTimeline(
  buildTimeline: (tl: gsap.core.Timeline) => void,
  deps: unknown[] = []
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      },
    });

    buildTimeline(tl);
    timelineRef.current = tl;

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}
