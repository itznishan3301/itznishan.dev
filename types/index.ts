import type { ReactNode } from "react";

export interface ChildrenProps {
  children: ReactNode;
}

export interface ClassNameProps {
  className?: string;
}

export interface SectionProps extends ChildrenProps, ClassNameProps {
  id?: string;
}

export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

export interface MousePosition {
  x: number;
  y: number;
}

export interface ScrollProgress {
  progress: number;
  direction: "up" | "down";
}

export interface ViewportSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// Next.js 16 typed routes — LayoutProps and PageProps are auto-provided
// Use them via: export default function Page(props: PageProps<"/path">)
