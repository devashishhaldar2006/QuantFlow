import type { StrategyAnalytics } from "@/services/analytics/analyticsService";
import SectionHeader from "@/components/common/SectionHeader";
import { formatSignedPercent } from "@/lib/format";

type PerformanceComparisonProps = {
  strategies: StrategyAnalytics[];
};

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
    <section className="w-full">
      <SectionHeader
        eyebrow="Comparison"
        title="Average Return by Strategy"
        description="Visualizing the average percentage return for each strategy."
      />

      <div className="rounded border border-zinc-200 bg-white p-6">
        <div className="space-y-6">
          {strategies.map((strategy) => {
            const width = (Math.abs(strategy.averageReturn) / maximum) * 100;
            const positive = strategy.averageReturn >= 0;

            return (
              <div key={strategy.strategy} className="group">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-zinc-900">
                    {strategy.strategy}
                  </span>

                  <span
                    className={[
                      "font-mono text-xs font-bold",
                      positive ? "text-emerald-600" : "text-red-600",
                    ].join(" ")}
                  >
                    {formatSignedPercent(strategy.averageReturn)}
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded bg-zinc-100">
                  <div
                    className={[
                      "h-full rounded transition-all duration-1000",
                      positive ? "bg-emerald-500" : "bg-red-500",
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
