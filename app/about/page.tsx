import type { Metadata } from "next";
import Image from "next/image";
import { SocialIcon, type SocialName } from "@/components/social-icon";
import { getSiteSettings, getStudioPages } from "@/lib/site-data";

export const metadata: Metadata = { title: "About the Studio" };

export default function AboutPage() {
  const content = getStudioPages().about;
  const siteSettings = getSiteSettings();
  const linkedIn = siteSettings.socialLinks.find((link) => link.label.toLowerCase() === "linkedin");
  const additionalSocials: SocialName[] = ["Instagram", "WhatsApp"];
  return (
    <main id="main-content">
      <header className="work-page-heading about-page-heading shell">
        <div className="work-heading-meta">
          <p className="eyebrow">{content.eyebrow}</p>
        </div>
        <div className="work-heading-copy">
          <h1>{content.title}</h1>
        </div>
        <p className="about-profile-name">{content.personName}</p>
      </header>
      <section className="about-profile-hero">
        <div className="shell about-profile-grid">
          <div className="about-profile-copy">
            <p>{content.intro}</p>
            <div className="about-profile-actions">
              <div className="about-social-row">
                {linkedIn ? <a className="about-social-icon about-linkedin" href={linkedIn.url} rel="noreferrer" target="_blank" aria-label="LinkedIn" title="LinkedIn"><SocialIcon name="LinkedIn" /></a> : null}
                {additionalSocials.map((name) => {
                  const social = siteSettings.socialLinks.find((link) => link.label.toLowerCase() === name.toLowerCase());
                  return social ? (
                    <a className={`about-social-icon about-${name.toLowerCase()}`} href={social.url} key={name} rel="noreferrer" target="_blank" aria-label={name} title={name}><SocialIcon name={name} /></a>
                  ) : (
                    <span className="about-social-icon button-disabled" key={name} aria-disabled="true" aria-label={`${name} link pending`} title={`${name} link pending`}><SocialIcon name={name} /></span>
                  );
                })}
              </div>
              {siteSettings.resumeUrl ? (
                <a className="button-outline" href={siteSettings.resumeUrl}>Download résumé</a>
              ) : (
                <span className="button-outline button-disabled" aria-disabled="true">Résumé coming soon</span>
              )}
            </div>
          </div>
          <div className="about-portrait">
            {content.portrait ? (
              <Image src={content.portrait} alt={content.portraitAlt} fill sizes="(max-width: 900px) 100vw, 50vw" priority />
            ) : (
              <div className="about-portrait-placeholder">
                <span>Portrait / pending</span>
                <Image src={siteSettings.logo} alt="" width={220} height={154} />
                <strong>{content.personName}</strong>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="page-section shell about-grid">
        <p className="eyebrow">{content.missionEyebrow}</p>
        <div>
          <h2>{content.missionTitle}</h2>
          {content.missionParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
      <section className="page-section section-dark about-principles">
        <div className="shell">
          <div className="about-principles-heading">
            <p className="eyebrow">{content.principlesEyebrow}</p>
            <div>
              <h2>{content.principlesTitle}</h2>
              <p>{content.principlesIntro}</p>
            </div>
          </div>
          <div className="principles-grid">
            {content.principles.map((principle) => (
              <article key={principle.title}>
                <div className="principle-number" aria-hidden="true"><i /></div>
                <div className="principle-copy">
                  <h3>{principle.title}</h3>
                  <p>{principle.copy}</p>
                  <p>{principle.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="page-section shell about-people">
        <div className="about-section-heading">
          <div className="about-section-title">
            <h2>{content.collaboratorsTitle}</h2>
          </div>
        </div>
        <div className="collaborator-grid">
          {content.collaborators.length ? content.collaborators.map((collaborator) => (
            <article className="collaborator-card" key={collaborator.name}>
              <div className="collaborator-photo">
                {collaborator.photo ? <Image src={collaborator.photo} alt={collaborator.photoAlt || collaborator.name} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" /> : <span>Photo / pending</span>}
              </div>
              <p className="eyebrow">{collaborator.role}</p>
              <h3>{collaborator.name}</h3>
              <p>{collaborator.summary}</p>
              {collaborator.url ? <a className="text-link" href={collaborator.url} rel="noreferrer" target="_blank">{collaborator.linkLabel || "View profile"}</a> : null}
            </article>
          )) : Array.from({ length: 3 }, (_, index) => (
            <article className="collaborator-card collaborator-card-empty" key={index}>
              <div className="collaborator-photo"><span>Photo / pending</span></div>
              <p className="eyebrow">Profile slot 0{index + 1}</p>
              <h3>Collaborator name</h3>
              <p>Add a role, one-line introduction, portrait, and optional profile link.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section about-clients section-dark">
        <div className="shell">
          <div className="about-section-heading about-section-heading-dark">
            <div className="about-section-title">
              <h2>{content.clientsTitle}</h2>
            </div>
          </div>
          <div className="client-grid">
            {content.clients.length ? content.clients.map((client) => {
              const clientContent = <>{client.logo ? <Image src={client.logo} alt={client.logoAlt || client.name} fill sizes="(max-width: 600px) 100vw, 25vw" /> : <strong>{client.name}</strong>}<span>{client.note || "Client"}</span></>;
              return client.url ? <a className="client-card" href={client.url} key={client.name} rel="noreferrer" target="_blank">{clientContent}</a> : <article className="client-card" key={client.name}>{clientContent}</article>;
            }) : Array.from({ length: 4 }, (_, index) => (
              <article className="client-card client-card-empty" key={index}>
                <strong>Client logo</strong>
                <span>Slot 0{index + 1} / pending</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

