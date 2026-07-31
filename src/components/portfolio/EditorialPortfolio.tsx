"use client";

import Link from "next/link";
import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

import styles from "./EditorialPortfolio.module.css";

const capabilities = [
  "AI / ML",
  "Full-Stack",
  "Automation",
  "System Design",
  "Backend Engineering",
  "Cloud & DevOps",
  "Data Engineering",
  "Security",
];

const coordinates = Array.from({ length: 14 }, (_, index) => String(index + 1).padStart(2, "0"));

const stack = ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL"];

const educationFoundations = [
  {
    description: "Computational efficiency, memory, and structure.",
    title: "DATA STRUCTURES & ALGORITHMS",
  },
  {
    description: "Modern paradigms, lifecycles, and robust code.",
    title: "SYSTEMS PROGRAMMING",
  },
  {
    description: "How software executes at the metal level.",
    title: "COMPUTER ARCHITECTURE",
  },
];

const coreCapabilities = [
  {
    description: "Readable components. Clean interfaces.",
    title: "SOFTWARE DESIGN",
  },
  {
    description: "AI used fluently to accelerate research, building, and verification.",
    title: "AI-AUGMENTED WORK",
  },
  {
    description: "Performance, memory, and architecture.",
    title: "SYSTEMS THINKING",
  },
  {
    description: "Automation that stays inspectable.",
    title: "DEVELOPER TOOLING",
  },
];

const technologyTaxonomy = [
  {
    technologies: "TypeScript / JavaScript / Python / SQL / C++ / MATLAB",
    title: "LANGUAGES",
  },
  {
    technologies: "React / Next.js / Zustand / TanStack Query",
    title: "FRONTEND",
  },
  {
    technologies: "Node.js / FastAPI / SQLAlchemy / Celery",
    title: "BACKEND",
  },
  {
    technologies: "LangGraph / DeepSeek / Codex / Claude",
    title: "AI WORKFLOWS",
  },
  {
    technologies: "PostgreSQL / pgvector / Redis / Docker / AWS",
    title: "DATA & INFRA",
  },
  {
    technologies: "Git / Sentry / Pytest / Ruff / MyPy",
    title: "QUALITY",
  },
];

const offlineInterests = [
  {
    description: "New places. Different systems. Wider perspective.",
    title: "TRAVEL",
  },
  {
    description: "How people solve familiar problems their own way.",
    title: "CULTURE",
  },
  {
    description: "Finding structure inside complexity.",
    title: "PUZZLES",
  },
];

const markhamTime = new Intl.DateTimeFormat("en-CA", {
  hour: "2-digit",
  hour12: false,
  minute: "2-digit",
  second: "2-digit",
  timeZone: "America/Toronto",
});

const markhamOffset = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Toronto",
  timeZoneName: "longOffset",
});

