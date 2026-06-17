"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { ReactNode, RefObject } from "react";

import { cn } from "@/lib/utils";

type SectionTraceProps = {
  className?: string;
  icon?: ReactNode;
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
      {icon ? (
        <div className="absolute left-1/2 top-0 grid size-14 -translate-x-1/2 place-items-center rounded-full border border-zinc-800 bg-black text-zinc-50 shadow-2xl shadow-black/50">
          {icon}
        </div>
      ) : null}
      <div className={cn("absolute left-1/2 bottom-0 w-10 -translate-x-1/2", icon ? "top-14" : "top-0")}>
        <div className="trace-track absolute left-1/2 top-0 h-full w-px -translate-x-1/2" />
        <motion.div
          className="trace-line absolute left-1/2 top-0 h-full w-px origin-top -translate-x-1/2"
          style={{ scaleY: progress }}
        />
        <motion.div
          className="trace-bead absolute left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ top: beadTop }}
        />
        <motion.div
          className="trace-glow absolute left-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full blur-sm"
          style={{ top: beadTop }}
        />
      </div>
    </div>
  );
}
