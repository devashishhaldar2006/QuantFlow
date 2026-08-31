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

      <div className="rounded-xl glass-panel p-6">
        <div className="space-y-6">
          {strategies.map((strategy) => {
            const width = (Math.abs(strategy.averageReturn) / maximum) * 100;
            const positive = strategy.averageReturn >= 0;

            return (
               <div key={strategy.strategy} className="group">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-slate-200 transition-colors group-hover:text-indigo-300">
                    {strategy.strategy}
                  </span>

                  <span
                    className={[
                      "font-mono text-xs font-semibold",
                      positive ? "text-profit" : "text-loss",
                    ].join(" ")}
                  >
                    {formatSignedPercent(strategy.averageReturn)}
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800/50 shadow-inner">
                  <div
                    className={[
                      "h-full rounded-full transition-all duration-1000",
                      positive ? "bg-gradient-to-r from-emerald-500/50 to-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" : "bg-gradient-to-r from-red-500/50 to-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]",
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
