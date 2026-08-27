import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
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

const deepSeekControls = [
  "Process two batches concurrently to reduce overall latency.",
  "Limit each batch to two schema attempts and discard partial stage results if any required batch fails.",
  "Handle truncated DeepSeek responses with one bounded retry and a larger token allowance.",
];

const engineeringFixes = [
  {
    title: "Transport tests failed too early",
    problem: "Redis, Celery, and S3 security tests stopped at release-revision validation.",
    fix: "Built a valid production baseline, then varied only the transport under test.",
    proof: "Intended validators reached; release revision remains independently covered.",
  },
  {
    title: "Migrations depended on CWD",
    problem: "The schema gate could not find migrations when launched from the repository root.",
    fix: "Resolved Alembic paths from apps/api/alembic.ini instead of process CWD.",
    proof: "Single-head and upgrade checks pass from root and API contexts.",
  },
  {
    title: "Legal hold returned the wrong error",
    problem: "A held report failed as storage unavailable instead of an explicit conflict.",
    fix: "Normalized UTC-aware times and moved the hold check before mutation or cleanup.",
    proof: "Active hold returns 409; records and export objects remain untouched.",
  },
  {
    title: "Legacy visibility looked permissive",
    problem: "A stale test treated visibility=public as cross-user authorization.",
    fix: "Kept access owner- or recipient-specific with scope, expiry, and revocation checks.",
    proof: "Unshared, expired, revoked, or wrong-scope access returns non-disclosing 404.",
  },
  {
    title: "Local storage assumptions leaked",
    problem: "MinIO defaults did not match private AWS S3 endpoint and addressing behavior.",
    fix: "Separated endpoint, TLS, internal discovery, and path-style configuration.",
    proof: "Regional AWS S3 uses secure transport with forced path style disabled.",
  },
  {
    title: "Retryable fetch escaped retry policy",
    problem: "A source timeout crossed the generic worker boundary and stopped the run.",
    fix: "Mapped retryable FetchError values to the typed fetch-failure boundary.",
    proof: "Focused retrieval and task regression suite passed: 37 tests.",
  },
];

const defaultCallReductions = [
  { mode: "Quick", before: "24", after: "8", reduction: "66.7% lower" },
  { mode: "Standard", before: "60", after: "18", reduction: "70% lower" },
  { mode: "Deep", before: "120", after: "36", reduction: "70% lower" },
];

