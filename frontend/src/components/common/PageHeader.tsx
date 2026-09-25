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

export default function PageHeader({
  title,
  description,
  icon: Icon,
  badge,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between border-b border-zinc-200 pb-4">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded border border-zinc-200 bg-zinc-50 text-zinc-800">
            <Icon className="size-4" />
          </div>
        )}

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-zinc-950">
              {title}
            </h1>
            {badge && (
              <span className="inline-flex items-center rounded border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-zinc-600">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-0.5 text-xs text-zinc-500 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      {action && (
        <Link
          href={action.href}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-md bg-zinc-950 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 transition-colors shadow-sm"
        >
          <Plus className="size-3.5" />
          {action.label}
        </Link>
      )}
    </div>
  );
}
