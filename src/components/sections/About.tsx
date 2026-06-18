"use client";

import { motion, type Variants } from "framer-motion";
import { PenLine } from "lucide-react";
import { useRef } from "react";

import { SectionTrace } from "@/components/animations/SectionTrace";

const refinedEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const headline = "Software is the mechanic of turning complex systems into simple solutions.";

const narrativeBlocks = [
  [
    { text: "I thrive on the challenge of " },
    { text: "breaking down problems", highlight: true },
    { text: " and building solutions that feel direct, useful, and understandable." },
  ],
  [
    { text: "Travel sharpened that instinct. I pay attention to how cultures structure their systems, solve familiar puzzles, and add their own spin." },
  ],
  [
    { text: "That curiosity drives a " },
    { text: "non-linear approach", highlight: true },
    { text: " to engineering: connect unexpected dots, reduce the noise, and treat building software as " },
    { text: "solving a puzzle", highlight: true },
    { text: " with intention." },
  ],
];

const blurContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.1,
    },
  },
};

const blurItem: Variants = {
  hidden: {
    opacity: 0,
    y: "1rem",
    filter: "blur(1rem)",
  },
  visible: {
    opacity: 1,
    y: "0rem",
    filter: "blur(0rem)",
    transition: {
      duration: 0.9,
      ease: refinedEase,
    },
  },
};

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="about" ref={sectionRef} className="relative pb-12 pt-[clamp(4rem,8vw,5.5rem)]">
      <SectionTrace
        targetRef={sectionRef}
        icon={<PenLine className="size-6" aria-hidden="true" />}
        side="right"
        className="site-trace-right"
      />
      <div className="site-shell">
        <div className="relative z-10 grid w-full gap-[clamp(2.5rem,6vw,5rem)] md:grid-cols-[minmax(10rem,16rem)_minmax(0,1fr)]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">About</p>
            <motion.p
              initial={{ opacity: 0, y: "0.75rem", filter: "blur(0.75rem)" }}
              animate={{ opacity: 1, y: "0rem", filter: "blur(0rem)" }}
              transition={{ delay: 0.12, duration: 0.8, ease: refinedEase }}
              className="mt-4 max-w-56 text-[clamp(1.25rem,2.25vw,1.65rem)] font-medium leading-tight text-zinc-400"
            >
              A practical engineering lens.
            </motion.p>
          </div>

          <div className="max-w-[86rem] translate-x-[clamp(1.25rem,5vw,4rem)] md:translate-x-[clamp(11rem,16vw,20rem)]">
            <motion.h2
              variants={blurContainer}
              initial="hidden"
              animate="visible"
              className="max-w-[10ch] text-[clamp(2.75rem,9.5vw,7.75rem)] font-semibold leading-[0.98] text-zinc-50 md:max-w-[12ch] md:text-[clamp(3.75rem,6.6vw,7.75rem)]"
            >
              {headline.split(" ").map((word) => (
                <motion.span key={word} variants={blurItem} className="mr-[0.18em] inline-block">
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            <motion.div
              variants={blurContainer}
              initial="hidden"
              animate="visible"
              className="mt-[clamp(2rem,5vw,4rem)] grid max-w-5xl gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-8"
            >
              {narrativeBlocks.map((segments, index) => (
                <RevealCopy key={index} segments={segments} className={index === 2 ? "md:col-span-2 md:max-w-4xl" : ""} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RevealCopy({
  segments,
  className = "",
}: Readonly<{
  segments: ReadonlyArray<{
    text: string;
    highlight?: boolean;
  }>;
  className?: string;
}>) {
  return (
    <motion.p
      variants={blurItem}
      className={`text-[clamp(1.05rem,2.8vw,1.35rem)] leading-8 text-zinc-500 md:text-[clamp(1rem,1.5vw,1.25rem)] md:leading-8 ${className}`}
    >
      {segments.map((segment) => (
        <span key={segment.text} className={segment.highlight ? "font-medium text-zinc-50" : undefined}>
          {segment.text}
        </span>
      ))}
    </motion.p>
  );
}
