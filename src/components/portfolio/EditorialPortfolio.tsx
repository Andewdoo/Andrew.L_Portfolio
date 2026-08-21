"use client";

import Link from "next/link";
import Image from "next/image";
import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

import styles from "./EditorialPortfolio.module.css";

const capabilities = [
  "AI / ML",
  "Full-Stack",
  "Automation",
  "System Design",
  "Embedded Systems",
  "Cloud & DevOps",
  "Data Engineering",
  "Security",
];

const coordinates = Array.from({ length: 14 }, (_, index) => String(index + 1).padStart(2, "0"));

const lifePattern = ["Notice", "Question", "Try", "Adjust", "Repeat"];

const educationFoundations = [
  {
    description: "Computational efficiency, memory, and structure.",
    title: "DATA STRUCTURES & ALGORITHMS",
  },
  {
    description: "Digital logic, processor design, and the architecture behind modern computers.",
    title: "LOGIC DESIGN & COMPUTER ARCHITECTURE",
  },
  {
    description: "Low-level programming, hardware control, and real-time embedded systems.",
    title: "MICROPROCESSORS & EMBEDDED SYSTEMS",
  },
];

const coreCapabilities = [
  {
    description: "I use the best tools available to work faster, explore more options, and stay focused on the decisions that matter.",
    title: "AI AS A COLLABORATOR",
  },
  {
    description: "I keep repetition out of the way by automating scripts, shortcuts, templates, and reusable components.",
    title: "AUTOMATE THE REPEATABLE",
  },
  {
    description: "I learn fastest by poking at something, seeing what breaks, and making the next version better.",
    title: "BUILD TO LEARN",
  },
  {
    description: "I build, test, inspect, and refine continuously.",
    title: "FEEDBACK LOOPS",
  },
];

const technologyTaxonomy = [
  {
    technologies: "TypeScript / JavaScript / Python / C++ / SQL / HTML5 / Tailwind CSS / MATLAB",
    title: "LANGUAGES",
  },
  {
    technologies: "React / Next.js / TanStack Query / Node.js / FastAPI / SQLAlchemy / Celery / Alembic",
    title: "FRONTEND & BACKEND",
  },
  {
    technologies: " LangGraph / Langchain / DeepSeek / Codex / Claude Code",
    title: "AI WORKFLOWS",
  },
  {
    technologies: "PostgreSQL / MongoDB / pgvector / Redis / Docker / AWS",
    title: "DATA & INFRA",
  },
  {
    technologies: "Git / Github / Sentry / Pytest / Ruff",
    title: "QUALITY",
  },
];

const offlineInterests = [
  {
    description: "BADMINTON, VOLLEYBALL, SNOWBOARDING, BENCH PRs, AND THE OCCASIONAL MARATHON.",
    title: "SPORTS & FITNESS",
  },
  {
    description: "LOCAL SPECIALTY FOODS, DISTINCTIVE ARCHITECTURE, DIFFERENT LANDSCAPES, AND THE LIFESTYLES THAT MAKE EACH PLACE UNIQUE.",
    title: "TRAVEL & CULTURE",
  },
  {
    description: "CHRISTIANITY, THE BIBLE, FAMILY DINNER, FAMILY VACATIONS, AND MOST IMPORTANTLY, HOME-LIFE",
    title: "FAMILY & RELIGION",
  },
  {
    description: "PLAYLISTS, FILMS, GAMES, PODCASTS, AND THE STORIES THAT KEEP CURIOSITY MOVING.",
    title: "MUSIC & MEDIA",
  },
];

const educationTrail = [
  {
    alt: "Snowy autumn walkway through McMaster University campus",
    caption: "Seasons change, campus remains the same.",
    label: "CAMPUS / 01",
    src: "/images/education-campus-winter.webp",
  },
  {
    alt: "Students writing during a crowded university classroom activity",
    caption: "Test-takers and note-takers.",
    label: "CLASS / 02",
    src: "/images/education-classroom.webp",
  },
  {
    alt: "Multi-screen desktop workstation with a laptop and tablet",
    caption: "Where all my work gets done.",
    label: "BUILD / 03",
    src: "/images/education-workstation.webp",
  },
  {
    alt: "McMaster stadium lit through fog on a winter night",
    caption: "Campus after hours.",
    label: "AFTER / 04",
    src: "/images/education-stadium-night.webp",
  },
];

