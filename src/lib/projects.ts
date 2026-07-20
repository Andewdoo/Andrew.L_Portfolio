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
  intro?: string[];
  linkLabel?: string;
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
  pipeline?: {
    description: string;
    label: string;
  }[];
  pipelineDetail?: {
    overview: string;
    stages: {
      agents: string[];
      description: string;
      name: string;
      output: string;
    }[];
  };
  problem: string;
  slug: string;
  stack: string[];
  technology?: {
    items: string[];
    title: string;
  }[];
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
    slug: "elara-ai",
    title: "Elara.ai",
    status: "featured",
    category: "AI Evidence Verification Platform",
    description: "An evidence-management platform that evaluates claims against timestamped sources and produces citation-audited reports with reproducible provenance.",
    hook: "An agentic RAG pipeline that evaluates a specific claim against timestamped evidence, then produces a transparent, citation-backed assessment.",
    intro: [
      "I built Elara because misinformation spreads quickly while careful verification takes time, context, and care. I wanted a portfolio project that tackled a problem I genuinely care about—not a copied or easy build.",
      "Elara is not a lie detector. A user submits a claim, and the system researches it, preserves the relevant evidence, and makes the result reviewable instead of merely sounding confident.",
    ],
    stack: ["Next.js", "FastAPI", "PostgreSQL", "pgvector", "Redis", "Celery", "Python", "DeepSeek"],
    technology: [
      {
        title: "Languages",
        items: ["TypeScript", "JavaScript", "Python", "SQL"],
      },
      {
        title: "Frontend",
        items: ["React", "Next.js", "Tailwind CSS", "React Hook Form", "Zod", "TanStack Query", "Zustand", "Recharts", "XYFlow"],
      },
      {
        title: "AI & Verification",
        items: ["DeepSeek", "Brave Search", "LangGraph", "Deterministic Citation Checks"],
      },
      {
        title: "Backend Services",
        items: ["Node.js", "FastAPI", "Celery", "SQLAlchemy", "Alembic", "Firebase Authentication"],
      },
      {
        title: "Data Layer",
        items: ["PostgreSQL", "Supabase", "pgvector", "Redis"],
      },
      {
        title: "Cloud & Storage",
        items: ["Vercel", "AWS EC2", "S3-Compatible Object Storage", "Docker"],
      },
      {
        title: "Quality & Observability",
        items: ["Sentry", "Pytest", "Ruff", "MyPy", "Git", "GitHub"],
      },
    ],
    url: "elara.ai",
    problem:
      "Claims, quotations, and source documents are difficult to evaluate when supporting evidence is scattered, time-sensitive, and hard to trace. Elara brings evidence retrieval, analysis, and source provenance into a single auditable workflow.",
    challengeHighlights: ["retrieved evidence and timestamped source provenance", "asynchronous verification stages and durable report state", "citation checks that expose insufficient evidence instead of overstating certainty"],
    architecture: [
      "Next.js powers the public Lite Mode RAG experience and the report workspace, with curated evidence retrieved from Supabase Postgres and pgvector.",
      "FastAPI provides the Full Mode boundary for authentication, validation, durable reads, exports, server-sent events, and Celery job enqueueing.",
      "Background workers coordinate retrieval, extraction, classification, scoring, numerical audits, synthesis, citation audits, and revision using PostgreSQL and Redis-backed queues.",
    ],
    caseStudySections: [
      {
        eyebrow: "Evidence-First Design",
        title: "Reports that show how a conclusion was reached.",
        items: [
          "Designed report workflows around timestamped evidence and preserved provenance so findings can be reproduced and reviewed.",
          "Made insufficient-evidence behaviour explicit rather than treating every input as something that can be conclusively verified.",
          "Separated the product from credibility scoring or absolute-truth claims to keep its scope grounded and transparent.",
        ],
      },
      {
        eyebrow: "Two Demo Modes",
        title: "A lightweight public experience with a deeper verifier architecture.",
        items: [
          "Built Lite Mode as a stored-corpus cited RAG experience for the public demo, backed by curated Supabase pgvector evidence.",
          "Designed Full Mode for more complete verification workflows, including durable reports, exports, real-time progress, and queued worker stages.",
          "Kept provider credentials and privileged data access on the server side to preserve a secure application boundary.",
        ],
      },
    ],
    pipeline: [
      {
        label: "1. Plan the research",
        description: "A planning stage breaks the claim into research questions and identifies the evidence needed to assess it fairly.",
      },
      {
        label: "2. Retrieve and preserve",
        description: "Retrieval stages find relevant sources, capture timestamped evidence, and retain provenance so the report can be reproduced later.",
      },
      {
        label: "3. Extract and assess",
        description: "Specialized stages extract source material, classify evidence, and score its relevance, quality, and limits against the submitted claim.",
      },
      {
        label: "4. Audit before publishing",
        description: "Citation checks and revision stages validate the report, surface weak or incomplete evidence, and prevent unsupported conclusions from being published.",
      },
    ],
    pipelineDetail: {
      overview:
        "Elara moves a claim through a chain of specialized agents instead of relying on a single model response. Each stage leaves behind structured evidence and a clear handoff for the next one.",
      stages: [
        {
          name: "Research planner",
          agents: ["Research Planning Agent"],
          description: "Turns the submitted claim into focused research questions, key terms, and the evidence needed to assess it fairly.",
          output: "Research plan",
        },
        {
          name: "Source retrieval agent",
          agents: ["Source Retrieval Agent", "Evidence Snapshot Agent"],
          description: "Finds relevant sources, records when they were accessed, and preserves snapshots and provenance for later review.",
          output: "Timestamped source set",
        },
        {
          name: "Evidence extraction agent",
          agents: ["Evidence Extraction Agent", "Evidence Classification Agent"],
          description: "Pulls claim-relevant passages, classifies what each source supports or contradicts, and separates durable evidence from temporary context.",
          output: "Structured evidence record",
        },
        {
          name: "Assessment and synthesis agent",
          agents: ["Scoring Agent", "Numerical Audit Agent", "Report Synthesis Agent"],
          description: "Weighs coverage, conflicts, and gaps in the evidence, then drafts an assessment that makes uncertainty visible rather than overstating certainty.",
          output: "Evidence-based draft",
        },
        {
          name: "Citation audit and revision agent",
          agents: ["Citation Audit Agent", "Revision Agent"],
          description: "Checks that every material conclusion is supported by the cited evidence, flags weak or incomplete support, and sends the report back for revision when needed.",
          output: "Publish-ready report",
        },
      ],
    },
    demoNotes: [
      "Lite Mode retrieves curated evidence chunks and synthesizes cited answers for a bounded public corpus.",
      "Full Mode models an end-to-end verification pipeline from evidence retrieval through citation-audited reports.",
      "The project prioritizes traceability, source presentation, and clear handling of uncertainty.",
    ],
    metric: {
      label: "Public Demo",
      value: "Lite Mode",
      detail: "A curated, citation-aware RAG experience demonstrates the report workspace and insufficient-evidence behaviour without exposing the full verifier workflow.",
    },
    takeaway: "Elara.ai demonstrates how to turn a multi-stage AI workflow into a transparent product: evidence stays traceable, uncertainty is visible, and every report is designed to be reviewed rather than merely trusted.",
    links: {
      github: "https://github.com/Andewdoo/Elara.ai",
      live: "https://github.com/Andewdoo/Elara.ai",
    },
    linkLabel: "Source code",
    visual: {
      accent: "from-sky-200/80",
      secondary: "to-indigo-500/30",
      pattern: "bg-[radial-gradient(circle_at_22%_22%,rgba(125,211,252,0.36),transparent_30%),radial-gradient(circle_at_78%_72%,rgba(129,140,248,0.26),transparent_34%),linear-gradient(135deg,rgba(30,41,59,0.5),transparent_58%)]",
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
