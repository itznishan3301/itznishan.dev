"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";

gsap.registerPlugin(ScrollTrigger);

type MaskDirection = "up" | "down" | "left" | "right";

interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  /** Direction of the mask wipe */
  direction?: MaskDirection;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
  /** ScrollTrigger start position */
  start?: string;
  /** Whether to animate only once */
  once?: boolean;
}

const CLIP_PATHS: Record<MaskDirection, { from: string; to: string }> = {
  up: { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },
  down: { from: "inset(0 0 100% 0)", to: "inset(0 0 0% 0)" },
  left: { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },
  right: { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" },
};

/**
 * Clip-path mask reveal triggered by scroll.
 * Creates a wipe/expand effect as the element enters the viewport.
 */
export function MaskReveal({
  children,
  className,
  direction = "up",
  duration = 0.9,
  delay = 0,
  start = "top 85%",
  once = true,
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const clips = CLIP_PATHS[direction];

    gsap.set(el, { clipPath: clips.from });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      onEnter: () => {
        gsap.to(el, {
          clipPath: clips.to,
          duration,
          delay,
          ease: "power3.out",
          onComplete: once ? () => trigger.kill() : undefined,
        });
      },
      onLeaveBack: once
        ? undefined
        : () => {
            gsap.set(el, { clipPath: clips.from });
          },
    });

    return () => trigger.kill();
  }, [direction, duration, delay, start, once]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
