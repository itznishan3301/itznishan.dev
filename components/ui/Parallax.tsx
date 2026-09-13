"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils/cn";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Speed multiplier. Negative = moves opposite to scroll. Range: -1 to 1 */
  speed?: number;
  /** Direction of parallax movement */
  direction?: "vertical" | "horizontal";
  /** ScrollTrigger start */
  start?: string;
  /** ScrollTrigger end */
  end?: string;
}

/**
 * Reusable scroll-linked parallax wrapper.
 * Moves children at a different rate than scroll to create depth.
 */
export function Parallax({
  children,
  className,
  speed = -0.3,
  direction = "vertical",
  start = "top bottom",
  end = "bottom top",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const axis = direction === "vertical" ? "y" : "x";
    const distance = speed * 200;

    const tween = gsap.to(el, {
      [axis]: distance,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, direction, start, end]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
