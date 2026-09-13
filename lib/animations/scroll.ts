import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Create a scroll-linked progress animation on a DOM element.
 * Returns a cleanup function.
 */
export function createScrollProgress(
  element: HTMLElement,
  config: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    onProgress?: (progress: number) => void;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
  }
) {
  const trigger = ScrollTrigger.create({
    trigger: element,
    start: config.start || "top bottom",
    end: config.end || "bottom top",
    scrub: config.scrub ?? false,
    onUpdate: config.onProgress ? (self) => config.onProgress!(self.progress) : undefined,
    onEnter: config.onEnter,
    onLeave: config.onLeave,
    onEnterBack: config.onEnterBack,
    onLeaveBack: config.onLeaveBack,
  });

  return () => trigger.kill();
}

/**
 * Apply a parallax effect to an element based on scroll progress.
 * Positive speed = element moves slower than scroll (appears behind).
 * Negative speed = element moves faster (appears in front).
 */
export function createParallax(
  element: HTMLElement,
  config: {
    speed?: number;
    direction?: "vertical" | "horizontal";
    start?: string;
    end?: string;
  }
) {
  const speed = config.speed ?? -0.3;
  const direction = config.direction || "vertical";
  const axis = direction === "vertical" ? "y" : "x";
  const distance = speed * 200;

  return gsap.to(element, {
    [axis]: distance,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: config.start || "top bottom",
      end: config.end || "bottom top",
      scrub: true,
    },
  });
}

/**
 * Pin an element while scrolling through a section.
 */
export function createPin(
  element: HTMLElement,
  config: {
    start?: string;
    end?: string;
    pinSpacing?: boolean;
  }
) {
  return ScrollTrigger.create({
    trigger: element,
    start: config.start || "top top",
    end: config.end || "+=100%",
    pin: true,
    pinSpacing: config.pinSpacing ?? true,
  });
}

/**
 * Create a scrub-linked animation that plays as user scrolls.
 */
export function createScrubAnimation(
  element: HTMLElement,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  config: {
    trigger?: HTMLElement;
    start?: string;
    end?: string;
  }
) {
  const trigger = config.trigger || element;

  gsap.set(element, fromVars);

  return gsap.to(element, {
    ...toVars,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: config.start || "top 80%",
      end: config.end || "top 20%",
      scrub: 1,
    },
  });
}
