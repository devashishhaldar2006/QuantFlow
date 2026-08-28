/**
 * SectionHeader — Reusable section label used across all feature pages.
 *
 * Renders the uppercase eyebrow label + heading + optional description
 * that appears above every content section in the terminal.
 */

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mb-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {eyebrow}
      </p>

      <h2 className="mt-1 text-lg font-semibold tracking-tight">
        {title}
      </h2>

      {description && (
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
