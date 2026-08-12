"use client";

import PageHeader from "@/components/common/PageHeader";
import MetricsGrid from "./MetricsGrid";
import PerformanceChart from "./PerformanceChart";
import RecentBacktests from "./RecentBacktests";
import { getLatestBacktestResult } from "@/features/backtest/store";

export default function Dashboard() {
  const result = getLatestBacktestResult();

  const performanceData = result?.equityCurve ?? [];

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your trading performance."
      />

      <MetricsGrid />

      <PerformanceChart data={performanceData} />

      <RecentBacktests />
    </div>
  );
}