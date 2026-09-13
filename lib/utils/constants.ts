export const SITE_CONFIG = {
  name: "Nuruzzaman Nishan",
  title: "Nuruzzaman Nishan — [ADD YOUR TITLE]",
  description: "[ADD SITE DESCRIPTION]",
  url: "https://itznishan.dev",
  ogImage: "/images/og.jpg",
  email: "[ADD YOUR EMAIL]",
  keywords: [
    "[KEYWORD1]",
    "[KEYWORD2]",
    "[KEYWORD3]",
    "[KEYWORD4]",
    "portfolio",
    "developer",
  ],
} as const;

export const NAVIGATION_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
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
