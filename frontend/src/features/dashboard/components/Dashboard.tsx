
import PageHeader from "@/components/common/PageHeader";
import MetricsGrid from "./MetricsGrid";
import PerformanceChart from "./PerformanceChart";
import RecentBacktests from "./RecentBacktests";
import { getBacktests } from "@/services/backtest/backtestService";

export default async function Dashboard() {
  const backtests = await getBacktests();

  const latestBacktest = backtests[0] ?? null;

  const performanceData =
    latestBacktest?.equityCurve ?? [];

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your trading performance."
      />

      <MetricsGrid result={latestBacktest} />

      <PerformanceChart data={performanceData} />

      <RecentBacktests
        backtests={backtests.slice(0, 5)}
      />
    </div>
  );
}