"use client";

import { motion } from "framer-motion";
import { Bot, BrainCircuit, Cpu, Database, Layers3, MousePointer2 } from "lucide-react";
import { useRef } from "react";

import { SectionTrace } from "@/components/animations/SectionTrace";

const marqueeSkills = ["Python", "PyTorch", "scikit-learn", "Pandas", "Vector Search", "Next.js"];

const skillCards = [
  {
    icon: BrainCircuit,
    title: "Modeling",
    body: "Feature thinking, baseline models, neural networks, evaluation loops, and error analysis.",
  },
  {
    icon: Database,
    title: "Data Pipelines",
    body: "Cleaning, transforming, validating, and preparing datasets so models learn from the right signal.",
  },
  {
    icon: Cpu,
    title: "ML Systems",
    body: "Inference paths, experiment structure, model-serving constraints, and reliable app integration.",
  },
  {
    icon: Bot,
    title: "AI Product Layer",
    body: "Applied AI features with clear feedback, graceful fallbacks, and transparent model behavior.",
  },
];

export function BentoSkills() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="stack" ref={sectionRef} className="relative scroll-mt-28 px-6 py-28">
      <SectionTrace
        targetRef={sectionRef}
        icon={<MousePointer2 className="size-6" aria-hidden="true" />}
        side="left"
        className="-left-2"
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">Skills</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-zinc-50 md:text-6xl">
              A compact toolkit for applied AI systems.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-zinc-500">
            Selected skills framed around the AI/ML workflow: data preparation, modeling,
            evaluation, deployment, and inspection surfaces that make results usable.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-4 lg:grid-rows-[18rem_14rem_auto]">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/80 p-6 lg:col-span-2 lg:row-span-2"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(244,244,245,0.16),transparent_36%),radial-gradient(circle_at_78%_72%,rgba(113,113,122,0.16),transparent_34%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="grid size-12 place-items-center rounded-xl border border-zinc-800 bg-black text-zinc-100">
                  <Layers3 className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-3xl font-semibold text-zinc-50">Applied ML Stack</h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">
                  A focused stack for turning raw data into model-backed systems, with enough
                  application engineering to make predictions inspectable and useful.
                </p>
              </div>

              <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-black/60 py-5">
                <motion.div
                  className="flex w-max gap-4"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                >
                  {[...marqueeSkills, ...marqueeSkills].map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border border-zinc-800 bg-zinc-950 px-5 py-3 text-sm font-medium text-zinc-200"
                    >
                      {skill}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.article>

          {skillCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{ delay: index * 0.06, duration: 0.45, ease: "easeOut" }}
                className="rounded-2xl border border-zinc-900 bg-black p-6"
              >
                <div className="grid size-11 place-items-center rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-zinc-50">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-500">{card.body}</p>
              </motion.article>
            );
          })}

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ delay: 0.18, duration: 0.45, ease: "easeOut" }}
            className="rounded-2xl border border-zinc-900 bg-zinc-950/80 p-6 lg:col-span-2"
          >
            <p className="text-sm uppercase tracking-[0.18em] text-zinc-500">Working Style</p>
            <h3 className="mt-4 text-2xl font-semibold text-zinc-50">
              Model quality with engineering follow-through.
            </h3>
            <p className="mt-4 text-sm leading-6 text-zinc-400">
              The goal is not to demo a model in isolation. It is to understand the data, test the
              assumptions, ship a reliable path around inference, and make uncertainty visible.
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
