"use client";

import { useState, useEffect, useCallback } from "react";

interface ScrollState {
  progress: number;
  scrollY: number;
  direction: "up" | "down";
  isScrolled: boolean;
}

export function useScrollProgress(threshold = 50): ScrollState {
  const [state, setState] = useState<ScrollState>({
    progress: 0,
    scrollY: 0,
    direction: "down",
    isScrolled: false,
  });

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollY / docHeight : 0;

    setState((prev) => ({
      progress,
      scrollY,
      direction: scrollY > prev.scrollY ? "down" : "up",
      isScrolled: scrollY > threshold,
    }));
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return state;
}
