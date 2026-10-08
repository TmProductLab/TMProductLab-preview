"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { siteAsset } from "@/lib/site-paths";

export function ProjectCardGallery({ images, title, href, temporary }: {
  images: { src: string; alt: string }[];
  title: string;
  href: string;
  temporary?: boolean;
}) {
  const [viewport, carousel] = useEmblaCarousel({ loop: false });
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (!carousel) return;
    const update = () => setSelected(carousel.selectedScrollSnap());
    carousel.on("select", update).on("reInit", update);
    return () => { carousel.off("select", update).off("reInit", update); };
  }, [carousel]);
  return (
    <div className="project-card-image project-card-gallery" role="region" aria-roledescription="carousel" aria-label={`${title} images`}>
      <div className="project-gallery-viewport" ref={viewport}>
        <div className="project-gallery-track">
          {images.map((image, index) => (
            <Link href={href} className="project-gallery-slide" key={image.src} aria-label={`${title}: image ${index + 1} of ${images.length}. View project`}>
              <Image src={siteAsset(image.src)} alt={image.alt} fill sizes="100vw" />
            </Link>
          ))}
        </div>
      </div>
      {temporary && <span className="temporary-badge">Temporary reference</span>}
      {images.length > 1 && (
        <div className="project-gallery-controls">
          <button className="project-gallery-prev" type="button" aria-label={`Previous image for ${title}`} disabled={selected === 0} onClick={() => carousel?.scrollPrev()}><span className="project-gallery-triangle" aria-hidden="true" /></button>
          <span aria-live="polite">{selected + 1} / {images.length}</span>
          <button className="project-gallery-next" type="button" aria-label={`Next image for ${title}`} disabled={selected === images.length - 1} onClick={() => carousel?.scrollNext()}><span className="project-gallery-triangle" aria-hidden="true" /></button>
        </div>
      )}
    </div>
  );
}
