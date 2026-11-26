"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Menu } from "lucide-react";
import type { Panel } from "@/data/content";
import type { DeskRenderer } from "@/lib/deskScene";
import MonitorDesktop from "./MonitorDesktop";

type Props = { onSelect: (panel: Panel, trigger: HTMLElement, photoIndex?: number) => void };
const asset = "/scene/first-person/";
const propTargets = [
  { label: "Open my résumé", rect: [43,717,377,183], panel: "resume",
    shape: "polygon(37% 0, 100% 10%, 83% 100%, 0 90%)" },
  { label: "View my Toronto photo", rect: [704,21,162,142], panel: "photos", index: 0,
    shape: "polygon(0 7%, 93% 0, 100% 92%, 7% 100%)" },
  { label: "View my ski photo", rect: [918,30,116,131], panel: "photos", index: 1,
    shape: "polygon(6% 0, 100% 2%, 93% 100%, 0 98%)" },
  { label: "View my Chongqing photo", rect: [1053,63,146,98], panel: "photos", index: 2,
    shape: "polygon(2% 2%, 98% 0, 100% 100%, 0 100%)" },
  { label: "Open my photo album", rect: [585,71,106,92], panel: "photos",
    shape: "polygon(1% 61%, 5% 26%, 11% 12%, 24% 4%, 60% 0, 80% 4%, 88% 14%, 95% 38%, 100% 74%, 98% 90%, 90% 100%, 10% 100%, 3% 90%)" },
] as const;

function propStyle({ rect: [x, y, width, height], shape }: (typeof propTargets)[number]): CSSProperties {
  return { "--u": x, "--v": y, "--w": width, "--h": height, "--prop-shape": shape } as CSSProperties;
}

export default function DeskViewport({ onSelect }: Props) {
  const desk = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const layer = desk.current, surface = canvas.current;
    if (!layer || !surface) return;
    const controller = new AbortController();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let gpu: DeskRenderer | undefined;
    let generation = 0;
    let frame = 0, previous = 0;
    const goal = { x: 0, y: 0, p: 0, lookX: 0, lookY: 0 };
    const pose = { ...goal };
    function paint(time: number) {
      frame = 0;
      const elapsed = previous ? Math.min(60, time - previous) : 16;
      const handEase = reduce.matches ? 1 : 1 - Math.exp(-elapsed / 49);
      const lookEase = reduce.matches ? 1 : 1 - Math.exp(-elapsed / 110);
      previous = time;
      let moving = false;
      for (const key of ["x", "y", "p", "lookX", "lookY"] as const) {
        const ease = key === "lookX" || key === "lookY" ? lookEase : handEase;
        pose[key] += (goal[key] - pose[key]) * ease;
        if (Math.abs(goal[key] - pose[key]) < .002) pose[key] = goal[key];
        moving ||= pose[key] !== goal[key];
      }
      layer!.style.setProperty("--travel-x", String(pose.x));
      layer!.style.setProperty("--travel-y", String(pose.y));
      layer!.style.setProperty("--pressed", String(pose.p));
      layer!.style.setProperty("--look-x", String(pose.lookX));
      layer!.style.setProperty("--look-y", String(pose.lookY));
      gpu?.draw(pose.x, pose.y, pose.p);
      if (moving) requestPaint();
      else previous = 0;
    }
    function requestPaint() { if (!frame) frame = requestAnimationFrame(paint); }
    function move(event: PointerEvent) {
      const limit = reduce.matches ? 0 : event.pointerType === "touch" ? .65 : 1;
      goal.x = limit * Math.max(-1, Math.min(1, event.clientX / window.innerWidth * 2 - 1));
      goal.y = limit * Math.max(-1, Math.min(1, event.clientY / window.innerHeight * 2 - 1));
      goal.lookX = event.pointerType === "touch" ? 0 : goal.x;
      goal.lookY = event.pointerType === "touch" ? 0 : goal.y;
      requestPaint();
    }
    function rest() { goal.x = goal.y = goal.p = goal.lookX = goal.lookY = 0; requestPaint(); }
    function press(event: PointerEvent) {
      move(event);
      if (!reduce.matches) goal.p = 1;
      requestPaint();
    }
    function release(event: PointerEvent) {
      if (event.pointerType === "touch") rest();
      else { goal.p = 0; requestPaint(); }
    }
    const opts = { passive: true, signal: controller.signal };
    window.addEventListener("pointermove", move, opts);
    window.addEventListener("pointerdown", press, opts);
    window.addEventListener("pointerup", release, opts);
    window.addEventListener("pointercancel", rest, opts);
    document.documentElement.addEventListener("pointerleave", rest, opts);
    window.addEventListener("blur", rest, opts);
    const resize = new ResizeObserver(() => {
      gpu?.resize();
      requestPaint();
    });
    resize.observe(surface);
    function resetRenderer() {
      generation++;
      layer!.dataset.live = "false";
      gpu?.dispose();
      gpu = undefined;
    }
    async function mount() {
      resetRenderer();
      rest();
      if (reduce.matches) return;
      const current = generation;
      try {
        const { mountDeskScene } = await import("@/lib/deskScene");
        if (current !== generation) return;
        const renderer = await mountDeskScene(surface!, controller.signal);
        if (current !== generation) { renderer.dispose(); return; }
        gpu = renderer;
        gpu.resize();
        gpu.draw(pose.x, pose.y, pose.p);
        layer!.dataset.live = "true";
      } catch {
        if (current === generation) resetRenderer();
      }
    }
    surface.addEventListener("webglcontextlost", event => {
      event.preventDefault();
      resetRenderer();
    }, { signal: controller.signal });
    surface.addEventListener("webglcontextrestored", mount, opts);
    reduce.addEventListener("change", mount, opts);
    void mount();
    return () => {
      controller.abort();
      resize.disconnect();
      cancelAnimationFrame(frame);
      resetRenderer();
    };
  }, []);

  return (
    <main className="desk-viewport" aria-label="Andrew Liu’s portfolio">
      <div className="desk-frame" ref={desk}>
        <img className="room-render" src={asset + "room.webp"} alt="" fetchPriority="high" draggable={false} />
        <div className="mobile-shelf" aria-hidden="true" />
        <img className="keyboard-hand" src={asset + "keyboard-hand.webp"} alt="" draggable={false} />
        <div className="mouse-foreground" aria-hidden="true">
          <div className="mouse-shadow" />
          <img src={asset + "hand.webp"} alt="" draggable={false} />
        </div>
        <canvas className="mouse-rig" ref={canvas} aria-hidden="true" />
        <div className="monitor-glass"><MonitorDesktop onSelect={onSelect} /></div>
        <button className="skills-note desk-object" type="button" aria-label="Open my skills note" aria-haspopup="dialog"
          onClick={e => onSelect("skills",e.currentTarget)}>
          <img src={asset + "skills-note.webp"} alt="" draggable={false} />
        </button>
        {propTargets.map(target => <button type="button" key={target.label}
          className={"desk-object prop-target prop-" + target.panel} aria-label={target.label}
          title={target.label} aria-haspopup="dialog" style={propStyle(target)}
          onClick={e => onSelect(target.panel,e.currentTarget,"index" in target ? target.index : 0)}>
          {target.panel === "photos" && <Menu className="shelf-button-icon" aria-hidden="true" />}
        </button>)}
      </div>
    </main>
  );
}
