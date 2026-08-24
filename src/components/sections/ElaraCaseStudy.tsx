import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  Clock3,
  Code2,
  Database,
  ExternalLink,
  FileCheck2,
  GitCommitHorizontal,
  Github,
  Layers3,
  LockKeyhole,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  TestTube2,
} from "lucide-react";

import type { Project } from "@/lib/projects";

import styles from "./ElaraCaseStudy.module.css";

const proofPoints = [
  { value: "13", label: "controlled workflow stages", icon: Layers3 },
  { value: "462", label: "named tests", icon: TestTube2 },
  { value: "76", label: "development commits", icon: GitCommitHorizontal },
  { value: "Jun-Aug", label: "2026 build timeline", icon: Clock3 },
];

const workflow = [
  {
    index: "01",
    title: "Decompose",
    copy: "Turn one submission into atomic claims, research questions, and explicit evidence needs.",
  },
  {
    index: "02",
    title: "Discover",
    copy: "Search required primary, contradiction, and attribution paths before adaptive expansion.",
  },
  {
    index: "03",
    title: "Preserve",
    copy: "Store exact passages, source snapshots, timestamps, versions, and provenance.",
  },
  {
    index: "04",
    title: "Assess",
    copy: "Classify evidence with model assistance while deterministic calculations retain authority.",
  },
  {
    index: "05",
    title: "Audit",
    copy: "Require typed output and complete citation coverage before a report can be published.",
  },
];

const trustBoundaries = [
  {
    icon: LockKeyhole,
    title: "Server-side secrets",
    copy: "Provider, database, storage, auth, and tracing credentials never enter the browser.",
  },
  {
    icon: ShieldCheck,
    title: "Untrusted evidence",
    copy: "Retrieved pages cannot rewrite instructions, scoring formulas, credentials, or verdict rules.",
  },
  {
    icon: Network,
    title: "Network safety",
    copy: "Protocol, DNS, redirect, private-address, port, size, type, and time checks protect retrieval.",
  },
  {
    icon: Database,
    title: "Durable truth",
    copy: "PostgreSQL remains authoritative when Redis queues, locks, caches, or progress streams expire.",
  },
  {
    icon: FileCheck2,
    title: "Fail-closed reports",
    copy: "Missing evidence, invalid structured output, or incomplete citation coverage cannot become complete.",
  },
  {
    icon: Code2,
    title: "Deterministic authority",
    copy: "The browser presents final scores and eligibility; it never recomputes them client-side.",
  },
];

const limitations = [
  "No independent accuracy benchmark is claimed while human-reviewed annotations and thresholds remain pending.",
  "Paywalls, robots restrictions, deleted pages, inaccessible PDFs, and unsupported formats can limit coverage.",
  "Provider latency and availability vary; the personal demo carries no latency or uptime service-level objective.",
  "Assessments are time-bounded and may change when sources, corrections, or evidence change.",
  "The owner-controlled demo uses one EC2 host with manual recovery, not high availability or enterprise on-call.",
];

type ProjectImageProps = {
  alt: string;
  caption: string;
  className?: string;
  priority?: boolean;
  src: string;
};

