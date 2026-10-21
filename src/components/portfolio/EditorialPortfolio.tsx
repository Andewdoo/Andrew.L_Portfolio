"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";

import { projects } from "@/lib/projects";
import styles from "./EditorialPortfolio.module.css";

type TrailMedia = {
  alt: string;
  caption: string;
  group?: string;
  src: string;
};

type TrailItem = TrailMedia & {
  gallery?: readonly TrailMedia[];
  label: string;
};

const offlineMomentsGallery: readonly TrailMedia[] = [
  {
    alt: "Toronto skyline viewed from a canoe on the water",
    caption: "Toronto from a canoe",
    src: "/images/offline-toronto-canoe.webp",
  },
  {
    alt: "Skiers and snowboarders on a snowy slope at sunset",
    caption: "Scenic sunset on the slopes.",
    src: "/images/offline-01-02.webp",
  },
  {
    alt: "Andrew wearing a ski helmet and goggles during a night ski",
    caption: "Freezing my face off.",
    src: "/images/offline-01-03.webp",
  },
  {
    alt: "Andrew as a child holding a swimming medal and a yellow balloon",
    caption: "My first swim medal.",
    src: "/images/offline-01-04.webp",
  },
  {
    alt: "Badminton medalists at a Badminton Ontario event",
    caption: "Badminton Ontario podium.",
    src: "/images/offline-01-05.webp",
  },
  {
    alt: "Badminton match in progress inside a school gym",
    caption: "Match day.",
    src: "/images/offline-01-06.webp",
  },
];

