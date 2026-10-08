import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { getProjects, getStudioPages } from "@/lib/site-data";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  const content = getStudioPages().work;
  const projects = getProjects();
  return (
    <main id="main-content">
      <header className="work-page-heading shell">
        <div className="work-heading-meta">
          <p className="eyebrow">{content.eyebrow}</p>
          <p className="eyebrow">{String(projects.length).padStart(2, "0")} projects</p>
        </div>
        <div className="work-heading-copy">
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
        </div>
      </header>
      <section className="work-projects shell">
        <div className="work-grid">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </section>
    </main>
  );
}
