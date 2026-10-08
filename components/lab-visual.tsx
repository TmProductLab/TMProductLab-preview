export type VisualVariant = "grid" | "orbit" | "fold" | "frames" | "signal" | "assembly";

export function LabVisual({ variant, label }: { variant: VisualVariant; label: string }) {
  return (
    <div className={`lab-visual visual-${variant}`} role="img" aria-label={`${label} placeholder artwork`}>
      <span className="visual-line line-a" />
      <span className="visual-line line-b" />
      <span className="visual-line line-c" />
      <span className="visual-core" />
      <span className="visual-label">Media / pending</span>
    </div>
  );
}