const offlineTravelGallery: readonly TrailMedia[] = [
  { alt: "Jet ski cutting across turquoise water in Mexico", caption: "Jetskiing in Cancun, Mexico.", group: "Mexico", src: "/images/offline-02-19.webp" },
  { alt: "Coastal golf course overlooking the sea in Mexico", caption: "Resort in Cancun,Mexico.", group: "Mexico", src: "/images/offline-02-17.webp" },
  { alt: "Pastel clouds over the ocean at sunset in Mexico", caption: "4 clouds that resemble my family.", group: "Carribean Cruise", src: "/images/offline-02-26.webp" },
  { alt: "White sand beach with a striped lighthouse in Mexico", caption: "White sand beach in the Bahamas.", group: "Carribean Cruise", src: "/images/offline-02-27.webp" },
  { alt: "Turquoise sea and a pier along the Mexican coastline", caption: "Turqoise Mexican coastline.", group: "Carribean Cruise", src: "/images/offline-02-28.webp" },
  { alt: "Night clouds and distant shoreline lights over the sea in Mexico", caption: "Thunderstorm over the horizon.", group: "Carribean Cruise", src: "/images/offline-02-29.webp" },
  { alt: "Panda display photographed during a trip to China", caption: "Chengdu Panda Base.", group: "China", src: "/images/offline-02-01.webp" },
  { alt: "Cute sign in Chongqing, China encouraging children to study hard", caption: '"Children need to study hard!" - Cute sign in Chongqing, China', group: "China", src: "/images/offline-02-02.webp" },
  { alt: "Bright pedestrian street in China", caption: "Shanghai pedestrian street at night.", group: "China", src: "/images/offline-02-07.webp" },
  { alt: "Andrew overlooking a forested canyon in China", caption: "3 Gorges, Wulong Karst National Park.", group: "China", src: "/images/offline-02-10.webp" },
  { alt: "Hillside neighborhood surrounded by trees in China", caption: "Popular hangout spot in Chongqing, China.", group: "China", src: "/images/offline-02-11.webp" },
  { alt: "Mirror selfie inside a dramatic bookstore in China", caption: "Cool lego set in a cool bookstore.", group: "China", src: "/images/offline-02-12.webp" },
  { alt: "Chongqing skyline glowing at night", caption: "View of the cyberpunk city(Chongqing) at night.", group: "China", src: "/images/offline-02-13.webp" },
  { alt: "Mountain river landscape in China", caption: "The river the allowed Chengdu, China to prosper.", group: "China", src: "/images/offline-02-14.webp" },
  { alt: "Narrow historic street in Portugal", caption: "Narrow alley in Lisbon, Portugal.", group: "Portugal", src: "/images/offline-02-03.webp" },
  { alt: "Coastal cliffs in Portugal", caption: "Coastal cliffs in Portugal.", group: "Portugal", src: "/images/offline-02-05.webp" },
  { alt: "Rocky hilltop panorama in Portugal", caption: "Overlooking the Portuguese landscape.", group: "Portugal", src: "/images/offline-02-06.webp" },
  { alt: "Andrew standing beside the ocean in Portugal", caption: "Standing by the ocean.", group: "Portugal", src: "/images/offline-02-09.webp" },
  { alt: "Stone castle overlooking a green hillside in Portugal", caption: "Castle on the hill.", group: "Portugal", src: "/images/offline-02-22.webp" },
  { alt: "Rocky sea arch on the Portuguese coast", caption: "Devil's hole.", group: "Portugal", src: "/images/offline-02-23.webp" },
  { alt: "Cobblestone street lined with historic buildings in Portugal", caption: "Beautiful double alley in Lisbon, Portugal.", group: "Portugal", src: "/images/offline-02-24.webp" },
  { alt: "Ocean view with a sailboat from the Portuguese coast", caption: "Sangria by the ocean.", group: "Portugal", src: "/images/offline-02-25.webp" },
  { alt: "Rocky Mountain ridge above a forested road in Alberta", caption: "National park in Banff, Alberta.", group: "Alberta", src: "/images/offline-02-30.webp" },
  { alt: "Family photo at a glacier lake in Alberta", caption: "Photo with my dad!", group: "Alberta", src: "/images/offline-02-31.webp" },
  { alt: "Highway through the Rocky Mountains under a blue sky in Alberta", caption: "Driving through the Rockies.", group: "Alberta", src: "/images/offline-02-32.webp" },
  { alt: "Family photo outside a mountain resort in Alberta", caption: "Quick snack time.", group: "Alberta", src: "/images/offline-02-33.webp" },
  { alt: "Toronto skyline viewed across the water with geese in the foreground", caption: "Can't have Toronto without the geese.", group: "Toronto", src: "/images/offline-02-15.webp" },
  { alt: "Seafood spread on a dining table", caption: "All you can eat in Lisbon, Portugal.", group: "Food", src: "/images/offline-02-04.webp" },
  { alt: "Candied fruit skewers", caption: "Tang-Hulu, traditional Chinese candy snack.", group: "Food", src: "/images/offline-02-08.webp" },
  { alt: "Suitcase packed with snacks", caption: "Can't go home empty handed!", group: "Food", src: "/images/offline-02-16.webp" },
  { alt: "Crispy whole fish served upright in sweet sauce", caption: "Popular dish in many Chinese Provinces.", group: "Food", src: "/images/offline-02-34.webp" },
  { alt: "Chinese family-style dinner spread with shared dishes", caption: "A traditional Chinese family dinner.", group: "Food", src: "/images/offline-02-35.webp" },
];

const offlineFamilyGallery: readonly TrailMedia[] = [
  { alt: "Cristo Rei monument rising against a blue sky in Portugal", caption: "Cristo Rei, Portugal.", group: "Faith", src: "/images/offline-03-03.webp" },
  { alt: "Five friends posing together at a farewell celebration", caption: "Just got baptised!", group: "FAITH", src: "/images/offline-03-04.webp" },
  { alt: "Andrew and a companion posing by the Shanghai skyline at night", caption: "Sis and I on the Bund.", group: "Family", src: "/images/offline-03-05.webp" },
  { alt: "Family taking a mirror photo on a sculptural staircase", caption: "No.3 Warehouse Restaurant.", group: "Family", src: "/images/offline-03-06.webp" },
  { alt: "Four friends posing by the Shanghai skyline at night", caption: "A night out on the Bund.", group: "Friends", src: "/images/offline-03-07.webp" },
  { alt: "Family portrait by the Shanghai skyline at night", caption: "Family portrait on the Bund.", group: "Family", src: "/images/offline-03-08.webp" },
  { alt: "Family taking a selfie together on a sunny tropical trip", caption: "Family picture in Cancun, Mexico.", group: "Family", src: "/images/offline-03-09.webp" },
  { alt: "Printed childhood photo of a parent and two children beside a snowman", caption: "A childhood winter memory.", group: "Family", src: "/images/offline-03-10.webp" },
  { alt: "Andrew and his father standing beside a fast-flowing mountain river", caption: "By the river in Banff, Alberta.", group: "Family", src: "/images/offline-03-11.webp" },
  { alt: "Andrew and a parent overlooking Lisbon and the Tagus River", caption: "Posing with my mom overlooking the Tagus River.", group: "Family", src: "/images/offline-03-12.webp" },
  { alt: "Family wearing matching bright green shirts during a summer trip", caption: "Matching shirts!", group: "Family", src: "/images/offline-03-13.webp" },
  { alt: "Family gathered around a table at a beach restaurant", caption: "Together by the beach.", group: "Family", src: "/images/offline-03-14.webp" },
];

