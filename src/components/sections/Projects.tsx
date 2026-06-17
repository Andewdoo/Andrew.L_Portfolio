"use client";

import Link from "next/link";
import { ArrowUpRight, GalleryVerticalEnd } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";

import { SectionTrace } from "@/components/animations/SectionTrace";
import { projects, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

function Badge({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <span className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs font-medium text-zinc-300">
      {children}
    </span>
  );
}

export function SafariMockup({
  className,
  project,
  size = "card",
}: Readonly<{ className?: string; project: Project; size?: "card" | "hero" }>) {
  return (
    <motion.div
      // Shared element transition note:
      // This layoutId is intentionally stable between the home-card mockup and the
      // project detail mockup. The RouteTransitionProvider wraps pages in a
      // LayoutGroup, so Framer can interpolate this browser surface as the route
      // changes. Next's native ViewTransition API is still not exposed here as a
      // project-level component, so this is the App Router-friendly fallback.
      layoutId={`project-browser-${project.slug}`}
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/40",
        className
      )}
      transition={{ type: "spring", stiffness: 110, damping: 24 }}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-zinc-900/80 px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-yellow-300/80" />
        <span className="size-2.5 rounded-full bg-emerald-400/80" />
        <div className="ml-3 min-w-0 flex-1 truncate rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[0.6875rem] text-zinc-500">
          {project.url}
        </div>
      </div>
      <div className={cn("relative overflow-hidden bg-black", size === "hero" ? "aspect-[16/9]" : "aspect-[16/10]")}>
        <motion.div
          className={cn("absolute inset-0", project.visual.pattern)}
          animate={{ scale: [1, 1.06, 1], x: ["0%", "-2%", "0%"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-[clamp(0.75rem,5%,1.25rem)] rounded-xl border border-white/10 bg-black/35 backdrop-blur-sm" />
        <div className="absolute left-[clamp(1rem,7%,2rem)] right-[clamp(1rem,7%,2rem)] top-[clamp(1rem,7%,2rem)] grid gap-[clamp(0.5rem,1.8vw,0.75rem)]">
          <div className={cn("h-3 w-[min(7rem,42%)] rounded-full bg-gradient-to-r", project.visual.accent, project.visual.secondary)} />
          <div className="h-2 w-4/5 rounded-full bg-white/18" />
          <div className="h-2 w-3/5 rounded-full bg-white/12" />
        </div>
        <div className="absolute bottom-[clamp(1rem,7%,1.75rem)] left-[clamp(1rem,7%,1.75rem)] right-[clamp(1rem,7%,1.75rem)] grid grid-cols-3 gap-[clamp(0.5rem,2vw,0.75rem)]">
          {[0, 1, 2].map((item) => (
            <motion.div
              key={item}
              className="h-[clamp(2.5rem,8vw,4rem)] rounded-xl border border-white/10 bg-black/45"
              animate={{ opacity: [0.55, 0.9, 0.55] }}
              transition={{ delay: item * 0.4, duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: Readonly<{ index: number; project: Project }>) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 180, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-9, 9]);

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: "2.125rem", rotateX: 5 }}
      whileInView={{ opacity: 1, y: "0rem", rotateX: 0 }}
      viewport={{ once: true, margin: "-14%" }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: "easeOut" }}
      style={{ perspective: "75rem" }}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      className="h-full"
    >
      <Link href={`/projects/${project.slug}`} className="group block h-full outline-none">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          whileHover={{ y: "-0.625rem" }}
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
          className="flex h-full flex-col rounded-3xl border border-zinc-900 bg-zinc-950/70 p-4 shadow-2xl shadow-black/30"
        >
          <SafariMockup project={project} />
          <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <motion.h3
                  // The title has its own layoutId so the text can subtly settle
                  // into the detail page heading alongside the browser mockup.
                  layoutId={`project-title-${project.slug}`}
                  className="text-[clamp(1.25rem,3vw,1.5rem)] font-semibold text-zinc-50"
                >
                  {project.title}
                </motion.h3>
                <p className="mt-3 text-sm leading-6 text-zinc-500">{project.description}</p>
              </div>
              <span className="mt-1 rounded-full border border-zinc-800 p-2 text-zinc-400 transition-colors group-hover:border-zinc-600 group-hover:text-white">
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-auto flex flex-wrap gap-2 pt-5">
              {project.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="projects" ref={sectionRef} className="relative scroll-mt-28 px-[clamp(1rem,4vw,1.5rem)] pb-[clamp(5rem,10vw,7rem)] pt-[clamp(4rem,8vw,5rem)] md:pt-14">
      <SectionTrace
        targetRef={sectionRef}
        icon={<GalleryVerticalEnd className="size-6" aria-hidden="true" />}
        side="left"
        className="left-0 lg:left-[max(0rem,calc(50%_-_40rem))]"
      />
      <div className="relative z-10 mx-auto max-w-7xl md:pl-[clamp(4rem,8vw,5rem)]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:pt-[1.125rem]">
          <div>
            <p className="ml-1 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">Projects</p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2.25rem,6vw,3.75rem)] font-semibold leading-tight text-zinc-50">
              Sneak peeks into software projects.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-zinc-500">
            Each card frames a technical idea as an engineering system: clear data flow, practical
            constraints, readable interfaces, and a path from prototype to usable tool.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),1fr))] gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
