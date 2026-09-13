export const THREE_CONFIG = {
  // Reduce quality on mobile
  get pixelRatio() {
    if (typeof window === "undefined") return 1;
    return Math.min(window.devicePixelRatio, 2);
  },
  antialias: true,
  alpha: true,
  powerPreference: "high-performance" as const,
};

export const CAMERA_CONFIG = {
  fov: 45,
  near: 0.1,
  far: 1000,
  position: [0, 0, 5] as [number, number, number],
};
