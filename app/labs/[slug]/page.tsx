import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/project-card";
import { getLab, getLabs, getProjectsForLab } from "@/lib/site-data";
import { siteAsset } from "@/lib/site-paths";

const labWorkTitles: Record<string, string> = {
  "product-design": "Ideas taking shape.",
  "cad-engineering": "Precision in practice.",
  "lego-design": "Built brick by brick.",
  visualization: "Form, light & material.",
  "2d-animation": "Stories in motion.",
};

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
        {lab.image && <Image className="lab-hero-background" src={siteAsset(lab.image)} alt={lab.imageAlt || lab.name} fill priority sizes="100vw" />}
        <div className="lab-hero-overlay" aria-hidden="true" />
        <div className="shell lab-hero-inner">
          <div className="lab-hero-copy">
            <span className="lab-hero-mark" aria-hidden="true" />
            <h1>{lab.name}</h1>
            <p>{lab.statement}</p>
          </div>
        </div>
      </header>
      <section className="page-section shell lab-intro-grid">
        <div className="lab-intro-copy">
          <span className="lab-intro-mark" aria-hidden="true" />
          <h2>{lab.description}</h2>
        </div>
        <div className="lab-capabilities">
          <ul>
            {lab.capabilities.map((capability) => (
              <li key={capability}><span aria-hidden="true" /><strong>{capability}</strong></li>
            ))}
          </ul>
        </div>
      </section>
      <section className="page-section lab-work-section">
        <div className="shell">
          <div className="section-heading">
            <h2>{labWorkTitles[lab.slug] ?? "Selected work."}</h2>
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
