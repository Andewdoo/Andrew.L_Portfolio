import type { ReactNode } from "react";

import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

function MetricBlock({ project }: Readonly<{ project: Project }>) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-2xl shadow-black/30">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">{project.metric.label}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-none text-white">{project.metric.value}</p>
        <p className="max-w-xs text-sm leading-6 text-zinc-500">{project.metric.detail}</p>
      </div>
    </div>
  );
}

function SummarySection({ children, eyebrow, title }: Readonly<{ children: ReactNode; eyebrow: string; title: string }>) {
  return (
    <section className="border-t border-zinc-900 pt-7">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">{eyebrow}</p>
      <h2 className="mt-3 text-[clamp(1.35rem,2.5vw,1.9rem)] font-semibold leading-tight text-zinc-50">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function BrowserFrame({ project }: Readonly<{ project: Project }>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/40 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/70 px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-yellow-300/80" />
        <span className="size-2.5 rounded-full bg-emerald-400/80" />
        <div className="ml-3 min-w-0 flex-1 truncate rounded-full border border-zinc-800 bg-black/70 px-3 py-1 text-[0.6875rem] text-zinc-500">
          {project.url}
        </div>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        {/* Swap this placeholder for a real screenshot, autoplaying video, or canvas demo when the project asset is ready. */}
        <div className={cn("absolute inset-0", project.visual.pattern)} />
        <div className="absolute inset-5 rounded-xl border border-white/10 bg-black/55 backdrop-blur-sm">
          <div className="grid h-full place-items-center p-8 text-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Visual Placeholder</p>
              <p className="mt-3 max-w-md text-base leading-7 text-zinc-300">Project screenshot, product walkthrough, or interactive canvas demo.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoPanel({ project }: Readonly<{ project: Project }>) {
  return (
    <div className="rounded-2xl border border-zinc-900 bg-zinc-950/60 p-5">
      <div className="flex items-center justify-between gap-4 border-b border-zinc-900 pb-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Demo Surface</p>
          <p className="mt-2 text-sm text-zinc-400">Replace these rows with live interaction states or media annotations.</p>
        </div>
        <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">Prototype</span>
      </div>
      <div className="mt-5 grid gap-3">
        {project.demoNotes.map((note, index) => (
          <div key={note} className="flex items-start gap-3 rounded-xl border border-zinc-900 bg-black/35 p-4">
            <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border border-zinc-800 text-[0.65rem] text-zinc-500">
              {index + 1}
            </span>
            <p className="text-sm leading-6 text-zinc-400">{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectSummary({ project }: Readonly<{ project: Project }>) {
  return (
    <section className="grid gap-[clamp(2.5rem,5vw,5.5rem)] lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-start">
      <div className="grid gap-5 lg:sticky lg:top-28">
        <BrowserFrame project={project} />
        <DemoPanel project={project} />
      </div>

      <div className="space-y-[clamp(2.5rem,5vw,4rem)]">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">{project.category}</p>
          <h1 className="mt-5 text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.96] text-white">{project.title}</h1>
          <p className="mt-8 max-w-3xl text-[clamp(1.25rem,2.3vw,1.65rem)] leading-[1.55] text-zinc-200">{project.hook}</p>
        </header>

        <SummarySection eyebrow="Engineering Challenge" title="Making retrieval feel fast, inspectable, and useful.">
          <p className="max-w-3xl text-[clamp(1rem,1.5vw,1.1rem)] leading-8 text-zinc-500">
            The core challenge was turning <span className="font-medium text-zinc-50">{project.challengeHighlights[0]}</span> into a calm interface where{" "}
            <span className="font-medium text-zinc-50">{project.challengeHighlights[1]}</span> remains transparent, and{" "}
            <span className="font-medium text-zinc-50">{project.challengeHighlights[2]}</span> gives the user enough signal to trust each result.
          </p>
        </SummarySection>

        <SummarySection eyebrow="Architecture & Execution" title="System decisions that keep the experience clear.">
          <div className="grid gap-3 sm:grid-cols-2">
            {project.architecture.map((item) => (
              <div key={item} className="rounded-2xl border border-zinc-900 bg-zinc-950/60 p-5 transition-colors hover:border-zinc-800">
                <p className="text-sm leading-7 text-zinc-400">{item}</p>
              </div>
            ))}
          </div>
        </SummarySection>

        <MetricBlock project={project} />

        <SummarySection eyebrow="Takeaway" title="What this project proves.">
          <p className="max-w-3xl text-base leading-8 text-zinc-400">{project.takeaway}</p>
        </SummarySection>
      </div>
    </section>
  );
}
