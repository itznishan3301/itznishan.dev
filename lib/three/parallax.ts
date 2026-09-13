import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParallaxConfig {
  /** Mouse influence multiplier */
  intensity?: number;
  /** Vertical parallax multiplier */
  depth?: number;
  /** Lerp smoothing factor */
  lerp?: number;
  /** Whether parallax is enabled */
  enabled?: boolean;
}

/**
 * Applies parallax movement to a Three.js object based on mouse position.
 * Place inside R3F Canvas context, apply to any Object3D ref.
 */
export function useParallax<T extends THREE.Object3D>({
  intensity = 0.3,
  depth = 1,
  lerp = 0.05,
  enabled = true,
}: ParallaxConfig = {}) {
  const ref = useRef<T>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const targetRef = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    if (!ref.current || !enabled) return;

    // Get mouse from R3F pointer
    targetRef.current.x = state.pointer.x * intensity * depth;
    targetRef.current.y = state.pointer.y * intensity * depth;

    mouseRef.current.x = THREE.MathUtils.lerp(
      mouseRef.current.x,
      targetRef.current.x,
      lerp
    );
    mouseRef.current.y = THREE.MathUtils.lerp(
      mouseRef.current.y,
      targetRef.current.y,
      lerp
    );

    ref.current.position.x += mouseRef.current.x * 0.01;
    ref.current.position.y += mouseRef.current.y * 0.01;
  });

  return ref;
}

/**
 * Floating animation for objects — gentle oscillation.
 * Use inside R3F Canvas context.
 */
export function useFloating(
  amplitude = 0.15,
  frequency = 0.8,
  phaseOffset = 0
) {
  const ref = useRef<THREE.Mesh>(null);
  const initialY = useRef<number | null>(null);

  useFrame((state) => {
    if (!ref.current) return;

    if (initialY.current === null) {
      initialY.current = ref.current.position.y;
    }

    const time = state.clock.getElapsedTime();
    ref.current.position.y =
      initialY.current +
      Math.sin(time * frequency + phaseOffset) * amplitude;

    // Subtle rotation
    ref.current.rotation.x = Math.sin(time * 0.3 + phaseOffset) * 0.05;
    ref.current.rotation.z = Math.cos(time * 0.2 + phaseOffset) * 0.03;
  });

  return ref;
}

/**
 * Gentle scene-level camera breathing effect.
 * Apply to the camera rig or scene group.
 */
export function useBreathing(amplitude = 0.02, frequency = 0.3) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(time * frequency) * amplitude;
    ref.current.rotation.y = Math.cos(time * frequency * 0.7) * amplitude;
  });

  return ref;
}
