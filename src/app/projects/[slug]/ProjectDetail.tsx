"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

import { SafariMockup } from "@/components/sections/Projects";
import type { Project } from "@/lib/projects";

function TechBadge({ children }: Readonly<{ children: string }>) {
  return (
    <span className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs font-medium text-zinc-300">
      {children}
    </span>
  );
}

export function ProjectDetail({ project }: Readonly<{ project: Project }>) {
  return (
    <article className="min-h-screen bg-black px-6 pb-28 pt-6">
      <div className="sticky top-6 z-40 mx-auto flex max-w-7xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black/70 px-4 py-2 text-sm font-medium text-zinc-300 shadow-2xl shadow-black/30 backdrop-blur-xl transition-colors hover:border-zinc-600 hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Portfolio
        </Link>
      </div>

      <div className="mx-auto mt-20 max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">Case Study</p>
            <motion.h1
              // Shared element transition note:
              // The project card uses this same layoutId for its title. When the
              // route changes, Framer connects the two text surfaces inside the
              // LayoutGroup declared in RouteTransitionProvider. If/when this app
              // adopts a native Next ViewTransition component, this is the exact
              // handoff point to replace with the framework-native transition name.
              layoutId={`project-title-${project.slug}`}
              className="mt-5 text-5xl font-semibold leading-tight text-zinc-50 md:text-7xl"
            >
              {project.title}
            </motion.h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">{project.description}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <TechBadge key={tech}>{tech}</TechBadge>
              ))}
            </div>
          </div>

          <SafariMockup project={project} size="hero" />
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="hidden lg:block" aria-label="Case study sections">
            <div className="sticky top-28 rounded-2xl border border-zinc-900 bg-zinc-950/70 p-5">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">Sections</p>
              <nav className="mt-5 grid gap-3 text-sm text-zinc-400">
                <a href="#problem" className="hover:text-white">
                  The Problem
                </a>
                <a href="#architecture" className="hover:text-white">
                  Architecture
                </a>
                <a href="#links" className="hover:text-white">
                  Links
                </a>
              </nav>
            </div>
          </aside>

          <div className="space-y-12 text-zinc-300">
            <section id="problem" className="scroll-mt-28">
              <h2 className="text-3xl font-semibold text-zinc-50">The Problem</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-400">{project.problem}</p>
            </section>

            <section id="architecture" className="scroll-mt-28">
              <h2 className="text-3xl font-semibold text-zinc-50">Architecture</h2>
              <ul className="mt-5 grid gap-4">
                {project.architecture.map((item) => (
                  <li key={item} className="rounded-2xl border border-zinc-900 bg-zinc-950/60 p-5 text-base leading-7 text-zinc-400">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section id="links" className="scroll-mt-28">
              <h2 className="text-3xl font-semibold text-zinc-50">Links</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
                >
                  <Github className="size-4" aria-hidden="true" />
                  GitHub
                </a>
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-600 hover:text-white"
                >
                  <ExternalLink className="size-4" aria-hidden="true" />
                  Live Preview
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}
