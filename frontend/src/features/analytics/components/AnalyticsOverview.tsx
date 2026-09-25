import type { AnalyticsSummary } from "@/services/analytics/analyticsService";
import { formatPercent, formatNumber } from "@/lib/format";

type AnalyticsOverviewProps = {
  analytics: AnalyticsSummary;
};

function Stat({
  label,
  value,
  valueClass = "text-zinc-900",
}: {
  label: string;
  value: string | number;
  valueClass?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      <span className={`font-mono text-xl font-bold tabular-nums ${valueClass}`}>
        {value}
      </span>
    </div>
  );
}

export default function AnalyticsOverview({ analytics }: AnalyticsOverviewProps) {
  return (
    <section className="rounded border border-zinc-200 bg-white p-6">
      <div className="mb-5 flex items-center gap-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
          PERFORMANCE_ANALYTICS_OVERVIEW
        </span>
        <div className="h-px flex-1 bg-zinc-200" />
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-6">
        <Stat label="Backtests" value={analytics.totalBacktests} valueClass="text-zinc-900" />
        <Stat
          label="Avg Return"
          value={formatPercent(analytics.averageReturn)}
          valueClass={analytics.averageReturn >= 0 ? "text-emerald-600 font-bold" : "text-red-600 font-bold"}
        />
        <Stat
          label="Best Return"
          value={formatPercent(analytics.bestReturn)}
          valueClass={analytics.bestReturn >= 0 ? "text-emerald-600 font-bold" : "text-red-600 font-bold"}
        />
        <Stat
          label="Avg Sharpe"
          value={formatNumber(analytics.averageSharpe)}
          valueClass={analytics.averageSharpe >= 1 ? "text-emerald-600 font-bold" : "text-zinc-900"}
        />
        <Stat
          label="Best Sharpe"
          value={formatNumber(analytics.bestSharpe)}
          valueClass={analytics.bestSharpe >= 1 ? "text-emerald-600 font-bold" : "text-zinc-900"}
        />
        <Stat
          label="Best Drawdown"
          value={formatPercent(analytics.bestMaxDrawdown)}
          valueClass={analytics.bestMaxDrawdown > 10 ? "text-red-600 font-bold" : "text-zinc-900"}
        />
      </div>
    </section>
  );
}
