"use client";

import { motion } from "framer-motion";
import { Bot, BrainCircuit, Cpu, Database, Layers3, MousePointer2 } from "lucide-react";
import { useRef } from "react";

import { SectionTrace } from "@/components/animations/SectionTrace";
import { ScrollableTechCards } from "@/components/ui/ScrollableTechCards";

const techGroups = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "C++", "Tailwind CSS", "HTML", "MATLAB"],
  },
  {
    title: "Frameworks",
    items: ["React", "Next.js", "Node.js", "FastAPI"],
  },
  {
    title: "Developer Tools",
    items: ["Git", "GitHub", "PyCharm", "VS Code"],
  },
  {
    title: "Databases",
    items: ["MongoDB", "PostgreSQL", "Google Firebase"],
  },
];

const skillCards = [
  {
    icon: BrainCircuit,
    title: "Software Design",
    body: "Breaking problems into readable components, clean interfaces, and code that can grow without becoming fragile.",
  },
  {
    icon: Database,
    title: "Data & APIs",
    body: "Modeling information, moving it through reliable flows, and connecting frontends to useful backend behavior.",
  },
  {
    icon: Cpu,
    title: "Systems Thinking",
    body: "Reasoning about performance, memory, architecture, and the lower-level details that shape how software runs.",
  },
  {
    icon: Bot,
    title: "Developer Tooling",
    body: "Using automation thoughtfully where it makes workflows clearer, faster, or easier to inspect.",
  },
];

export function BentoSkills() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="stack" ref={sectionRef} className="relative scroll-mt-28 px-6 pb-28 pt-20 md:pt-14">
      <SectionTrace
        targetRef={sectionRef}
        icon={<MousePointer2 className="size-6" aria-hidden="true" />}
        side="left"
        className="left-0 lg:left-[max(0rem,calc(50%_-_40rem))]"
      />
      <div className="relative z-10 mx-auto max-w-7xl md:pl-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:pt-[1.125rem]">
          <div>
            <p className="ml-1 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">Skills</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-zinc-50 md:text-6xl">
              A compact toolkit for software engineering.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-zinc-500">
            Selected skills framed around building useful software: clear interfaces, dependable
            logic, thoughtful data flow, and systems-aware implementation.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          <motion.article
            initial={{ opacity: 0, y: "1.5rem" }}
            whileInView={{ opacity: 1, y: "0rem" }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative min-h-[34rem] overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/80 p-6 lg:col-span-4"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(244,244,245,0.16),transparent_36%),radial-gradient(circle_at_78%_72%,rgba(113,113,122,0.16),transparent_34%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="grid size-12 place-items-center rounded-xl border border-zinc-800 bg-black text-zinc-100">
                  <Layers3 className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-5xl font-semibold leading-tight text-zinc-50 md:text-6xl">Tech Stack</h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">
                  A focused stack for turning ideas into dependable applications, with enough
                  systems depth to keep the details understandable and maintainable.
                </p>
              </div>

              <ScrollableTechCards groups={techGroups} />
            </div>
          </motion.article>

          {skillCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: "1.5rem" }}
                whileInView={{ opacity: 1, y: "0rem" }}
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

        </div>
      </div>
    </section>
  );
}
