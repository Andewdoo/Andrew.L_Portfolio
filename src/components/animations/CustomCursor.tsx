"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const springConfig = {
  stiffness: 900,
  damping: 55,
  mass: 0.2,
};

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hoveringTarget, setHoveringTarget] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const haloX = useSpring(mouseX, springConfig);
  const haloY = useSpring(mouseY, springConfig);
  const { scrollYProgress } = useScroll();
  const scrollSpring = useSpring(scrollYProgress, springConfig);
  const scrollScale = useTransform(scrollSpring, [0, 1], [1, 1.16]);

  useEffect(() => {
    const finePointerQuery = window.matchMedia("(pointer: fine) and (hover: hover)");

    const syncPointerMode = () => {
      setEnabled(finePointerQuery.matches);
      document.documentElement.classList.toggle("has-custom-cursor", finePointerQuery.matches);
    };

    syncPointerMode();
    finePointerQuery.addEventListener("change", syncPointerMode);

    return () => {
      finePointerQuery.removeEventListener("change", syncPointerMode);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const moveCursor = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    const updateHoverState = (event: MouseEvent) => {
      const target = event.target as Element | null;
      setHoveringTarget(
        Boolean(
          target?.closest(
            "a, button, input, textarea, select, summary, [role='button'], [data-cursor='interactive']"
          )
        )
      );
    };

    window.addEventListener("pointermove", moveCursor);
    window.addEventListener("mouseover", updateHoverState);

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("mouseover", updateHoverState);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[81] h-2.5 w-2.5 rounded-full bg-white mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          height: hoveringTarget ? "0.875rem" : "0.625rem",
          width: hoveringTarget ? "0.875rem" : "0.625rem",
        }}
        transition={{ duration: 0.08, ease: "easeOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[80] h-7 w-7 rounded-full border border-white/80 bg-white/70 mix-blend-difference"
        style={{
          x: haloX,
          y: haloY,
          translateX: "-50%",
          translateY: "-50%",
          scale: scrollScale,
        }}
        animate={{
          height: hoveringTarget ? "2.875rem" : "1.75rem",
          opacity: hoveringTarget ? 0.82 : 0.58,
          width: hoveringTarget ? "2.875rem" : "1.75rem",
        }}
        transition={{ type: "spring", stiffness: 700, damping: 42, mass: 0.2 }}
      />
    </>
  );
}
