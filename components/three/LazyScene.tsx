"use client";

import dynamic from "next/dynamic";

const SceneCanvas = dynamic(
  () =>
    import("@/components/three/SceneCanvas").then((mod) => mod.SceneCanvas),
  { ssr: false }
);
const TestScene = dynamic(
  () =>
    import("@/components/three/TestScene").then((mod) => mod.TestScene),
  { ssr: false }
);

export { SceneCanvas, TestScene };
