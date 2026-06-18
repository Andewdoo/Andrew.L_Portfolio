export type Project = {
  architecture: string[];
  category: string;
  challengeHighlights: string[];
  demoNotes: string[];
  description: string;
  hook: string;
  links: {
    github: string;
    live: string;
  };
  metric: {
    label: string;
    value: string;
    detail: string;
  };
  problem: string;
  slug: string;
  stack: string[];
  status?: "featured" | "placeholder";
  takeaway: string;
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
    status: "featured",
    category: "Full-Stack Search System / Next.js + Python",
    description: "A full-stack search prototype for organizing and retrieving useful information from messy document collections.",
    hook: "A retrieval-first workspace that turns scattered files into ranked, inspectable answers with a calm developer-facing interface.",
    stack: ["TypeScript", "Python", "Search", "Next.js"],
    url: "search.andrew.dev",
    problem:
      "Large document collections get hard to navigate when related ideas are scattered across different files, terms, and formats. This project explores organization, indexing, and ranked retrieval for more useful knowledge discovery.",
    challengeHighlights: ["messy document collections", "ranked retrieval", "debuggable query context"],
    architecture: [
      "A preprocessing stage chunks source documents, normalizes metadata, and prepares searchable records.",
      "A retrieval layer finds candidate passages before a lightweight ranking step orders results by usefulness.",
      "A Next.js inspection surface shows query context, retrieved chunks, and debugging cues for tuning the experience.",
    ],
    demoNotes: [
      "Query panel placeholder for natural-language search, filters, and result inspection.",
      "Result stream placeholder for retrieved chunks, confidence indicators, and metadata.",
      "Trace panel placeholder for ranking decisions, timing, and debugging output.",
    ],
    metric: {
      label: "Retrieval Latency",
      value: "Sub-50ms",
      detail: "Target response window for cached local result ranking.",
    },
    takeaway: "Designed as an explainable search surface where the ranking behavior can be inspected, tuned, and trusted.",
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
    slug: "placeholder-operations",
    title: "N/A",
    status: "placeholder",
    category: "Project Slot",
    description: "Placeholder card reserved for a future project case study.",
    hook: "A reserved portfolio slot for the next polished project summary.",
    stack: ["N/A"],
    url: "coming-soon.andrew.dev",
    problem: "Placeholder content for a future engineering challenge.",
    challengeHighlights: ["future case study", "project demo", "technical summary"],
    architecture: ["Placeholder architecture note.", "Placeholder execution note.", "Placeholder performance note."],
    demoNotes: ["Placeholder visual area.", "Placeholder interaction note.", "Placeholder demo note."],
    metric: {
      label: "Status",
      value: "N/A",
      detail: "Reserved for a future project.",
    },
    takeaway: "This slot is intentionally held as a placeholder.",
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
    slug: "placeholder-automation",
    title: "N/A",
    status: "placeholder",
    category: "Project Slot",
    description: "Placeholder card reserved for a future project case study.",
    hook: "A reserved portfolio slot for another deep technical build.",
    stack: ["N/A"],
    url: "coming-soon.andrew.dev",
    problem: "Placeholder content for a future engineering challenge.",
    challengeHighlights: ["future case study", "project demo", "technical summary"],
    architecture: ["Placeholder architecture note.", "Placeholder execution note.", "Placeholder performance note."],
    demoNotes: ["Placeholder visual area.", "Placeholder interaction note.", "Placeholder demo note."],
    metric: {
      label: "Status",
      value: "N/A",
      detail: "Reserved for a future project.",
    },
    takeaway: "This slot is intentionally held as a placeholder.",
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
