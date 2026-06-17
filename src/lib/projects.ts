export type Project = {
  architecture: string[];
  description: string;
  links: {
    github: string;
    live: string;
  };
  problem: string;
  slug: string;
  stack: string[];
  title: string;
  url: string;
  visual: {
    accent: string;
    secondary: string;
    pattern: string;
  };
};

export const projects: Project[] = [
  {
    slug: "knowledge-search-lab",
    title: "Knowledge Search Lab",
    description: "A full-stack search prototype for organizing and retrieving useful information from messy document collections.",
    stack: ["TypeScript", "Python", "Search", "Next.js"],
    url: "search.andrew.dev",
    problem:
      "Large document collections get hard to navigate when related ideas are scattered across different files, terms, and formats. This project explores organization, indexing, and ranked retrieval for more useful knowledge discovery.",
    architecture: [
      "A preprocessing stage chunks source documents, normalizes metadata, and prepares searchable records.",
      "A retrieval layer finds candidate passages before a lightweight ranking step orders results by usefulness.",
      "A Next.js inspection surface shows query context, retrieved chunks, and debugging cues for tuning the experience.",
    ],
    links: {
      github: "https://github.com/",
      live: "https://example.com/",
    },
    visual: {
      accent: "from-zinc-50/90",
      secondary: "to-zinc-500/20",
      pattern: "bg-[radial-gradient(circle_at_30%_18%,rgba(244,244,245,0.45),transparent_30%),linear-gradient(135deg,rgba(63,63,70,0.42),transparent_55%)]",
    },
  },
  {
    slug: "operations-dashboard",
    title: "Operations Dashboard",
    description: "A monitoring workspace for tracking application health, data quality, and workflow signals.",
    stack: ["React", "Pandas", "Dashboards", "APIs"],
    url: "ops.andrew.dev",
    problem:
      "Useful software needs visibility after launch. This concept focuses on surfacing health, quality, and workflow signals so issues are easier to notice, compare, and triage.",
    architecture: [
      "Summary panels compare current activity, historical baselines, and recent workflow outcomes.",
      "Data quality indicators highlight missing, delayed, or inconsistent inputs before they become larger failures.",
      "Operational cards separate product metrics from infrastructure status so issues are easier to triage.",
    ],
    links: {
      github: "https://github.com/",
      live: "https://example.com/",
    },
    visual: {
      accent: "from-cyan-200/80",
      secondary: "to-zinc-700/20",
      pattern: "bg-[linear-gradient(120deg,rgba(103,232,249,0.36),transparent_38%),radial-gradient(circle_at_76%_22%,rgba(244,244,245,0.24),transparent_32%)]",
    },
  },
  {
    slug: "automation-workbench",
    title: "Automation Workbench",
    description: "An experimental workspace for testing multi-step workflows against structured tasks.",
    stack: ["TypeScript", "Automation", "Tooling", "Eval Harness"],
    url: "tools.andrew.dev",
    problem:
      "Automations can appear successful while failing quietly on multi-step tasks. This project explores how task traces, tool outputs, and repeatable checks can make behavior easier to inspect.",
    architecture: [
      "A task runner records inputs, actions, intermediate artifacts, and final outputs.",
      "Evaluation cases compare expected behaviors against observed traces instead of only judging the final result.",
      "A review surface helps identify brittle steps, missing context, and recurring failure patterns.",
    ],
    links: {
      github: "https://github.com/",
      live: "https://example.com/",
    },
    visual: {
      accent: "from-fuchsia-200/80",
      secondary: "to-zinc-600/20",
      pattern: "bg-[radial-gradient(circle_at_26%_24%,rgba(245,208,254,0.34),transparent_30%),linear-gradient(145deg,rgba(244,244,245,0.22),transparent_48%)]",
    },
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
