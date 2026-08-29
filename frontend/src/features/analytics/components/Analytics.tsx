import Link from "next/link";
import { BarChart2, Plus, TrendingUp } from "lucide-react";
import type { AnalyticsSummary } from "@/services/analytics/analyticsService";
import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";
import PageHeader from "@/components/common/PageHeader";
import AnalyticsOverview from "./AnalyticsOverview";
import StrategyRanking from "./StrategyRanking";
import PerformanceComparison from "./PerformanceComparison";

type AnalyticsProps = {
  analytics: AnalyticsSummary;
};

export default function Analytics({ analytics }: AnalyticsProps) {
  const hasData = analytics.totalBacktests > 0;

  return (
    <AnimatedPage>
      <PageHeader
        title="Analytics"
        description="Compare performance and risk metrics across your completed backtests and strategies."
        icon={TrendingUp}
        action={{ label: "New Backtest", href: "/backtests/new" }}
      />

      {!hasData ? (
        <AnimatedItem>
          <div className="glass-panel flex flex-col items-center justify-center py-24 rounded-xl text-center">
            <div className="flex size-14 items-center justify-center rounded-full border border-slate-700/50 bg-slate-800/30 mb-4 shadow-inner">
              <BarChart2 className="size-6 text-slate-400" />
            </div>
            <h2 className="text-lg font-semibold text-slate-200">No Analytics Data</h2>
            <p className="mt-1.5 max-w-sm text-sm text-slate-500">
              Run at least one completed backtest to start comparing strategy performance and risk.
            </p>
            <Link
              href="/backtests/new"
              className="mt-5 inline-flex h-9 items-center gap-2 rounded-md bg-indigo-500 px-4 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
            >
              Create Backtest
            </Link>
          </div>
        </AnimatedItem>
      ) : (
        <div className="space-y-8">
          <AnimatedItem><AnalyticsOverview analytics={analytics} /></AnimatedItem>
          <AnimatedItem><StrategyRanking strategies={analytics.strategies} /></AnimatedItem>
          <AnimatedItem><PerformanceComparison strategies={analytics.strategies} /></AnimatedItem>
        </div>
      )}
    </AnimatedPage>
  );
}