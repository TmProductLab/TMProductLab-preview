import type { Metadata } from "next";
import Link from "next/link";
import { getProcessStages, getProjects, getStudioPages } from "@/lib/site-data";
import { siteAsset } from "@/lib/site-paths";

export const metadata: Metadata = { title: "Concept to Creation" };

export default function ProcessPage() {
  const content = getStudioPages().process;
  const processStages = getProcessStages();
  const projects = getProjects();
  return (
    <main id="main-content">
      <header className="work-page-heading process-page-heading shell">
        <div className="work-heading-meta">
          <p className="eyebrow">{content.eyebrow}</p>
        </div>
        <div className="work-heading-copy">
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
        </div>
      </header>
      <section className="page-section shell process-collections" aria-label="Explore projects by process stage">
        {processStages.map((stage) => {
          const stageProjects = projects.filter((project) => project.processStages?.includes(stage.title.toLowerCase()));
          return (
            <details className="process-collection" key={stage.number}>
              <summary>
                <span className="process-stage-dot" aria-hidden="true" />
                <h2>{stage.title}</h2>
                {stage.image && <span className="process-stage-frame"><img className="process-stage-image" src={siteAsset(stage.image)} alt={stage.imageAlt || ""} /></span>}
                <span className="process-stage-copy"><span>{stage.copy}</span><span className="process-stage-action">Explore projects <span aria-hidden="true" className="process-stage-toggle">+</span></span></span>
              </summary>
              <div className="process-collection-panel">
                <p className="eyebrow">{stage.title} projects</p>
                {stageProjects.length ? <div className="process-project-grid">
                  {stageProjects.map((project) => <Link key={project.slug} className="process-project" href={`/work/${project.slug}`}>
                    <div className="process-project-image">{project.thumbnail ? <img src={siteAsset(project.thumbnail)} alt={project.thumbnailAlt || project.title} /> : <span>Project imagery coming soon</span>}</div>
                    <div className="process-project-title"><h3>{project.title}</h3><span aria-hidden="true">↗</span></div>
                    <p>{project.summary}</p>
                    {project.temporary && <span className="process-project-note">Temporary reference</span>}
                  </Link>)}
                </div> : <p className="process-project-empty">Projects for this stage are coming soon.</p>}
              </div>
            </details>
          );
        })}
      </section>
      <section className="statement-band">
        <div className="shell process-statement">
          <p className="eyebrow">{content.throughlineEyebrow}</p>
          <h2>{content.throughlineTitle.split(/(?<=[.!?])\s+/).map((sentence) => <span key={sentence}>{sentence}{" "}</span>)}</h2>
          <Link className="button-dark" href="/work">See the work</Link>
        </div>
      </section>
    </main>
  );
}
