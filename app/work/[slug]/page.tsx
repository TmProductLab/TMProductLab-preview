import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/site-data";
import { siteAsset } from "@/lib/site-paths";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  return { title: project ? `${project.title} — Coming soon` : "Project" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <main id="main-content" className="coming-soon-project">
      <h1 className="sr-only">{project.title} — Projects coming soon</h1>
      <Image
        className="coming-soon-poster"
        src={siteAsset(project.thumbnail!)}
        alt={project.thumbnailAlt || "TMProductLab projects coming soon"}
        width={1672}
        height={941}
        preload
        sizes="100vw"
      />
      <div className="coming-soon-navigation shell">
        <Link className="text-link" href="/work">Back to work</Link>
        <Link className="text-link" href="/contact">Let’s connect</Link>
      </div>
    </main>
  );
}
