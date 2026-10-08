import Link from "next/link";
import type { Project } from "@/lib/site-data";
import { getLab } from "@/lib/site-data";
import { LabVisual } from "./lab-visual";
import { ProjectCardGallery } from "./project-card-gallery";

export function ProjectCard({ project, large = false, dashMarker = false }: { project: Project; large?: boolean; dashMarker?: boolean }) {
  const lab = getLab(project.lab);
  const href = `/work/${project.slug}`;
  const images = [
    ...(project.thumbnail ? [{ src: project.thumbnail, alt: project.thumbnailAlt || project.title }] : []),
    ...(project.mediaFrames || []).filter((frame) => frame.image).map((frame) => ({ src: frame.image!, alt: frame.imageAlt || frame.title })),
  ].filter((image, index, all) => all.findIndex((candidate) => candidate.src === image.src) === index).slice(0, 4);
  return (
    <article className={large ? "project-card project-card-large" : "project-card"}>
      {images.length ? <ProjectCardGallery images={images} title={project.title} href={href} temporary={project.temporary} />
        : <Link href={href}><LabVisual variant={project.visual} label={project.title} /></Link>}
      <Link href={href} className="project-card-meta">
        <div>
          {dashMarker ? <span className="project-dash" aria-hidden="true" /> : <span className="project-index">{project.index}</span>}
          <h3>{project.title}</h3>
        </div>
        <div className="project-card-side">
          <span>{lab?.name}</span>
          <span>{project.status}</span>
        </div>
      </Link>
    </article>
  );
}
