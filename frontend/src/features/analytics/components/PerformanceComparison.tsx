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
    <section>
      <SectionHeader
        eyebrow="Comparison"
        title="Average Return by Strategy"
        description="Visualizing the average percentage return for each strategy."
      />

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="space-y-6">
          {strategies.map((strategy) => {
            const width = (Math.abs(strategy.averageReturn) / maximum) * 100;
            const positive = strategy.averageReturn >= 0;

            return (
               <div key={strategy.strategy} className="group">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-[#d8dfef] transition-colors group-hover:text-[#7da2e0]">
                    {strategy.strategy}
                  </span>

                  <span
                    className={[
                      "font-financial text-xs font-semibold",
                      positive ? "text-[#56c79d]" : "text-[#d97b72]",
                    ].join(" ")}
                  >
                    {formatSignedPercent(strategy.averageReturn)}
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-[#1c2640]">
                  <div
                    className={[
                      "h-full rounded-full transition-all duration-1000",
                      positive ? "bg-gradient-to-r from-[#56c79d]/50 to-[#56c79d]" : "bg-gradient-to-r from-[#d97b72]/50 to-[#d97b72]",
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
