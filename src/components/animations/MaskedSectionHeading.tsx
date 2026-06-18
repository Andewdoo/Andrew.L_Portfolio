"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const reveal: Variants = {
  hidden: {
    y: "115%",
    opacity: 0.001,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 82,
      damping: 30,
      mass: 1.15,
    },
  },
};

type MaskedSectionHeadingProps = {
  children: ReactNode;
  className?: string;
};

export function MaskedSectionHeading({ children, className }: Readonly<MaskedSectionHeadingProps>) {
  return (
    <div className="overflow-hidden pb-1">
      <motion.h2
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.58, margin: "0px 0px -8% 0px" }}
        className={cn(
          "text-[clamp(2.75rem,8vw,6.8rem)] font-semibold leading-[0.96] text-zinc-50",
          className
        )}
      >
        {children}
      </motion.h2>
    </div>
  );
}
