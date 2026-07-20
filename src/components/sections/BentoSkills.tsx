"use client";

import { Bot, BrainCircuit, Cpu, Database, Layers3, MousePointer2 } from "lucide-react";
import { useRef } from "react";

import { SectionTrace } from "@/components/animations/SectionTrace";
import { ScrollFocusCard } from "@/components/animations/ScrollFocusCard";
import { ScrollableTechCards } from "@/components/ui/ScrollableTechCards";

const techGroups = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "C/C++", "HTML5/CSS", "MATLAB"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "React Hook Form", "Zod", "TanStack Query", "Zustand", "Recharts", "XYFlow"],
  },
  {
    title: "Backend",
    items: ["Node.js", "FastAPI", "SQLAlchemy", "Alembic", "Celery", "LangChain", "LangGraph"],
  },
  {
    title: "AI Tools",
    items: ["DeepSeek", "Codex", "Claude", "Gemini", "ChatGPT", "GitHub Copilot", "Cursor", "Brave Search"],
  },
  {
    title: "Data & Infrastructure",
    items: ["PostgreSQL", "Supabase", "pgvector", "Redis", "Firebase Auth", "AWS EC2 & S3", "Vercel", "Docker"],
  },
  {
    title: "Quality & Tooling",
    items: ["Git", "GitHub", "Sentry", "Pytest", "Ruff", "MyPy", "PyCharm", "VS Code"],
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
    <section id="stack" ref={sectionRef} className="ambient-section relative scroll-mt-28 pb-[clamp(5rem,10vw,7.5rem)] pt-[clamp(4rem,8vw,5.5rem)] md:pt-16">
      <SectionTrace
        targetRef={sectionRef}
        icon={<MousePointer2 className="size-6" aria-hidden="true" />}
        side="left"
        className="site-trace-left"
      />
      <div className="site-shell">
        <div className="relative z-10 w-full md:pl-[clamp(4rem,5vw,5rem)]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:pt-[1.125rem]">
            <div>
              <p className="ml-1 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">Skills</p>
            </div>
          </div>

          <div className="focus-card-cluster mt-[clamp(2.5rem,6vw,4rem)] grid grid-cols-1 gap-[clamp(1.25rem,2vw,2rem)] md:grid-cols-2 xl:grid-cols-4">
            <article
              className="relative min-h-[clamp(34rem,54vw,46rem)] overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/80 p-[clamp(1.75rem,4vw,2.5rem)] md:col-span-2 xl:col-span-4"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(244,244,245,0.16),transparent_36%),radial-gradient(circle_at_78%_72%,rgba(113,113,122,0.16),transparent_34%)]" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="grid size-12 place-items-center rounded-xl border border-zinc-800 bg-black text-zinc-100">
                    <Layers3 className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-7 text-[clamp(3rem,7vw,5.25rem)] font-semibold leading-tight text-zinc-50">Tech Stack</h3>
                  <p className="mt-5 max-w-3xl text-[clamp(1.05rem,1.5vw,1.25rem)] leading-8 text-zinc-400">
                    A full-stack toolkit for building dependable applications—from polished React
                    interfaces and AI workflows to verification pipelines, databases, and cloud deployment.
                  </p>
                </div>

                <ScrollableTechCards groups={techGroups} />
              </div>
            </article>

            {skillCards.map((card) => {
              const Icon = card.icon;

              return (
                <ScrollFocusCard
                  key={card.title}
                  className="min-h-[clamp(20rem,25vw,23rem)] rounded-2xl border border-zinc-900 bg-black p-[clamp(1.75rem,2.5vw,2.5rem)]"
                >
                  <div className="grid size-14 place-items-center rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-8 text-[clamp(1.5rem,2vw,1.85rem)] font-semibold text-zinc-50">{card.title}</h3>
                  <p className="mt-5 text-[clamp(1.05rem,1.35vw,1.2rem)] leading-8 text-zinc-500">{card.body}</p>
                </ScrollFocusCard>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}
