"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

import styles from "./EditorialPortfolio.module.css";

const capabilities = [
  "AI/ML",
  "Full Stack",
  "Cloud & DevOps",
];

const capabilityLoop = Array.from({ length: 3 }, () => capabilities).flat();

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

      <p className={styles.transitionStatus}>SIGNAL HANDOFF · {from}-{to} · PATH LOCKED</p>
    </div>
  );
}

function TrailGallery({
  items,
  title,
  tone,
}: Readonly<{
  items: readonly TrailItem[];
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
          <TrailCard
            index={index}
            item={item}
            key={item.src}
            tone={tone}
            total={items.length}
          />
        ))}

      </div>
    </div>
  );
}

function TrailCard({
  index,
  item,
  tone,
  total,
}: Readonly<{
  index: number;
  item: TrailItem;
  tone: "dark" | "light";
  total: number;
}>) {
  const gallery = item.gallery ?? [item];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = gallery[activeIndex] ?? gallery[0];
  const hasGallery = gallery.length > 1;
  const slotNumber = String(index + 1).padStart(2, "0");

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + gallery.length) % gallery.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % gallery.length);
  };

  return (
    <figure className={styles.trailCard}>
      <div className={styles.trailImageFrame}>
        <span className={styles.trailTape} aria-hidden="true" />
        <img
          alt={activeMedia.alt}
          className={hasGallery ? styles.trailCarouselImage : undefined}
          decoding="async"
          height="600"
          key={activeMedia.src}
          loading="lazy"
          src={activeMedia.src}
          width="800"
        />
        <b aria-hidden="true">{slotNumber}</b>
        {index === total - 1 && (
          <span className={styles.trailFinish} aria-hidden="true">X</span>
        )}
      </div>
      <figcaption>
        <div className={tone === "dark" ? styles.trailCaptionInline : undefined}>
          <span>{item.label}</span>
          <p>{activeMedia.caption}</p>
        </div>
        {hasGallery && (
          <div className={styles.trailCarouselControls}>
            <button
              aria-label={`Previous photo in slot ${slotNumber}`}
              onClick={showPrevious}
              type="button"
            >
              <ChevronLeft aria-hidden="true" size={17} strokeWidth={2.5} />
            </button>
            <span aria-live="polite" className={styles.trailCarouselMeta}>
              {activeMedia.group && (
                <span className={styles.trailCarouselGroup}>{activeMedia.group}</span>
              )}
              <span className={styles.trailCarouselStatus}>
                {String(activeIndex + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
              </span>
            </span>
            <button
              aria-label={`Next photo in slot ${slotNumber}`}
              onClick={showNext}
              type="button"
            >
              <ChevronRight aria-hidden="true" size={17} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </figcaption>
    </figure>
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
            <p className={styles.desktopSectionLabel}>/ EDUCATION + WORKFLOW <b>&gt;_</b></p>
            <p className={styles.mobileSectionLabel}><b>&gt;_</b> 01 / EDUCATION + WORKFLOW</p>
          </div>

          <div className={styles.educationIntro}>
            <h2>LEARNING</h2>
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

          <div id="skills" className={styles.educationWorkflow}>
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
        </div>
      </section>
    </>
  );
}

function TechHobbiesSequence() {
  return (
    <>
      <SectionTransition
        from="01"
        fromLabel="EDUCATION + WORKFLOW"
        to="02"
        toLabel="TECH STACK"
        tone="light-to-dark"
      />

      <section id="tech-stack" className={styles.techStackSection}>
        <SectionCoordinates />
        <SectionNumber value="02" />
        <div className={styles.techStackContent}>
          <div className={styles.sectionLabelRow}>
            <p className={styles.desktopSectionLabel}>/ TECH STACK <b>&gt;_</b></p>
            <p className={styles.mobileSectionLabel}><b>&gt;_</b> 02 / TECH STACK</p>
          </div>

          <h2>MY TOOLBOX.</h2>

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
        from="02"
        fromLabel="TECH STACK"
        to="03"
        toLabel="OFFLINE"
        tone="dark-to-light"
      />

      <section id="hobbies" className={styles.hobbiesSection} aria-label="Hobbies and interests">
        <SectionCoordinates />
        <SectionNumber value="03" />
        <div className={styles.hobbiesContent}>
          <div className={styles.sectionLabelRow}>
            <p className={styles.desktopSectionLabel}>/ OFFLINE <b>&gt;_</b></p>
            <p className={styles.mobileSectionLabel}><b>&gt;_</b> 03 / OFFLINE</p>
          </div>

          <h2>BEHIND THE SCENES.</h2>

          <div className={styles.interestRows}>
            {offlineInterests.map((interest, index) => (
              <article className={styles.interestRow} key={interest.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{interest.title}</h3>
                <p>{interest.description}</p>
              </article>
            ))}
          </div>

          <TrailGallery items={offlineTrail} title="FIELD NOTES / OFF THE CLOCK" tone="light" />
        </div>
      </section>
    </>
  );
}

function ProjectRow({
  category,
  description,
  index,
  previewImages,
  slug,
  stackLine,
  title,
  year,
}: Readonly<{
  category: string;
  description: string;
  index: string;
  previewImages?: readonly {
    alt: string;
    crop?: "code" | "report";
    src: string;
  }[];
  slug: string;
  stackLine: string;
  title: string;
  year: string;
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
          <div className={styles.projectIndex}>[ {year} ]</div>
          <span className={styles.squareButton} aria-hidden="true">
            <Arrow />
          </span>
        </div>
        <div className={styles.projectDetails}>
          <div className={styles.projectDetailsInner}>
            {previewImages?.length ? (
              <div className={`${styles.projectPreview}${previewImages.length > 1 ? ` ${styles.projectPreviewSplit}` : ""}`}>
                {previewImages.map((image) => (
                  <div className={styles.projectPreviewPane} key={image.src}>
                    <Image
                      alt={image.alt}
                      className={[
                        styles.projectPreviewImage,
                        image.crop === "code" ? styles.projectPreviewImageCode : "",
                        image.crop === "report" ? styles.projectPreviewImageReport : "",
                      ].filter(Boolean).join(" ")}
                      fill
                      sizes={previewImages.length > 1 ? "50vw" : "100vw"}
                      src={image.src}
                    />
                  </div>
                ))}
              </div>
            ) : (
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
            )}
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
              <span className={styles.headlineLine}>MAKING THINGS THAT</span>
              <span className={styles.headlineLine}>I WOULD <mark>USE</mark></span>
            </h1>
            <p className={styles.heroDescription}>
              <strong>Starting with curiosity and far too many tabs.</strong>
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

        <div className={styles.capabilities} aria-label="Capabilities: AI/ML, Full Stack, and Cloud & DevOps">
          <div className={styles.capabilitiesTrack} aria-hidden="true">
            {[0, 1].map((copy) => (
              <div className={styles.capabilitiesSet} key={copy}>
                {capabilityLoop.map((capability, index) => (
                  <span key={`${copy}-${index}-${capability}`}>
                    <b>+</b>
                    {capability}
                  </span>
                ))}
              </div>
            ))}
          </div>
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
            previewImages={[
              {
                alt: "Elara.ai decomposition normalization code open in Visual Studio Code",
                crop: "code",
                src: "/images/elara-code-preview.png",
              },
              {
                alt: "Elara.ai citation-audited report overview",
                crop: "report",
                src: "/images/elara-report-ui-cropped.png",
              },
            ]}
            stackLine="NEXT.JS / FASTAPI / PGVECTOR / CELERY"
            slug="elara-ai"
            year="2026"
          />
          <ProjectRow
            index="02"
            title="DEVLIFY"
            category="AI LEARNING WORKSPACE"
            description="Multi-modal tutoring, persistent chat history, and retrieval-aware answers in one focused workspace."
            previewImages={[
              {
                alt: "Devlify math workshop code open in Visual Studio Code",
                crop: "code",
                src: "/images/devlify-code-preview.png",
              },
              {
                alt: "Devlify general workspace welcoming Andrew with an empty chat composer",
                src: "/images/devlify-workspace-preview.png",
              },
            ]}
            stackLine="NEXT.JS / FASTAPI / POSTGRESQL"
            slug="devlify"
            year="2026"
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
