"use client";

import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, Download, FileText, Github, Linkedin, Mail, X } from "lucide-react";
import { useLayoutEffect, useRef, type CSSProperties, type RefObject } from "react";

import { owner, panelTitles, photos, projects, skillGroups, type Panel } from "@/data/content";

const lensSides = Array.from({ length: 24 }, (_, index) => index);

type Props = {
  panel: Panel | null;
  trigger: RefObject<HTMLElement | null>;
  photoIndex: number;
  setPhotoIndex: (index: number) => void;
  onClose: () => void;
};

export default function PortfolioDialog({ panel, trigger, photoIndex, setPhotoIndex, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const photo = photos[photoIndex];
  const fullscreen = panel === "camera" || panel === "resume";

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!panel || !dialog || dialog.open) return;

    const bounds = fullscreen ? trigger.current?.getBoundingClientRect() : undefined;
    if (panel === "resume" && bounds) {
      const x = Math.max(0, bounds.left);
      const y = Math.max(0, bounds.top);
      dialog.style.setProperty("--entry-x", `${x}px`);
      dialog.style.setProperty("--entry-y", `${y}px`);
      dialog.style.setProperty("--entry-width", `${Math.max(0, Math.min(innerWidth, bounds.right) - x)}px`);
      dialog.style.setProperty("--entry-height", `${Math.max(0, Math.min(innerHeight, bounds.bottom) - y)}px`);
    }

    dialog.showModal();
    if (fullscreen) dialog.scrollTop = 0;

    const camera = cameraRef.current;
    const stage = camera?.parentElement;
    if (camera && stage && bounds) {
      const { left, top } = stage.getBoundingClientRect();
      const width = camera.offsetWidth;
      const height = camera.offsetHeight;
      // Use the camera's layout position before any perspective or rotation is applied.
      camera.style.setProperty("--camera-entry-x", `${bounds.left + bounds.width / 2 - left - camera.offsetLeft - width / 2}px`);
      camera.style.setProperty("--camera-entry-y", `${bounds.top + bounds.height / 2 - top - camera.offsetTop - height / 2}px`);
      camera.style.setProperty("--camera-entry-scale-x", String(bounds.width / width));
      camera.style.setProperty("--camera-entry-scale-y", String(bounds.height / height));
    }

    closeRef.current?.focus({ preventScroll: true });
  }, [fullscreen, panel, trigger]);

  function stepPhoto(direction: number) {
    setPhotoIndex((photoIndex + direction + photos.length) % photos.length);
  }

  const closeButton = (
    <button ref={closeRef} className="icon-button" type="button" aria-label="Close panel" onClick={() => dialogRef.current?.close()}>
      <X size={21} aria-hidden="true" />
    </button>
  );
  const photoActions = (
    <div className="photo-actions" role="group" aria-label="Photo navigation">
      <button className="icon-button" type="button" aria-label="Previous photo" onClick={() => stepPhoto(-1)}>
        <ChevronLeft size={22} aria-hidden="true" />
      </button>
      <span>{photoIndex + 1} / {photos.length}</span>
      <button className="icon-button" type="button" aria-label="Next photo" onClick={() => stepPhoto(1)}>
        <ChevronRight size={22} aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <dialog
      className={`portfolio-dialog${fullscreen ? ` portfolio-dialog--${panel}` : ""}`}
      ref={dialogRef}
      aria-labelledby="panel-title"
      onClose={onClose}
      onKeyDown={(event) => {
        if (panel !== "camera" || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
        event.preventDefault();
        stepPhoto(event.key === "ArrowLeft" ? -1 : 1);
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      {panel === "camera" ? (
        <div className="camera-stage" onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}>
          <div className="camera-body" ref={cameraRef}>
            <div className="camera-front" aria-hidden="true" />
            <div className="camera-lens" aria-hidden="true"
              style={{ "--lens-step": `${360 / lensSides.length}deg` } as CSSProperties}>
              {lensSides.map((side) => (
                <span key={side} className="camera-lens-side" style={{ "--lens-side": side } as CSSProperties} />
              ))}
              <div className="camera-lens-glass" />
              <div className="camera-lens-rim" />
            </div>
            <div className="camera-edges" aria-hidden="true">
              <div className="camera-edge camera-edge--top" />
              <div className="camera-edge camera-edge--right" />
              <div className="camera-edge camera-edge--bottom" />
              <div className="camera-edge camera-edge--left" />
              <div className="camera-corner camera-corner--top-left" />
              <div className="camera-corner camera-corner--top-right" />
              <div className="camera-corner camera-corner--bottom-left" />
              <div className="camera-corner camera-corner--bottom-right" />
            </div>
            <div className="camera-back">
              <header className="camera-heading">
                <h2 id="panel-title"><Camera size={20} aria-hidden="true" />{panelTitles.camera}</h2>
                {closeButton}
              </header>
              <div className="camera-layout">
                <figure className="camera-screen">
                  <div className="camera-image">
                    <Image key={photo.image} src={photo.image} alt={photo.alt} fill loading="eager"
                      sizes="(max-width: 650px) 84vw, (max-width: 950px) 80vw, 720px" />
                  </div>
                  <figcaption aria-live="polite">
                    <strong>{photo.title}</strong>
                    <span>{photo.caption}</span>
                  </figcaption>
                </figure>
                <div className="camera-controls">
                  {photoActions}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : panel && (
        <div className="panel">
          <header className="panel-heading">
            <h2 id="panel-title">{panelTitles[panel]}</h2>
            {panel === "resume" && (
              <div className="panel-links">
                <a href={owner.resume} target="_blank" rel="noreferrer"><FileText size={17} aria-hidden="true" /> Open PDF</a>
                <a href={owner.resume} download><Download size={17} aria-hidden="true" /> Download</a>
              </div>
            )}
            {closeButton}
          </header>

          <div className="panel-body">
            {panel === "about" && (
              <div className="about-copy">
                <p>I’m Andrew Liu. I study Computer Engineering at McMaster University. I learn by building the whole system, from what someone sees on screen to the services that make it work.</p>
                <p>My recent projects explore how software can help people learn and check the evidence behind AI-generated answers. Away from my desk, I enjoy skiing and getting out on the water.</p>
              </div>
            )}

            {panel === "projects" && (
              <div className="project-grid">
                {projects.map((project) => (
                  <article className="project-card" key={project.title}>
                    <div className="project-image">
                      <Image src={project.image} alt={project.alt} fill sizes="(max-width: 650px) 85vw, 370px" />
                    </div>
                    <div className="project-copy">
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                      <p>{project.contribution}</p>
                      <ul className="tag-list" aria-label={`${project.title} technologies`}>
                        {project.stack.map((tech) => <li key={tech}>{tech}</li>)}
                      </ul>
                      <div className="panel-links">
                        <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} demo`}>Live demo</a>
                        <a href={project.code} target="_blank" rel="noreferrer" aria-label={`View ${project.title} source code`}>Source code</a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {panel === "skills" && (
              <div className="skill-grid">
                {skillGroups.map((group) => (
                  <section key={group.title} className="skill-group">
                    <h3>{group.title}</h3>
                    <ul className="tag-list">{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                  </section>
                ))}
              </div>
            )}

            {panel === "resume" && (
              <figure className="resume-sheet">
                <Image className="resume-preview" src="/scene/resume-preview.webp" width={1005} height={1300} loading="eager"
                  sizes="(max-width: 650px) calc(100vw - 28px), (max-width: 1069px) 94vw, 1005px" alt="Preview of Andrew Liu’s resume. Open the PDF for selectable text." />
              </figure>
            )}

            {panel === "contact" && (
              <address className="contact-list">
                <a href={`mailto:${owner.email}`}><Mail size={21} aria-hidden="true" /><span>{owner.email}</span></a>
                <a href={owner.github} target="_blank" rel="noreferrer"><Github size={21} aria-hidden="true" /><span>GitHub</span></a>
                <a href={owner.linkedin} target="_blank" rel="noreferrer"><Linkedin size={21} aria-hidden="true" /><span>LinkedIn</span></a>
              </address>
            )}

            {panel === "photos" && (
              <div className="photo-panel">
                <figure>
                  <div className="photo-image">
                    <Image key={photo.image} src={photo.image} alt={photo.alt} fill sizes="(max-width: 820px) 90vw, 720px" />
                  </div>
                  <figcaption aria-live="polite">
                    <h3>{photo.title}</h3>
                    <p>{photo.caption}</p>
                  </figcaption>
                </figure>
                {photoActions}
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