const offlineMediaGallery: readonly TrailMedia[] = [
  { alt: "Harvey Specter and Mike Ross from the television series Suits against the New York skyline", caption: "Suits", group: "Sitcom", src: "/images/offline-04-01.webp" },
  { alt: "The six main cast members of Friends gathered together at Central Perk", caption: "Friends", group: "Sitcom", src: "/images/offline-04-02.webp" },
  { alt: "Ichigo Kurosaki in the official Bleach Thousand-Year Blood War key art", caption: "Bleach", group: "Anime", src: "/images/offline-04-03.webp" },
  { alt: "Frieren, Fern, and Stark in a flower-filled landscape from Frieren Beyond Journey's End", caption: "Frieren: Beyond Journey's End", group: "Anime", src: "/images/offline-04-04.webp" },
  { alt: "NF confronting his shattered reflection in the 2025 FEAR music video", caption: "NF - FEAR", group: "Music", src: "/images/offline-04-05.webp" },
  { alt: "Coldplay band members posing together beneath a blue sky and rainbow light flare", caption: "Coldplay", group: "Music", src: "/images/offline-04-06.webp" },
  { alt: "Black-and-white studio portrait of music artist Dominic Fike", caption: "Dominic Fike", group: "Music", src: "/images/offline-04-07.webp" },
];

const offlineTrail: readonly TrailItem[] = [
  {
    ...offlineMomentsGallery[0],
    gallery: offlineMomentsGallery,
    label: "01:",
  },
  {
    ...offlineTravelGallery[0],
    gallery: offlineTravelGallery,
    label: "02:",
  },
  {
    ...offlineFamilyGallery[0],
    gallery: offlineFamilyGallery,
    label: "03:",
  },
  {
    ...offlineMediaGallery[0],
    gallery: offlineMediaGallery,
    label: "04:",
  },
];


