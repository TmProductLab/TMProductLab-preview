"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import type { ProcessStage } from "@/lib/site-data";
import { siteAsset } from "@/lib/site-paths";

const outcomes: Record<string, string> = {
  Concept: "A clear brief, reference board, and initial sketches.",
  Design: "A refined direction with considered form and function.",
  Model: "Accurate digital models and organized assemblies.",
  Analyze: "Finite element results that inform structural refinement and design decisions.",
  Prototype: "Testable versions and findings to guide refinement.",
  Visualize: "Renders, animations, or diagrams that explain the idea.",
  Present: "A coherent set of materials ready to share and review.",
};

export function ProcessPreview({ stages }: { stages: ProcessStage[] }) {
  const [openStage, setOpenStage] = useState<string | null>(null);

  return (
    <div className="process-strip process-strip-interactive">
      {stages.map((stage, index) => {
        const expanded = openStage === stage.number;
        return (
          <div className={`process-card${expanded ? " is-expanded" : ""}`} key={stage.number} style={{ "--process-mobile-row": Math.floor(index / 2) * 2 + 1, "--process-mobile-column": index % 2 + 1 } as CSSProperties}>
            <button
              type="button"
              className={`process-chip${stage.image ? " process-chip-image" : ""}`}
              aria-expanded={expanded}
              aria-controls={`process-detail-${stage.number}`}
              onClick={() => setOpenStage(expanded ? null : stage.number)}
            >
              {stage.image && <Image src={siteAsset(stage.image)} alt={stage.imageAlt ?? stage.title} fill sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 15vw" />}
              <strong>{stage.title}</strong>
              <span className="process-toggle" aria-hidden="true">{expanded ? "−" : "+"}</span>
            </button>
            <div id={`process-detail-${stage.number}`} className="process-card-detail" role="region" aria-label={`${stage.title} details`} hidden={!expanded}>
              <p>{stage.copy}</p>
              {outcomes[stage.title] && <p><b>What you get</b>{outcomes[stage.title]}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
