"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Calculator, CircuitBoard, GraduationCap, Orbit } from "lucide-react";
import { useRef } from "react";

const foundations = [
  {
    icon: Calculator,
    title: "Multivariable Calculus",
    body: "Built comfort with gradients, vector spaces, optimization intuition, and relationships across many interacting variables.",
  },
  {
    icon: CircuitBoard,
    title: "Electrostatics",
    body: "Developed field-based reasoning through distributions, potentials, and disciplined analytical setup for invisible systems.",
  },
  {
    icon: Orbit,
    title: "Mechanics",
    body: "Practiced decomposing dynamic systems into forces, constraints, motion, and clear cause-effect relationships.",
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

  return (
    <section id="education" ref={sectionRef} className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">Education</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-zinc-50 md:text-6xl">
            Engineering depth for applied machine learning.
          </h2>
        </div>

        <div className="relative mt-16 grid gap-10 md:grid-cols-[4rem_minmax(0,1fr)]">
          <div className="relative hidden justify-center md:flex">
            <div className="absolute top-0 h-full w-px bg-zinc-900" />
            <motion.div
              className="absolute top-0 h-full w-px origin-top bg-zinc-50"
              style={{ scaleY: lineScale }}
            />
            <div className="relative z-10 grid size-16 place-items-center rounded-full border border-zinc-800 bg-black text-zinc-50">
              <GraduationCap className="size-7" aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-5">
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="rounded-2xl border border-zinc-900 bg-zinc-950/70 p-6"
            >
              <p className="text-sm uppercase tracking-[0.18em] text-zinc-500">McMaster University</p>
              <h3 className="mt-3 text-3xl font-semibold text-zinc-50">Bachelor of Engineering</h3>
              <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-400">
                A rigorous STEM foundation that supports machine learning work with mathematical
                fluency, systems-level reasoning, and disciplined problem framing before formal
                industry experience.
              </p>
            </motion.article>

            <div className="grid gap-5 lg:grid-cols-3">
              {foundations.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
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
