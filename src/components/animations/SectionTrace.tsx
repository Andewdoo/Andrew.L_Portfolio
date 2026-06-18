"use client";

import type { ReactNode, RefObject } from "react";

import { cn } from "@/lib/utils";

type SectionTraceProps = {
  className?: string;
  icon?: ReactNode;
  side?: "left" | "right";
  targetRef: RefObject<HTMLElement | null>;
};

export function SectionTrace({ className, icon, side = "left" }: SectionTraceProps) {
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
        <div className="trace-track absolute left-1/2 top-0 h-full w-[0.0625rem] -translate-x-1/2" />
        <div className="trace-progress-rail absolute left-1/2 top-0 w-[0.0625rem] -translate-x-1/2">
          <div className="trace-line absolute left-0 top-0 h-full w-full" />
          <div className="trace-bead absolute bottom-0 left-1/2 size-[0.75rem] -translate-x-1/2 translate-y-1/2 rounded-full" />
          <div className="trace-glow absolute bottom-0 left-1/2 size-[2rem] -translate-x-1/2 translate-y-1/2 rounded-full blur-sm" />
        </div>
      </div>
    </div>
  );
}
