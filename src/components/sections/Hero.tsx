"use client";

import { ArrowDownRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import type { MouseEvent } from "react";

const spring = {
  stiffness: 220,
  damping: 18,
  mass: 0.5,
};

export function Hero() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, spring);
  const springY = useSpring(pointerY, spring);
  const buttonX = useTransform(springX, [-1, 1], ["-0.625rem", "0.625rem"]);
  const buttonY = useTransform(springY, [-1, 1], ["-0.5rem", "0.5rem"]);

  const handlePointerMove = (event: MouseEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    pointerX.set(x * 2);
    pointerY.set(y * 2);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4.5rem)] items-center py-[clamp(3.5rem,7vw,6rem)]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 bottom-[-30rem] -z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.85)_62%,rgba(0,0,0,0)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 size-[min(92vw,50rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(244,244,245,0.22),rgba(39,39,42,0.09)_46%,transparent_70%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-10 -z-10 h-[clamp(20rem,48vw,42rem)] bg-[radial-gradient(ellipse_at_74%_38%,rgba(244,244,245,0.16),transparent_38%),radial-gradient(ellipse_at_36%_54%,rgba(113,113,122,0.22),transparent_42%),linear-gradient(110deg,transparent,rgba(63,63,70,0.32),transparent),linear-gradient(250deg,transparent,rgba(24,24,27,0.82),transparent)] opacity-90 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-22rem] -z-10 h-[clamp(20rem,42vw,38rem)] bg-[radial-gradient(ellipse_at_center,rgba(244,244,245,0.1),rgba(39,39,42,0.055)_45%,transparent_72%)]"
      />

      <div className="site-shell grid w-full gap-[clamp(2.5rem,5vw,6rem)] lg:grid-cols-[minmax(0,1fr)_minmax(28rem,38vw)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: "1.5rem" }}
          animate={{ opacity: 1, y: "0rem" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-none"
        >
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
            Andrew L. Software Engineering Portfolio
          </p>
          <h1 className="mt-5 max-w-[12ch] text-[clamp(2.75rem,12vw,8.75rem)] font-semibold leading-[1.03] text-zinc-50 md:text-[clamp(3rem,6.9vw,8.75rem)]">
            Building software from ideas.
          </h1>
          <p className="mt-7 max-w-4xl text-[clamp(1.05rem,1.55vw,1.6rem)] leading-[1.55] text-zinc-400">
            I thrive on the challenge of taking an idea and building it from scratch. Every experience is a chance to turn new knowledge into reality and push toward something more ambitious.
          </p>

          <motion.button
            type="button"
            onClick={scrollToProjects}
            onMouseMove={handlePointerMove}
            onMouseLeave={handlePointerLeave}
            style={{ x: buttonX, y: buttonY }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-zinc-700 bg-zinc-50 px-7 py-4 text-[clamp(0.9rem,1vw,1.05rem)] font-semibold text-black shadow-2xl shadow-white/10 transition-colors hover:bg-white"
          >
            View My Work
            <ArrowDownRight className="size-4" aria-hidden="true" />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
          className="hidden w-full rounded-2xl border border-white/15 bg-zinc-950/60 p-1.5 shadow-2xl shadow-black/40 backdrop-blur lg:block"
        >
          <div className="relative aspect-square overflow-hidden rounded-[0.875rem] border border-white/10 bg-black">
            <Image
              src="/images/hero-photo.jpg"
              alt="Andrew L. with family in a mountain cave"
              fill
              priority
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