const offlineTrail = [
  {
    alt: "Stylized mountain travel postcard placeholder",
    caption: "Take the unfamiliar road.",
    label: "ROAM / 01",
    src: "/images/trail-offline-travel.svg",
  },
  {
    alt: "Stylized streets and culture postcard placeholder",
    caption: "Notice how other places work.",
    label: "NOTICE / 02",
    src: "/images/trail-offline-culture.svg",
  },
  {
    alt: "Stylized maze and puzzle postcard placeholder",
    caption: "Follow the pattern through the noise.",
    label: "SOLVE / 03",
    src: "/images/trail-offline-puzzles.svg",
  },
  {
    alt: "Stylized compass and topographic map placeholder",
    caption: "Bring a wider view home.",
    label: "RETURN / 04",
    src: "/images/trail-offline-wander.svg",
  },
];

const easternTimeFormatter = new Intl.DateTimeFormat("en-CA", {
  hour: "2-digit",
  hourCycle: "h23",
  minute: "2-digit",
  second: "2-digit",
  timeZone: "America/Toronto",
});

function LiveClock() {
  const [times, setTimes] = useState({ eastern: "--:--:--", utc: "--:--:--" });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimes({
        eastern: easternTimeFormatter.format(now),
        utc: now.toISOString().slice(11, 19),
      });
    };

    updateClock();
    const interval = window.setInterval(updateClock, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className={`${styles.desktopMeta} ${styles.liveClock}`}
      aria-label={`Current UTC time ${times.utc}; Eastern time ${times.eastern}`}
    >
      <span>UTC: {times.utc}</span>
      <span>ET: {times.eastern}</span>
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
      <div className={styles.sectionNumberInner}>
        <span className={styles.sectionNumberLabel}>SECTION</span>
        <strong>{value}</strong>
        <span className={styles.sectionNumberRule} />
      </div>
    </div>
  );
}

function SectionTransition({
  from,
  fromLabel,
  reverse = false,
  to,
  toLabel,
  tone,
}: Readonly<{
  from: string;
  fromLabel: string;
  reverse?: boolean;
  to: string;
  toLabel: string;
  tone: "dark-to-light" | "light-to-dark";
}>) {
  return (
    <div
      className={`${styles.sectionTransition} ${
        tone === "light-to-dark" ? styles.transitionToDark : styles.transitionToLight
      } ${reverse ? styles.transitionReverse : ""}`}
      aria-hidden="true"
    >
      <div className={styles.transitionGrid} />

      <svg className={styles.transitionRoute} viewBox="0 0 1200 140" preserveAspectRatio="none">
        <path
          className={styles.transitionRouteShadow}
          d="M-24 36 C138 13 204 104 370 88 S610 20 774 65 S1006 126 1224 66"
        />
        <path
          className={styles.transitionRouteLine}
          d="M-24 36 C138 13 204 104 370 88 S610 20 774 65 S1006 126 1224 66"
        />
        <circle className={styles.transitionNode} cx="142" cy="50.442" r="6" />
        <circle className={styles.transitionNode} cx="370" cy="88" r="6" />
        <circle className={styles.transitionNode} cx="774" cy="65" r="6" />
        <circle className={styles.transitionNode} cx="1070" cy="99.661" r="6" />
      </svg>

      <div className={styles.transitionDeparture}>
        <span>EXIT / {fromLabel}</span>
        <strong>{from}</strong>
      </div>

      <div className={styles.transitionGate}>
        <div>
          <small>ROUTE</small>
          <b>↘</b>
        </div>
      </div>

      <div className={styles.transitionArrival}>
        <span>NEXT / {toLabel}</span>
        <strong>{to}</strong>
      </div>

      <p className={styles.transitionStatus}>SIGNAL HANDOFF · {from}—{to} · PATH LOCKED</p>
    </div>
  );
}

