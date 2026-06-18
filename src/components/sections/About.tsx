"use client";

import { PenLine } from "lucide-react";
import { useRef } from "react";

import { SectionTrace } from "@/components/animations/SectionTrace";

const sentences = [
  "To me, software is the mechanic of how complex things turn into something simple that I can understand. I thrive on the challenge of breaking down problems and building solutions to them.",
  "I love to travel and the sights are only a part of it. I also love observing how different unique cultures around the world structure their systems to solve the exact same puzzles but with their own spin.",
  "This drives my non-linear approach to problem-solving. From my experiences, the best solutions come from connecting unexpected dots. I treat building software as solving a puzzle with my own spin.",
];

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
        <div className="relative z-10 grid w-full gap-[clamp(2rem,5vw,4rem)] md:grid-cols-[minmax(13rem,18rem)_minmax(0,1fr)]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">About</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,2.65rem)] font-semibold text-zinc-50">A practical engineering lens.</h2>
          </div>

          <div className="max-w-[70rem] justify-self-center space-y-8 text-center md:-translate-x-[clamp(3rem,8vw,9rem)] md:space-y-10">
            {sentences.map((sentence) => (
              <RevealSentence key={sentence} sentence={sentence} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RevealSentence({
  sentence,
}: Readonly<{
  sentence: string;
}>) {
  return (
    <p className="about-reveal text-[clamp(1.35rem,9vw,2.75rem)] leading-snug text-zinc-200 md:text-[clamp(1.6rem,4.5vw,2.75rem)]">
      {sentence}
    </p>
  );
}
