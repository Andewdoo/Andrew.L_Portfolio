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

function PipelineBrief({ project }: Readonly<{ project: Project }>) {
  const detail = project.pipelineDetail;

  if (!detail) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-sky-200/15 bg-[radial-gradient(circle_at_18%_12%,rgba(56,189,248,0.16),transparent_28%),linear-gradient(145deg,rgba(15,23,42,0.9),rgba(9,9,11,0.96)_58%)] p-[clamp(1.25rem,3vw,2rem)] shadow-2xl shadow-sky-950/15">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <Eyebrow>Agent Pipeline</Eyebrow>
          <h2 className="mt-2 text-[clamp(1.5rem,2.5vw,2rem)] font-semibold text-white">From claim to reviewable report.</h2>
        </div>
        <span className="rounded-full border border-sky-200/20 bg-sky-200/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-sky-100">Elara.ai</span>
      </div>

      <p className="mt-5 text-sm leading-7 text-zinc-300">{detail.overview}</p>

      <ol className="mt-7 grid gap-0">
        {detail.stages.map((stage, index) => (
          <li key={stage.name} className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 pb-5 last:pb-0">
            {index < detail.stages.length - 1 ? <span className="absolute left-[1.05rem] top-9 h-[calc(100%-1.25rem)] border-l border-sky-100/15" /> : null}
            <span className="relative z-10 grid size-8 place-items-center rounded-full border border-sky-200/20 bg-slate-950 text-xs font-semibold text-sky-100">{String(index + 1).padStart(2, "0")}</span>
            <div className="min-w-0 border-b border-white/10 pb-5 last:border-b-0 last:pb-0">
              <p className="text-sm font-semibold text-white">{stage.name}</p>
              <p className="mt-1.5 text-sm leading-6 text-zinc-400">{stage.description}</p>
              <div className="mt-2 grid gap-1.5 text-xs font-medium uppercase tracking-[0.13em] text-sky-200/80">
                <p>Handoff: {stage.output}</p>
                <p className="text-zinc-500">Agents: {stage.agents.join(" · ")}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-xl border border-amber-200/15 bg-amber-200/[0.05] p-4 text-sm leading-6 text-zinc-300">
        <span className="font-semibold text-amber-100">Publish gate: </span>
        A report is not treated as an answer until its supporting citations have been checked; weak, conflicting, or missing evidence remains visible in the final assessment.
      </div>
    </section>
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
        <span className="block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">{project.linkLabel ?? "Live Site"}</span>
        <span className="mt-2 block text-lg font-semibold leading-tight text-white">Open {project.title}</span>
      </span>
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-zinc-800 text-zinc-300 transition-colors group-hover:border-zinc-500 group-hover:text-white">
        <ArrowUpRight className="size-5" aria-hidden="true" />
      </span>
    </a>
  );
}

export function ProjectSummary({ project }: Readonly<{ project: Project }>) {
  const technology = project.technology ?? [{ title: "Technology", items: project.stack }];

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
            {project.intro ? (
              <div className="mt-7 grid max-w-3xl gap-4 text-base leading-8 text-zinc-400">
                {project.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}
          </header>

        </div>
      </div>

      {project.pipeline ? (
        <section className="grid gap-[clamp(2.5rem,5vw,5.5rem)] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <PipelineBrief project={project} />
          </div>
          <div className="space-y-[clamp(2.5rem,5vw,4rem)]">
            <SummarySection eyebrow="How Elara Works" title="A traceable pipeline from claim to citation-audited report.">
              <div className="grid gap-4 sm:grid-cols-2">
                {project.pipeline.map((step) => (
                  <div key={step.label} className="border-t border-zinc-800 pt-4">
                    <p className="text-sm font-semibold text-zinc-100">{step.label}</p>
                    <p className="mt-2 text-sm leading-7 text-zinc-400">{step.description}</p>
                  </div>
                ))}
              </div>
            </SummarySection>

            <SummarySection eyebrow="Product Scope" title="A focused workflow for turning complex work into clear, useful outcomes.">
              <p className="max-w-3xl text-base leading-8 text-zinc-400">{project.problem}</p>
            </SummarySection>

            <SummarySection eyebrow="Engineering Challenge" title="Making a complex AI workflow clear, focused, and trustworthy.">
              <p className="max-w-3xl text-[clamp(1rem,1.5vw,1.1rem)] leading-8 text-zinc-500">
                The core challenge was turning <span className="font-medium text-zinc-50">{project.challengeHighlights[0]}</span> into a calm interface where{" "}
                <span className="font-medium text-zinc-50">{project.challengeHighlights[1]}</span> stay easy to navigate, and{" "}
                <span className="font-medium text-zinc-50">{project.challengeHighlights[2]}</span> give learners enough signal to keep moving.
              </p>
            </SummarySection>
          </div>
        </section>
      ) : null}

      {project.gallery ? <ProjectGallery slides={project.gallery} /> : null}

      <section className="grid gap-8 border-b border-zinc-900 pb-[clamp(2.5rem,6vw,4.5rem)] lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <Eyebrow>Build Shape</Eyebrow>
          <h2 className="mt-3 text-[clamp(1.8rem,4vw,3.5rem)] font-semibold leading-tight text-white">A full-stack product, not a thin AI wrapper.</h2>
        </div>
        <div className="grid gap-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {technology.map((group) => (
              <div key={group.title} className="border-t border-zinc-800 pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{group.title}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <span key={tech} className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-sm font-medium text-zinc-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
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
