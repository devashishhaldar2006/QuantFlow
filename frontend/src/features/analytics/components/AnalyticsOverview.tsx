import type { AnalyticsSummary } from "@/services/analytics/analyticsService";
import { formatPercent, formatNumber } from "@/lib/format";

type AnalyticsOverviewProps = {
  analytics: AnalyticsSummary;
};

function Stat({
  label,
  value,
  valueClass = "text-slate-100",
}: {
  label: string;
  value: string | number;
  valueClass?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </span>
      <span className={`font-mono text-xl font-semibold tabular-nums ${valueClass}`}>
        {value}
      </span>
    </div>
  );
}

export default function AnalyticsOverview({ analytics }: AnalyticsOverviewProps) {
  return (
    <section className="glass-panel rounded-2xl p-6">
      <div className="mb-6 flex items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Performance Analytics
        </span>
        <div className="h-px flex-1 bg-slate-800/60" />
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-6">
        <Stat label="Backtests" value={analytics.totalBacktests} />
        <Stat
          label="Avg Return"
          value={formatPercent(analytics.averageReturn)}
          valueClass={analytics.averageReturn >= 0 ? "text-profit" : "text-loss"}
        />
        <Stat
          label="Best Return"
          value={formatPercent(analytics.bestReturn)}
          valueClass={analytics.bestReturn >= 0 ? "text-profit" : "text-loss"}
        />
        <Stat
          label="Avg Sharpe"
          value={formatNumber(analytics.averageSharpe)}
          valueClass={analytics.averageSharpe >= 1 ? "text-profit" : "text-slate-200"}
        />
        <Stat
          label="Best Sharpe"
          value={formatNumber(analytics.bestSharpe)}
          valueClass={analytics.bestSharpe >= 1 ? "text-profit" : "text-slate-200"}
        />
        <Stat
          label="Best Drawdown"
          value={formatPercent(analytics.bestMaxDrawdown)}
          valueClass={analytics.bestMaxDrawdown > 10 ? "text-loss" : "text-slate-200"}
        />
      </div>
    </section>
  );
}
