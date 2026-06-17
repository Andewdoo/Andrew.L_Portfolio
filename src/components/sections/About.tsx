"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { PenLine } from "lucide-react";
import { useRef } from "react";

import { SectionTrace } from "@/components/animations/SectionTrace";

const sentences = [
  "To me, software is the mechanic of how complex things turn into somehthign simple that I can understand. I thrive on the challenge of breaking down problems and building solutions to them.",
  "I love to travel and the sights are only a part of it. I also love observing how all the unique cultures around the world structure their systems to solve the exact same puzzles but with their own spin.",
  "This drives my non-linear approach to problem-solving. From my experience, the best solutions come from connecting completely unexpected dots. I treat building software as solving a puzzle with my own spin. ",
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 72%", "end 40%"],
  });

  return (
    <section id="about" ref={sectionRef} className="relative px-6 pb-12 pt-28">
      <SectionTrace
        targetRef={sectionRef}
        icon={<PenLine className="size-6" aria-hidden="true" />}
        side="right"
      />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 md:grid-cols-[16rem_minmax(0,1fr)]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">About</p>
          <h2 className="mt-4 text-3xl font-semibold text-zinc-50 md:text-4xl">A practical engineering lens.</h2>
        </div>

        <div className="space-y-5">
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
  const baseStart = index / total;
  const start = index === total - 1 ? Math.max(0, baseStart - 0.80) : baseStart;
  const end = (index + 0.78) / total;
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const y = useTransform(progress, [start, end], ["1.125rem", "0rem"]);

  return (
    <motion.p style={{ opacity, y }} className="max-w-4xl text-2xl leading-snug text-zinc-200 md:text-4xl">
      {sentence}
    </motion.p>
  );
}
