import fs from "node:fs";
import path from "node:path";

export type Lab = {
  slug: string;
  order: number;
  number: string;
  name: string;
  shortName: string;
  statement: string;
  description: string;
  capabilities: string[];
  tools: string[];
  image?: string;
  imageAlt?: string;
};

export type ProjectMediaFrame = {
  label: string;
  title: string;
  caption: string;
  phase?: string;
  mediaType?: string;
  status?: string;
  image?: string;
  imageAlt?: string;
};

export type Project = {
  slug: string;
  order: number;
  index: string;
  title: string;
  lab: string;
  secondaryLabs?: string[];
  processStages?: string[];
  year: string;
  status: string;
  summary: string;
  featured: boolean;
  visual: "grid" | "orbit" | "fold" | "frames" | "signal" | "assembly";
  thumbnail?: string;
  thumbnailAlt?: string;
  temporary?: boolean;
  imageCredit?: string;
  imageSource?: string;
  modelUrl?: string;
  modelPoster?: string;
  mediaFrames?: ProjectMediaFrame[];
};

export type ProcessStage = { number: string; title: string; copy: string; image?: string; imageAlt?: string };

export type SiteSettings = {
  siteTitle: string;
  siteDescription: string;
  logo: string;
  wordmarkPrefix: string;
  wordmarkAccent: string;
  footerStatement: string;
  footerTagline: string;
  copyright: string;
  contactEmail: string;
  resumeUrl: string;
  socialLinks: { label: string; url: string }[];
};

export type HomeContent = {
  heroWelcome: string;
  heroLineOne: string;
  heroLineTwo: string;
  heroDescriptor: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt: string;
  bridgeEyebrow: string;
  bridgeStatement: string;
  bridgeMeta: string[];
  selectedEyebrow: string;
  selectedTitle: string;
  labsEyebrow: string;
  labsTitle: string;
  labsCopy: string;
  processEyebrow: string;
  processTitle: string;
  processCopy: string;
  statementLines: string[];
  contactEyebrow: string;
  contactTitle: string;
};

export type StudioPagesContent = {
  work: { eyebrow: string; title: string; intro: string; note: string };
  labs: { eyebrow: string; title: string; intro: string };
  process: { eyebrow: string; title: string; intro: string; throughlineEyebrow: string; throughlineTitle: string };
  about: {
    eyebrow: string; personName: string; title: string; intro: string; portrait?: string; portraitAlt: string;
    missionEyebrow: string; missionTitle: string;
    missionParagraphs: string[]; principlesEyebrow: string; principlesTitle: string; principlesIntro: string;
    principles: { title: string; copy: string; detail: string }[];
    collaboratorsEyebrow: string; collaboratorsTitle: string; collaboratorsIntro: string;
    collaborators: { name: string; role: string; summary: string; photo?: string; photoAlt?: string; url?: string; linkLabel?: string }[];
    clientsEyebrow: string; clientsTitle: string; clientsIntro: string;
    clients: { name: string; note?: string; logo?: string; logoAlt?: string; url?: string }[];
  };
  contact: {
    eyebrow: string; title: string; intro: string;
    inquiries: { label: string; subject: string }[];
    socialEyebrow: string; socialPending: string;
  };
};

const contentRoot = path.join(process.cwd(), "content");

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(contentRoot, relativePath), "utf8")) as T;
}

function readCollection<T extends { order: number }>(folder: string): T[] {
  const directory = path.join(contentRoot, folder);
  return fs.readdirSync(directory)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(fs.readFileSync(path.join(directory, file), "utf8")) as T)
    .sort((a, b) => a.order - b.order);
}

export function getSiteSettings() {
  return readJson<SiteSettings>("settings/site.json");
}

export function getHomeContent() {
  return readJson<HomeContent>("pages/home.json");
}

export function getStudioPages() {
  return readJson<StudioPagesContent>("pages/site-pages.json");
}

export function getLabs() {
  return readCollection<Lab>("labs");
}

export function getProjects() {
  const projects = readCollection<Project>("projects");
  for (const project of projects) {
    if ((project.mediaFrames?.length ?? 0) > 4) {
      throw new Error(`Project "${project.slug}" supports a maximum of four gallery views.`);
    }
  }
  return projects;
}

export function getProcessStages() {
  return readJson<{ stages: ProcessStage[] }>("settings/process.json").stages;
}

export function getLab(slug: string) {
  return getLabs().find((lab) => lab.slug === slug);
}

export function getProject(slug: string) {
  return getProjects().find((project) => project.slug === slug);
}

export function getProjectsForLab(slug: string) {
  return getProjects().filter((project) => project.lab === slug || project.secondaryLabs?.includes(slug));
}
