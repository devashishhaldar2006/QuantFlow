import type { AnalyticsSummary } from "@/services/analytics/analyticsService";

import AnalyticsOverview from "./AnalyticsOverview";
import StrategyRanking from "./StrategyRanking";
import PerformanceComparison from "./PerformanceComparison";

type AnalyticsProps = {
  analytics: AnalyticsSummary;
};

export default function Analytics({
  analytics,
}: AnalyticsProps) {
  const hasData = analytics.totalBacktests > 0;

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Quantitative Analysis
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Analytics
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Compare performance and risk across your completed
            backtests and strategies.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        {!hasData ? (
          <EmptyAnalyticsState />
        ) : (
          <>
            <AnalyticsOverview analytics={analytics} />

            <StrategyRanking
              strategies={analytics.strategies}
            />

            <PerformanceComparison
              strategies={analytics.strategies}
            />
          </>
        )}
      </main>
    </div>
  );
}

function EmptyAnalyticsState() {
  return (
    <section className="border border-border bg-card p-10 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        No Data
      </p>

      <h2 className="mt-2 text-lg font-semibold">
        No completed backtests yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Run at least one completed backtest to start comparing
        strategy performance and risk.
      </p>
    </section>
  );
}