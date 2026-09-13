"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Animation delay in seconds */
  delay?: number;
  /** Animation direction */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Distance to travel in pixels */
  distance?: number;
  /** Trigger once only */
  once?: boolean;
  /** Threshold for intersection (0-1) */
  threshold?: number;
}

const directionMap = {
  up: (d: number) => ({ transform: `translateY(${d}px)` }),
  down: (d: number) => ({ transform: `translateY(-${d}px)` }),
  left: (d: number) => ({ transform: `translateX(${d}px)` }),
  right: (d: number) => ({ transform: `translateX(-${d}px)` }),
  none: () => ({ transform: "none" }),
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 30,
  once = true,
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const initialStyles = directionMap[direction](distance);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0, 0)" : initialStyles.transform,
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay * 1000}ms`,
      }}
    >
      {children}
    </div>
  );
}
