import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    minimumCacheTTL: 60,
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Experimental features for performance
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@react-three/fiber",
      "@react-three/drei",
      "gsap",
      "lenis",
    ],
  },

  // Webpack optimization for Three.js bundle
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Split Three.js into its own chunk
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: "three",
            chunks: "all",
            priority: 10,
          },
          gsap: {
            test: /[\\/]node_modules[\\/]gsap[\\/]/,
            name: "gsap",
            chunks: "all",
            priority: 10,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
