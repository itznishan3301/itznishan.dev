"use client";

import { ArrowDown } from "lucide-react";

interface ScrollIndicatorProps {
  targetId?: string;
  label?: string;
  className?: string;
}

export function ScrollIndicator({
  targetId = "about",
  label = "Scroll",
  className = "",
}: ScrollIndicatorProps) {
  return (
    <a
      href={`#${targetId}`}
      className={`hero-scroll inline-flex items-center gap-2.5 text-label transition-colors hover:text-[var(--color-text-primary)] ${className}`}
      aria-label={`Scroll to ${targetId} section`}
    >
      <span>{label}</span>
      <span className="hero-scroll__arrow inline-flex">
        <ArrowDown size={12} strokeWidth={1.5} />
      </span>
    </a>
  );
}
