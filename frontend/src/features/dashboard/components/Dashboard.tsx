import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";
import PageHeader from "@/components/common/PageHeader";
import MetricsGrid from "./MetricsGrid";
import PerformanceChart from "../../../components/charts/PerformanceChart";
import RecentBacktests from "./RecentBacktests";
import { getBacktests } from "@/services/backtest/backtestService";
import type { PersistedBacktest, EquityPoint } from "@/features/backtest/types";
import { formatCurrency, formatSignedPercent } from "@/lib/format";
import { LayoutDashboard, TrendingUp, TrendingDown } from "lucide-react";

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
  const displayRecent = backtests.length > 0 ? backtests.slice(0, 5) : [mockBacktest];
  const positive = displayBacktest.totalReturnPercent >= 0;
  const TrendIcon = positive ? TrendingUp : TrendingDown;

  return (
    <AnimatedPage>
      <PageHeader
        title="Dashboard"
        description="Quantitative performance overview and recent execution activity."
        icon={LayoutDashboard}
        action={{ label: "New Backtest", href: "/backtests/new" }}
      />

      <div className="space-y-5">
        {/* Hero: Portfolio Value + Chart */}
        <AnimatedItem>
          <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 pt-6 pb-4 border-b border-white/5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
                  Portfolio Value {useMock && <span className="text-amber-500/60 ml-1">· Demo</span>}
                </p>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-mono text-3xl font-bold tracking-tight text-slate-100">
                    {formatCurrency(displayBacktest.finalEquity)}
                  </span>
                  <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${positive ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                    <TrendIcon className="size-3" />
                    {positive ? "+" : ""}{formatCurrency(displayBacktest.netProfit)} ({formatSignedPercent(displayBacktest.totalReturnPercent)})
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-600 font-mono">
                Strategy: <span className="text-slate-400">{displayBacktest.strategy}</span>
              </div>
            </div>
            <div className="h-[300px] px-1 pt-2 pb-1">
              <PerformanceChart data={performanceData} />
            </div>
          </div>
        </AnimatedItem>

        {/* Metrics */}
        <AnimatedItem>
          <div className="glass-panel rounded-2xl px-6 py-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-5">
              Key Metrics
            </p>
            <MetricsGrid result={displayBacktest} />
          </div>
        </AnimatedItem>

        {/* Recent Backtests */}
        <AnimatedItem>
          <RecentBacktests backtests={displayRecent} />
        </AnimatedItem>
      </div>
    </AnimatedPage>
  );
}
