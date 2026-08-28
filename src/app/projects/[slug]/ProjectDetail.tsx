import { DevlifyCaseStudy } from "@/components/sections/DevlifyCaseStudy";
import { ElaraCaseStudy } from "@/components/sections/ElaraCaseStudy";
import type { Project } from "@/lib/projects";

export function ProjectDetail({ project }: Readonly<{ project: Project }>) {
  if (project.slug === "elara-ai") {
    return <ElaraCaseStudy project={project} />;
  }

  return <DevlifyCaseStudy project={project} />;
}
