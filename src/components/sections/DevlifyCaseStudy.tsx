import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Calculator,
  Code2,
  FlaskConical,
  Globe2,
  LockKeyhole,
  Paperclip,
  ShieldCheck,
} from "lucide-react";

import type { Project } from "@/lib/projects";

import styles from "./DevlifyCaseStudy.module.css";

const productStats = [
  { value: "6", label: "workspace modes" },
  { value: "5", label: "subject contracts" },
  { value: "2", label: "reasoning levels" },
  { value: "1", label: "shared workspace shell" },
];

const productProblems = [
  {
    title: "Context resets",
    copy: "Learners repeatedly explain the subject, level, notation, and goal before useful work begins.",
  },
  {
    title: "Tools fragment",
    copy: "Questions, documents, calculations, and code reviews often live in separate products and separate histories.",
  },
  {
    title: "Depth is unclear",
    copy: "A quick hint and a careful derivation are different jobs, but most chat interfaces expose one send action.",
  },
  {
    title: "Answers drift",
    copy: "Each subject has its own conventions, from math steps and science assumptions to finance risk and code root cause.",
  },
];

const learningLoop = [
  { title: "Start", copy: "Ask a question or open a subject hub." },
  { title: "Focus", copy: "Choose a workspace for the subject." },
  { title: "Bring context", copy: "Paste work or attach a file." },
  { title: "Choose depth", copy: "Select Normal or Deep Reasoning." },
  { title: "Iterate", copy: "Follow up, compare methods, and retain the thread." },
];

const architecture = [
  {
    title: "Browser experience",
    copy: "React workspace, authentication state, file previews, Markdown, and KaTeX.",
  },
  {
    title: "Next.js boundary",
    copy: "Firebase token checks, request limits, and centralized prompt contracts.",
  },
  {
    title: "Model and current data",
    copy: "DeepSeek, optional vision analysis, search providers, and market context.",
  },
  {
    title: "FastAPI chat service",
    copy: "Service trust, model routing, conversation continuity, and bounded retention.",
  },
  {
    title: "PostgreSQL",
    copy: "Per-user chats with ordered, indexed message history.",
  },
  {
    title: "Firebase Auth",
    copy: "Email and password identity backed by signed ID tokens.",
  },
];

const subjectContracts = [
  {
    icon: Code2,
    title: "Programming",
    copy: "Diagnose root cause, surface bugs and risks, then provide corrected code or concrete next steps.",
  },
  {
    icon: Calculator,
    title: "Mathematics",
    copy: "Define variables, show the working, verify the answer, and compare methods when requested.",
  },
  {
    icon: FlaskConical,
    title: "Science",
    copy: "Separate observations, assumptions, formulas, variables, controls, and conclusions.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Business",
    copy: "Frame objectives, constraints, options, risks, recommendations, implementation, and success measures.",
  },
  {
    icon: Globe2,
    title: "Finance",
    copy: "State assumptions, show calculations, keep risk visible, and separate learning support from advice.",
  },
];

const fileSteps = [
  { title: "Attach", copy: "Text, code, PDF, DOCX, or spreadsheet" },
  { title: "Validate", copy: "Type, size, preview, and readable content" },
  { title: "Extract", copy: "Text plus PDF page images when available" },
  { title: "Contract", copy: "Subject and reasoning instructions wrap the request" },
  { title: "Respond", copy: "Markdown, equations, code, and next steps" },
];

const securityBoundaries = [
  {
    title: "Verified identity",
    copy: "Protected Next.js routes verify token signatures, audience, issuer, expiry, and subject.",
  },
  {
    title: "Rate and size limits",
    copy: "Per-IP windows and body limits run before model work begins.",
  },
  {
    title: "Server-side secrets",
    copy: "Model, search, database, and backend credentials remain off the client.",
  },
  {
    title: "Service trust",
    copy: "Next.js forwards the verified user ID to FastAPI with a shared backend secret.",
  },
  {
    title: "Per-user persistence",
    copy: "Chats are queried, retained, and deleted inside the verified user partition.",
  },
  {
    title: "Bounded memory",
    copy: "Chat and message caps prevent unbounded history and prompt expansion.",
  },
];

