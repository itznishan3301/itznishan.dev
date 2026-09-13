"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraRigConfig {
  /** Mouse influence on camera position */
  mouseInfluence?: number;
  /** Lerp smoothing */
  lerp?: number;
  /** Whether to look at center */
  lookAtCenter?: boolean;
  /** Camera base position */
  basePosition?: [number, number, number];
}

/**
 * Camera rig that provides subtle mouse-following movement.
 * Creates depth and parallax feel without moving objects.
 */
export function CameraRig({
  mouseInfluence = 0.3,
  lerp = 0.04,
  lookAtCenter = true,
  basePosition = [0, 0, 5],
}: CameraRigConfig) {
  const { camera } = useThree();
  const mouse = useRef(new THREE.Vector2(0, 0));
  const targetMouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    // Lerp mouse values
    mouse.current.x = THREE.MathUtils.lerp(
      mouse.current.x,
      targetMouse.current.x,
      lerp
    );
    mouse.current.y = THREE.MathUtils.lerp(
      mouse.current.y,
      targetMouse.current.y,
      lerp
    );

    // Apply mouse offset to camera position
    camera.position.x = basePosition[0] + mouse.current.x * mouseInfluence;
    camera.position.y = basePosition[1] + mouse.current.y * mouseInfluence * 0.6;
    camera.position.z = basePosition[2];

    if (lookAtCenter) {
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}
