import Link from "next/link";
import { getSiteSettings } from "@/lib/site-data";
import { siteAsset } from "@/lib/site-paths";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  const siteSettings = getSiteSettings();
  return (
    <Link href="/" className={compact ? "brand-mark compact" : "brand-mark"} aria-label="TMProductLab home">
      <span className="brand-mark-icon" aria-hidden="true">
        <img src={siteAsset(siteSettings.logo)} alt="" width="841" height="590" />
      </span>
      <span className="brand-word">{siteSettings.wordmarkPrefix}<em>{siteSettings.wordmarkAccent}</em></span>
    </Link>
  );
}
