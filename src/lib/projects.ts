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
    slug: "semantic-search-lab",
    title: "Semantic Search Lab",
    description: "A vector-search prototype for retrieving relevant knowledge from messy document collections.",
    stack: ["Python", "Embeddings", "Vector DB", "Next.js"],
    url: "search.andrew.dev",
    problem:
      "Keyword search misses meaning when documents use different language for the same idea. This project explores embeddings, chunking strategy, and ranked retrieval for more useful knowledge discovery.",
    architecture: [
      "A preprocessing stage chunks source documents, normalizes metadata, and prepares text for embedding.",
      "Vector similarity search retrieves candidate passages before a lightweight ranking layer orders results.",
      "A Next.js inspection surface shows query intent, retrieved chunks, and confidence cues for debugging.",
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
    slug: "prediction-dashboard",
    title: "Prediction Dashboard",
    description: "A model monitoring workspace for tracking prediction quality, drift, and operational signals.",
    stack: ["PyTorch", "Pandas", "Evaluation", "React"],
    url: "models.andrew.dev",
    problem:
      "A model is only useful if its behavior stays visible after training. This concept focuses on monitoring accuracy, drift, and failure modes once predictions become part of a workflow.",
    architecture: [
      "Evaluation summaries compare baseline, validation, and recent production-like batches.",
      "Drift indicators highlight feature distribution changes before they become silent model failures.",
      "Operational cards separate model metrics from infrastructure status so issues are easier to triage.",
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
    slug: "agent-workbench",
    title: "Agent Workbench",
    description: "An experimental workspace for testing tool-using AI agents against structured tasks.",
    stack: ["LLMs", "Tool Use", "TypeScript", "Eval Harness"],
    url: "agents.andrew.dev",
    problem:
      "AI agents can appear capable while failing quietly on multi-step tasks. This project explores how task traces, tool outputs, and repeatable evals can make behavior easier to inspect.",
    architecture: [
      "A task runner records prompts, tool calls, intermediate reasoning artifacts, and final outputs.",
      "Evaluation cases compare expected behaviors against observed traces instead of only judging final text.",
      "A review surface helps identify brittle instructions, missing context, and recurring failure patterns.",
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
