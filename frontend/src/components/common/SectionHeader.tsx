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
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {eyebrow}
      </p>

      <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-100">
        {title}
      </h2>

      {description && (
        <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
