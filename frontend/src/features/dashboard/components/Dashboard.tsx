import PageHeader from "@/components/common/PageHeader";
import MetricsGrid from "./MetricsGrid";
import PerformanceChart from "./PerformanceChart";
import RecentBacktests from "./RecentBacktests";

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your trading performance."
      />

      <MetricsGrid />

      <PerformanceChart />

      <RecentBacktests />
    </div>
  );
}
