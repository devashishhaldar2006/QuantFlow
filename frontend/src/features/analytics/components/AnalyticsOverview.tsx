import type { AnalyticsSummary } from "@/services/analytics/analyticsService";

type AnalyticsOverviewProps = {
  analytics: AnalyticsSummary;
};

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}

function formatNumber(value: number) {
  return value.toFixed(2);
}

function MetricCard({
  label,
  value,
  description,
  positive,
  negative,
}: {
  label: string;
  value: string | number;
  description: string;
  positive?: boolean;
  negative?: boolean;
}) {
  return (
    <div className="bg-card p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </p>

      <p
        className={[
          "mt-3 font-financial text-xl font-semibold",
          positive ? "text-profit" : "",
          negative ? "text-loss" : "",
        ].join(" ")}
      >
        {value}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

export default function AnalyticsOverview({
  analytics,
}: AnalyticsOverviewProps) {
  return (
    <section>
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Overview
        </p>

        <h2 className="mt-1 text-lg font-semibold tracking-tight">
          Performance Overview
        </h2>
      </div>

      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-6">
        <MetricCard
          label="Backtests"
          value={analytics.totalBacktests}
          description="Completed simulations"
        />

        <MetricCard
          label="Average Return"
          value={formatPercent(analytics.averageReturn)}
          description="Across all backtests"
          positive={analytics.averageReturn > 0}
          negative={analytics.averageReturn < 0}
        />

        <MetricCard
          label="Best Return"
          value={formatPercent(analytics.bestReturn)}
          description="Highest total return"
          positive={analytics.bestReturn > 0}
          negative={analytics.bestReturn < 0}
        />

        <MetricCard
          label="Average Sharpe"
          value={formatNumber(analytics.averageSharpe)}
          description="Risk-adjusted performance"
          positive={analytics.averageSharpe > 0}
          negative={analytics.averageSharpe < 0}
        />

        <MetricCard
          label="Best Sharpe"
          value={formatNumber(analytics.bestSharpe)}
          description="Highest Sharpe ratio"
          positive={analytics.bestSharpe > 0}
          negative={analytics.bestSharpe < 0}
        />

        <MetricCard
          label="Best Drawdown"
          value={formatPercent(analytics.bestMaxDrawdown)}
          description="Lowest drawdown among traded backtests"
          positive={analytics.bestMaxDrawdown >= 0}
          negative={analytics.bestMaxDrawdown < 0}
        />
      </div>
    </section>
  );
}
