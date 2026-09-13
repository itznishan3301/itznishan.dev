"use client";

import { useRef, useCallback, type ReactNode } from "react";
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
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  onClick,
  href,
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
    if (innerRef.current) {
      innerRef.current.style.transform = "translate(0px, 0px)";
    }
  }, []);

  const content = (
    <div
      ref={ref}
      className={cn("magnetic-wrapper", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div
        ref={innerRef}
        className="magnetic-inner"
        style={{ transition: "transform var(--transition-base)", willChange: "transform" }}
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
