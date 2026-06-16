"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { PenLine } from "lucide-react";
import { useRef } from "react";

import { SectionTrace } from "@/components/animations/SectionTrace";

const sentences = [
  "I approach AI/ML engineering as a full system problem: clean data, sensible model choices, reliable evaluation, and interfaces that make model behavior understandable.",
  "My strongest work sits where applied machine learning meets software engineering, turning noisy signals into tools that can support real decisions.",
  "I like problems that do not unfold in a straight line, because non-linear thinking is often what connects math, data, infrastructure, and user trust.",
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 72%", "end 40%"],
  });

  return (
    <section id="about" ref={sectionRef} className="relative px-6 py-28">
      <SectionTrace
        targetRef={sectionRef}
        icon={<PenLine className="size-6" aria-hidden="true" />}
        side="right"
        className="-right-2"
      />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 md:grid-cols-[16rem_minmax(0,1fr)]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">About</p>
          <h2 className="mt-4 text-3xl font-semibold text-zinc-50 md:text-4xl">A practical ML lens.</h2>
        </div>

        <div className="space-y-8">
          {sentences.map((sentence, index) => (
            <RevealSentence
              key={sentence}
              sentence={sentence}
              progress={scrollYProgress}
              index={index}
              total={sentences.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RevealSentence({
  index,
  progress,
  sentence,
  total,
}: Readonly<{
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  sentence: string;
  total: number;
}>) {
  const start = index / total;
  const end = (index + 0.78) / total;
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const y = useTransform(progress, [start, end], [18, 0]);

  return (
    <motion.p style={{ opacity, y }} className="max-w-4xl text-2xl leading-snug text-zinc-200 md:text-4xl">
      {sentence}
    </motion.p>
  );
}
