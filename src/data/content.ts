export const owner = {
  name: "Andrew Liu",
  role: "Software Engineer",
  intro: "I build full-stack software with a focus on learning and making AI research easier to verify.",
  email: "ahanliu0311@gmail.com",
  github: "https://github.com/Andewdoo",
  linkedin: "https://www.linkedin.com/in/andrew-liu-13099336a",
  resume: "/Andrew-Liu-Resume.pdf",
};

export const panelTitles = {
  about: "About me",
  projects: "Projects",
  skills: "Skills",
  resume: "Resume",
  contact: "Contact",
  photos: "Off the desk",
};

export type Panel = keyof typeof panelTitles;

export const projects = [
  {
    title: "Devlify",
    summary: "An AI learning workspace with subject-specific tutors, file analysis, and saved conversations.",
    contribution: "I built the tutoring interface and a FastAPI backend that saves each learner’s chat history.",
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
    image: "/images/devlify-workspace-preview.png",
    alt: "Devlify learning workspace with subject navigation and a chat composer",
    demo: "https://devlify-eight.vercel.app/",
    code: "https://github.com/Andewdoo/Devlify",
  },
  {
    title: "Elara.ai",
    summary: "A claim verification workspace that turns retrieved evidence into a report with traceable citations.",
    contribution: "I designed the verification pipeline to preserve sources, flag insufficient evidence, and audit citations.",
    stack: ["Next.js", "FastAPI", "pgvector", "Celery", "Redis"],
    image: "/images/elara-report-ui-cropped.png",
    alt: "Elara.ai report showing an evidence-based assessment and source citations",
    demo: "https://elara-ai-web.vercel.app/",
    code: "https://github.com/Andewdoo/Elara.ai",
  },
];

export const skillGroups = [
  { title: "Languages", items: ["TypeScript", "JavaScript", "Python", "C++", "SQL", "MATLAB"] },
  { title: "Frontend", items: ["React", "Next.js", "TanStack Query", "Tailwind CSS"] },
  { title: "Backend", items: ["Node.js", "FastAPI", "SQLAlchemy", "Celery"] },
  { title: "Data & infrastructure", items: ["PostgreSQL", "MongoDB", "pgvector", "Redis", "Docker", "AWS"] },
  { title: "AI workflows", items: ["LangGraph", "LangChain", "DeepSeek"] },
  { title: "Tooling", items: ["Git", "GitHub", "Sentry", "Pytest", "Ruff"] },
];

export const photos = [
  {
    title: "Toronto, from the water",
    caption: "A view of the city skyline from a canoe.",
    alt: "Toronto skyline across the water from a canoe",
    image: "/images/offline-toronto-canoe.webp",
    thumbnail: "/scene/shelf-toronto.webp",
  },
  {
    title: "Sunset on the slopes",
    caption: "The last light of the day on a ski slope.",
    alt: "Skiers and snowboarders on a snowy slope at sunset",
    image: "/images/offline-01-02.webp",
    thumbnail: "/scene/shelf-ski.webp",
  },
  {
    title: "A night in Chongqing",
    caption: "The city’s skyline lit up after dark.",
    alt: "Chongqing skyline glowing at night",
    image: "/images/offline-02-13.webp",
    thumbnail: "/scene/shelf-chongqing.webp",
  },
];
