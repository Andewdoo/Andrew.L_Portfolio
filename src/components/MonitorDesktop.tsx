"use client";

import { useRef, useState } from "react";
import type { Panel } from "@/data/content";
import "./monitor.css";

type Props = {
  onSelect: (panel: Panel, trigger: HTMLElement, photoIndex?: number) => void;
};

const apps = [
  { panel: "about", label: "About Me" },
  { panel: "projects", label: "Projects" },
  { panel: "skills", label: "Skills" },
  { panel: "contact", label: "Contact" },
  { panel: "photos", label: "Photos" },
  { panel: "resume", label: "Resume" },
] as const;

function Sprite({ name }: { name: string }) {
  return <img className="monitor-sprite" src={`/scene/desktop/${name}.png`} alt="" draggable={false} />;
}

export default function MonitorDesktop({ onSelect }: Props) {
  const [windowState, setWindowState] = useState<"open" | "minimized" | "closed">("open");
  const [expanded, setExpanded] = useState(false);
  const portfolioShortcut = useRef<HTMLButtonElement>(null);
  const firstApp = useRef<HTMLButtonElement>(null);

  function openLauncher() {
    setWindowState("open");
    requestAnimationFrame(() => firstApp.current?.focus({ preventScroll: true }));
  }

  function dismiss(next: "closed" | "minimized") {
    setWindowState(next);
    if (next === "closed") setExpanded(false);
    portfolioShortcut.current?.focus({ preventScroll: true });
  }

  return (
    <div className="monitor-desktop" data-expanded={expanded && windowState === "open"}>
      <nav className="monitor-shortcuts" aria-label="Desktop shortcuts">
        <button type="button" ref={portfolioShortcut} onClick={openLauncher}>
          <Sprite name="monitor" /><span>Portfolio</span>
        </button>
        <button type="button" aria-haspopup="dialog" onClick={event => onSelect("projects", event.currentTarget)}>
          <Sprite name="folder" /><span>Projects</span>
        </button>
        <button type="button" aria-haspopup="dialog" onClick={event => onSelect("photos", event.currentTarget)}>
          <Sprite name="photos" /><span>Photos</span>
        </button>
      </nav>
      {windowState === "open" && (
        <>
          <div className="monitor-chrome" role="group" aria-label="Launcher window controls">
            <button type="button" aria-label="Minimize launcher" title="Minimize launcher" onClick={() => dismiss("minimized")}><span className="monitor-minimize" /></button>
            <button type="button" aria-label={expanded ? "Restore launcher size" : "Enlarge launcher"} title={expanded ? "Restore size" : "Enlarge launcher"} aria-pressed={expanded} onClick={() => setExpanded(!expanded)}><span className="monitor-maximize" /></button>
            <button type="button" aria-label="Close launcher" title="Close launcher" onClick={() => dismiss("closed")}><span className="monitor-close" /></button>
          </div>
          <section className="monitor-launcher" aria-label="My portfolio">
            <p className="monitor-kicker">My portfolio</p>
            <div className="monitor-controller" aria-hidden="true"><Sprite name="controller" /></div>
            <h2 className="monitor-welcome"><img src="/scene/desktop/welcome.png" alt="Welcome!" draggable={false} /></h2>
            <p className="monitor-prompt">Choose an option to begin</p>
            <nav className="monitor-apps" aria-label="Portfolio apps">
              {apps.map(({ panel, label }, index) => (
                <button type="button" key={panel} ref={index === 0 ? firstApp : undefined}
                  className={index > 3 ? "monitor-extra-app" : undefined} aria-haspopup="dialog"
                  onClick={event => onSelect(panel, event.currentTarget)}>
                  <span className="monitor-tile" aria-hidden="true" />
                  <Sprite name={panel} /><span className="monitor-app-name">{label}</span>
                </button>
              ))}
            </nav>
          </section>
        </>
      )}
      {windowState === "minimized" && <button className="monitor-task" type="button" onClick={openLauncher}><Sprite name="monitor" /> Portfolio</button>}
    </div>
  );
}
