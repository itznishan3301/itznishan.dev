"use client";

import { useEffect, useRef, useCallback } from "react";

type CursorState = "default" | "hover" | "view" | "open" | "drag";

interface CursorConfig {
  /** Primary dot size in px */
  dotSize: number;
  /** Ring size in px */
  ringSize: number;
  /** Ring size on hover */
  ringSizeHover: number;
  /** Lerp factor for dot (0-1, higher = faster) */
  dotLerp: number;
  /** Lerp factor for ring (0-1, higher = faster) */
  ringLerp: number;
  /** Ring scale for each state */
  stateScales: Record<CursorState, number>;
}

const CONFIG: CursorConfig = {
  dotSize: 6,
  ringSize: 36,
  ringSizeHover: 56,
  dotLerp: 0.25,
  ringLerp: 0.12,
  stateScales: {
    default: 1,
    hover: 1.5,
    view: 2.2,
    open: 1.8,
    drag: 0.8,
  },
};

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);
  const isRunning = useRef(false);
  const rafId = useRef<number>(0);

  // Raw mouse position (target)
  const target = useRef({ x: -100, y: -100 });
  // Interpolated positions
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  // Current cursor state
  const state = useRef<CursorState>("default");
  // Whether cursor is within viewport
  const inViewport = useRef(false);

  const setCursorState = useCallback((newState: CursorState) => {
    if (state.current === newState) return;
    state.current = newState;

    const ring = ringRef.current;
    if (!ring) return;

    const scale = CONFIG.stateScales[newState];
    const size =
      newState === "default" ? CONFIG.ringSize : CONFIG.ringSizeHover;
    const borderOpacity =
      newState === "default" ? "0.25" : newState === "view" ? "0.15" : "0.35";
    const bgOpacity =
      newState === "view" || newState === "open" ? "0.04" : "0";

    ring.style.width = `${size * scale}px`;
    ring.style.height = `${size * scale}px`;
    ring.style.borderColor = `rgba(240, 236, 228, ${borderOpacity})`;
    ring.style.backgroundColor = `rgba(240, 236, 228, ${bgOpacity})`;
  }, []);

  const show = useCallback(() => {
    if (isVisible.current) return;
    isVisible.current = true;
    if (dotRef.current) dotRef.current.style.opacity = "1";
    if (ringRef.current) ringRef.current.style.opacity = "1";
  }, []);

  const hide = useCallback(() => {
    if (!isVisible.current) return;
    isVisible.current = false;
    if (dotRef.current) dotRef.current.style.opacity = "0";
    if (ringRef.current) ringRef.current.style.opacity = "0";
  }, []);

  // Animation loop — runs via requestAnimationFrame, no React state
  const animate = useCallback(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Lerp positions
    dotPos.current.x = lerp(dotPos.current.x, target.current.x, CONFIG.dotLerp);
    dotPos.current.y = lerp(dotPos.current.y, target.current.y, CONFIG.dotLerp);
    ringPos.current.x = lerp(
      ringPos.current.x,
      target.current.x,
      CONFIG.ringLerp
    );
    ringPos.current.y = lerp(
      ringPos.current.y,
      target.current.y,
      CONFIG.ringLerp
    );

    // Apply transforms (GPU-accelerated)
    const dotOffset = CONFIG.dotSize / 2;
    dot.style.transform = `translate(${dotPos.current.x - dotOffset}px, ${dotPos.current.y - dotOffset}px)`;

    const ringSize =
      state.current === "default"
        ? CONFIG.ringSize
        : CONFIG.ringSizeHover;
    const scale = CONFIG.stateScales[state.current];
    const currentRingSize = ringSize * scale;
    const ringOffset = currentRingSize / 2;
    ring.style.transform = `translate(${ringPos.current.x - ringOffset}px, ${ringPos.current.y - ringOffset}px)`;

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Bail on touch devices
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    // Bail if reduced motion preferred
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Hide default cursor via CSS class
    document.documentElement.classList.add("custom-cursor-active");
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      if (!inViewport.current) {
        inViewport.current = true;
        show();
      }
    };

    const onMouseLeave = () => {
      inViewport.current = false;
      hide();
    };

    const onMouseEnter = () => {
      inViewport.current = true;
      show();
    };

    // Event delegation for cursor states via data-cursor attribute
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;

      if (cursorEl) {
        const cursorType = cursorEl.getAttribute("data-cursor") as CursorState;
        if (cursorType && cursorType in CONFIG.stateScales) {
          setCursorState(cursorType);
        }
        return;
      }

      // Auto-detect interactive elements
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, label, summary'
      );
      if (interactive) {
        setCursorState("hover");
      } else {
        setCursorState("default");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !related.closest("[data-cursor]")) {
        setCursorState("default");
      }
    };

    // Start animation loop
    isRunning.current = true;
    rafId.current = requestAnimationFrame(animate);

    // Bind events
    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });

    return () => {
      isRunning.current = false;
      cancelAnimationFrame(rafId.current);
      document.documentElement.classList.remove("custom-cursor-active");
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [animate, show, hide, setCursorState]);

  return (
    <>
      {/* Primary dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${CONFIG.dotSize}px`,
          height: `${CONFIG.dotSize}px`,
          borderRadius: "50%",
          backgroundColor: "var(--color-text-primary)",
          pointerEvents: "none",
          zIndex: "var(--z-cursor)",
          opacity: 0,
          willChange: "transform",
          transition: "opacity 200ms ease",
          mixBlendMode: "difference",
        }}
      />

      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${CONFIG.ringSize}px`,
          height: `${CONFIG.ringSize}px`,
          borderRadius: "50%",
          border: "1px solid rgba(240, 236, 228, 0.25)",
          backgroundColor: "transparent",
          pointerEvents: "none",
          zIndex: "var(--z-cursor)",
          opacity: 0,
          willChange: "transform",
          transition:
            "width 300ms cubic-bezier(0.22, 1, 0.36, 1), height 300ms cubic-bezier(0.22, 1, 0.36, 1), border-color 300ms ease, background-color 300ms ease, opacity 200ms ease",
        }}
      />
    </>
  );
}
