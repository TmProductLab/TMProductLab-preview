import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getSiteSettings } from "@/lib/site-data";
import { siteAsset } from "@/lib/site-paths";
import "./globals.css";

export function generateMetadata(): Metadata {
  const siteSettings = getSiteSettings();
  return {
    title: {
      default: siteSettings.siteTitle,
      template: "%s — TMProductLab",
    },
    description: siteSettings.siteDescription,
    icons: {
      icon: siteAsset("/favicon.svg"),
      shortcut: siteAsset("/favicon.svg"),
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
