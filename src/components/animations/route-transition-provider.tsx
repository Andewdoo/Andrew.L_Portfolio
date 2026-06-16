"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function RouteTransitionProvider({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  return (
    <LayoutGroup id="portfolio-route-transition">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  );
}
