import Link from "next/link";
import { getLabs, getSiteSettings } from "@/lib/site-data";
import { BrandMark } from "./brand-mark";
import { SiteNavigation } from "./site-navigation";
import { SocialIcon, type SocialName } from "./social-icon";

export function SiteHeader() {
  return (
    <header className="site-header">
      <BrandMark />
      <SiteNavigation labs={getLabs().map(({ slug, name }) => ({ slug, name }))} />
      <Link className="header-cta" href="/contact">Let&apos;s connect</Link>
    </header>
  );
}

export function SiteFooter() {
  const labs = getLabs();
  const siteSettings = getSiteSettings();
  const socialNames: SocialName[] = ["Instagram", "WhatsApp", "Facebook", "YouTube", "TikTok", "X"];
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <BrandMark />
        <p>{siteSettings.footerStatement}</p>
      </div>
      <div className="footer-column">
        <p className="footer-label">Navigate</p>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/work">Work</Link>
          <Link href="/labs">Labs</Link>
          <Link href="/process">Process</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
      <div className="footer-column">
        <p className="footer-label">Labs</p>
        <nav className="footer-links" aria-label="Lab links">
          {labs.map((lab) => <Link key={lab.slug} href={`/labs/${lab.slug}`}>{lab.name}</Link>)}
        </nav>
      </div>
      <div className="footer-contact">
        <p className="footer-label">Start a conversation</p>
        <p>Have an idea worth making real?</p>
        <Link className="button-accent" href="/contact">Let&apos;s connect</Link>
      </div>
      <div className="footer-social" role="group" aria-label="Social channels">
        {socialNames.map((name) => {
          const social = siteSettings.socialLinks.find((link) => link.label.toLowerCase() === name.toLowerCase());
          return social ? (
            <a className="footer-social-icon" href={social.url} key={name} rel="noreferrer" target="_blank" aria-label={name} title={name}><SocialIcon name={name} /></a>
          ) : (
            <span className="footer-social-icon" key={name} aria-disabled="true" aria-label={`${name} link pending`} title={`${name} link pending`}><SocialIcon name={name} /></span>
          );
        })}
      </div>
      <div className="footer-bottom">
        <span>{siteSettings.copyright}</span>
        <span>{siteSettings.footerTagline}</span>
      </div>
    </footer>
  );
}
