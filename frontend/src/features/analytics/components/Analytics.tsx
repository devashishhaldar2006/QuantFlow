"use client";

import type { AnalyticsSummary } from "@/services/analytics/analyticsService";

import PageLayout from "@/components/layout/PageLayout";
import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";
import EmptyState from "@/components/common/EmptyState";
import { BarChart2 } from "lucide-react";

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
    <AnimatedPage>
      <PageLayout
        eyebrow="Quantitative Analysis"
        title="Analytics"
        description="Compare performance and risk metrics across your completed backtests and strategies."
      >
        {!hasData ? (
          <AnimatedItem>
            <EmptyState
              icon={BarChart2}
              title="No Analytics Data"
              description="Run at least one completed backtest to start comparing strategy performance and risk."
            />
          </AnimatedItem>
        ) : (
          <>
            <AnimatedItem>
              <AnalyticsOverview analytics={analytics} />
            </AnimatedItem>

            <AnimatedItem>
              <StrategyRanking strategies={analytics.strategies} />
            </AnimatedItem>

            <AnimatedItem>
              <PerformanceComparison strategies={analytics.strategies} />
            </AnimatedItem>
          </>
        )}
      </PageLayout>
    </AnimatedPage>
  );
}