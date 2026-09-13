import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP animation presets for the interaction engine.
 * Replaces the dead Framer Motion presets.
 */

export const EASE = {
  outExpo: "expo.out",
  outQuart: "power4.out",
  outCubic: "power3.out",
  inOutCubic: "power3.inOut",
  outBack: "back.out(1.4)",
  outElastic: "elastic.out(1, 0.5)",
  cinematic: "power2.out",
  smooth: "power3.out",
  linear: "none",
} as const;

export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  cinematic: 1.2,
  reveal: 0.8,
  transition: 0.5,
} as const;

/**
 * Reveal from below with fade.
 */
export function revealUp(
  element: HTMLElement | HTMLElement[],
  config?: { delay?: number; duration?: number; distance?: number }
) {
  const els = Array.isArray(element) ? element : [element];
  const distance = config?.distance ?? 40;

  return gsap.fromTo(
    els,
    { opacity: 0, y: distance },
    {
      opacity: 1,
      y: 0,
      duration: config?.duration ?? DURATION.reveal,
      delay: config?.delay ?? 0,
      ease: EASE.outCubic,
      stagger: 0.08,
    }
  );
}

/**
 * Masked clip-path reveal (wipe from bottom).
 */
export function maskReveal(
  element: HTMLElement | HTMLElement[],
  config?: { delay?: number; duration?: number; direction?: "up" | "down" | "left" | "right" }
) {
  const els = Array.isArray(element) ? element : [element];
  const dir = config?.direction || "up";

  const clipPaths: Record<string, { from: string; to: string }> = {
    up: { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },
    down: { from: "inset(0 0 100% 0)", to: "inset(0 0 0% 0)" },
    left: { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },
    right: { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" },
  };

  const clip = clipPaths[dir];

  gsap.set(els, { clipPath: clip.from });

  return gsap.to(els, {
    clipPath: clip.to,
    duration: config?.duration ?? DURATION.reveal,
    delay: config?.delay ?? 0,
    ease: EASE.outCubic,
    stagger: 0.1,
  });
}

/**
 * Scale reveal — starts small, scales to full.
 */
export function scaleReveal(
  element: HTMLElement | HTMLElement[],
  config?: { delay?: number; duration?: number; fromScale?: number }
) {
  const els = Array.isArray(element) ? element : [element];

  return gsap.fromTo(
    els,
    { opacity: 0, scale: config?.fromScale ?? 0.92 },
    {
      opacity: 1,
      scale: 1,
      duration: config?.duration ?? DURATION.slow,
      delay: config?.delay ?? 0,
      ease: EASE.outCubic,
    }
  );
}

/**
 * Stagger children reveal.
 */
export function staggerReveal(
  parent: HTMLElement,
  childSelector: string,
  config?: { delay?: number; stagger?: number; distance?: number }
) {
  const children = parent.querySelectorAll(childSelector);
  const distance = config?.distance ?? 30;

  gsap.set(children, { opacity: 0, y: distance });

  return gsap.to(children, {
    opacity: 1,
    y: 0,
    duration: DURATION.reveal,
    delay: config?.delay ?? 0,
    stagger: config?.stagger ?? 0.08,
    ease: EASE.outCubic,
  });
}
