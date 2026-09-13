"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { personal } from "@/data/personal";

interface HeroPortraitProps {
  className?: string;
}

/**
 * Portrait with mouse-driven parallax depth effect.
 * Uses CSS transforms for performance — no React re-renders during mouse tracking.
 * Pauses animation when not visible via IntersectionObserver.
 */
export function HeroPortrait({ className = "" }: HeroPortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    if (!imageRef.current || !glowRef.current) return;

    currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * 0.08;
    currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * 0.08;

    const rotateX = currentRef.current.y * -4;
    const rotateY = currentRef.current.x * 4;
    const translateX = currentRef.current.x * 8;
    const translateY = currentRef.current.y * 8;

    imageRef.current.style.transform = `
      perspective(800px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateX(${translateX}px)
      translateY(${translateY}px)
      scale(1.02)
    `;

    glowRef.current.style.transform = `
      translate(${currentRef.current.x * -20}px, ${currentRef.current.y * -20}px)
    `;

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (reducedMotion || isTouch) return;

    const container = containerRef.current;

    // Visibility-based animation pausing
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!rafRef.current) {
            rafRef.current = requestAnimationFrame(animate);
          }
        } else {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = 0;
        }
      },
      { threshold: 0 }
    );

    if (container) observer.observe(container);
    rafRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current.x =
        ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.y =
        ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = 0;
      mouseRef.current.y = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    container?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      container?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [animate]);

  return (
    <div
      ref={containerRef}
      className={`hero-portrait relative ${className}`}
      data-cursor="view"
    >
      {/* Ambient glow behind portrait */}
      <div
        ref={glowRef}
        className="hero-portrait__glow absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(240, 236, 228, 0.07) 0%, transparent 65%)",
          filter: "blur(30px)",
          willChange: "transform",
        }}
      />

      {/* Portrait image with depth transform */}
      <div
        ref={imageRef}
        className="hero-portrait__image relative z-10 overflow-hidden"
        style={{
          willChange: "transform",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Placeholder / fallback — shown when image is missing or loading */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 z-0 bg-[var(--color-bg-tertiary)] transition-opacity duration-700 ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex h-full items-center justify-center">
            <div className="text-center px-6">
              {/* Decorative portrait silhouette */}
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-muted)]">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">
                Add portrait image
              </p>
              <p className="mt-1 font-mono text-[10px] text-[var(--color-text-muted)]">
                /images/profile/nuruzzaman-nishan.jpg
              </p>
            </div>
          </div>
        </div>

        {/* Actual image */}
        {!hasError && (
          <img
            src={personal.profileImage}
            alt={`Portrait of ${personal.name}`}
            className={`hero-portrait__img relative z-10 h-full w-full object-cover object-center transition-opacity duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="eager"
            fetchPriority="high"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
          />
        )}

        {/* Subtle overlay for depth */}
        <div
          className="absolute inset-0 z-20"
          style={{
            background:
              "linear-gradient(180deg, transparent 40%, rgba(5, 5, 5, 0.3) 100%)",
          }}
        />

        {/* Border frame */}
        <div className="absolute inset-0 z-30 border border-[var(--color-border)]" />
      </div>
    </div>
  );
}
