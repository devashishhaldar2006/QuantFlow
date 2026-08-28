/**
 * PageLayout — Consistent full-page layout wrapper.
 *
 * Every feature page (Portfolio, Strategies, Analytics, Backtest detail)
 * follows the same pattern: bordered header with eyebrow + title + description,
 * then a max-width main content area. This component extracts that pattern.
 */

type PageLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export default function PageLayout({
  eyebrow,
  title,
  description,
  actions,
  children,
}: PageLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      <header className="border-b border-border bg-gradient-to-b from-[#131b2e]/50 to-transparent">
        <div className="mx-auto max-w-7xl px-6 py-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {eyebrow}
              </p>

              <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                {title}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>

            {actions && <div className="flex gap-3">{actions}</div>}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        {children}
      </main>
    </div>
  );
}
