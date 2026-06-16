"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { ReactNode, RefObject } from "react";

import { cn } from "@/lib/utils";

type SectionTraceProps = {
  className?: string;
  icon: ReactNode;
  side?: "left" | "right";
  targetRef: RefObject<HTMLElement | null>;
};

export function SectionTrace({ className, icon, side = "left", targetRef }: SectionTraceProps) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 74%", "end 28%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 26,
  });
  const beadTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-14 bottom-14 z-0 hidden w-16 md:block",
        side === "left" ? "left-4" : "right-4",
        className
      )}
    >
      <div className="absolute left-1/2 top-0 grid size-14 -translate-x-1/2 place-items-center rounded-full border border-zinc-800 bg-black text-zinc-50 shadow-2xl shadow-black/50">
        {icon}
      </div>
      <div className="absolute left-1/2 top-14 bottom-0 w-10 -translate-x-1/2">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-zinc-900" />
        <motion.div
          className="absolute left-1/2 top-0 h-full w-px origin-top -translate-x-1/2 bg-zinc-50"
          style={{ scaleY: progress }}
        />
        <motion.div
          className="absolute left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_28px_rgba(255,255,255,0.8)]"
          style={{ top: beadTop }}
        />
        <motion.div
          className="absolute left-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35 blur-sm"
          style={{ top: beadTop }}
        />
      </div>
    </div>
  );
}
