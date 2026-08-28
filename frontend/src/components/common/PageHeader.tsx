import Link from "next/link";
import { Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type PageHeaderProps = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
  action?: {
    label: string;
    href: string;
  };
};

/**
 * PageHeader — Premium page title component used across all feature pages.
 * Renders a gradient-accented heading with optional description, badge, and action CTA.
 */
export default function PageHeader({
  title,
  description,
  icon: Icon,
  badge,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
            <Icon className="size-4.5 text-indigo-400" />
          </div>
        )}

        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
              {title}
            </h1>
            {badge && (
              <span className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-indigo-400">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-slate-500 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      {action && (
        <Link
          href={action.href}
          className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/30 hover:-translate-y-0.5"
        >
          <Plus className="size-4" />
          {action.label}
        </Link>
      )}
    </div>
  );
}
