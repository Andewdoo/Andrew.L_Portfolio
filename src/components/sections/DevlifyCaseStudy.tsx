import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Calculator,
  Code2,
  FlaskConical,
  Globe2,
  Github,
  ShieldCheck,
} from "lucide-react";

import type { Project } from "@/lib/projects";

import styles from "./DevlifyCaseStudy.module.css";

const projectMetrics = [
  { value: "6", label: "workspace modes" },
  { value: "5", label: "subject contracts" },
  { value: "17", label: "application pages" },
  { value: "24", label: "shared UI components" },
];

const productProblems = [
  {
    title: "Context resets",
    copy: "Learners repeatedly explain their subject, notation, level, and goal before useful work begins.",
  },
  {
    title: "Tools fragment",
    copy: "Questions, documents, calculations, and code reviews often live in separate products and histories.",
  },
  {
    title: "Depth is unclear",
    copy: "A quick hint and a careful derivation are different jobs, but most chat interfaces only have 1 action.",
  },
  {
    title: "Answers drift",
    copy: "Each subject has its own conventions, from mathematical working to finance risk and code root cause.",
  },
];

const learningLoop = [
  { title: "Start", copy: "Ask a question or open a subject hub." },
  { title: "Focus", copy: "Choose the workspace that fits the subject." },
  { title: "Add context", copy: "Paste work or attach a file." },
  { title: "Choose depth", copy: "Use Normal or Deep Reasoning." },
  { title: "Continue", copy: "Follow up inside the retained thread." },
];

const subjectContracts = [
  {
    icon: Code2,
    title: "Programming",
    copy: "Find root cause, surface risk, then provide corrected code or concrete next steps.",
  },
  {
    icon: Calculator,
    title: "Mathematics",
    copy: "Define variables, show the working, verify the result, and compare methods.",
  },
  {
    icon: FlaskConical,
    title: "Science",
    copy: "Separate observations, assumptions, formulas, controls, and conclusions.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Business",
    copy: "Frame objectives, constraints, options, risks, implementation, and measures.",
  },
  {
    icon: Globe2,
    title: "Finance",
    copy: "Keep assumptions, calculations, freshness, and risk visible in the response.",
  },
];

const contextPipeline = [
  { title: "Attach", copy: "Text, code, PDF, DOCX, or spreadsheet" },
  { title: "Validate", copy: "Check type, size, preview, and readable content" },
  { title: "Extract", copy: "Collect text and PDF page images when available" },
  { title: "Guide", copy: "Wrap the request in subject and reasoning instructions" },
  { title: "Respond", copy: "Return Markdown, equations, code, and next steps" },
];

const technology = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    title: "Frontend",
    items: ["Next.js", "React", "tailwindCSS", "KaTeX"],
  },
  {
    title: "Backend Services",
    items: ["Next.js API routes", "FastAPI", "Firebase Authentication", "Request limits"],
  },
  {
    title: "AI & File Analysis",
    items: ["DeepSeek", "OpenAI Vision"],
  },
  {
    title: "Retrieval & Current Context",
    items: ["Web search providers", "Yahoo Finance"],
  },
  {
    title: "Data Layer",
    items: ["PostgreSQL", "asyncpg"],
  },
  {
    title: "Cloud & Delivery",
    items: ["Vercel"],
  },
];

const securityBoundaries = [
  "Signed identity is verified before protected routes run.",
  "Request windows and body limits execute before model work.",
  "Model, search, database, and service secrets stay server-side.",
  "Chats are stored, retained, and deleted within the verified user partition.",
];

const tradeoffs = [
  "Model output remains learning support. Important work still needs verification.",
  "Current web and finance context depends on configured external providers.",
  "Visual PDF analysis requires an optional vision-capable model key.",
];

type ProductCaptureProps = {
  alt: string;
  caption: string;
  className?: string;
  priority?: boolean;
  src: string;
};

