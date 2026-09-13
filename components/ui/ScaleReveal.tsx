"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";

gsap.registerPlugin(ScrollTrigger);

interface ScaleRevealProps {
  children: ReactNode;
  className?: string;
  /** Starting scale (0-1) */
  fromScale?: number;
  /** Animation duration */
  duration?: number;
  /** ScrollTrigger start */
  start?: string;
  /** Scrub with scroll */
  scrub?: boolean;
  /** Animate only once */
  once?: boolean;
}

/**
 * Scale-based reveal — element grows from a smaller size into view.
 * For image expansions, card reveals, etc.
 */
export function ScaleReveal({
  children,
  className,
  fromScale = 0.85,
  duration = 1,
  start = "top 85%",
  scrub = false,
  once = true,
}: ScaleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    gsap.set(el, { opacity: 0, scale: fromScale });

    if (scrub) {
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start,
          end: "top 30%",
          scrub: 1,
        },
      });
    } else {
      ScrollTrigger.create({
        trigger: el,
        start,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            scale: 1,
            duration,
            ease: "power3.out",
          });
        },
        once,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [fromScale, duration, start, scrub, once]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
