"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, GraduationCap, Network } from "lucide-react";
import { useRef } from "react";

import { SectionTrace } from "@/components/animations/SectionTrace";

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

  return (
    <section id="education" ref={sectionRef} className="relative pb-[clamp(5rem,10vw,7.5rem)] pt-[clamp(4rem,8vw,5.5rem)]">
      <SectionTrace
        targetRef={sectionRef}
        icon={<GraduationCap className="size-6" aria-hidden="true" />}
        side="left"
        className="site-trace-left"
      />
      <div className="site-shell">
        <div className="relative z-10 w-full md:pl-[clamp(4rem,5vw,5rem)]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:pt-[1.125rem]">
            <div>
              <p className="ml-1 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">Education</p>
              <h2 className="mt-4 max-w-4xl text-[clamp(2.25rem,6vw,5.25rem)] font-semibold leading-tight text-zinc-50">
                Engineering foundations for useful software.
              </h2>
            </div>
            <p className="max-w-lg text-[clamp(1rem,1.5vw,1.15rem)] leading-8 text-zinc-500">
              Coursework and systems practice that connect hardware-aware reasoning, algorithms,
              data structures, and implementation details.
            </p>
          </div>

          <div className="mt-[clamp(2.5rem,6vw,4rem)] space-y-5">
            <motion.article
              initial={{ opacity: 0, y: "1.125rem" }}
              whileInView={{ opacity: 1, y: "0rem" }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="rounded-2xl border border-zinc-900 bg-zinc-950/70 p-[clamp(1.5rem,2.4vw,2rem)]"
            >
              <p className="text-sm uppercase tracking-[0.18em] text-zinc-500">McMaster University</p>
              <h3 className="mt-3 text-[clamp(2rem,4vw,2.75rem)] font-semibold text-zinc-50">Computer Engineering</h3>
              <p className="mt-4 max-w-4xl text-[clamp(1rem,1.5vw,1.15rem)] leading-8 text-zinc-400">
                For me, building software is about mastering the whole system. Computer Engineering bridges that gap by providing me with the foundation to connect low-level hardware-aware reasoning with the algorithms and interfaces that drive modern software.
              </p>
            </motion.article>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] gap-5">
              {foundations.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: "1.125rem" }}
                    whileInView={{ opacity: 1, y: "0rem" }}
                    viewport={{ once: true, margin: "-12%" }}
                    transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
                    className="rounded-2xl border border-zinc-900 bg-black p-[clamp(1.25rem,2vw,1.75rem)]"
                  >
                    <div className="grid size-10 place-items-center rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-200">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h4 className="mt-5 text-[clamp(1.125rem,1.7vw,1.3rem)] font-semibold text-zinc-100">{item.title}</h4>
                    <p className="mt-3 text-[clamp(0.95rem,1.35vw,1.05rem)] leading-7 text-zinc-500">{item.body}</p>
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
