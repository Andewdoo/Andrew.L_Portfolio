"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Download, FileText, Github, Linkedin, Mail, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { owner, panelTitles, photos, projects, skillGroups, type Panel } from "@/data/content";

type Props = {
  panel: Panel | null;
  photoIndex: number;
  setPhotoIndex: (index: number) => void;
  onClose: () => void;
};

export default function PortfolioDialog({ panel, photoIndex, setPhotoIndex, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = photos[photoIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!panel || !dialog || dialog.open) return;
    dialog.showModal();
    closeRef.current?.focus();
  }, [panel]);

  return (
    <dialog
      className="portfolio-dialog"
      ref={dialogRef}
      aria-labelledby="panel-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      {panel && (
        <div className="panel">
          <header className="panel-heading">
            <h2 id="panel-title">{panelTitles[panel]}</h2>
            <button ref={closeRef} className="icon-button" type="button" aria-label="Close panel" onClick={() => dialogRef.current?.close()}>
              <X size={21} aria-hidden="true" />
            </button>
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
              <div className="resume-panel">
                <div className="panel-links">
                  <a href={owner.resume} target="_blank" rel="noreferrer"><FileText size={17} aria-hidden="true" /> Open PDF</a>
                  <a href={owner.resume} download><Download size={17} aria-hidden="true" /> Download</a>
                </div>
                <Image className="resume-preview" src="/scene/resume-preview.webp" width={1005} height={1300}
                  sizes="(max-width: 820px) 90vw, 720px" alt="Preview of Andrew Liu’s resume. Open the PDF for selectable text." />
              </div>
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
                <div className="photo-actions">
                  <button className="icon-button" type="button" aria-label="Previous photo"
                    onClick={() => setPhotoIndex((photoIndex + photos.length - 1) % photos.length)}>
                    <ChevronLeft size={22} aria-hidden="true" />
                  </button>
                  <span>{photoIndex + 1} / {photos.length}</span>
                  <button className="icon-button" type="button" aria-label="Next photo"
                    onClick={() => setPhotoIndex((photoIndex + 1) % photos.length)}>
                    <ChevronRight size={22} aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
