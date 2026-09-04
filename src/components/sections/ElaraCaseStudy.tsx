import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react";

import type { Project } from "@/lib/projects";

import styles from "./ElaraCaseStudy.module.css";

const proofPoints = [
  { value: "13", label: "controlled workflow stages" },
  { value: "462", label: "named tests" },
  { value: "76", label: "development commits" },
  { value: "Jun-Aug", label: "2026 build timeline" },
];

const workflow = [
  { index: "01", title: "Decompose", copy: "Turn one submission into atomic claims, research questions, and explicit evidence needs." },
  { index: "02", title: "Discover", copy: "Search required primary, contradiction, and attribution paths before adaptive expansion." },
  { index: "03", title: "Preserve", copy: "Store exact passages, source snapshots, timestamps, versions, and provenance." },
  { index: "04", title: "Assess", copy: "Classify evidence with model assistance while deterministic calculations retain authority." },
  { index: "05", title: "Audit", copy: "Require typed output and complete citation coverage before a report can be published." },
];

const architectureDecisions = [
  ["Controlled execution", "Five reader-facing workflow steps expand into 13 persisted stages, from intake and decomposition through retrieval, scoring, synthesis, and citation audit."],
  ["Model assistance", "DeepSeek helps plan queries, interpret passages, classify evidence, and draft grounded synthesis; it does not decide final arithmetic or report eligibility."],
  ["Deterministic authority", "Python owns canonicalization, deduplication, decimal calculations, thresholds, dependency multipliers, final-label gates, and citation presence."],
  ["Durable provenance", "PostgreSQL preserves runs, sources, passages, evidence, calculations, citations, and versions. Redis and SSE carry transient work and progress."],
];

const scoringStages = [
  ["01 / Weigh each item", "Evidence quality combines relevance, directness, authority transparency, temporal fit, and extraction certainty. Dependency multipliers reduce repeated or derivative reporting."],
  ["02 / Balance the evidence", "Supporting weight P and contradicting weight N use the same weighting rules. Evidence support is calculated as 100 × P / (P + N)."],
  ["03 / Add confidence", "Coverage, quality, independence, consistency, and primary-source access contribute to confidence, while missing context and unresolved ambiguity remain visible as guardrails."],
  ["04 / Audit the report", "Every factual sentence must resolve to an allowed stored passage. If citation coverage or a completion gate fails, the report cannot complete."],
];

const walkthroughSteps = [
  ["01", "Decompose", "Funding, service frequency, and revenue source become separate claims."],
  ["02", "Retrieve", "Budget pages 14 and 22 plus an independent board record are preserved."],
  ["03", "Compare", "The budget supports; the board record exposes pending approval."],
  ["04", "Calculate", "Stored weights and deterministic gates preserve the limitation."],
  ["05", "Audit", "Four factual sentences resolve to stored passages before completion."],
];

const auditTrail = ["Verdict", "Atomic claim", "Calculation", "Evidence item", "Exact passage", "Snapshot"];

const trustBoundaries = [
  { title: "Server-side secrets", copy: "Provider, database, storage, auth, and tracing credentials never enter the browser." },
  { title: "Untrusted evidence", copy: "Retrieved pages cannot rewrite instructions, scoring formulas, credentials, or verdict rules." },
  { title: "Network safety", copy: "Protocol, DNS, redirect, private-address, port, size, type, and time checks protect retrieval." },
  { title: "Authoritiative State", copy: "PostgreSQL remains authoritative when Redis queues, locks, caches, or progress streams expire." },
  { title: "Fail-closed reports", copy: "Missing evidence, invalid structured output, or incomplete citation coverage cannot become complete." },
  { title: "Deterministic authority", copy: "The browser presents final scores and eligibility; it never recomputes them client-side." },
];

const limitations = [
  "No independent accuracy benchmark is claimed while human-reviewed annotations and thresholds remain pending.",
  "Paywalls, robots restrictions, deleted pages, inaccessible PDFs, and unsupported formats can limit coverage.",
  "Provider latency and availability vary; the personal demo carries no latency or uptime service-level objective.",
  "Assessments duration may change when sources, corrections, or evidence change.",
  "The owner-controlled demo uses one EC2 host with manual recovery, not high availability or enterprise on-call.",
];

const deepSeekControls = [
  "Process two batches concurrently to reduce overall latency.",
  "Limit each batch to two schema attempts and discard partial stage results if any required batch fails.",
  "Handle truncated DeepSeek responses with one retry and a larger token allowance.",
];