function ProjectImage({ alt, caption, className, priority, src }: Readonly<ProjectImageProps>) {
  return (
    <figure className={`${styles.projectImage} ${className ?? ""}`}>
      <div className={styles.projectImageCanvas}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          unoptimized
          sizes="(max-width: 760px) 100vw, (max-width: 1200px) 92vw, 1280px"
          className={styles.containImage}
        />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function SectionHeading({ eyebrow, title, copy }: Readonly<{ eyebrow: string; title: string; copy?: string }>) {
  return (
    <header className={styles.sectionHeading}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <p className={styles.sectionIntro}>{copy}</p> : null}
    </header>
  );
}

export function ElaraCaseStudy({ project }: Readonly<{ project: Project }>) {
  const technology = project.technology ?? [{ title: "Technology", items: project.stack }];

  return (
    <article className={styles.page}>
      <a className={styles.skipLink} href="#elara-main">
        Skip to case study
      </a>

      <nav className={styles.topBar} aria-label="Project navigation">
        <Link href="/#projects" className={styles.backLink}>
          <ArrowLeft aria-hidden="true" />
          Back to portfolio
        </Link>
        <p>
          Andrew L. <span>/ Elara.ai</span>
        </p>
        <a className={styles.topCta} href={project.links.live} target="_blank" rel="noreferrer">
          Live demo
          <ArrowUpRight aria-hidden="true" />
        </a>
      </nav>

      <main id="elara-main">
        <section className={styles.hero} aria-labelledby="elara-title">
          <div className={styles.heroMeta}>
            <p>Portfolio case study / August 2026</p>
            <p>Sole contributor / Full-stack + AI systems</p>
          </div>

          <div className={styles.heroGrid}>
            <header className={styles.heroCopy}>
              <p className={styles.kicker}>
                <Sparkles aria-hidden="true" />
                Agentic hybrid RAG
              </p>
              <h1 id="elara-title">Elara.ai</h1>
              <p className={styles.heroStatement}>Evidence should survive the answer.</p>
              <p className={styles.heroDescription}>{project.description}</p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href={project.links.live} target="_blank" rel="noreferrer">
                  Explore the demo
                  <ExternalLink aria-hidden="true" />
                </a>
                <a className={styles.secondaryButton} href={project.links.github} target="_blank" rel="noreferrer">
                  <Github aria-hidden="true" />
                  View source
                </a>
              </div>
            </header>

            <div className={styles.heroVisual}>
              <div className={styles.browserBar} aria-hidden="true">
                <span />
                <span />
                <span />
                <p>elara-ai-web.vercel.app</p>
              </div>
              <div className={styles.heroImage}>
                <Image
                  src="/images/elara/elara-report-ui.webp"
                  alt="Elara report workspace showing a transit claim supported with limitations and a citation-audited report overview"
                  fill
                  priority
                  sizes="(max-width: 980px) 94vw, 52vw"
                  className={styles.coverImage}
                />
              </div>
              <div className={styles.auditBadge}>
                <CheckCircle2 aria-hidden="true" />
                <span>
                  Citation audit
                  <strong>Passed</strong>
                </span>
              </div>
            </div>
          </div>

          <div className={styles.proofStrip} aria-label="Project proof points">
            {proofPoints.map(({ value, label, icon: Icon }) => (
              <div key={label}>
                <Icon aria-hidden="true" />
                <p>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.manifesto} id="problem">
          <div className={styles.manifestoLead}>
            <p className={styles.darkEyebrow}>01 / Product boundary</p>
            <h2>Fluency is not evidence.</h2>
            <p>
              A polished answer can conceal weak, missing, circular, or context-free evidence. Elara evaluates one submitted item against evidence available at a recorded time—and preserves the path from conclusion back to exact passage.
            </p>
          </div>

          <div className={styles.boundaryGrid}>
            <div>
              <span>Not a lie detector</span>
              <p>It evaluates a bounded claim or document, not a person’s permanent honesty.</p>
            </div>
            <div>
              <span>No credibility score</span>
              <p>Source identity never becomes a permanent reputation score for a publisher.</p>
            </div>
            <div>
              <span>Missing ≠ false</span>
              <p>Unavailable or insufficient evidence stays distinct from evidence that contradicts a claim.</p>
            </div>
          </div>
        </section>

        <section className={styles.lightSection} id="workflow">
          <SectionHeading
            eyebrow="02 / Controlled workflow"
            title="Language understanding. Deterministic authority."
            copy="The model helps interpret evidence; durable artifacts, typed state, exact coverage, reproducible arithmetic, and citation audit decide what can be published."
          />

          <ol className={styles.workflowList}>
            {workflow.map((stage) => (
              <li key={stage.index}>
                <p>{stage.index}</p>
                <div>
                  <h3>{stage.title}</h3>
                  <p>{stage.copy}</p>
                </div>
                <CircleDot aria-hidden="true" />
              </li>
            ))}
          </ol>

          <ProjectImage
            src="/images/elara/elara-architecture.webp"
            alt="Elara system architecture showing the browser, FastAPI boundary, verification worker, external inputs, and durable data plane"
            caption="System design — FastAPI is privileged, PostgreSQL is durable truth, Redis is transient, and the browser only presents the final result."
          />
        </section>

        <section className={styles.gallerySection} id="evidence">
          <SectionHeading
            eyebrow="03 / Evidence in the interface"
            title="Every conclusion keeps its receipts."
            copy="The UI is designed for inspection: atomic claims, supporting and contradicting evidence, exact passages, retrieval timestamps, calculations, and snapshots remain connected."
          />

          <ProjectImage
            src="/images/elara/elara-walkthrough.webp"
            alt="A representative transit claim moving through decomposition, retrieval, comparison, calculation, and citation audit beside the Elara report UI"
            caption="Representative walkthrough — privacy-safe product data traces one claim from decomposition to a citation-audited report."
            className={styles.wideImage}
          />

          <div className={styles.imageGrid}>
            <ProjectImage
              src="/images/elara/elara-evidence.webp"
              alt="Elara evidence views showing supporting and contradicting passages alongside the exact source record"
              caption="Support and contradiction stay visible together, and every factual report sentence resolves to an exact stored passage."
            />
            <ProjectImage
              src="/images/elara/elara-scoring.webp"
              alt="Elara deterministic scoring view showing supporting weight 66, contradicting weight 34, and a supported-with-limitations label"
              caption="A worked score outside the model — dependency multipliers discount repeated reporting before evidence contributes."
            />
          </div>
        </section>

        <section className={styles.outcomesSection} id="outcomes">
          <SectionHeading
            eyebrow="04 / Engineering outcomes"
            title="Measured boundaries, honest claims."
            copy="Instrumentation exposed where time and failure really lived. Model-backed classification and citation auditing dominated latency; deterministic scoring took 0.09 seconds and numerical audit 0.06 seconds in the measured Standard run."
          />

          <div className={styles.outcomeHighlights}>
            <article>
              <span>Search policy</span>
              <strong>60 → 18</strong>
              <p>70% lower Standard first-phase target while mandatory primary and contradiction paths remain.</p>
            </article>
            <article>
              <span>Failure learned</span>
              <strong>HTTP 200 ≠ success</strong>
              <p>A response can arrive successfully and still fail the typed output contract required for durable completion.</p>
            </article>
            <article>
              <span>Validation surface</span>
              <strong>462 tests</strong>
              <p>120 API, 238 worker, 97 web, 6 evaluation, and one full-stack acceptance flow.</p>
            </article>
          </div>

          <div className={styles.imageGrid}>
            <ProjectImage
              src="/images/elara/elara-outcomes.webp"
              alt="Elara engineering outcomes with measured model and citation latency, a typed-output failure, and reduced search targets"
              caption="One measured Standard run and the optimization decisions it informed."
            />
            <ProjectImage
              src="/images/elara/elara-validation.webp"
              alt="Elara validation summary with API, worker, web, evaluation, and full-stack acceptance test counts"
              caption="Repository gates and owner validation make the demo credible without pretending it is an independent benchmark."
            />
          </div>
        </section>

        <section className={styles.securitySection} id="security">
          <SectionHeading
            eyebrow="05 / Security + integrity"
            title="Trust boundaries are product features."
            copy="Evidence retrieval is an adversarial surface. Elara keeps untrusted content outside control logic and makes durable, authorized state the basis of every completed report."
          />

          <div className={styles.securityGrid}>
            {trustBoundaries.map(({ icon: Icon, title, copy }, index) => (
              <article key={title}>
                <div>
                  <Icon aria-hidden="true" />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.buildSection} id="build">
          <div className={styles.buildIntro}>
            <p className={styles.eyebrow}>06 / Built end to end</p>
            <h2>One contributor. The whole path.</h2>
            <p>
              I owned product strategy, UX, the design system, application architecture, evidence workflow, retrieval security, tests, deployment, and documentation from first boundary to hosted demonstration.
            </p>
          </div>

          <div className={styles.technologyGrid}>
            {technology.map((group, index) => (
              <article key={group.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{group.title}</h3>
                <p>{group.items.join(" · ")}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.limitationsSection} id="scope">
          <div>
            <p className={styles.darkEyebrow}>07 / Scope + tradeoffs</p>
            <h2>Feature-complete does not mean finished forever.</h2>
            <p>
              The hosted experience is owner-validated for a low-traffic personal demo. Its limitations remain visible because clear boundaries are part of trustworthy engineering.
            </p>
          </div>
          <ul>
            {limitations.map((limitation) => (
              <li key={limitation}>
                <Search aria-hidden="true" />
                <span>{limitation}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.finalCta}>
          <div>
            <p className={styles.darkEyebrow}>Evidence first, by design</p>
            <h2>See the citation-audited archive.</h2>
            <p>
              The read-only demo presents 12 completed full-version reports and a working verifier interface without accepting new public requests.
            </p>
          </div>
          <div className={styles.finalActions}>
            <a href={project.links.live} target="_blank" rel="noreferrer">
              Open Elara.ai demo
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={project.links.github} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" />
              Browse the source
            </a>
          </div>
        </section>
      </main>
    </article>
  );
}
