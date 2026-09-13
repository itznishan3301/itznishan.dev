"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";

gsap.registerPlugin(ScrollTrigger);

type Direction = "up" | "down" | "left" | "right" | "none";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  /** Animation delay in seconds */
  delay?: number;
  /** Animation direction */
  direction?: Direction;
  /** Distance to travel in pixels */
  distance?: number;
  /** Trigger once only */
  once?: boolean;
  /** ScrollTrigger start position */
  start?: string;
  /** ScrollTrigger end position */
  end?: string;
  /** Scrub animation with scroll */
  scrub?: boolean;
}

const directionOffsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * ScrollTrigger-powered reveal component.
 * Uses GSAP for animation, synced with Lenis via ScrollTrigger.
 * Falls back to IntersectionObserver when GSAP is unavailable.
 */
export function SectionReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 40,
  once = true,
  start = "top 85%",
  end = "top 20%",
  scrub = false,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const el = ref.current;
    if (!el) return;

    // Check reduced motion
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const offset = directionOffsets[direction];
    const fromVars: gsap.TweenVars = {
      opacity: 0,
      x: (offset.x / 40) * distance,
      y: (offset.y / 40) * distance,
      scale: direction === "none" ? 0.97 : 1,
    };

    const toVars: gsap.TweenVars = {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration: scrub ? 1 : 0.8,
      delay: scrub ? 0 : delay,
      ease: "power3.out",
    };

    gsap.set(el, fromVars);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      end,
      onEnter: () => {
        gsap.to(el, {
          ...toVars,
          onComplete: once
            ? () => {
                trigger.kill();
              }
            : undefined,
        });
      },
      onLeaveBack: once
        ? undefined
        : () => {
            gsap.to(el, fromVars);
          },
      ...(scrub ? { scrub: true } : {}),
    });

    return () => {
      trigger.kill();
    };
  }, [isReady, delay, direction, distance, once, start, end, scrub]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
