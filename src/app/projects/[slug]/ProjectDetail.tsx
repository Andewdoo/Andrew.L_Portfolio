"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ElaraCaseStudy } from "@/components/sections/ElaraCaseStudy";
import { ProjectSummary } from "@/components/sections/ProjectSummary";
import type { Project } from "@/lib/projects";

export function ProjectDetail({ project }: Readonly<{ project: Project }>) {
  if (project.slug === "elara-ai") {
    return <ElaraCaseStudy project={project} />;
  }

  return (
    <article className="min-h-screen bg-black px-[clamp(1rem,3.8vw,5rem)] pb-[clamp(5rem,10vw,7.5rem)] pt-6">
      <div className="sticky top-6 z-40 flex w-full">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black/70 px-4 py-2 text-sm font-medium text-zinc-300 shadow-2xl shadow-black/30 backdrop-blur-xl transition-colors hover:border-zinc-600 hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Portfolio
        </Link>
      </div>

      <div className="mt-[clamp(4rem,10vw,5rem)] w-full">
        <ProjectSummary project={project} />
      </div>
    </article>
  );
}
