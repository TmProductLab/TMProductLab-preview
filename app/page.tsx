import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { ProcessPreview } from "@/components/process-preview";
import { getHomeContent, getLab, getLabs, getProcessStages, getProjects } from "@/lib/site-data";
import { siteAsset } from "@/lib/site-paths";

export default function Home() {
  const homeContent = getHomeContent();
  const labs = getLabs();
  const processStages = getProcessStages();
  const projects = getProjects();
  return (
    <main id="main-content">
      <section className="hero-cinematic">
        <Image
          className="hero-product"
          src={siteAsset(homeContent.heroImage)}
          alt={homeContent.heroImageAlt}
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-cinematic-inner shell">
          <div className="hero-copy">
            <div className="hero-welcome">
              <span>{homeContent.heroWelcome}</span>
              <i aria-hidden="true" />
            </div>
            <h1>
              {homeContent.heroLineOne}
              <br />
              {homeContent.heroLineTwo}<span>.</span>
            </h1>
            <p className="hero-descriptor">{homeContent.heroDescriptor}</p>
            <p className="hero-subtitle">{homeContent.heroSubtitle}</p>
            <div className="hero-actions">
              <Link className="hero-action-primary" href="/work">Explore projects</Link>
              <Link className="hero-action-secondary" href="/labs">View Labs</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="studio-bridge studio-bridge-divider" aria-hidden="true" />

      <section className="section shell selected-work">
        <header className="work-page-heading home-work-heading">
          <div className="work-heading-meta">
            <p className="eyebrow">{homeContent.selectedEyebrow}</p>
            <Link className="text-link" href="/work">View all work</Link>
          </div>
          <div className="work-heading-copy">
            <h2>{homeContent.selectedTitle}</h2>
          </div>
        </header>
        <div className="featured-grid">
          {projects.filter((project) => project.featured).slice(0, 7).map((project) => {
            const projectLabs = [project.lab, ...(project.secondaryLabs ?? [])]
              .map((slug) => getLab(slug)?.shortName)
              .filter(Boolean)
              .join(" / ");
            return (
              <article className="featured-project" key={project.slug}>
                <ProjectCard project={project} large dashMarker />
                <aside className="project-description" aria-label={`${project.title} description`}>
                  <div>
                    <p className="project-description-copy">{project.summary}</p>
                  </div>
                  <dl>
                    <div><dt>Disciplines</dt><dd>{projectLabs}</dd></div>
                    <div><dt>Year</dt><dd>{project.year}</dd></div>
                  </dl>
                  <Link className="text-link" href={`/work/${project.slug}`}>View project</Link>
                </aside>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section section-dark home-labs">
        <div className="shell labs-showcase">
          <div className="labs-panel">
            <div className="labs-showcase-heading heading-inverse">
              <p className="eyebrow">{homeContent.labsEyebrow}</p>
              <h2>{homeContent.labsTitle.split("\n").map((line, index) => <span key={line}>{line}{index === 0 && <br />}</span>)}</h2>
              <p>{homeContent.labsCopy}</p>
            </div>
            <Link className="labs-explore" href="/labs">Explore all Labs</Link>
          </div>

          <div className="labs-media-stack" aria-label="Lab image gallery">
            {labs.map((lab) => (
              <Link href={`/labs/${lab.slug}`} className="lab-media-slot" key={lab.slug}>
                {lab.image ? (
                  <Image
                    className="lab-media-image"
                    src={siteAsset(lab.image)}
                    alt={lab.imageAlt ?? `${lab.name} work`}
                    fill
                    sizes="100vw"
                  />
                ) : (
                  <span className="lab-media-placeholder" role="img" aria-label={`${lab.name} static image placeholder`}>
                    <i aria-hidden="true" />
                    <em>Static image / pending</em>
                  </span>
                )}
                <strong aria-hidden="true">{lab.number}</strong>
                <span className="lab-media-caption">{lab.name}</span>
                {lab.imageAlt?.startsWith("Stock reference:") && <span className="lab-media-stock-label">Stock reference</span>}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell process-preview">
        <header className="work-page-heading home-process-heading">
          <div className="work-heading-meta">
            <p className="eyebrow">{homeContent.processEyebrow}</p>
          </div>
          <div className="work-heading-copy">
            <h2>{homeContent.processTitle}</h2>
            <p>{homeContent.processCopy}</p>
          </div>
        </header>
        <ProcessPreview stages={processStages} />
        <Link className="button-dark" href="/process">See the studio process</Link>
      </section>

      <section className="statement-band">
        <div className="shell statement-inner">
          {homeContent.statementLines.map((line) => <p key={line}>{line}</p>)}
        </div>
      </section>

      <section className="contact-band shell">
        <p className="eyebrow">{homeContent.contactEyebrow}</p>
        <h2>{homeContent.contactTitle}</h2>
        <Link className="button-accent" href="/contact">Contact TMProductLab</Link>
      </section>
    </main>
  );
}
