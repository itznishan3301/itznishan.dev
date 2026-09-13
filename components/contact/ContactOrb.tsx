"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Subtle floating orb for the contact section.
 * Cursor-reactive with gentle breathing animation.
 */
export function ContactOrbScene() {
  return (
    <>
      <ambientLight intensity={0.2} color="#f0ece4" />
      <pointLight position={[3, 3, 3]} intensity={0.4} color="#f0ece4" />
      <pointLight position={[-2, -2, 2]} intensity={0.15} color="#9b978e" />
      <FloatingOrb />
      <OrbParticles />
    </>
  );
}

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const targetMouse = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    if (!meshRef.current) return;

    // Track pointer
    targetMouse.current.x = state.pointer.x * 0.3;
    targetMouse.current.y = state.pointer.y * 0.3;
    mouseRef.current.x = THREE.MathUtils.lerp(
      mouseRef.current.x,
      targetMouse.current.x,
      0.03
    );
    mouseRef.current.y = THREE.MathUtils.lerp(
      mouseRef.current.y,
      targetMouse.current.y,
      0.03
    );

    const time = state.clock.getElapsedTime();

    // Gentle float + mouse response
    meshRef.current.position.x = mouseRef.current.x;
    meshRef.current.position.y = mouseRef.current.y + Math.sin(time * 0.5) * 0.15;
    meshRef.current.position.z = Math.cos(time * 0.3) * 0.1;

    // Subtle rotation
    meshRef.current.rotation.x = time * 0.05;
    meshRef.current.rotation.y = time * 0.08;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.2, 2]} />
      <meshStandardMaterial
        color="#111111"
        roughness={0.3}
        metalness={0.7}
        emissive="#0a0a0a"
        emissiveIntensity={0.3}
        wireframe
      />
    </mesh>
  );
}

function OrbParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  // Memoize positions to avoid recreation on every render
  const positions = useMemo(() => {
    const count = 20;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 0.8;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#f0ece4"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
