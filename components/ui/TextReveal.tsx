"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { cn } from "@/lib/utils/cn";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  /** Split mode: by words, lines, or characters */
  splitBy?: "words" | "lines" | "chars";
  /** Stagger delay between split elements */
  stagger?: number;
  /** Animation duration */
  duration?: number;
  /** ScrollTrigger start */
  start?: string;
  /** Animate only once */
  once?: boolean;
  /** Use as scrub animation (linked to scroll position) */
  scrub?: boolean;
}

/**
 * Typography choreography component.
 * Splits text into animatable units and reveals them with stagger.
 */
export function TextReveal({
  children,
  className,
  splitBy = "words",
  stagger = 0.06,
  duration = 0.7,
  start = "top 85%",
  once = true,
  scrub = false,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const split = new SplitType(el, {
      types: splitBy === "words" ? "words" : splitBy === "chars" ? "chars" : "lines",
      tagName: "span",
    });

    const targets =
      splitBy === "words"
        ? split.words
        : splitBy === "chars"
          ? split.chars
          : split.lines;

    if (!targets) return;

    // Wrap each target for clip animation
    targets.forEach((target) => {
      const wrapper = document.createElement("span");
      wrapper.style.display = "inline-block";
      wrapper.style.overflow = "hidden";
      wrapper.style.verticalAlign = "top";
      target.parentNode?.insertBefore(wrapper, target);
      wrapper.appendChild(target);
      target.style.display = "inline-block";
    });

    gsap.set(targets, { y: "110%", opacity: 0 });

    if (scrub) {
      gsap.to(targets, {
        y: "0%",
        opacity: 1,
        ease: "none",
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          start,
          end: "bottom 40%",
          scrub: 1,
        },
      });
    } else {
      ScrollTrigger.create({
        trigger: el,
        start,
        onEnter: () => {
          gsap.to(targets, {
            y: "0%",
            opacity: 1,
            duration,
            stagger,
            ease: "power3.out",
            onComplete: once ? undefined : undefined,
          });
        },
        once,
      });
    }

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [splitBy, stagger, duration, start, once, scrub]);

  return (
    <div ref={ref} className={cn("text-reveal", className)}>
      {children}
    </div>
  );
}
