import PageLayout from "@/components/layout/PageLayout";
import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";
import MetricsGrid from "./MetricsGrid";
import PerformanceChart from "../../../components/charts/PerformanceChart";
import RecentBacktests from "./RecentBacktests";
import { getBacktests } from "@/services/backtest/backtestService";
import type { PersistedBacktest, EquityPoint } from "@/features/backtest/types";
import SectionHeader from "@/components/common/SectionHeader";

const mockEquityData: EquityPoint[] = [
  { timestamp: "2024-01-01T10:00:00Z", equity: 100000 },
  { timestamp: "2024-02-01T10:00:00Z", equity: 103500 },
  { timestamp: "2024-03-01T10:00:00Z", equity: 101800 },
  { timestamp: "2024-04-01T10:00:00Z", equity: 108200 },
  { timestamp: "2024-05-01T10:00:00Z", equity: 112400 },
  { timestamp: "2024-06-01T10:00:00Z", equity: 118700 },
  { timestamp: "2024-07-01T10:00:00Z", equity: 124680 },
];

const mockBacktest: PersistedBacktest = {
  id: "mock-1",
  strategy: "SMA Crossover (Demo)",
  initialCapital: 100000,
  finalEquity: 124680,
  netProfit: 24680,
  totalReturnPercent: 24.68,
  totalTrades: 42,
  winningTrades: 24,
  losingTrades: 18,
  winRatePercent: 57.1,
  averageWin: 1200,
  averageLoss: -600,
  largestWin: 3400,
  largestLoss: -1200,
  maximumDrawdown: 5.2,
  profitFactor: 2.1,
  expectancy: 150,
  annualizedReturn: 0.35,
  annualizedVolatility: 0.15,
  sharpeRatio: 2.1,
  status: "completed",
  createdAt: new Date().toISOString(),
  equityCurve: mockEquityData,
  trades: [],
};

export default async function Dashboard() {
  const backtests = await getBacktests();

  const realLatest = backtests[0] ?? null;
  const useMock = !realLatest || realLatest.totalTrades === 0;

  const displayBacktest = useMock ? mockBacktest : realLatest;
  const performanceData = displayBacktest.equityCurve;
  const displayRecent =
    backtests.length > 0 ? backtests.slice(0, 5) : [mockBacktest];

  return (
    <AnimatedPage>
      <PageLayout
        eyebrow="Overview"
        title="Dashboard"
        description="Overview of your trading performance and recent activity."
      >
        <MetricsGrid result={displayBacktest} />

        <AnimatedItem>
          <div className="rounded-lg border border-border bg-card p-5">
            <SectionHeader
              eyebrow="Performance"
              title="Equity Curve"
              description="Portfolio value over time based on your latest backtest."
            />

            <PerformanceChart data={performanceData} />
          </div>
        </AnimatedItem>

        <AnimatedItem>
          <RecentBacktests backtests={displayRecent} />
        </AnimatedItem>
      </PageLayout>
    </AnimatedPage>
  );
}
