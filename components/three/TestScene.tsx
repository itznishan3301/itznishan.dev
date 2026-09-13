"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { qualitySegments } from "@/lib/three/quality";
import { useFloating } from "@/lib/three/parallax";
import { Lighting, AnimatedAccentLight } from "./Lighting";
import { CameraRig } from "./CameraRig";

/**
 * Lightweight test scene demonstrating the 3D foundation.
 * Features: floating geometry, subtle camera movement, depth, lighting.
 */
export function TestScene() {
  return (
    <>
      <CameraRig mouseInfluence={0.4} basePosition={[0, 0, 6]} />
      <Lighting />
      <AnimatedAccentLight speed={0.15} radius={3} intensity={0.15} />

      {/* Central torus knot */}
      <FloatingTorus position={[0, 0, 0]} scale={0.9} />

      {/* Orbiting smaller shapes */}
      <FloatingShape
        position={[-2.5, 1.2, -1]}
        geometry="icosahedron"
        scale={0.35}
        phase={0}
      />
      <FloatingShape
        position={[2.8, -0.8, -0.5]}
        geometry="octahedron"
        scale={0.3}
        phase={1.5}
      />
      <FloatingShape
        position={[-1.5, -1.5, 0.5]}
        geometry="dodecahedron"
        scale={0.25}
        phase={3}
      />
      <FloatingShape
        position={[1.8, 1.8, -1.5]}
        geometry="tetrahedron"
        scale={0.2}
        phase={4.5}
      />

      {/* Depth particles */}
      <DepthParticles count={40} />

      {/* Subtle grid plane at depth */}
      <SubtleGrid />
    </>
  );
}

/* ── Floating torus knot ───────────────────────────────── */

function FloatingTorus({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const meshRef = useFloating(0.12, 0.6, 0);
  const segments = qualitySegments(64);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.08;
    meshRef.current.rotation.y = time * 0.12;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusKnotGeometry args={[1, 0.35, segments, 16, 2, 3]} />
      <meshStandardMaterial
        color="#1a1a1a"
        roughness={0.4}
        metalness={0.6}
        emissive="#0a0a0a"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

/* ── Floating shape ─────────────────────────────────────── */

type GeometryType = "icosahedron" | "octahedron" | "dodecahedron" | "tetrahedron";

function FloatingShape({
  position,
  geometry,
  scale = 0.3,
  phase = 0,
}: {
  position: [number, number, number];
  geometry: GeometryType;
  scale?: number;
  phase?: number;
}) {
  const meshRef = useFloating(0.2, 0.5, phase);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.15 + phase;
    meshRef.current.rotation.z = time * 0.1;
  });

  const geometryArgs: Record<GeometryType, [number, number]> = {
    icosahedron: [1, 0],
    octahedron: [1, 0],
    dodecahedron: [1, 0],
    tetrahedron: [1, 0],
  };

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry === "icosahedron" && <icosahedronGeometry args={geometryArgs[geometry]} />}
      {geometry === "octahedron" && <octahedronGeometry args={geometryArgs[geometry]} />}
      {geometry === "dodecahedron" && <dodecahedronGeometry args={geometryArgs[geometry]} />}
      {geometry === "tetrahedron" && <tetrahedronGeometry args={geometryArgs[geometry]} />}
      <meshStandardMaterial
        color="#161616"
        roughness={0.5}
        metalness={0.5}
        emissive="#0d0d0d"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

/* ── Depth particles ────────────────────────────────────── */

function DepthParticles({ count = 40 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }

    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.01;
    pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.02;
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
        size={0.02}
        color="#f0ece4"
        transparent
        opacity={0.2}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ── Subtle grid at depth ───────────────────────────────── */

function SubtleGrid() {
  return (
    <mesh position={[0, -2.5, -3]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20, 20, 20]} />
      <meshStandardMaterial
        color="#0a0a0a"
        wireframe
        transparent
        opacity={0.05}
      />
    </mesh>
  );
}
