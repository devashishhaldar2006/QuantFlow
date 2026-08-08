import MetricsGrid from "./MetricsGrid";
import PerformanceChart from "./PerformanceChart";
import RecentBacktests from "./RecentBacktests";

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

        <p className="text-sm text-muted-foreground">
          Overview of your trading performance.
        </p>
      </div>

      <MetricsGrid />

      <PerformanceChart />

      <RecentBacktests />
    </div>
  );
}
