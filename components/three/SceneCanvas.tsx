"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { getCanvasDpr, getQualityConfig } from "@/lib/three/quality";

interface SceneCanvasProps {
  children: React.ReactNode;
  className?: string;
  /** Whether the canvas is visible (lazy loading) */
  visible?: boolean;
  /** Override camera fov */
  fov?: number;
  /** Override camera near */
  near?: number;
  /** Override camera far */
  far?: number;
  /** Camera initial position */
  cameraPosition?: [number, number, number];
}

/**
 * Reusable R3F Canvas wrapper with device-aware quality.
 * Handles DPR, resize, reduced motion, and cleanup.
 */
export function SceneCanvas({
  children,
  className = "",
  visible = true,
  fov = 45,
  near = 0.1,
  far = 100,
  cameraPosition = [0, 0, 5],
}: SceneCanvasProps) {
  const [isReady, setIsReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    setIsReady(true);
  }, []);

  if (!isReady || !visible) {
    return <div className={className} />;
  }

  const quality = getQualityConfig();
  const dpr = getCanvasDpr();

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{
          fov,
          near,
          far,
          position: cameraPosition,
        }}
        gl={{
          antialias: quality.level !== "low",
          alpha: true,
          powerPreference: "high-performance",
          precision: quality.precision,
        }}
        style={{
          pointerEvents: "none",
        }}
        frameloop={reducedMotion ? "never" : "always"}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
