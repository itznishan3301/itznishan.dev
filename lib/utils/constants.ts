export const SITE_CONFIG = {
  name: "Nuruzzaman Nishan",
  title: "Nuruzzaman Nishan — AI-Driven Developer",
  description: "AI-driven developer building modern web experiences, intelligent products and experimental technology. Portfolio of Nuruzzaman Nishan.",
  url: "https://itznishan.dev",
  ogImage: "/images/og.jpg",
  email: "TODO_PROFILE_EMAIL",
  keywords: [
    "AI-driven developer",
    "full-stack developer",
    "web development",
    "Next.js developer",
    "React developer",
    "TypeScript",
    "AI-native development",
    "portfolio",
    "developer",
  ],
} as const;

export const NAVIGATION_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
] as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  cinematic: 1.2,
} as const;

export const ANIMATION_EASE = {
  default: "power2.out",
  smooth: "power3.out",
  bounce: "back.out(1.7)",
  elastic: "elastic.out(1, 0.3)",
  expo: "expo.out",
} as const;
