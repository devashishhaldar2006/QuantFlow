import type { StrategyAnalytics } from "@/services/analytics/analyticsService";

type PerformanceComparisonProps = {
  strategies: StrategyAnalytics[];
};

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}

export default function PerformanceComparison({
  strategies,
}: PerformanceComparisonProps) {
  if (strategies.length === 0) {
    return null;
  }

  const maximum = Math.max(
    ...strategies.map((strategy) => Math.abs(strategy.averageReturn)),
    1,
  );

  return (
    <section>
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Comparison
        </p>

        <h2 className="mt-1 text-lg font-semibold tracking-tight">
          Average Return by Strategy
        </h2>
      </div>

      <div className="border border-border bg-card p-6">
        <div className="space-y-6">
          {strategies.map((strategy) => {
            const width = (Math.abs(strategy.averageReturn) / maximum) * 100;

            const positive = strategy.averageReturn >= 0;

            return (
              <div key={strategy.strategy}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium">
                    {strategy.strategy}
                  </span>

                  <span
                    className={[
                      "font-financial text-xs font-semibold",
                      positive ? "text-profit" : "text-loss",
                    ].join(" ")}
                  >
                    {formatPercent(strategy.averageReturn)}
                  </span>
                </div>

                <div className="h-2 w-full bg-muted">
                  <div
                    className={[
                      "h-full transition-all",
                      positive ? "bg-[#4edea3]" : "bg-[#ff8f8f]",
                    ].join(" ")}
                    style={{
                      width: `${width}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
