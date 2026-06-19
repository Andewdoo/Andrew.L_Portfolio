import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { ProjectGallery } from "@/components/sections/ProjectGallery";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

function Eyebrow({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">{children}</p>
  );
}

function SummarySection({ children, className, eyebrow, title }: Readonly<{ children: ReactNode; className?: string; eyebrow: string; title: string }>) {
  return (
    <section className={cn("border-t border-zinc-900 pt-7", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-[clamp(1.35rem,2.5vw,1.9rem)] font-semibold leading-tight text-zinc-50">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function BrowserFrame({ project }: Readonly<{ project: Project }>) {
  const hasEmbed = Boolean(project.embedUrl);

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
        {hasEmbed ? (
          <iframe
            title={`${project.title} preview`}
            src={project.embedUrl}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="clipboard-read; clipboard-write; fullscreen"
            className="absolute inset-0 size-full border-0 bg-black"
          />
        ) : (
          <>
            <div className={cn("absolute inset-0", project.visual.pattern)} />
            <div className="absolute inset-5 rounded-xl border border-white/10 bg-black/55 backdrop-blur-sm">
              <div className="grid h-full place-items-center p-8 text-center">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Visual Placeholder</p>
                  <p className="mt-3 max-w-md text-base leading-7 text-zinc-300">Project screenshot, product walkthrough, or interactive canvas demo.</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function DemoPanel({ project }: Readonly<{ project: Project }>) {
  return (
    <a
      href={project.links.live}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center justify-between gap-4 border-y border-zinc-900 py-5 text-zinc-100 transition-colors hover:border-zinc-700"
    >
      <span>
        <span className="block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Live Site</span>
        <span className="mt-2 block text-lg font-semibold leading-tight text-white">Open Devlify</span>
      </span>
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-zinc-800 text-zinc-300 transition-colors group-hover:border-zinc-500 group-hover:text-white">
        <ArrowUpRight className="size-5" aria-hidden="true" />
      </span>
    </a>
  );
}

export function ProjectSummary({ project }: Readonly<{ project: Project }>) {
  return (
    <section className="space-y-[clamp(3rem,7vw,6rem)]">
      <div className="grid gap-[clamp(2.5rem,5vw,5.5rem)] lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-start">
        <div className="grid gap-5 lg:sticky lg:top-28">
          <BrowserFrame project={project} />
          <DemoPanel project={project} />
        </div>

        <div className="space-y-[clamp(2.5rem,5vw,4rem)]">
          <header>
            <Eyebrow>{project.category}</Eyebrow>
            <h1 className="mt-5 text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.96] text-white">{project.title}</h1>
            <p className="mt-8 max-w-3xl text-[clamp(1.25rem,2.3vw,1.65rem)] leading-[1.55] text-zinc-200">{project.hook}</p>
          </header>

          <SummarySection eyebrow="Product Scope" title="A single workspace for tutoring, files, history, and current context.">
            <p className="max-w-3xl text-base leading-8 text-zinc-400">{project.problem}</p>
          </SummarySection>

          <SummarySection eyebrow="Engineering Challenge" title="Making AI tutoring feel clear, focused, and subject-aware.">
            <p className="max-w-3xl text-[clamp(1rem,1.5vw,1.1rem)] leading-8 text-zinc-500">
              The core challenge was turning <span className="font-medium text-zinc-50">{project.challengeHighlights[0]}</span> into a calm interface where{" "}
              <span className="font-medium text-zinc-50">{project.challengeHighlights[1]}</span> stay easy to navigate, and{" "}
              <span className="font-medium text-zinc-50">{project.challengeHighlights[2]}</span> give learners enough signal to keep moving.
            </p>
          </SummarySection>
        </div>
      </div>

      {project.gallery ? <ProjectGallery slides={project.gallery} /> : null}

      <section className="grid gap-8 border-b border-zinc-900 pb-[clamp(2.5rem,6vw,4.5rem)] lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <Eyebrow>Build Shape</Eyebrow>
          <h2 className="mt-3 text-[clamp(1.8rem,4vw,3.5rem)] font-semibold leading-tight text-white">Full-stack AI tutoring, not a thin chat wrapper.</h2>
        </div>
        <div className="grid gap-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {project.stack.map((tech) => (
              <span key={tech} className="border-t border-zinc-800 py-3 text-sm font-medium text-zinc-200">
                {tech}
              </span>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {project.architecture.map((item) => (
              <p key={item} className="border-l border-zinc-800 pl-5 text-sm leading-7 text-zinc-400">
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      {project.caseStudySections ? (
        <section className="space-y-[clamp(2.5rem,6vw,4.5rem)]">
          {project.caseStudySections.map((section, index) => (
            <div key={section.eyebrow} className="grid gap-8 border-b border-zinc-900 pb-[clamp(2.25rem,5vw,3.75rem)] lg:grid-cols-[0.72fr_1.28fr]">
              <div className={cn("max-w-xl", index % 2 === 1 && "lg:order-2 lg:ml-auto")}>
                <Eyebrow>{section.eyebrow}</Eyebrow>
                <h2 className="mt-3 text-[clamp(1.55rem,3vw,2.4rem)] font-semibold leading-tight text-white">{section.title}</h2>
              </div>
              <div className={cn("grid gap-5 md:grid-cols-3", index % 2 === 1 && "lg:order-1")}>
                {section.items.map((item) => (
                  <p key={item} className="border-t border-zinc-800 pt-5 text-sm leading-7 text-zinc-400">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>
      ) : null}

      <section className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
        <div className="border-y border-zinc-900 py-7">
          <Eyebrow>{project.metric.label}</Eyebrow>
          <div className="mt-5 grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-end">
            <p className="text-[clamp(3rem,8vw,6rem)] font-semibold leading-none text-white">{project.metric.value}</p>
            <p className="max-w-md text-sm leading-7 text-zinc-500">{project.metric.detail}</p>
          </div>
        </div>
        <SummarySection eyebrow="Takeaway" title="What this project proves." className="border-y pb-7">
          <p className="max-w-3xl text-base leading-8 text-zinc-400">{project.takeaway}</p>
        </SummarySection>
      </section>
    </section>
  );
}
