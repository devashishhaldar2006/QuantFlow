import type { AnalyticsSummary } from "@/services/analytics/analyticsService";
import MetricCard from "@/components/common/MetricCard";
import SectionHeader from "@/components/common/SectionHeader";
import { formatPercent, formatNumber } from "@/lib/format";
import { Activity, Percent, Trophy, BarChart3, Star, TrendingDown } from "lucide-react";

type AnalyticsOverviewProps = {
  analytics: AnalyticsSummary;
};

export default function AnalyticsOverview({
  analytics,
}: AnalyticsOverviewProps) {
  return (
    <section>
      <SectionHeader
        eyebrow="Overview"
        title="Performance Analytics"
        description="Key performance indicators aggregated across your trading strategies."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <MetricCard
          label="Backtests"
          value={analytics.totalBacktests}
          description="Completed simulations"
          icon={Activity}
        />

        <MetricCard
          label="Average Return"
          value={formatPercent(analytics.averageReturn)}
          description="Across all backtests"
          icon={Percent}
          positive={analytics.averageReturn >= 0}
          negative={analytics.averageReturn < 0}
        />

        <MetricCard
          label="Best Return"
          value={formatPercent(analytics.bestReturn)}
          description="Highest total return"
          icon={Trophy}
          positive={analytics.bestReturn >= 0}
          negative={analytics.bestReturn < 0}
        />

        <MetricCard
          label="Average Sharpe"
          value={formatNumber(analytics.averageSharpe)}
          description="Risk-adjusted return"
          icon={BarChart3}
          positive={analytics.averageSharpe > 0}
          negative={analytics.averageSharpe < 0}
        />

        <MetricCard
          label="Best Sharpe"
          value={formatNumber(analytics.bestSharpe)}
          description="Highest Sharpe ratio"
          icon={Star}
          positive={analytics.bestSharpe > 0}
          negative={analytics.bestSharpe < 0}
        />

        <MetricCard
          label="Best Drawdown"
          value={formatPercent(analytics.bestMaxDrawdown)}
          description="Lowest maximum drawdown"
          icon={TrendingDown}
          negative={analytics.bestMaxDrawdown > 0}
        />
      </div>
    </section>
  );
}