const selectedWork = [
  {
    slug: "elara-ai",
    image: "/images/elara-report-ui-cropped.png",
    alt: "Elara.ai report workspace with evidence, citations, and a claim assessment",
    category: "Evidence verification",
    summary: "Making AI research easier to verify.",
    description: "A claim-to-report workflow that brings source retrieval, evidence analysis, and citation audits into one transparent workspace.",
    details: ["Traceable sources and explicit uncertainty", "Queued background jobs and durable reports"],
    stack: ["Next.js", "FastAPI", "PostgreSQL", "pgvector", "Celery"],
  },
  {
    slug: "devlify",
    image: "/images/devlify-workspace-preview.png",
    alt: "Devlify learning workspace with subject navigation and a chat composer",
    category: "AI learning workspace",
    summary: "A clearer place to learn.",
    description: "Subject-specific tutoring, file analysis, and saved conversations in one full-stack learning platform.",
    details: ["File-aware tutoring with persistent chat context", "Authenticated APIs and per-user data isolation"],
    stack: ["React", "Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
  },
];

const technologyTaxonomy = [
  {
    title: "Languages & styling",
    items: ["TypeScript", "JavaScript", "Python", "C++", "SQL", "HTML5", "Tailwind CSS", "MATLAB"],
  },
  {
    title: "Frontend & backend",
    items: ["React", "Next.js", "TanStack Query", "Node.js", "FastAPI", "SQLAlchemy", "Celery", "Alembic"],
  },
  {
    title: "AI workflows",
    items: ["LangGraph", "LangChain", "DeepSeek", "Codex", "Claude Code"],
  },
  {
    title: "Data & infrastructure",
    items: ["PostgreSQL", "MongoDB", "pgvector", "Redis", "Docker", "AWS"],
  },
  {
    title: "Quality & tooling",
    items: ["Git", "GitHub", "Sentry", "Pytest", "Ruff"],
  },
];

function PhotoCollection({ item, index }: Readonly<{ item: TrailItem; index: number }>) {
  const gallery = item.gallery ?? [item];
  const [activeIndex, setActiveIndex] = useState(0);
  const photo = gallery[activeIndex];
  const labels = ["Outdoors & sport", "Places & discoveries", "Family & friends", "On repeat"];

  return (
    <figure className={styles.photoCollection}>
      <div className={styles.photoFrame}>
        <img src={photo.src} alt={photo.alt} width="800" height="600" loading="lazy" decoding="async" />
      </div>
      <figcaption>
        <div className={styles.photoHeading}>
          <h3>{labels[index]}</h3>
          <div className={styles.photoControls}>
            <button type="button" aria-label={"Previous photo in " + labels[index]} onClick={() => setActiveIndex((current) => (current - 1 + gallery.length) % gallery.length)}><ChevronLeft size={16} aria-hidden="true" /></button>
            <button type="button" aria-label={"Next photo in " + labels[index]} onClick={() => setActiveIndex((current) => (current + 1) % gallery.length)}><ChevronRight size={16} aria-hidden="true" /></button>
          </div>
        </div>
        <p aria-live="polite">{photo.caption} <span className={styles.photoCount}>{activeIndex + 1}/{gallery.length}</span></p>
      </figcaption>
    </figure>
  );
}

export function EditorialPortfolio() {
  return (
    <div id="top" className={styles.page}>
      <a className={styles.skipLink} href="#main">Skip to content</a>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="Andrew L. home">ANDREW<span>.</span>L</a>
        <p className={styles.headerNote}><span aria-hidden="true" />SOFTWARE ENGINEER</p>
        <nav aria-label="Main navigation">
          <a href="#projects">Work</a>
          <a href="#about">About</a>
          <a href="#tech-stack">Stack</a>
          <a href="/Andrew-Liu-Resume.pdf" target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={14} aria-hidden="true" /></a>
        </nav>
      </header>

      <main id="main">
        <section className={styles.hero} aria-labelledby="intro-heading">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>SOFTWARE ENGINEER <span>/</span> MARKHAM, ON</p>
            <h1 id="intro-heading">
              <span className={styles.headlineLine}>MAKING THINGS</span>
              <span className={styles.headlineLine}>I WOULD <mark>USE.</mark></span>
            </h1>
            <p className={styles.heroDescription}>I’m Andrew, a Computer Engineering student at McMaster. I build full-stack applications and AI workflows with a focus on clear, practical experiences.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryLink} href="#projects">Explore my work <ArrowDown size={17} aria-hidden="true" /></a>
              <a className={styles.textLink} href="/Andrew-Liu-Resume.pdf" target="_blank" rel="noreferrer">View résumé <ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
            <p className={styles.heroNote}>Starting with curiosity and far too many tabs.</p>
          </div>

          <div className={styles.asciiPanel}>
            <Image
              src="/images/hero-portrait-orange-green.png"
              alt="Centered grain-textured editorial screen-print portrait of Andrew L."
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
              className={styles.portraitImage}
            />
            <div className={styles.portraitWash} aria-hidden="true" />
            <span className={styles.portraitIndex} aria-hidden="true">SUBJECT / A.L-01</span>
            <span className={styles.asciiLabel}>[ PORTRAIT.EDITION ]</span>
          </div>
        </section>

        <div className={styles.focusStrip} aria-label="Engineering focus">
          <span><b aria-hidden="true">+</b> FULL STACK</span>
          <span><b aria-hidden="true">+</b> AGENTIC ENGINEERING</span>
          <span><b aria-hidden="true">+</b> AGENT ORCHESTRATION</span>
        </div>

        <section id="projects" className={styles.workSection} aria-labelledby="work-heading">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>01 / SELECTED WORK</p><h2 id="work-heading">Ideas, made real.</h2></div>
            <p>From the first idea to the systems behind it.</p>
          </div>

          <div className={styles.projectGrid}>
            {selectedWork.map((work, index) => {
              const project = projects.find((project) => project.slug === work.slug)!;
              return (
                <article className={styles.project} key={work.slug}>
                  <Link className={styles.projectVisual} href={"/projects/" + work.slug} aria-label={"Read the " + project.title + " case study"}>
                    <div className={styles.previewBar}><span><i /><i /><i /></span><span>{project.url}</span><ArrowUpRight size={15} aria-hidden="true" /></div>
                    <div className={styles.previewImage}><Image src={work.image} alt={work.alt} fill sizes="(max-width: 760px) 90vw, 48vw" /></div>
                  </Link>
                  <div className={styles.projectCopy}>
                    <p className={styles.projectCategory}><span>0{index + 1}</span> {work.category}</p>
                    <h3><Link href={"/projects/" + work.slug}>{project.title}</Link></h3>
                    <p className={styles.projectSummary}>{work.summary}</p>
                    <p className={styles.projectDescription}>{work.description}</p>
                    <ul className={styles.projectDetails}>{work.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                    <ul className={styles.stack} aria-label={project.title + " technologies"}>{work.stack.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                    <div className={styles.projectLinks}>
                      <Link href={"/projects/" + work.slug}>Case study <ArrowRight size={16} aria-hidden="true" /></Link>
                      <a href={project.links.live} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={15} aria-hidden="true" /></a>
                      <a href={project.links.github} target="_blank" rel="noreferrer" aria-label={project.title + " source on GitHub"}><Github size={17} aria-hidden="true" /><span>Source</span></a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="about" className={styles.aboutSection} aria-labelledby="about-heading">
          <div className={styles.aboutIntro}>
            <p className={styles.eyebrow}>02 / A LITTLE ABOUT ME</p>
            <h2 id="about-heading">I learn by building.</h2>
            <p>I like understanding how the whole system works, from what someone sees on screen to the services behind it. My projects are how I explore that curiosity: frame a problem, build a working version, and keep making it better.</p>
            <p>I use AI as a collaborator, while staying hands-on with the architecture, testing, and decisions that shape the result.</p>
          </div>
          <div className={styles.aboutDetails}>
            <div className={styles.education}>
              <p className={styles.eyebrow}>EDUCATION</p>
              <h3>McMaster University</h3>
              <p>Computer Engineering</p>
            </div>
            <div className={styles.approach}>
              <p className={styles.eyebrow}>HOW I WORK</p>
              <h3>Explore. Build. Refine.</h3>
              <p>Understand the problem, test the approach, and improve the details.</p>
            </div>
          </div>
        </section>

        <section id="tech-stack" className={styles.techStackSection} aria-labelledby="stack-heading">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>03 / TOOLS &amp; TECHNOLOGIES</p>
              <h2 id="stack-heading">The full tech stack.</h2>
            </div>
            <p>The tools I use to bring it all together.</p>
          </div>
          <div id="skills">
            {technologyTaxonomy.map((category, index) => (
              <div className={styles.taxonomyRow} key={category.title}>
                <span className={styles.taxonomyIndex} aria-hidden="true">0{index + 1}</span>
                <h3>{category.title}</h3>
                <ul aria-label={category.title}>
                  {category.items.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="hobbies" className={styles.personalSection} aria-labelledby="personal-heading">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>04 / OFFLINE</p><h2 id="personal-heading">Beyond the screen.</h2></div>
            <p>A few things that keep me curious.</p>
          </div>
          <div className={styles.photoGrid}>{offlineTrail.map((item, index) => <PhotoCollection item={item} index={index} key={item.src} />)}</div>
        </section>
        <div className={styles.endNote}><span>Andrew L. · Software Engineer</span><a href="#top">Back to top <ArrowUpRight size={14} aria-hidden="true" /></a></div>
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
          <a
            href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=ahanliu0311%40gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <Mail aria-hidden="true" />
            <span>EMAIL</span>
          </a>
          <a href="/Andrew-Liu-Resume.pdf" target="_blank" rel="noreferrer">
            <FileText aria-hidden="true" />
            <span>RESUME</span>
          </a>
        </nav>
        <span className={styles.footerResponse}>RESPONSE: 0-24H</span>
      </footer>
    </div>
  );
}
