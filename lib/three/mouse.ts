import { useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Smooth mouse tracking for 3D scenes.
 * Returns a ref that updates each frame with lerped mouse position.
 * Use inside R3F Canvas context.
 */
export function useMouse3D(lerpFactor = 0.08) {
  const mouse = useRef(new THREE.Vector2(0, 0));
  const target = useRef(new THREE.Vector2(0, 0));
  const smoothMouse = useRef(new THREE.Vector2(0, 0));

  const handlePointerMove = useCallback(
    (e: { point: THREE.Vector3; uv?: THREE.Vector2 }) => {
      // Convert to normalized -1 to 1 range
      target.current.x = (e.point.x / 5) * 2;
      target.current.y = (e.point.y / 5) * 2;
    },
    []
  );

  useFrame(() => {
    smoothMouse.current.x = THREE.MathUtils.lerp(
      smoothMouse.current.x,
      target.current.x,
      lerpFactor
    );
    smoothMouse.current.y = THREE.MathUtils.lerp(
      smoothMouse.current.y,
      target.current.y,
      lerpFactor
    );
    mouse.current.copy(smoothMouse.current);
  });

  return { mouse, handlePointerMove };
}

/**
 * Track global mouse position (outside R3F context) mapped to scene coordinates.
 */
export function useGlobalMouse3D(lerpFactor = 0.05) {
  const mouse = useRef(new THREE.Vector2(0, 0));
  const target = useRef(new THREE.Vector2(0, 0));

  useFrame(() => {
    mouse.current.x = THREE.MathUtils.lerp(
      mouse.current.x,
      target.current.x,
      lerpFactor
    );
    mouse.current.y = THREE.MathUtils.lerp(
      mouse.current.y,
      target.current.y,
      lerpFactor
    );
  });

  // Listen to window mouse events
  useFrame(() => {
    const handleMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  });

  return mouse;
}
