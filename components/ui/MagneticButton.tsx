"use client";

import { useRef, useCallback, type ReactNode } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils/cn";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** Magnetic pull strength (0-1) */
  strength?: number;
  /** Click handler */
  onClick?: () => void;
  /** Render as link */
  href?: string;
  /** Callback on mouse enter */
  onMouseEnter?: () => void;
  /** Callback on mouse leave */
  onMouseLeave?: () => void;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  onClick,
  href,
  onMouseEnter,
  onMouseLeave,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      }
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (!innerRef.current) return;
    gsap.to(innerRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
    onMouseLeave?.();
  }, [onMouseLeave]);

  const content = (
    <div
      ref={ref}
      className={cn("magnetic-wrapper", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      <div
        ref={innerRef}
        className="magnetic-inner"
        style={{ willChange: "transform" }}
      >
        {children}
      </div>
    </div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return content;
}
