import { LucideIcon, Inbox } from "lucide-react";

/**
 * EmptyState — Shown when a section has no data to display.
 *
 * Used across dashboard, analytics, portfolio, and backtest pages
 * for a consistent empty-state experience.
 */

type EmptyStateProps = {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <section className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-8 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted/50">
        <Icon className="size-5 text-muted-foreground" />
      </div>

      <h2 className="mt-5 text-base font-semibold tracking-tight">
        {title}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </section>
  );
}
