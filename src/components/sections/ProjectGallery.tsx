"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import type { Project } from "@/lib/projects";

type ProjectGalleryProps = {
  slides: NonNullable<Project["gallery"]>;
};

export function ProjectGallery({ slides }: Readonly<ProjectGalleryProps>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <section className="border-y border-zinc-900 py-[clamp(2.5rem,6vw,4.5rem)]">
      <div className="mb-6 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Product Screens</p>
          <h2 className="mt-3 text-[clamp(1.7rem,4vw,3rem)] font-semibold leading-tight text-white">A closer look at Devlify in motion.</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToPrevious}
            className="grid size-11 place-items-center rounded-full border border-zinc-800 text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
            aria-label="Show previous Devlify screenshot"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="grid size-11 place-items-center rounded-full border border-zinc-800 text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
            aria-label="Show next Devlify screenshot"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
        <div className="overflow-hidden rounded-[1.25rem] border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40">
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-950 px-4 py-3">
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-yellow-300/80" />
            <span className="size-2.5 rounded-full bg-emerald-400/80" />
            <div className="ml-3 min-w-0 flex-1 truncate rounded-full border border-zinc-800 bg-black px-3 py-1 text-[0.6875rem] text-zinc-500">
              {activeSlide.title}
            </div>
          </div>
          <div className="bg-black p-3 sm:p-4">
            <div className="overflow-hidden rounded-xl border border-white/15 bg-zinc-950 shadow-inner shadow-white/5">
              <div className="relative aspect-[2/1] bg-zinc-950">
                <img src={activeSlide.src} alt={activeSlide.alt} className="size-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between border-y border-zinc-900 py-6 lg:min-h-full">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
              {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </p>
            <h3 className="mt-4 text-[clamp(1.45rem,3vw,2.4rem)] font-semibold leading-tight text-white">{activeSlide.title}</h3>
            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400">{activeSlide.caption}</p>
          </div>

          <div className="mt-8 grid gap-4">
            <div className="flex flex-wrap gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                    index === activeIndex
                      ? "border-white bg-white text-black"
                      : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white"
                  }`}
                  aria-label={`Show ${slide.title}`}
                  aria-current={index === activeIndex}
                >
                  {slide.title}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {slides.map((slide, index) => (
                <button
                  key={`${slide.src}-dot`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${index === activeIndex ? "w-10 bg-white" : "w-2.5 bg-zinc-800 hover:bg-zinc-600"}`}
                  aria-label={`Show ${slide.title}`}
                  aria-current={index === activeIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
