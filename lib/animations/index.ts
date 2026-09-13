import { prefersReducedMotion } from "@/lib/utils/device";

export const REVEAL_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: prefersReducedMotion() ? 0 : 0.1,
      delayChildren: 0.1,
    },
  },
};

export const STAGGER_CHILD = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.6,
    },
  },
};

export const SCALE_IN = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const SLIDE_UP = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
