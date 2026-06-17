"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Code2, Cpu, GraduationCap, Network } from "lucide-react";
import { useRef } from "react";

const foundations = [
  {
    icon: Network,
    title: "Data Structures & Algorithms",
    body: "Developing intuition for computational efficiency, memory management, and structuring data to solve complex algorithmic puzzles. (COMPENG 2SI3)",
  },
  {
    icon: Code2,
    title: "Systems Programming",
    body: "Building a strong foundation in modern programming paradigms, software lifecycles, and translating high-level logic into robust code. (COMPENG 2SH4)",
  },
  {
    icon: Cpu,
    title: "Computer Architecture",
    body: "Bridging the gap between hardware and software by decomposing microprocessor logic, gaining insight into how code executes at the metal level. (COMPENG 2DX3 & 2DI4)",
  },
];

export function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 72%", "end 32%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
  });
  const beadTop = useTransform(lineScale, [0, 1], ["0%", "100%"]);

  return (
    <section id="education" ref={sectionRef} className="px-[clamp(1rem,4vw,1.5rem)] pb-[clamp(5rem,10vw,7rem)] pt-[clamp(4rem,8vw,5rem)]">
      <div className="mx-auto max-w-7xl">
        <div className="relative grid gap-10 md:grid-cols-[4rem_minmax(0,1fr)]">
          <div className="relative hidden justify-center md:flex">
            <div className="trace-track absolute top-0 h-full w-px" />
            <motion.div
              className="trace-line absolute top-0 h-full w-px origin-top"
              style={{ scaleY: lineScale }}
            />
            <motion.div
              className="trace-bead absolute left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ top: beadTop }}
            />
            <motion.div
              className="trace-glow absolute left-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full blur-sm"
              style={{ top: beadTop }}
            />
            <div className="relative z-10 grid size-16 place-items-center rounded-full border border-zinc-800 bg-black text-zinc-50">
              <GraduationCap className="size-7" aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-5">
            <motion.article
              initial={{ opacity: 0, y: "1.125rem" }}
              whileInView={{ opacity: 1, y: "0rem" }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="rounded-2xl border border-zinc-900 bg-zinc-950/70 p-6"
            >
              <p className="text-sm uppercase tracking-[0.18em] text-zinc-500">McMaster University</p>
              <h3 className="mt-3 text-[clamp(1.875rem,4vw,2.25rem)] font-semibold text-zinc-50">Computer Engineering</h3>
              <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-400">
                For me, building software is about mastering the whole system. Computer Engineering bridges that gap by providing me with the foundation to connect low-level hardware-aware reasoning with the algorithms and interfaces that drive modern software.
              </p>
            </motion.article>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] gap-5">
              {foundations.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: "1.125rem" }}
                    whileInView={{ opacity: 1, y: "0rem" }}
                    viewport={{ once: true, margin: "-12%" }}
                    transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
                    className="rounded-2xl border border-zinc-900 bg-black p-5"
                  >
                    <div className="grid size-10 place-items-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-200">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h4 className="mt-5 text-lg font-semibold text-zinc-100">{item.title}</h4>
                    <p className="mt-3 text-sm leading-6 text-zinc-500">{item.body}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
