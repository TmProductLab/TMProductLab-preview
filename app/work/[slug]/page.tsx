import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LabVisual } from "@/components/lab-visual";
import { getLab, getProject, getProjects, type ProjectMediaFrame } from "@/lib/site-data";
import { siteAsset } from "@/lib/site-paths";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  return { title: project?.title ?? "Project" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const projects = getProjects();
  const project = getProject((await params).slug);
  if (!project) notFound();
  const lab = getLab(project.lab);
  const index = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];
  const mediaFrames: ProjectMediaFrame[] = project.mediaFrames?.length ? project.mediaFrames : [
    {
      label: "View 01",
      title: "Front view",
      caption: "Project image coming soon.",
      phase: "Overview",
      mediaType: "Media pending",
      status: project.status,
    },
    {
      label: "View 02",
      title: "Side view",
      caption: "Project image coming soon.",
      phase: "Development",
      mediaType: "Media pending",
      status: project.status,
    },
    { label: "View 03", title: "Rear view", caption: "Project image coming soon.", mediaType: "Media pending", status: project.status },
    { label: "View 04", title: "Detail view", caption: "Project image coming soon.", mediaType: "Media pending", status: project.status },
  ];

  return (
    <main id="main-content">
      <header className="project-hero shell">
        <div className="project-title-row">
          <p className="eyebrow">Project {project.index} / {lab?.shortName}</p>
          <h1>{project.title}</h1>
        </div>
        {project.thumbnail ? (
          <div className="project-hero-image"><Image src={siteAsset(project.thumbnail)} alt={project.thumbnailAlt || project.title} fill priority sizes="100vw" /></div>
        ) : <LabVisual variant={project.visual} label={project.title} />}
        <div className="project-summary-grid">
          <p>{project.summary}</p>
          <dl>
            <div><dt>Primary Lab</dt><dd>{lab?.name}</dd></div>
            <div><dt>Status</dt><dd>{project.status}</dd></div>
            <div><dt>Content</dt><dd>Media with project details</dd></div>
            {project.imageCredit && <div><dt>Temporary image</dt><dd>{project.imageSource ? <a href={project.imageSource} target="_blank" rel="noreferrer">{project.imageCredit}</a> : project.imageCredit}</dd></div>}
          </dl>
        </div>
      </header>

      <section className="project-media shell" aria-labelledby="project-media-title">
        <div className="project-media-heading">
          <p className="eyebrow">Project gallery</p>
          <h2 id="project-media-title">The project from different angles.</h2>
        </div>
        <div className="media-frame-list">
          {mediaFrames.map((frame, frameIndex) => (
            <article className="media-frame" key={`${frame.label}-${frame.title}`}>
              <div className="media-frame-visual">
                {frame.image ? (
                  <Image src={siteAsset(frame.image)} alt={frame.imageAlt || `${project.title} — ${frame.title}`} fill sizes="100vw" />
                ) : <LabVisual variant={project.visual} label={`${project.title} — ${frame.title}`} />}
                <span className="media-frame-counter">{String(frameIndex + 1).padStart(2, "0")} / {String(mediaFrames.length).padStart(2, "0")}</span>
              </div>
              <div className="media-frame-details">
                <div className="media-frame-title">
                  <span>{frame.label}</span>
                  <h3>{frame.title}</h3>
                </div>
                <p>{frame.caption}</p>
                <dl>
                  {frame.phase && <div><dt>Phase</dt><dd>{frame.phase}</dd></div>}
                  {frame.mediaType && <div><dt>Media</dt><dd>{frame.mediaType}</dd></div>}
                  {frame.status && <div><dt>Status</dt><dd>{frame.status}</dd></div>}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section shell case-study-grid">
        <div className="case-study-intro">
          <p className="eyebrow">Project framework</p>
          <h2>Ready for the real project story.</h2>
          <p>
            This flexible case-study structure will expand or contract around the supplied material. Empty modules disappear cleanly rather than making an incomplete project feel unfinished.
          </p>
        </div>
        <div className="case-modules">
          {["Context & objective", "Concept exploration", "Technical development", "Prototype series", "Visualization & motion", "Outcome & status"].map((module, moduleIndex) => (
            <article key={module}>
              <span>0{moduleIndex + 1}</span>
              <h3>{module}</h3>
              <p>Content slot available when project materials are supplied.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="next-project">
        <Link className="shell" href={`/work/${nextProject.slug}`}>
          <span className="eyebrow">Next project</span>
          <strong>{nextProject.title}</strong>
          <b aria-hidden="true">↗</b>
        </Link>
      </section>
    </main>
  );
}
