import type { Metadata } from "next";
import Link from "next/link";
import { getLabs, getStudioPages } from "@/lib/site-data";
import { PageStart } from "@/components/page-start";

export const metadata: Metadata = { title: "Labs" };

export default function LabsPage() {
  const content = getStudioPages().labs;
  const labs = getLabs();
  return (
    <main id="main-content" className="labs-page">
      <PageStart />
      <header className="work-page-heading labs-page-heading shell">
        <div className="work-heading-meta">
          <p className="eyebrow">{content.eyebrow}</p>
        </div>
        <div className="work-heading-copy">
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
        </div>
      </header>
      <section className="page-section section-dark">
        <div className="shell labs-list">
          {labs.map((lab) => (
            <Link href={`/labs/${lab.slug}`} className="lab-row" key={lab.slug}>
              <span className="lab-marker" aria-hidden="true"><i /></span>
              <h3>{lab.name}</h3>
              <p>{lab.description}</p>
              <b aria-hidden="true">↗</b>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