const outcomes = [
  { value: "17", label: "application pages" },
  { value: "5", label: "protected API route groups" },
  { value: "24", label: "shared UI components" },
  { value: "2", label: "backend service layers" },
];

const technology = [
  {
    layer: "Interface",
    items: ["Next.js 16", "React 19", "TypeScript", "Markdown", "KaTeX"],
  },
  {
    layer: "Identity and API",
    items: ["Firebase Authentication", "Firebase ID tokens", "Next.js API routes", "Request limits"],
  },
  {
    layer: "Services and data",
    items: ["FastAPI", "Python", "PostgreSQL", "Persistent chat history"],
  },
  {
    layer: "AI and files",
    items: ["DeepSeek", "OpenAI Vision", "PDF and DOCX extraction", "Spreadsheet parsing"],
  },
  {
    layer: "Current context",
    items: ["Web search providers", "Yahoo Finance", "Request-time prompt enrichment"],
  },
  {
    layer: "Delivery",
    items: ["Vercel", "Responsive browser interface", "Protected service boundaries"],
  },
];

const tradeoffs = [
  "Model output remains learning support. Important work still needs verification.",
  "Current web and finance context depends on configured external providers.",
  "Visual PDF analysis requires an optional vision-capable model key.",
  "Chat retention is intentionally capped. A full learning-management system remains outside scope.",
  "Educator dashboards, grading workflows, and learning-outcome benchmarks remain outside the current build.",
  "The current deployment is sized for a portfolio audience and carries no institutional availability target.",
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
          sizes="(max-width: 760px) 100vw, (max-width: 1200px) 92vw, 1280px"
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
          <div className={styles.heroMeta}>
            <p>Portfolio case study / August 2026</p>
            <p>Product design + full-stack development</p>
          </div>

          <div className={styles.heroGrid}>
            <header className={styles.heroCopy}>
              <p className={styles.kicker}>
                <BrainCircuit aria-hidden="true" />
                Subject-aware AI learning
              </p>
              <h1 id="devlify-title">Devlify</h1>
              <p className={styles.heroStatement}>One workspace. Every subject. A clearer next step.</p>
              <p className={styles.heroDescription}>{project.description}</p>
              <a className={styles.primaryButton} href={project.links.live} target="_blank" rel="noreferrer">
                Explore Devlify
                <ArrowUpRight aria-hidden="true" />
              </a>
            </header>

            <ProductCapture
              src="/images/devlify-math-integrals.png"
              alt="Devlify Math workspace explaining an integration problem with Deep Reasoning enabled"
              caption="Authenticated Math workspace with retained chat history, structured equations, and depth controls."
              className={styles.heroCapture}
              priority
            />
          </div>
        </section>

        <section className={styles.overview} aria-labelledby="overview-title">
          <div className={styles.overviewCopy}>
            <p className={styles.eyebrow}>Project at a glance</p>
            <h2 id="overview-title">Learning support without the context switch.</h2>
            <p>
              Devlify turns a general AI chat into a consistent learning environment with subject-aware tools and shared interaction patterns.
            </p>
          </div>

          <div className={styles.coreIdea}>
            <p>Core product idea</p>
            <h3>A learner should keep their context when the subject changes.</h3>
            <p>
              Navigation, file input, reasoning controls, history, and visual language stay familiar while the instructional contract changes behind each answer.
            </p>
          </div>

          <dl className={styles.statLine} aria-label="Product scope">
            {productStats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={styles.problemSection} aria-labelledby="problem-title">
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Audience and product problem</p>
            <h2 id="problem-title">Generic chat is helpful. Learning needs more structure.</h2>
          </header>

          <div className={styles.problemGrid}>
            {productProblems.map((problem) => (
              <article key={problem.title}>
                <h3>{problem.title}</h3>
                <p>{problem.copy}</p>
              </article>
            ))}
          </div>

          <p className={styles.problemStatement}>
            One place to ask, attach, reason, revisit, and move between subjects while keeping the interface familiar.
          </p>
        </section>

        <section className={styles.loopSection} aria-labelledby="loop-title">
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Experience model</p>
            <h2 id="loop-title">A familiar loop, tuned to the work.</h2>
            <p>The interaction stays simple. Subject, depth, and input type change the guidance behind it.</p>
          </header>

          <ol className={styles.learningLoop}>
            {learningLoop.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>

          <div className={styles.shellLine} aria-label="Reusable workspace shell">
            <p>Reusable shell</p>
            <div><strong>Navigation</strong><span>One sidebar</span></div>
            <div><strong>Composer</strong><span>Text and files</span></div>
            <div><strong>Reasoning</strong><span>Normal or Deep</span></div>
            <div><strong>Continuity</strong><span>New and past chats</span></div>
          </div>
        </section>

        <section className={styles.architectureSection} aria-labelledby="architecture-title">
          <header className={styles.darkHeader}>
            <p>System design</p>
            <h2 id="architecture-title">A browser-first learning system with protected service boundaries.</h2>
          </header>

          <ol className={styles.architectureFlow}>
            {architecture.map((node, index) => (
              <li key={node.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{node.title}</h3>
                  <p>{node.copy}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className={styles.architectureRule}>
            <LockKeyhole aria-hidden="true" />
            The browser never receives server API keys or the backend shared secret.
          </p>
        </section>

        <section className={styles.walkthroughSection} aria-labelledby="walkthrough-title">
          <div className={styles.walkthroughCopy}>
            <p className={styles.eyebrow}>Representative walkthrough</p>
            <h2 id="walkthrough-title">One math question, supported end to end.</h2>
            <p>
              A learner can choose Math, add a worksheet, select the right depth, and continue inside one retained thread.
            </p>
            <ol>
              <li><strong>Choose Math</strong><span>The subject sets the tutoring contract.</span></li>
              <li><strong>Add the work</strong><span>Paste an equation or attach the worksheet.</span></li>
              <li><strong>Select depth</strong><span>Use Normal for speed or Deep for alternatives.</span></li>
              <li><strong>Continue</strong><span>Follow-up questions retain the workspace and thread.</span></li>
            </ol>
          </div>

          <ProductCapture
            src="/images/devlify-linear-algebra.png"
            alt="Devlify Math workspace explaining the basis of a vector space"
            caption="A subject contract shapes the answer while the shared workspace keeps navigation and follow-up behavior consistent."
          />
        </section>

        <section className={styles.subjectSection} aria-labelledby="subjects-title">
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Prompt and response design</p>
            <h2 id="subjects-title">One system, different instructional emphasis.</h2>
            <p>Each subject contract defines the structure a useful answer should follow.</p>
          </header>

          <div className={styles.subjectLayout}>
            <div className={styles.subjectList}>
              {subjectContracts.map(({ icon: Icon, title, copy }) => (
                <article key={title}>
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>

            <ProductCapture
              src="/images/devlify-finance-meta.png"
              alt="Devlify Finance workspace showing current Meta market data and analysis"
              caption="Finance guidance keeps assumptions, calculations, freshness, and risk visible in the response."
            />
          </div>
        </section>

        <section className={styles.filesSection} aria-labelledby="files-title">
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>File-aware analysis</p>
            <h2 id="files-title">The learner&apos;s material becomes first-class context.</h2>
          </header>

          <ol className={styles.fileFlow}>
            {fileSteps.map((step, index) => (
              <li key={step.title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.fileNotes}>
            <Paperclip aria-hidden="true" />
            <div>
              <h3>Input breadth with explicit boundaries.</h3>
              <p>
                Binary uploads are size-bounded, extracted text is truncated to protect request size, and visual PDF analysis depends on an optional model key.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.reasoningSection} aria-labelledby="reasoning-title">
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Reasoning and answer quality</p>
            <h2 id="reasoning-title">Speed, depth, and freshness are separate controls.</h2>
          </header>

          <div className={styles.reasoningModes}>
            <article>
              <p>Normal</p>
              <h3>Clear and direct.</h3>
              <span>Concise explanations with enough reasoning to act.</span>
            </article>
            <article>
              <p>Deep Reasoning</p>
              <h3>More deliberate.</h3>
              <span>Checks assumptions and exposes important tradeoffs.</span>
            </article>
          </div>

          <div className={styles.freshnessLine}>
            <Globe2 aria-hidden="true" />
            <h3>Freshness activates when the question needs it.</h3>
            <p>Search and market data can enrich current requests. Missing live context is surfaced instead of guessed.</p>
          </div>
        </section>

        <section className={styles.securitySection} aria-labelledby="security-title">
          <header className={styles.securityIntro}>
            <p className={styles.eyebrow}>Security and user boundaries</p>
            <h2 id="security-title">Trust boundaries shape the experience.</h2>
            <p>Identity, requests, secrets, service calls, storage, and memory all have named limits.</p>
            <ShieldCheck aria-hidden="true" />
          </header>

          <ol className={styles.securityList}>
            {securityBoundaries.map((boundary, index) => (
              <li key={boundary.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{boundary.title}</h3>
                  <p>{boundary.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.outcomesSection} aria-labelledby="outcomes-title">
          <header className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Engineering outcomes</p>
            <h2 id="outcomes-title">A broad product surface, organized around reusable boundaries.</h2>
          </header>

          <dl className={styles.outcomeLine}>
            {outcomes.map((outcome) => (
              <div key={outcome.label}>
                <dd>{outcome.value}</dd>
                <dt>{outcome.label}</dt>
              </div>
            ))}
          </dl>

          <div className={styles.enablesBlock}>
            <h3>What the architecture enables</h3>
            <ul>
              <li>A subject can change without rebuilding the shell.</li>
              <li>Persistent chat can fall back to direct analysis.</li>
              <li>Current-data enrichment activates only when needed.</li>
              <li>New file extractors can join one attachment pipeline.</li>
            </ul>
          </div>
        </section>

        <section className={styles.techSection} aria-labelledby="technology-title">
          <header className={styles.techIntro}>
            <p className={styles.eyebrow}>Technology</p>
            <h2 id="technology-title">Built across the full learning loop.</h2>
            <p>
              The stack connects a responsive learning interface to verified identity, durable chat history, file extraction, model routing, and current-data enrichment.
            </p>
          </header>

          <div className={styles.techLedger}>
            {technology.map((group, index) => (
              <article key={group.layer}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{group.layer}</h3>
                <p>{group.items.join(" / ")}</p>
              </article>
            ))}
          </div>

          <div className={styles.techSignature}>
            <strong>Core build</strong>
            <p>Next.js 16 + React 19 + TypeScript + Firebase + FastAPI + PostgreSQL + DeepSeek + OpenAI</p>
          </div>
        </section>

        <section className={styles.tradeoffsSection} aria-labelledby="tradeoffs-title">
          <div className={styles.tradeoffsHeading}>
            <p className={styles.eyebrow}>Scope and tradeoffs</p>
            <h2 id="tradeoffs-title">A useful learning workspace, with honest limits.</h2>
            <p>Clarity comes before breadth. The product centers one shared learning loop and keeps its operational boundaries visible.</p>
          </div>
          <ul>
            {tradeoffs.map((tradeoff) => (
              <li key={tradeoff}>{tradeoff}</li>
            ))}
          </ul>
        </section>

        <section className={styles.finalSection}>
          <div>
            <p>Independent product build</p>
            <h2>Better answers begin with better context.</h2>
            <span>Product framing, UX, Next.js, Firebase, FastAPI, PostgreSQL, AI, files, and current-data flows.</span>
          </div>
          <a href={project.links.live} target="_blank" rel="noreferrer">
            Open the live product
            <ArrowUpRight aria-hidden="true" />
          </a>
        </section>
      </main>
    </article>
  );
}