const testCounts = [
  { value: "120", label: "API tests" },
  { value: "238", label: "worker tests" },
  { value: "97", label: "web tests" },
  { value: "6", label: "evaluation tests", highlighted: true },
  { value: "1", label: "full-stack acceptance" },
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

function SectionHeading({ eyebrow, title, copy }: Readonly<{ eyebrow: string; title: ReactNode; copy?: string }>) {
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
              <p className={styles.heroStatement}>Where every claim has a receipt.</p>
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
            <h2>Purpose: </h2>
            <p>
              Elara was made to combat an internet overwhelmed by contradictions, misinformation, and confusion. Give it a claim and Elara will gathers evidence, weighs what supports or challenges it, and preserves the sources and reasoning, saving you the research hassle. At its core, Elara helps you cut through the noise and make important judgments based on current evidence instead of reputation or popularity. It isn’t a lie detector or a judge of credibility but a way to give you a transparent, defensible view of what the evidence supports right now.

            </p>
          </div>

          <div className={styles.boundaryGrid}>
            <div>
              <span>Not a lie detector</span>
              <p>It evaluates a bounded claim or document, not an author's honesty.</p>
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

        <section className={`${styles.lightSection} ${styles.workflowSection}`} id="workflow">
          <SectionHeading
            eyebrow="02 / Workflow"
            title={
              <>
                <span className={styles.workflowHeadingLine}>1. AI interprets the evidence.</span>
                <span className={styles.workflowHeadingLine}>2. Rules decide what gets reported.</span>
              </>
            }
            copy="The model helps interpret evidence, durable artifacts, typed state, and exact coverage while citation audit rules decides what can be published."
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
            caption="System design: FastAPI is privileged, PostgreSQL is durable truth, Redis is transient, and the browser only presents the final result."
          />
        </section>

        <section className={`${styles.gallerySection} ${styles.evidenceSection}`} id="evidence">
          <SectionHeading
            eyebrow="03 / Evidence in the interface"
            title="Easy Interface."
            copy="The UI is designed for inspection: atomic claims, supporting and contradicting evidence, exact passages, retrieval timestamps, calculations, and snapshots remain connected."
          />

          <ProjectImage
            src="/images/elara/elara-walkthrough.webp"
            alt="A representative transit claim moving through decomposition, retrieval, comparison, calculation, and citation audit beside the Elara report UI"
            caption="Representative walkthrough: privacy-safe product data traces one claim from decomposition to a citation-audited report."
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
              caption="A worked score outside the model: dependency multipliers discount repeated reporting before evidence contributes."
            />
          </div>
        </section>

        <section className={styles.outcomesSection} id="outcomes">
          <SectionHeading
            eyebrow="04 / Engineering outcomes"
            title="The Results."
            copy="Instrumentation exposed where time and failure really lived. Model-backed classification and citation auditing dominated latency; while deterministic scoring only took 0.09 seconds and numerical audit 0.06 seconds in the measured Standard run."
          />

          <div className={styles.outcomeStory}>
            <div className={styles.latencyPanel}>
              <header>
                <h3>DeepSeek latency, before and after</h3>
                <p>The fixed path keeps the same measured work visible while making the result easier to compare.</p>
              </header>

              <div className={styles.latencyRows}>
                <article className={styles.latencyRow}>
                  <div className={styles.latencyLabel}>
                    <h4>Model-backed evidence classification</h4>
                    <p>Evidence judgment stage</p>
                  </div>
                  <div className={styles.metricState}>
                    <span>Previous Standard run</span>
                    <strong>218.9 s</strong>
                  </div>
                  <ArrowUpRight className={styles.latencyArrow} aria-hidden="true" />
                  <div className={`${styles.metricState} ${styles.metricAfter}`}>
                    <span>After fix</span>
                    <strong>46.3 s</strong>
                  </div>
                </article>

                <article className={styles.latencyRow}>
                  <div className={styles.latencyLabel}>
                    <h4>Citation audit</h4>
                    <p>Sentence-to-passage coverage stage</p>
                  </div>
                  <div className={styles.metricState}>
                    <span>Previous Standard run</span>
                    <strong>193.1 s</strong>
                  </div>
                  <ArrowUpRight className={styles.latencyArrow} aria-hidden="true" />
                  <div className={`${styles.metricState} ${styles.metricAfter}`}>
                    <span>After fix</span>
                    <strong>32.8 s</strong>
                  </div>
                </article>
              </div>

              <p className={styles.deterministicBaseline}>
                Deterministic baseline: scoring <strong>0.09 s</strong> / numerical audit <strong>0.06 s</strong>
              </p>
            </div>

            <div className={styles.deepSeekMethod}>
              <header>
                <h3>Smaller requests, bounded recovery.</h3>
                <p>Split huge DeepSeek requests into small batches.</p>
              </header>

              <dl className={styles.judgmentLimits}>
                <div>
                  <dt>Evidence classification</dt>
                  <dd>One claim-passage judgment per request.</dd>
                </div>
                <div>
                  <dt>Citation audit</dt>
                  <dd>Two sentence-passage judgments per request.</dd>
                </div>
              </dl>

              <ol className={styles.controlList}>
                {deepSeekControls.map((control) => (
                  <li key={control}>
                    <span aria-hidden="true" />
                    <p>{control}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

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
          </div>

          <section className={styles.fixesSection} aria-labelledby="engineering-fixes-title">
            <header className={styles.fixesHeading}>
              <h3 id="engineering-fixes-title">Six fixes that strengthened the release path.</h3>
              <p>Each change is tied to the failure it corrected and the proof that now guards the boundary.</p>
            </header>

            <div className={styles.fixesLedger}>
              {engineeringFixes.map((item) => (
                <article className={styles.engineeringFix} key={item.title}>
                  <h4>{item.title}</h4>
                  <dl>
                    <div>
                      <dt>Problem</dt>
                      <dd>{item.problem}</dd>
                    </div>
                    <div>
                      <dt>Fix</dt>
                      <dd>{item.fix}</dd>
                    </div>
                    <div>
                      <dt>Proof</dt>
                      <dd>{item.proof}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>

          <div className={styles.outcomeDataGrid} aria-label="Default search-call reductions and test totals">
            {defaultCallReductions.map((item) => (
              <article
                aria-label={`${item.mode} default search-call reduction`}
                className={`${styles.callReductionCard} ${item.mode === "Standard" ? styles.featuredReduction : ""}`}
                key={item.mode}
              >
                <h3>{item.mode}</h3>
                <p className={styles.reductionMeasure}>
                  <span>{item.before}</span>
                  <span aria-hidden="true">→</span>
                  <span>{item.after}</span>
                </p>
                <p className={styles.reductionPercent}>{item.reduction}</p>
                <p className={styles.reductionScope}>Maximum → first-phase target</p>
              </article>
            ))}

            {testCounts.map((item) => (
              <article aria-label={`${item.label}: ${item.value}`} className={styles.testCountCard} key={item.label}>
                <strong className={item.highlighted ? styles.highlightedTestCount : undefined}>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.securitySection} id="security">
          <SectionHeading
            eyebrow="05 / Security + integrity"
            title={
              <>
                Boundaries protect.
              </>
            }
            copy="Evidence retrieval is an adversarial surface. Elara keeps untrusted content outside control logic and makes durable, authorized state the basis of every completed report."
          />

          <ol className={styles.securityLedger} aria-label="Security and integrity boundaries">
            {trustBoundaries.map(({ icon: Icon, title, copy }, index) => (
              <li key={title}>
                <div className={styles.securityMarker}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.buildSection} id="build">
          <div className={styles.buildIntro}>
            <p className={styles.eyebrow}>06 / Built end to end</p>
            <h2>The Stack.</h2>
            <p>
              This is the full-stack implementation of the Elara platform, covering all aspects from product strategy, UX, the design system, application architecture, evidence workflow, retrieval security, tests, deployment, and documentation from first boundary to hosted demonstration.
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
            <h2>Completion.</h2>
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
            <h2>See the archive.</h2>
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
