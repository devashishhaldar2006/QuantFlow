import PageHeader from "@/components/common/PageHeader";
import MetricsGrid from "./MetricsGrid";
import PerformanceChart from "./PerformanceChart";
import RecentBacktests from "./RecentBacktests";
import type { PerformancePoint } from "../types";

const performanceData: PerformancePoint[] = [
  { date: "Jan", value: 100000 },
  { date: "Feb", value: 103500 },
  { date: "Mar", value: 101800 },
  { date: "Apr", value: 108200 },
  { date: "May", value: 112400 },
  { date: "Jun", value: 118700 },
  { date: "Jul", value: 124680 },
];

export default function Dashboard() {
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