const engineeringFixes = [
  { title: "Transport tests failed too early", problem: "Redis, Celery, and S3 security tests stopped at release-revision validation.", fix: "Built a valid production baseline, then varied only the transport under test.", proof: "Intended validators reached; release revision remains independently covered." },
  { title: "Migrations depended on CWD", problem: "The schema gate could not find migrations when launched from the repository root.", fix: "Resolved Alembic paths from apps/api/alembic.ini instead of process CWD.", proof: "Single-head and upgrade checks pass from root and API contexts." },
  { title: "Legal hold returned the wrong error", problem: "A held report failed as storage unavailable instead of an explicit conflict.", fix: "Normalized UTC-aware times and moved the hold check before mutation or cleanup.", proof: "Active hold returns 409; records and export objects remain untouched." },
  { title: "Legacy visibility looked permissive", problem: "A stale test treated visibility=public as cross-user authorization.", fix: "Kept access owner- or recipient-specific with scope, expiry, and revocation checks.", proof: "Unshared, expired, revoked, or wrong-scope access returns non-disclosing 404." },
  { title: "Local storage assumptions leaked", problem: "MinIO defaults did not match private AWS S3 endpoint and addressing behavior.", fix: "Separated endpoint, TLS, internal discovery, and path-style configuration.", proof: "Regional AWS S3 uses secure transport with forced path style disabled." },
  { title: "Retryable fetch escaped retry policy", problem: "A source timeout crossed the generic worker boundary and stopped the run.", fix: "Mapped retryable FetchError values to the typed fetch-failure boundary.", proof: "Focused retrieval and task regression suite passed: 37 tests." },
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

type ElaraScreenshotProps = {
  alt: string;
  caption?: string;
  className?: string;
  label: string;
  priority?: boolean;
  src: string;
};

function ElaraScreenshot({ alt, caption, className, label, priority, src }: Readonly<ElaraScreenshotProps>) {
  return (
    <figure className={`${styles.screenshotFigure} ${className ?? ""}`}>
      <div className={styles.screenHeader} aria-hidden="true"><span>Elara.ai</span><span>{label}</span></div>
      <div className={styles.screenViewport}>
        <Image src={src} alt={alt} fill priority={priority} loading={priority ? undefined : "lazy"} quality={95} sizes="(max-width: 760px) 760px, (max-width: 1200px) 92vw, 1280px" className={styles.screenshotImage} />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

function SectionHeading({ eyebrow, title, copy }: Readonly<{ eyebrow: string; title: ReactNode; copy?: string }>) {
  return (
    <header className={styles.sectionHeading}>
      <p className={styles.sectionLabel}>{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <p className={styles.sectionIntro}>{copy}</p> : null}
    </header>
  );
}

function SystemArchitecture() {
  return (
    <section className={styles.architecture} aria-labelledby="architecture-title">
      <div className={styles.architectureHeading}><h3 id="architecture-title">The 13-stage verification agent cycle</h3><p>The five workflow steps above expand into a controlled execution path that separates model-assisted interpretation from deterministic decisions and durable system state.</p></div>
      <figure className={styles.diagramFigure}>
        <div className={`${styles.diagramScroll} ${styles.architectureDiagramScroll}`} role="region" aria-label="Scrollable Elara architecture diagram" tabIndex={0}>
          <Image src="/images/elara/architecture-cycle.png" alt="Architecture diagram of Elara's 13-stage verification cycle from authenticated intake through research, deterministic scoring, citation audit, persistence, and report delivery" width={1536} height={1024} sizes="(max-width: 820px) 64rem, (max-width: 1536px) 92vw, 1536px" className={styles.diagramImage} />
        </div>
        <figcaption>The cycle moves clockwise from authenticated intake to source discovery, secure retrieval, evidence evaluation, deterministic scoring, synthesis, and citation audit. A report completes only after the durable audit gates pass. <a href="/images/elara/architecture-cycle.png" target="_blank" rel="noreferrer">Open the full-size architecture diagram<ExternalLink aria-hidden="true" /></a></figcaption>
      </figure>
      <div className={styles.diagramSummary} aria-label="Architecture explanation">
        {architectureDecisions.map(([title, copy]) => (
          <article key={title}>
            <h4>{title}</h4>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ElaraCaseStudy({ project }: Readonly<{ project: Project }>) {
  const technology = project.technology ?? [{ title: "Technology", items: project.stack }];

  return (
    <article className={styles.page}>
      <a className={styles.skipLink} href="#elara-main">Skip to case study</a>
      <nav className={styles.topBar} aria-label="Project navigation">
        <Link href="/#projects" className={styles.backLink}><ArrowLeft aria-hidden="true" />Back to portfolio</Link>
        <p>Andrew L. <span>/ Elara.ai</span></p>
        <a className={styles.topCta} href={project.links.live} target="_blank" rel="noreferrer">Live demo<ArrowUpRight aria-hidden="true" /></a>
      </nav>

      <main id="elara-main">
        <section className={styles.hero} aria-labelledby="elara-title">
          <div className={styles.heroMeta}><p>Portfolio case study / August 2026</p><p>Sole contributor / Full-stack + AI systems</p></div>
          <div className={styles.heroGrid}>
            <header className={styles.heroCopy}>
              <p className={styles.kicker}>Agentic hybrid RAG</p>
              <h1 id="elara-title">Elara.ai</h1>
              <p className={styles.heroStatement}>Where every claim has a receipt.</p>
              <p className={styles.heroDescription}>{project.description}</p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href={project.links.live} target="_blank" rel="noreferrer">Explore the demo<ExternalLink aria-hidden="true" /></a>
                <a className={styles.secondaryButton} href={project.links.github} target="_blank" rel="noreferrer"><Github aria-hidden="true" />View source</a>
              </div>
            </header>
            <div className={styles.heroVisual}>
              <ElaraScreenshot className={styles.heroVerificationFigure} src="/images/elara/ui/new-verification.png" alt="Elara new verification form with Quick, Standard, and Deep research-depth options and an empty claim field" label="New verification" priority />
              <p className={styles.auditStatus}><span>Research depth</span><strong>Quick · Standard · Deep</strong></p>
            </div>
          </div>
          <dl className={styles.proofStrip} aria-label="Project proof points">
            {proofPoints.map(({ value, label }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
        </section>

        <section className={styles.manifesto} id="problem">
          <div className={styles.manifestoLead}>
            <p className={styles.darkLabel}>01 / Product boundary</p>
            <h2>Purpose: </h2>
            <p>Elara was made to combat an internet overwhelmed by contradictions, misinformation, and confusion. Give it a claim and Elara will gathers evidence, weighs what supports or challenges it, and preserves the sources and reasoning, saving you the research hassle. At its core, Elara helps you cut through the noise and make important judgments based on current evidence instead of reputation or popularity. It isn’t a lie detector or a judge of credibility but a way to give you a transparent, defensible view of what the evidence supports right now.</p>
          </div>
          <div className={styles.boundaryGrid}>
            <div><span>Not a lie detector</span><p>It evaluates a claim or document, not an author's honesty.</p></div>
            <div><span>No credibility score</span><p>Source identity never becomes a permanent reputation score for a publisher.</p></div>
            <div><span>Missing ≠ false</span><p>Unavailable or insufficient evidence stays distinct from evidence that contradicts a claim.</p></div>
          </div>
        </section>

        <section className={styles.workflowSection} id="workflow">
          <SectionHeading eyebrow="02 / Workflow" title={<><span className={styles.workflowHeadingLine}>1. AI interprets the evidence.</span><span className={styles.workflowHeadingLine}>2. Rules decide what gets reported.</span></>} copy="The model helps interpret evidence, artifacts, typed state, and exact coverage while citation audit rules decides what can be published." />
          <ol className={styles.workflowList}>{workflow.map((stage) => <li key={stage.index}><p>{stage.index}</p><div><h3>{stage.title}</h3><p>{stage.copy}</p></div></li>)}</ol>
          <SystemArchitecture />
        </section>

        <section className={styles.evidenceSection} id="evidence">
          <SectionHeading eyebrow="03 / Evidence in the interface" title="Easy Interface." copy="The UI is designed for inspection: atomic claims, supporting and contradicting evidence, exact passages, retrieval timestamps, calculations, and snapshots remain connected." />
          <div className={styles.walkthroughLayout}>
            <div className={styles.walkthroughCopy}>
              <p className={styles.walkthroughLabel}>Example from a Historical Test Run</p>
              <h3>A proposed transit budget increases funding, adds frequent weekend rail service, and relies primarily on sales-tax revenue.</h3>
              <ol>{walkthroughSteps.map(([index, title, copy]) => <li key={index}><span>{index}</span><div><strong>{title}</strong><p>{copy}</p></div></li>)}</ol>
            </div>
            <ElaraScreenshot src="/images/elara/ui/walkthrough@2x.webp" alt="A historical Elara test run evaluating a transit budget and weekend rail service claim" label="Citation-audited report" caption="Historical test run: one completed assessment traced from decomposition to a citation-audited report." />
          </div>

          <div className={styles.evidenceGallery}>
            <ElaraScreenshot src="/images/elara/ui/evidence-compare@2x.webp" alt="Elara evidence views showing supporting and contradicting passages" label="Supporting and contradicting evidence" caption="Support and contradiction stay visible together, and every factual report sentence resolves to an exact stored passage." />
            <ElaraScreenshot src="/images/elara/ui/scoring@2x.webp" alt="Elara score summary showing score breakdown, evidence balance, confidence components, and research coverage charts" label="Score breakdown" caption="Server calculation records keep the score breakdown, evidence balance, confidence components, and research coverage inspectable." />
          </div>
          <ol className={styles.auditTrail} aria-label="Evidence audit trail">{auditTrail.map((item) => <li key={item}>{item}</li>)}</ol>

          <section className={styles.scoringSection} aria-labelledby="scoring-title">
            <header className={styles.scoringHeading}>
              <h3 id="scoring-title">From evidence to an auditable assessment</h3>
              <p>Language models classify meaning, but transparent Python formulas calculate the score. Quality-adjusted evidence is balanced, confidence and guardrails preserve uncertainty, and citation coverage determines whether the report can complete.</p>
            </header>
            <figure className={styles.diagramFigure}>
              <div className={`${styles.diagramScroll} ${styles.scoringDiagramScroll}`} role="region" aria-label="Scrollable deterministic scoring diagram" tabIndex={0}>
                <Image src="/images/elara/deterministic-scoring.png" alt="Deterministic scoring diagram showing evidence quality weighting, support and contradiction balance, confidence guardrails, citation audit, and a worked 66 percent result" width={3200} height={1800} sizes="(max-width: 820px) 64rem, (max-width: 1600px) 92vw, 1600px" className={styles.diagramImage} />
              </div>
              <figcaption>In the historical test run, supporting weight P = 66 and contradicting weight N = 34 produced 66% evidence support. The label remained “Supported with limitations” because final approval was still pending at the evidence cutoff. <a href="/images/elara/deterministic-scoring.png" target="_blank" rel="noreferrer">Open the full-size scoring diagram<ExternalLink aria-hidden="true" /></a></figcaption>
            </figure>
            <div className={styles.diagramSummary} aria-label="Scoring explanation">
              {scoringStages.map(([title, copy]) => (
                <article key={title}>
                  <h4>{title}</h4>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </section>
        </section>

        <section className={styles.outcomesSection} id="outcomes">
          <SectionHeading eyebrow="04 / Engineering outcomes" title="The Results." copy="Instrumentation exposed where time and failure really lived. Model-backed classification and citation auditing dominated latency; while scoring only took 0.09 seconds and numerical audit 0.06 seconds in the measured Standard run." />
          <div className={styles.outcomeStory}>
            <div className={styles.latencyPanel}>
              <header><h3>DeepSeek latency, before and after</h3><p>The fixed path keeps the same measured work visible while making the result easier to compare.</p></header>
              <div className={styles.latencyRows}>
                <article className={styles.latencyRow}><div className={styles.latencyLabel}><h4>Model-backed evidence classification</h4><p>Evidence judgment stage</p></div><div className={styles.metricState}><span>Previous Standard run</span><strong>218.9 s</strong></div><span className={styles.latencyArrow} aria-hidden="true">→</span><div className={`${styles.metricState} ${styles.metricAfter}`}><span>After fix</span><strong>46.3 s</strong></div></article>
                <article className={styles.latencyRow}><div className={styles.latencyLabel}><h4>Citation audit</h4><p>Sentence-to-passage coverage stage</p></div><div className={styles.metricState}><span>Previous Standard run</span><strong>193.1 s</strong></div><span className={styles.latencyArrow} aria-hidden="true">→</span><div className={`${styles.metricState} ${styles.metricAfter}`}><span>After fix</span><strong>32.8 s</strong></div></article>
              </div>
              <p className={styles.deterministicBaseline}>Deterministic baseline: scoring <strong>0.09 s</strong> / numerical audit <strong>0.06 s</strong></p>
            </div>
            <div className={styles.deepSeekMethod}>
              <header><h3>Smaller requests.</h3><p>Split huge DeepSeek requests into small batches.</p></header>
              <dl className={styles.judgmentLimits}><div><dt>Evidence classification</dt><dd>One claim-passage judgment per request.</dd></div><div><dt>Citation audit</dt><dd>Two sentence-passage judgments per request.</dd></div></dl>
              <ol className={styles.controlList}>{deepSeekControls.map((control, index) => <li key={control}><span>{String(index + 1).padStart(2, "0")}</span><p>{control}</p></li>)}</ol>
            </div>
          </div>

          <section className={styles.searchPolicyPanel} aria-labelledby="search-policy-title">
            <header className={styles.searchPolicyHeader}>
              <h3 id="search-policy-title">Search policy</h3>
              <p>These figures are Brave Search API calls per assessment. Elara reduced broad upfront searching by lowering each mode’s first-phase target by 66.7–70%, while keeping required primary-source and contradiction searches. Adaptive expansion can still use the remaining call allowance when the evidence calls for it.</p>
            </header>
            <div className={styles.reductionGroup}>{defaultCallReductions.map((item) => <article aria-label={`${item.mode}: Brave Search API calls reduced from ${item.before} maximum to ${item.after} in the first phase`} className={item.mode === "Standard" ? styles.featuredReduction : ""} key={item.mode}><h3>{item.mode}</h3><p className={styles.reductionMeasure}><span>{item.before}</span><span aria-hidden="true">→</span><span>{item.after}</span></p><p className={styles.reductionPercent}>{item.reduction}</p><p className={styles.reductionScope}>Maximum calls → first-phase target</p></article>)}</div>
          </section>

          <section className={styles.fixesSection} aria-labelledby="engineering-fixes-title">
            <header className={styles.fixesHeading}><h3 id="engineering-fixes-title">Six fixes that strengthened the release path.</h3><p>Each change is tied to the failure it corrected and the proof that now guards the boundary.</p></header>
            <div className={styles.fixesLedger}>{engineeringFixes.map((item) => <article className={styles.engineeringFix} key={item.title}><h4>{item.title}</h4><dl><div><dt>Problem</dt><dd>{item.problem}</dd></div><div><dt>Fix</dt><dd>{item.fix}</dd></div><div><dt>Proof</dt><dd>{item.proof}</dd></div></dl></article>)}</div>
          </section>

          <div className={styles.outcomeDataGrid} aria-label="Test totals">
            <div className={styles.testGroup}>{testCounts.map((item) => <article aria-label={`${item.label}: ${item.value}`} key={item.label}><strong className={item.highlighted ? styles.highlightedTestCount : undefined}>{item.value}</strong><span>{item.label}</span></article>)}</div>
          </div>
        </section>

        <section className={styles.securitySection} id="security">
          <SectionHeading eyebrow="05 / Security + integrity" title="Boundaries." copy="Evidence retrieval is an adversarial surface. Elara keeps untrusted content outside control logic and states the basis of every completed report." />
          <ol className={styles.securityLedger} aria-label="Security and integrity boundaries">{trustBoundaries.map(({ title, copy }, index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
        </section>

        <section className={styles.buildSection} id="build">
          <div className={styles.buildIntro}><p className={styles.sectionLabel}>06 / Built end to end</p><h2>The Stack.</h2><p>This is the full-stack implementation of the Elara platform, covering all aspects from product strategy, UX, the design system, application architecture, evidence workflow, retrieval security, tests, deployment, and documentation from first boundary to hosted demonstration.</p></div>
          <div className={styles.technologyGrid}>{technology.map((group, index) => <article key={group.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{group.title}</h3><p>{group.items.join(" · ")}</p></article>)}</div>
        </section>

        <section className={styles.limitationsSection} id="scope">
          <div><p className={styles.darkLabel}>07 / Scope + tradeoffs</p><h2>Completion.</h2><p>The hosted experience is owner-validated for a low-traffic personal demo.</p></div>
          <ul>{limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}</ul>
        </section>

        <section className={styles.finalCta}>
          <div><p className={styles.darkLabel}>Evidence first by design</p><h2>See the archive.</h2><p>The read-only demo presents 12 completed full-version reports and a working verifier interface without accepting new public requests.</p></div>
          <div className={styles.finalActions}><a href={project.links.live} target="_blank" rel="noreferrer">Open Elara.ai demo<ArrowUpRight aria-hidden="true" /></a><a href={project.links.github} target="_blank" rel="noreferrer"><Github aria-hidden="true" />Browse the source</a></div>
        </section>
      </main>
    </article>
  );
}
