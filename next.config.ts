import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  return {
    devIndicators: false,
    images: { qualities: [75, 90] },
    distDir: process.env.NEXT_DIST_DIR
      ?? (phase === PHASE_DEVELOPMENT_SERVER ? ".next-development" : ".next-production"),
  };
}