function LiveClock() {
  const [clock, setClock] = useState({ offset: "UTC--:--", time: "--:--:--" });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const offset = markhamOffset
        .formatToParts(now)
        .find((part) => part.type === "timeZoneName")
        ?.value.replace("GMT", "UTC");

      setClock({
        offset: offset ?? "UTC-04:00",
        time: markhamTime.format(now),
      });
    };

    updateClock();
    const interval = window.setInterval(updateClock, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.desktopMeta} ${styles.liveClock}`} aria-label={`Markham time ${clock.time}, ${clock.offset}`}>
      <span>TIME: {clock.time}</span>
      <span>{clock.offset}</span>
    </div>
  );
}

function Arrow({ direction = "right" }: Readonly<{ direction?: "down" | "right" }>) {
  return (
    <svg aria-hidden="true" className={styles.arrowIcon} viewBox="0 0 24 24">
      {direction === "down" ? (
        <>
          <path d="M12 4v16" />
          <path d="m6 14 6 6 6-6" />
        </>
      ) : (
        <>
          <path d="M4 12h16" />
          <path d="m14 6 6 6-6 6" />
        </>
      )}
    </svg>
  );
}

function SectionCoordinates() {
  return (
    <div className={styles.sectionCoordinates} aria-hidden="true">
      {coordinates.map((coordinate) => (
        <span key={coordinate}>{coordinate}</span>
      ))}
    </div>
  );
}

function SectionNumber({ value }: Readonly<{ value: string }>) {
  return (
    <div className={styles.sectionNumber} aria-hidden="true">
      <strong>{value}</strong>
      <span>–</span>
    </div>
  );
}

function EducationSkillsSequence() {
  return (
    <>
      <section id="education" className={styles.educationSection}>
        <SectionCoordinates />
        <SectionNumber value="01" />
        <div className={styles.educationContent}>
          <div className={styles.sectionLabelRow}>
            <p className={styles.desktopSectionLabel}>/ EDUCATION <b>&gt;_</b></p>
            <p className={styles.mobileSectionLabel}><b>&gt;_</b> 01 / EDUCATION</p>
            <a className={styles.sectionArrow} href="#skills" aria-label="Jump to skills">
              <Arrow />
            </a>
          </div>

          <div className={styles.educationIntro}>
            <h2>THEORY MEETS<br />THE MACHINE.</h2>
            <div className={styles.degreeBlock}>
              <div>
                <h3>McMASTER UNIVERSITY</h3>
                <p>COMPUTER ENGINEERING</p>
                <mark aria-hidden="true" />
              </div>
              <p>Learning the whole system — from silicon to software.</p>
            </div>
          </div>

          <div className={styles.foundationRows}>
            {educationFoundations.map((foundation, index) => (
              <div className={styles.foundationRow} key={foundation.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{foundation.title}</h3>
                <p>{foundation.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className={styles.skillsSection}>
        <SectionCoordinates />
        <SectionNumber value="02" />
        <div className={styles.skillsContent}>
          <div className={styles.sectionLabelRow}>
            <p className={styles.desktopSectionLabel}>/ SKILLS <b>&gt;_</b></p>
            <p className={styles.mobileSectionLabel}><b>&gt;_</b> 02 / SKILLS</p>
            <a className={styles.sectionArrow} href="#tech-stack" aria-label="Jump to tech stack">
              <Arrow />
            </a>
          </div>

          <h2>HOW I WORK.</h2>

          <div className={styles.capabilityGrid}>
            {coreCapabilities.map((capability) => (
              <article key={capability.title}>
                <h3>{capability.title}</h3>
                <b aria-hidden="true">&gt;_</b>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>

          <div className={styles.technologyRows}>
            <div>
              <span>01</span>
              <h3>LANGUAGES</h3>
              <p><b>&gt;_</b> TypeScript / Python / SQL / C++</p>
            </div>
            <div>
              <span>02</span>
              <h3>BUILD</h3>
              <p><b>&gt;_</b> Next.js / FastAPI / PostgreSQL / Docker</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TechHobbiesSequence() {
  return (
    <>
      <section id="tech-stack" className={styles.techStackSection}>
        <SectionCoordinates />
        <SectionNumber value="03" />
        <div className={styles.techStackContent}>
          <div className={styles.sectionLabelRow}>
            <p className={styles.desktopSectionLabel}>/ TECH STACK <b>&gt;_</b></p>
            <p className={styles.mobileSectionLabel}><b>&gt;_</b> 03 / TECH STACK</p>
          </div>

          <h2>TOOLS CHANGE. THE STANDARD DOESN&apos;T.<mark aria-hidden="true" /></h2>

          <div className={styles.taxonomyRows}>
            {technologyTaxonomy.map((category, index) => (
              <div className={styles.taxonomyRow} key={category.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{category.title}</h3>
                <p>{category.technologies}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="hobbies" className={styles.hobbiesSection} aria-label="Hobbies and interests">
        <SectionCoordinates />
        <SectionNumber value="04" />
        <div className={styles.hobbiesContent}>
          <div className={styles.sectionLabelRow}>
            <p className={styles.desktopSectionLabel}>/ OFFLINE <b>&gt;_</b></p>
            <p className={styles.mobileSectionLabel}><b>&gt;_</b> 04 / OFFLINE</p>
          </div>

          <h2>CURIOSITY DOESN&apos;T CLOCK OUT.<mark aria-hidden="true" /></h2>

          <div className={styles.interestRows}>
            {offlineInterests.map((interest, index) => (
              <article className={styles.interestRow} key={interest.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{interest.title}</h3>
                <p>{interest.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectRow({
  category,
  description,
  index,
  slug,
  stackLine,
  title,
}: Readonly<{
  category: string;
  description: string;
  index: string;
  slug: string;
  stackLine: string;
  title: string;
}>) {
  return (
    <article className={styles.projectCard}>
      <Link className={styles.projectLink} href={`/projects/${slug}`} aria-label={`Open ${title} case study`}>
        <div className={styles.projectRow}>
          <div className={styles.projectNumber}>{index}</div>
          <div className={styles.projectCopy}>
            <span className={styles.projectSlash}>/</span>
            <div>
              <h2>{title}</h2>
              <p>{category}</p>
            </div>
          </div>
          <div className={styles.projectIndex}>[ {index} ]</div>
          <span className={styles.squareButton} aria-hidden="true">
            <Arrow />
          </span>
        </div>
        <div className={styles.projectDetails}>
          <div className={styles.projectDetailsInner}>
            <div className={styles.projectDetailsContent}>
              <div>
                <span>// SYSTEM</span>
                <p>{description}</p>
              </div>
              <div>
                <span>// STACK</span>
                <p>{stackLine}</p>
              </div>
              <div className={styles.detailStatus}>
                <span>// STATUS</span>
                <p>CASE STUDY / OPEN ↗</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function EditorialPortfolio() {
  return (
    <div id="top" className={styles.page}>
      <header className={styles.utilityHeader}>
        <div className={styles.systemStatus}>
          <span className={styles.statusDot} />
          SYS:ONLINE
        </div>
        <div>USER: ANDREW.L</div>
        <div className={styles.desktopMeta}>ROLE: SOFTWARE ENGINEER</div>
        <div className={styles.desktopMeta}>LOC: MARKHAM, CA</div>
        <LiveClock />
        <a className={styles.mobileMenu} href="#projects" aria-label="Jump to selected work">
          <span aria-hidden="true">&gt;_</span>
          <span>01 / 08</span>
          <i aria-hidden="true" />
        </a>
      </header>

      <div className={styles.columnIndex} aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index}>{String(index + 1).padStart(2, "0")}</span>
        ))}
      </div>

      <main>
        <section className={styles.hero}>
          <div className={styles.rowCoordinates} aria-hidden="true">
            {coordinates.map((coordinate) => (
              <span key={coordinate}>{coordinate}</span>
            ))}
          </div>

          <div className={styles.heroCopy}>
            <p className={styles.mobileRole}>&gt; SOFTWARE ENGINEER / MARKHAM</p>
            <p className={styles.wordmark}>ANDREW.L<sup>®</sup></p>
            <p className={styles.role}>SOFTWARE ENGINEER <b>/</b> MARKHAM</p>
            <span className={styles.prompt}>&gt;_</span>
            <h1>
              <span className={styles.headlineLine}>I BUILD SYSTEMS</span>
              <span className={styles.headlineLine}>THAT THINK <mark>CLEARLY.</mark></span>
            </h1>
            <p className={styles.heroDescription}>Turning hard problems into direct, useful software.</p>
            <a className={styles.workButton} href="#projects">
              <span className={styles.desktopCta}>VIEW SELECTED WORK</span>
              <span className={styles.mobileCta}>VIEW WORK</span>
              <Arrow direction="down" />
            </a>
          </div>

          <div className={styles.asciiPanel} aria-label="Reserved space for a future ASCII portrait">
            <div className={styles.asciiScale} aria-hidden="true">
              {Array.from({ length: 25 }, (_, index) => (
                <span key={index}>{String(index + 1).padStart(2, "0")}</span>
              ))}
            </div>
            <span className={styles.asciiLabel}>[ PORTRAIT.ASCII ]</span>
          </div>
        </section>

        <div className={styles.capabilities} aria-label="Capabilities">
          {capabilities.map((capability) => (
            <span key={capability}>
              <b>+</b>
              {capability}
            </span>
          ))}
        </div>

        <section id="projects" className={styles.projects} aria-label="Selected work">
          <ProjectRow
            index="01"
            title="DEVLIFY"
            category="AI LEARNING WORKSPACE"
            description="Multi-modal tutoring, persistent chat history, and retrieval-aware answers in one focused workspace."
            stackLine="NEXT.JS / FASTAPI / POSTGRESQL"
            slug="devlify"
          />
          <ProjectRow
            index="02"
            title="ELARA.AI"
            category="EVIDENCE VERIFICATION"
            description="Evidence-first verification with timestamped sources, visible uncertainty, and citation-audited reports."
            stackLine="NEXT.JS / FASTAPI / PGVECTOR / CELERY"
            slug="elara-ai"
          />
        </section>

        <section className={styles.aboutStack}>
          <div className={styles.aboutTitle}>
            <p>&gt; ABOUT <b>/</b></p>
            <h2>PRACTICAL ENGINEERING, NON-LINEAR THINKING.</h2>
          </div>
          <p className={styles.aboutCopy}>
            I design and build software that solves real problems with clarity and leverage. Systems that are maintainable,
            observable, and ready for what&apos;s next. <mark />
          </p>
          <div className={styles.stackIndex}>
            <p>&gt; STACK.INDEX</p>
            <div>
              {stack.map((item, index) => (
                <span key={item}>
                  <b>{item}</b>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                </span>
              ))}
            </div>
          </div>
        </section>

        <EducationSkillsSequence />
        <TechHobbiesSequence />
      </main>

      <footer className={styles.footer}>
        <strong>LET&apos;S TALK</strong>
        <nav aria-label="Contact links">
          <a href="https://www.linkedin.com/in/andrew-liu-13099336a" target="_blank" rel="noreferrer">
            <Linkedin aria-hidden="true" />
            <span>LINKEDIN</span>
          </a>
          <a href="https://github.com/Andewdoo" target="_blank" rel="noreferrer">
            <Github aria-hidden="true" />
            <span>GITHUB</span>
          </a>
          <a href="mailto:ahanliu0311@gmail.com">
            <Mail aria-hidden="true" />
            <span>EMAIL</span>
          </a>
          <a href="/Andrew-Liu-Resume.pdf" target="_blank" rel="noreferrer">
            <FileText aria-hidden="true" />
            <span>RESUME</span>
          </a>
        </nav>
        <span className={styles.footerResponse}>RESPONSE: 24–48H</span>
      </footer>
    </div>
  );
}
