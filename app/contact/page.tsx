import type { Metadata } from "next";
import { getSiteSettings, getStudioPages } from "@/lib/site-data";
import { SocialIcon, type SocialName } from "@/components/social-icon";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const siteSettings = getSiteSettings();
  const recipient = siteSettings.contactEmail;
  const content = getStudioPages().contact;
  const socialNames: SocialName[] = ["Instagram", "WhatsApp", "YouTube", "X"];
  return (
    <main id="main-content" className="contact-page">
      <header className="work-page-heading contact-page-heading shell">
        <div className="work-heading-meta">
          <p className="eyebrow">{content.eyebrow}</p>
        </div>
        <div className="work-heading-copy">
          <h1>{content.title}</h1>
          <p>{content.intro}</p>
        </div>
      </header>
      <section className="contact-hero shell">
        <div className="inquiry-list">
          {content.inquiries.map((inquiry) => (
            <a key={inquiry.label} href={`mailto:${recipient}?subject=${encodeURIComponent(`TMProductLab — ${inquiry.subject}`)}`}>
              <span className="inquiry-dot" aria-hidden="true" />
              <strong>{inquiry.label}</strong>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>
      <section className="contact-social shell">
        <p className="eyebrow">{content.socialEyebrow}</p>
        <div className="contact-social-links">
          {socialNames.map((name) => {
            const social = siteSettings.socialLinks.find((link) => link.label.toLowerCase() === name.toLowerCase());
            return social ? (
              <a className={`contact-social-icon contact-social-${name.toLowerCase()}`} href={social.url} key={name} rel="noreferrer" target="_blank" aria-label={name} title={name}><SocialIcon name={name} /></a>
            ) : (
              <span className="contact-social-icon contact-social-pending" key={name} aria-disabled="true" aria-label={`${name} link pending`} title={`${name} link pending`}><SocialIcon name={name} /></span>
            );
          })}
        </div>
      </section>
    </main>
  );
}
