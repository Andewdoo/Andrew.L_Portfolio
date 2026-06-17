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
    <section className="relative isolate flex min-h-[calc(100dvh-5rem)] items-center overflow-hidden px-[clamp(1rem,4vw,1.5rem)] py-[clamp(4rem,10vw,7rem)]">
      <div className="absolute inset-0 -z-20 bg-black" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 size-[min(82vw,34rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(244,244,245,0.22),rgba(39,39,42,0.08)_44%,transparent_68%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-12 -z-10 h-[clamp(12rem,24vw,16rem)] bg-[linear-gradient(110deg,transparent,rgba(63,63,70,0.38),transparent),linear-gradient(250deg,transparent,rgba(24,24,27,0.88),transparent)] opacity-80 blur-2xl"
      />

      <div className="mx-auto grid w-full max-w-7xl gap-[clamp(2rem,6vw,4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(18rem,32%)] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: "1.5rem" }}
          animate={{ opacity: 1, y: "0rem" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
            Andrew L. Software Engineering Portfolio
          </p>
          <h1 className="mt-5 max-w-4xl text-[clamp(2.65rem,8vw,4.5rem)] font-semibold leading-tight text-zinc-50">
            Building software from idea to implementation.
          </h1>
          <p className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.125rem)] leading-8 text-zinc-400">
            I thrive on the challenge of taking an idea and building it from scratch. Every experience is a chance to turn new knowledge into reality and push toward something more ambitious.
          </p>

          <motion.button
            type="button"
            onClick={scrollToProjects}
            onMouseMove={handlePointerMove}
            onMouseLeave={handlePointerLeave}
            style={{ x: buttonX, y: buttonY }}
            whileTap={{ scale: 0.98 }}
            className="mt-9 inline-flex items-center gap-3 rounded-full border border-zinc-700 bg-zinc-50 px-5 py-3 text-sm font-semibold text-black shadow-2xl shadow-white/10 transition-colors hover:bg-white"
          >
            View My Work
            <ArrowDownRight className="size-4" aria-hidden="true" />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
          className="hidden rounded-2xl border border-white/15 bg-zinc-950/60 p-1.5 shadow-2xl shadow-black/40 backdrop-blur lg:block"
        >
          <div className="relative aspect-square overflow-hidden rounded-[0.875rem] border border-white/10 bg-black">
            <Image
              src="/images/hero-photo.jpg"
              alt="Andrew L. with family in a mountain cave"
              fill
              priority
              sizes="(min-width: 1024px) 32vw, 100vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
