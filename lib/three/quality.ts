/**
 * Three.js quality presets based on device capability.
 * Used to scale geometry detail, particle counts, shadows, etc.
 */

export type QualityLevel = "low" | "medium" | "high";

export interface QualityConfig {
  level: QualityLevel;
  /** Max device pixel ratio */
  dpr: number;
  /** Geometry segment count multiplier */
  geometryDetail: number;
  /** Whether to enable shadows */
  shadows: boolean;
  /** Shadow map resolution */
  shadowMapSize: number;
  /** Whether to enable post-processing */
  postProcessing: boolean;
  /** Max animated objects */
  maxObjects: number;
  /** Float precision */
  precision: "lowp" | "mediump" | "highp";
}

function detectQuality(): QualityLevel {
  if (typeof window === "undefined") return "medium";

  const isMobile = window.innerWidth < 768 || "ontouchstart" in window;
  const dpr = window.devicePixelRatio || 1;

  if (isMobile) return "low";
  if (dpr > 1.5 && window.innerWidth > 1400) return "high";
  return "medium";
}

const QUALITY_PRESETS: Record<QualityLevel, QualityConfig> = {
  low: {
    level: "low",
    dpr: Math.min(1, 1.5),
    geometryDetail: 0.5,
    shadows: false,
    shadowMapSize: 512,
    postProcessing: false,
    maxObjects: 15,
    precision: "mediump",
  },
  medium: {
    level: "medium",
    dpr: Math.min(window?.devicePixelRatio || 1, 1.5),
    geometryDetail: 0.75,
    shadows: false,
    shadowMapSize: 1024,
    postProcessing: false,
    maxObjects: 30,
    precision: "highp",
  },
  high: {
    level: "high",
    dpr: Math.min(window?.devicePixelRatio || 1, 2),
    geometryDetail: 1,
    shadows: true,
    shadowMapSize: 2048,
    postProcessing: true,
    maxObjects: 50,
    precision: "highp",
  },
};

export function getQualityConfig(): QualityConfig {
  return QUALITY_PRESETS[detectQuality()];
}

export function getCanvasDpr(): [number, number] {
  const config = getQualityConfig();
  return [1, config.dpr];
}

/** Scale a geometry segment count by quality level */
export function qualitySegments(base: number): number {
  const config = getQualityConfig();
  return Math.max(8, Math.floor(base * config.geometryDetail));
}
