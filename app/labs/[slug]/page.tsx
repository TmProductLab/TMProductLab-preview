import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/project-card";
import { getLab, getLabs, getProjectsForLab } from "@/lib/site-data";

export function generateStaticParams() {
  return getLabs().map((lab) => ({ slug: lab.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const lab = getLab((await params).slug);
  return { title: lab?.name ?? "Lab" };
}

export default async function LabPage({ params }: { params: Promise<{ slug: string }> }) {
  const lab = getLab((await params).slug);
  if (!lab) notFound();
  const labProjects = getProjectsForLab(lab.slug);
  return (
    <main id="main-content">
      <header className="lab-hero">
        <div className="shell lab-hero-inner">
          <p className="eyebrow">Lab {lab.number} / {lab.shortName}</p>
          <h1>{lab.name}</h1>
          <p>{lab.statement}</p>
        </div>
      </header>
      <section className="page-section shell lab-intro-grid">
        <div>
          <p className="eyebrow">Approach</p>
          <h2>{lab.description}</h2>
        </div>
        <div className="capability-list">
          <p className="eyebrow">Capabilities</p>
          {lab.capabilities.map((capability, index) => (
            <div key={capability}><span>0{index + 1}</span><strong>{capability}</strong></div>
          ))}
        </div>
      </section>
      <section className="page-section lab-work-section">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Related work</p>
            <h2>Projects crossing this Lab.</h2>
          </div>
          <div className="work-grid">
            {labProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        </div>
      </section>
      <section className="page-section shell lab-tools">
        <p className="eyebrow">Tools & techniques</p>
        <div>{lab.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
        <Link className="button-dark" href="/contact">Discuss a project</Link>
      </section>
    </main>
  );
}
