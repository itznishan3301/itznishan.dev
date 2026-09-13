import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Standard lighting rig for the portfolio.
 * Provides ambient fill, directional key, and subtle rim light.
 */
export function Lighting() {
  return (
    <>
      {/* Ambient fill — low, soft */}
      <ambientLight intensity={0.15} color="#f0ece4" />

      {/* Key light — warm, directional */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.4}
        color="#f0ece4"
      />

      {/* Fill light — cooler, opposite side */}
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.15}
        color="#9b978e"
      />

      {/* Rim/back light — subtle edge definition */}
      <pointLight
        position={[0, 3, -5]}
        intensity={0.3}
        color="#f0ece4"
        distance={15}
      />
    </>
  );
}

/**
 * Animated accent light that follows a gentle orbit.
 * Used for subtle dynamic reflections on objects.
 */
export function AnimatedAccentLight({
  color = "#f0ece4",
  intensity = 0.2,
  radius = 4,
  speed = 0.2,
  height = 2,
}: {
  color?: string;
  intensity?: number;
  radius?: number;
  speed?: number;
  height?: number;
}) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    const time = state.clock.getElapsedTime() * speed;
    lightRef.current.position.x = Math.cos(time) * radius;
    lightRef.current.position.z = Math.sin(time) * radius;
    lightRef.current.position.y = height + Math.sin(time * 0.5) * 0.5;
  });

  return (
    <pointLight
      ref={lightRef}
      color={color}
      intensity={intensity}
      distance={12}
    />
  );
}