function TrailGallery({
  items,
  title,
  tone,
}: Readonly<{
  items: typeof educationTrail;
  title: string;
  tone: "dark" | "light";
}>) {
  return (
    <div className={`${styles.trailGallery} ${tone === "dark" ? styles.trailDark : styles.trailLight}`}>
      <div className={styles.trailHeading}>
        <span aria-hidden="true">X</span>
        <p>{title}</p>
        <small>4 STOPS / FOLLOW THE DOTS</small>
      </div>

      <div className={styles.trailTrack}>
        <svg className={styles.trailPathDesktop} viewBox="0 0 1200 360" preserveAspectRatio="none" aria-hidden="true">
          <path d="M36 112 C145 42 235 64 312 145 S495 262 603 144 S786 25 882 135 S1036 260 1162 164" />
          <circle cx="36" cy="112" r="8" />
          <circle cx="312" cy="145" r="8" />
          <circle cx="603" cy="144" r="8" />
          <circle cx="882" cy="135" r="8" />
        </svg>
        <svg className={styles.trailPathMobile} viewBox="0 0 400 960" preserveAspectRatio="none" aria-hidden="true">
          <path d="M72 34 C330 92 344 207 205 265 S45 370 194 454 S360 580 205 650 S42 785 320 916" />
          <circle cx="72" cy="34" r="7" />
          <circle cx="205" cy="265" r="7" />
          <circle cx="194" cy="454" r="7" />
          <circle cx="205" cy="650" r="7" />
        </svg>

        {items.map((item, index) => (
          <figure className={styles.trailCard} key={item.src}>
            <div className={styles.trailImageFrame}>
              <span className={styles.trailTape} aria-hidden="true" />
              <img src={item.src} alt={item.alt} loading="lazy" width="800" height="600" />
              <b aria-hidden="true">{String(index + 1).padStart(2, "0")}</b>
              {index === items.length - 1 && (
                <span className={styles.trailFinish} aria-hidden="true">X</span>
              )}
            </div>
            <figcaption>
              <span>{item.label}</span>
              <p>{item.caption}</p>
            </figcaption>
          </figure>
        ))}

      </div>
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
          </div>

          <div className={styles.educationIntro}>
            <h2>THEORY MEETS<br />THE MACHINE.</h2>
            <div className={styles.degreeBlock}>
              <div>
                <h3>MCMASTER UNIVERSITY</h3>
                <p>COMPUTER ENGINEERING</p>
                <mark aria-hidden="true" />
              </div>
              <p>Learning the whole system.</p>
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

          <TrailGallery items={educationTrail} title="FIELD NOTES / THE LEARNING TRAIL" tone="light" />
        </div>
      </section>

      <SectionTransition
        from="01"
        fromLabel="EDUCATION"
        to="02"
        toLabel="WORKFLOW"
        tone="light-to-dark"
      />

      <section id="skills" className={styles.skillsSection}>
        <SectionCoordinates />
        <SectionNumber value="02" />
        <div className={styles.skillsContent}>
          <div className={styles.sectionLabelRow}>
            <p className={styles.desktopSectionLabel}>/ WORKFLOW <b>&gt;_</b></p>
            <p className={styles.mobileSectionLabel}><b>&gt;_</b> 02 / WORKFLOW</p>
            <a className={styles.sectionArrow} href="#tech-stack" aria-label="Jump to tech stack">
              <Arrow />
            </a>
          </div>

          <h2>HOW I WORK.</h2>
          <p className={styles.workflowStatement}>I don&apos;t just write code. I build better ways to write it.</p>

          <div className={styles.capabilityGrid}>
            {coreCapabilities.map((capability) => (
              <article key={capability.title}>
                <h3>{capability.title}</h3>
                <b aria-hidden="true">&gt;_</b>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>

          <div className={styles.workflowRows}>
            <div>
              <span>01</span>
              <h3>EXPLORE</h3>
              <p><b>&gt;_</b> FRAME THE PROBLEM / GATHER CONTEXT / COMPARE APPROACHES</p>
            </div>
            <div>
              <span>02</span>
              <h3>EXECUTE</h3>
              <p><b>&gt;_</b> PROTOTYPE / TEST / AUTOMATE / DOCUMENT / REFINE</p>
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
      <SectionTransition
        from="02"
        fromLabel="WORKFLOW"
        reverse
        to="03"
        toLabel="TECH STACK"
        tone="dark-to-light"
      />

      <section id="tech-stack" className={styles.techStackSection}>
        <SectionCoordinates />
        <SectionNumber value="03" />
        <div className={styles.techStackContent}>
          <div className={styles.sectionLabelRow}>
            <p className={styles.desktopSectionLabel}>/ TECH STACK <b>&gt;_</b></p>
            <p className={styles.mobileSectionLabel}><b>&gt;_</b> 03 / TECH STACK</p>
          </div>

          <h2>TOOLS CHANGE. STANDARD DOESN&apos;T.</h2>

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

      <SectionTransition
        from="03"
        fromLabel="TECH STACK"
        to="04"
        toLabel="OFFLINE"
        tone="light-to-dark"
      />

      <section id="hobbies" className={styles.hobbiesSection} aria-label="Hobbies and interests">
        <SectionCoordinates />
        <SectionNumber value="04" />
        <div className={styles.hobbiesContent}>
          <div className={styles.sectionLabelRow}>
            <p className={styles.desktopSectionLabel}>/ OFFLINE <b>&gt;_</b></p>
            <p className={styles.mobileSectionLabel}><b>&gt;_</b> 04 / OFFLINE</p>
          </div>

          <h2>CURIOSITY DOESN&apos;T CLOCK OUT.</h2>

          <div className={styles.interestRows}>
            {offlineInterests.map((interest, index) => (
              <article className={styles.interestRow} key={interest.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{interest.title}</h3>
                <p>{interest.description}</p>
              </article>
            ))}
          </div>

          <TrailGallery items={offlineTrail} title="FIELD NOTES / OFF THE CLOCK" tone="dark" />
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
              <span className={styles.headlineLine}>I MAKE THINGS THAT</span>
              <span className={styles.headlineLine}>I WOULD ACTUALLY <mark>USE</mark></span>
            </h1>
            <p className={styles.heroDescription}>
              <strong>Usually starting with curiosity and far too many tabs.</strong>
            </p>
            <a className={styles.workButton} href="#projects">
              <span className={styles.desktopCta}>VIEW SELECTED WORK</span>
              <span className={styles.mobileCta}>VIEW WORK</span>
              <Arrow direction="down" />
            </a>
          </div>

          <div className={styles.asciiPanel}>
            <Image
              src="/images/hero-portrait-orange-green.png"
              alt="Centered grain-textured editorial screen-print portrait of Andrew L."
              fill
              priority
              sizes="(max-width: 980px) 100vw, 50vw"
              className={styles.portraitImage}
            />
            <div className={styles.portraitWash} aria-hidden="true" />
            <div className={styles.portraitScan} aria-hidden="true" />
            <span className={styles.portraitStatus} aria-hidden="true">
              <i /> IDENTITY:LOCKED
            </span>
            <span className={styles.portraitIndex} aria-hidden="true">SUBJECT / A.L-01</span>
            <div className={styles.asciiScale} aria-hidden="true">
              {Array.from({ length: 25 }, (_, index) => (
                <span key={index}>{String(index + 1).padStart(2, "0")}</span>
              ))}
            </div>
            <span className={styles.asciiLabel}>[ PORTRAIT.EDITION ]</span>
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

        <section className={styles.aboutStack}>
          <div className={styles.aboutTitle}>
            <p>&gt; ABOUT <b>/</b></p>
            <h2>I LIKE LEARNING HOW THINGS WORK BY DOING</h2>
            <span className={styles.aboutSubtitle}>Visual &amp; hands-on learner.</span>
          </div>
          <div className={styles.aboutCopy}>
            <p className={styles.aboutCopyLabel}>&gt; BUILD.NOTES</p>
            <p>
              Each idea evolves as I work, and that
              makes the final result more interesting.
            </p>
          </div>
          <div className={styles.lifePattern}>
            <p>&gt; LIFE.PATTERN</p>
            <div>
              {lifePattern.map((item, index) => (
                <span key={item}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <b>{item}</b>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className={styles.projects} aria-label="Selected work">
          <ProjectRow
            index="01"
            title="ELARA.AI"
            category="EVIDENCE VERIFICATION"
            description="Evidence-first verification with timestamped sources, visible uncertainty, and citation-audited reports."
            stackLine="NEXT.JS / FASTAPI / PGVECTOR / CELERY"
            slug="elara-ai"
          />
          <ProjectRow
            index="02"
            title="DEVLIFY"
            category="AI LEARNING WORKSPACE"
            description="Multi-modal tutoring, persistent chat history, and retrieval-aware answers in one focused workspace."
            stackLine="NEXT.JS / FASTAPI / POSTGRESQL"
            slug="devlify"
          />
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
        <span className={styles.footerResponse}>RESPONSE: 0–24H</span>
      </footer>
    </div>
  );
}