function ProductCapture({ alt, caption, className, priority, src }: Readonly<ProductCaptureProps>) {
  return (
    <figure className={`${styles.capture} ${className ?? ""}`}>
      <div className={styles.captureFrame}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(max-width: 760px) 94vw, (max-width: 1200px) 88vw, 1280px"
          className={styles.captureImage}
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export function DevlifyCaseStudy({ project }: Readonly<{ project: Project }>) {
  return (
    <article className={styles.page}>
      <a className={styles.skipLink} href="#devlify-main">
        Skip to case study
      </a>

      <nav className={styles.topBar} aria-label="Project navigation">
        <Link href="/#projects" className={styles.backLink}>
          <ArrowLeft aria-hidden="true" />
          Back to portfolio
        </Link>
        <p>
          Andrew L. <span>/ Devlify</span>
        </p>
        <a className={styles.topCta} href={project.links.live} target="_blank" rel="noreferrer">
          Live product
          <ArrowUpRight aria-hidden="true" />
        </a>
      </nav>

      <main id="devlify-main">
        <section className={styles.hero} aria-labelledby="devlify-title">
          <div className={styles.heroCopy}>
            <h1 id="devlify-title">Devlify</h1>
            <p className={styles.heroStatement}>One workspace for deeper, subject-aware learning.</p>
            <p className={styles.heroDescription}>{project.description}</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href={project.links.live} target="_blank" rel="noreferrer">
                Explore Devlify
                <ArrowUpRight aria-hidden="true" />
              </a>
              <a className={styles.secondaryButton} href={project.links.github} target="_blank" rel="noreferrer">
                <Github aria-hidden="true" />
                View source
              </a>
            </div>
          </div>

          <ProductCapture
            src="/images/devlify-math-integrals.png"
            alt="Devlify Math workspace explaining an integration problem with Deep Reasoning enabled"
            caption="Math workspace with retained chat history, structured equations, and depth controls."
            className={styles.heroCapture}
            priority
          />
        </section>

        <dl className={styles.metricBand} aria-label="Project scope">
          {projectMetrics.map((metric) => (
            <div key={metric.label}>
              <dd>{metric.value}</dd>
              <dt>{metric.label}</dt>
            </div>
          ))}
        </dl>

        <section className={styles.problemSection} aria-labelledby="problem-title">
          <div className={styles.problemIntro}>
            <h2 id="problem-title">Tailored for Learning.</h2>
            <p>
              Devlify turns general AI chat into a consistent learning environment. The interface stays familiar while the instructional contract changes with the subject.
            </p>
          </div>

          <div className={styles.problemList}>
            {productProblems.map((problem) => (
              <article key={problem.title}>
                <h3>{problem.title}</h3>
                <p>{problem.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.experienceSection} aria-labelledby="experience-title">
          <header className={styles.sectionHeading}>
            <h2 id="experience-title">How it works.</h2>
            <p>Subject, input, and reasoning depth change the guidance behind one reusable interaction.</p>
          </header>

          <ol className={styles.learningLoop}>
            {learningLoop.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>

          <ProductCapture
            src="/images/devlify-linear-algebra.png"
            alt="Devlify Math workspace explaining the basis of a vector space"
            caption="The subject contract shapes the response while navigation and follow-up behavior stay consistent."
          />
        </section>

        <section className={styles.subjectSection} aria-labelledby="subjects-title">
          <div className={styles.subjectCopy}>
            <h2 id="subjects-title">Subjects</h2>
            <p>Each subject defines what a useful answer should make explicit.</p>

            <div className={styles.subjectList}>
              {subjectContracts.map(({ icon: Icon, title, copy }) => (
                <article key={title}>
                  <Icon aria-hidden="true" />
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <ProductCapture
            src="/images/devlify-finance-meta.png"
            alt="Devlify Finance workspace showing current Meta market data and analysis"
            caption="Finance responses keep assumptions, calculations, freshness, and risk visible."
            className={styles.subjectCapture}
          />
        </section>

        <section className={styles.contextSection} aria-labelledby="context-title">
          <header className={styles.sectionHeading}>
            <h2 id="context-title">The Pipeline.</h2>
            <p>One pipeline turns files and pasted work into structured, subject-aware responses.</p>
          </header>

          <ol className={styles.contextPipeline}>
            {contextPipeline.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.systemSection} aria-labelledby="system-title">
          <div className={styles.systemIntro}>
            <h2 id="system-title">The Stack.</h2>
          </div>

          <div className={styles.systemBody}>
            <ol className={styles.systemLayers}>
              {technology.map((group, index) => (
                <li key={group.title}>
                  <span className={styles.layerNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{group.title}</h3>
                  <p className={styles.technologyItems}>{group.items.join(" / ")}</p>
                </li>
              ))}
            </ol>

            <div className={styles.boundaryPair}>
              <div className={styles.tradeoffs}>
                <h3>What stays deliberately bounded</h3>
                <ul>
                  {tradeoffs.map((tradeoff) => (
                    <li key={tradeoff}>{tradeoff}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.securityBlock}>
                <div>
                  <ShieldCheck aria-hidden="true" />
                  <h3>Security is part of the product behavior.</h3>
                  <p>The browser never receives model keys or the backend shared secret.</p>
                </div>
                <ul>
                  {securityBoundaries.map((boundary) => (
                    <li key={boundary}>{boundary}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <footer className={styles.finalSection}>
          <div>
            <p>Independent product build</p>
            <h2>Better answers begin with better context.</h2>
          </div>
          <a href={project.links.live} target="_blank" rel="noreferrer">
            Open the live product
            <ArrowUpRight aria-hidden="true" />
          </a>
        </footer>
      </main>
    </article>
  );
}
