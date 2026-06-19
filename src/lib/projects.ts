export type Project = {
  architecture: string[];
  caseStudySections?: {
    eyebrow: string;
    title: string;
    items: string[];
  }[];
  category: string;
  challengeHighlights: string[];
  demoNotes: string[];
  description: string;
  gallery?: {
    alt: string;
    caption: string;
    src: string;
    title: string;
  }[];
  hook: string;
  links: {
    github: string;
    live: string;
  };
  embedUrl?: string;
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
    slug: "devlify",
    title: "Devlify",
    status: "featured",
    category: "AI Learning Chatbot Platform",
    description: "An AI learning workspace for subject-specific tutoring, file-aware analysis, persistent chat history, and current-information retrieval.",
    hook: "A full-stack tutoring platform that helps students ask questions, analyze files, keep chat context, and get clearer guidance across core subjects.",
    stack: ["React", "Next.js", "FastAPI", "TypeScript", "Python", "PostgreSQL", "CSS", "Vercel"],
    url: "devlify-eight.vercel.app",
    embedUrl: "https://devlify-eight.vercel.app/portfolio/general-workspace",
    problem:
      "Students often jump between separate tools for tutoring, file review, current facts, and saved study history. Devlify brings those workflows into one workspace with subject-specific chat modes, reusable commands, and persistent per-user context.",
    challengeHighlights: ["subject-specific tutoring, file-aware analysis, and saved chat history", "typed command workflows and workspace-aware chat state", "reasoning-mode routing and quick-action controls"],
    architecture: [
      "React and Next.js power the learning workspace, subject navigation, browser file previews, CSS styling, and Vercel deployment.",
      "FastAPI routes, Python services, asyncpg, and PostgreSQL persist user chat state with per-user isolation across retained conversations.",
      "AI API routes verify Firebase JWTs, enforce per-IP rate limits and body-size caps, protect shared backend secrets, and render sanitized Markdown.",
    ],
    caseStudySections: [
      {
        eyebrow: "Command Workflows",
        title: "Reusable tutor actions for each subject.",
        items: [
          "Implemented typed prompt contracts for subject-specific commands so each tutor mode can route requests consistently.",
          "Added quick-action controls for analysis, alternate methods, cheat sheets, and deeper reasoning without forcing users to rewrite prompts.",
          "Managed workspace-aware chat state so the active subject, reasoning mode, and conversation context stay aligned.",
        ],
      },
      {
        eyebrow: "Persistent Backend",
        title: "Chat history that survives the session.",
        items: [
          "Designed a FastAPI backend with asyncpg and PostgreSQL for storing per-user conversations.",
          "Retained 10 chats and 20 messages per chat to keep the workspace useful without letting history grow unbounded.",
          "Kept chat records isolated by user so saved study context stays scoped to the authenticated account.",
        ],
      },
      {
        eyebrow: "File Analysis",
        title: "Multi-modal input for real student work.",
        items: [
          "Supported PDFs, DOCX files, spreadsheets, text documents, and images through browser previews and upload handling.",
          "Serialized files with base64 payloads, extracted content server-side, and passed structured context into AI requests.",
          "Used OpenAI Vision fallback for image-heavy or visually dependent material.",
        ],
      },
      {
        eyebrow: "Current Context",
        title: "Recent facts and finance prompts get sourced context.",
        items: [
          "Resolved finance symbols and recent-fact requests before model calls when current context was needed.",
          "Queried Yahoo Finance and search providers, then injected sourced context into the prompt.",
          "Separated current-information retrieval from ordinary tutoring prompts so simple questions stay fast.",
        ],
      },
    ],
    demoNotes: [
      "General workspace preview for asking questions, pasting work, or attaching a file.",
      "Subject navigation for switching between general, programming, math, science, business, and finance help.",
      "Reasoning controls and quick actions for deeper analysis, alternate solution methods, and concise study aids.",
    ],
    gallery: [
      {
        alt: "Devlify Math Tutor answering an integration question in dark mode",
        caption: "Deep Reasoning mode breaks a math prompt into fastest, standard, and intuitive solution paths while preserving the active chat context.",
        src: "/images/devlify-math-integrals.png",
        title: "Math Tutor Deep Reasoning",
      },
      {
        alt: "Devlify Finance Tutor showing a current Meta stock answer with chart and analysis",
        caption: "Finance prompts use current-context retrieval to inject sourced market data, charts, and recent-fact analysis into the response.",
        src: "/images/devlify-finance-meta.png",
        title: "Finance Tutor Retrieval",
      },
      {
        alt: "Devlify Math Tutor explaining a basis in linear algebra in dark mode",
        caption: "Subject-specific tutoring keeps long-form explanations readable with structured sections, math notation, and quick follow-up actions.",
        src: "/images/devlify-linear-algebra.png",
        title: "Linear Algebra Tutor",
      },
    ],
    metric: {
      label: "Retained History",
      value: "10 x 20",
      detail: "10 chats and 20 messages per chat retained per isolated user workspace.",
    },
    takeaway: "Devlify shows a complete AI learning platform: a polished chat workspace, full-stack persistence, multi-modal file handling, hardened API routes, and retrieval-aware tutoring for current-context questions.",
    links: {
      github: "https://github.com/",
      live: "https://devlify-eight.vercel.app/",
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
