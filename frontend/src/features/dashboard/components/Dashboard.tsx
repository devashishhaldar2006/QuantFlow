import Link from "next/link";
import AnimatedPage, {
  AnimatedItem,
} from "@/components/common/AnimatedPage";

import PageHeader from "@/components/common/PageHeader";

import MetricsGrid from "./MetricsGrid";

import PerformanceChart from "../../../components/charts/PerformanceChart";

import RecentBacktests from "./RecentBacktests";

import { getBacktests } from "@/services/backtest/backtestService";

import type {
  PersistedBacktest,
  EquityPoint,
} from "@/features/backtest/types";

import {
  formatCurrency,
  formatSignedPercent,
} from "@/lib/format";

import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { getCurrentUser } from "@/services/auth/currentUser";

const mockEquityData: EquityPoint[] = [
  {
    timestamp: "2024-01-01T10:00:00Z",
    equity: 100000,
  },
  {
    timestamp: "2024-02-01T10:00:00Z",
    equity: 103500,
  },
  {
    timestamp: "2024-03-01T10:00:00Z",
    equity: 101800,
  },
  {
    timestamp: "2024-04-01T10:00:00Z",
    equity: 108200,
  },
  {
    timestamp: "2024-05-01T10:00:00Z",
    equity: 112400,
  },
  {
    timestamp: "2024-06-01T10:00:00Z",
    equity: 118700,
  },
  {
    timestamp: "2024-07-01T10:00:00Z",
    equity: 124680,
  },
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
  const user = await getCurrentUser();

  let backtests: PersistedBacktest[] = [];
  if (user?.id) {
    try {
      backtests = await getBacktests(user.id);
    } catch (err) {
      console.error("Failed to fetch user backtests:", err);
    }
  }

  const latestBacktest = backtests[0] ?? null;

  return (
    <AnimatedPage>
      <PageHeader
        title="Dashboard"
        description="Quantitative performance overview and recent execution activity."
        icon={LayoutDashboard}
        action={{
          label: "New Backtest",
          href: "/backtests/new",
        }}
      />

      {!latestBacktest ? (
        <div className="space-y-6">
          <AnimatedItem>
            <div className="glass-panel flex flex-col items-center justify-center py-20 px-4 rounded-2xl text-center space-y-4">
              <div className="flex size-14 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 shadow-inner">
                <LayoutDashboard className="size-7" />
              </div>
              <div className="space-y-1 max-w-md">
                <h2 className="text-xl font-bold text-slate-100">Welcome to QuantFlow Terminal</h2>
                <p className="text-xs text-slate-400">
                  Execute your first high-frequency or multi-asset strategy against real historical market data to start tracking institutional analytics.
                </p>
              </div>
              <Link
                href="/backtests/new"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition-all"
              >
                Launch First Backtest
              </Link>
            </div>
          </AnimatedItem>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Hero: Portfolio Value + Chart */}
          <AnimatedItem>
            <div className="glass-panel rounded-2xl overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 pt-6 pb-4 border-b border-white/5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
                    Latest Strategy Final Equity
                  </p>

                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-mono text-3xl font-bold tracking-tight text-slate-100">
                      {formatCurrency(latestBacktest.finalEquity)}
                    </span>

                    <div
                      className={`flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        latestBacktest.totalReturnPercent >= 0
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {latestBacktest.totalReturnPercent >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                      {latestBacktest.totalReturnPercent >= 0 ? "+" : ""}
                      {formatCurrency(latestBacktest.netProfit)}
                      {" ("}
                      {formatSignedPercent(latestBacktest.totalReturnPercent)}
                      {")"}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  Strategy:{" "}
                  <span className="text-indigo-400 font-semibold">
                    {latestBacktest.strategy}
                  </span>
                </div>
              </div>

              <div className="h-[300px] px-1 pt-2 pb-1">
                <PerformanceChart data={latestBacktest.equityCurve} />
              </div>
            </div>
          </AnimatedItem>

          {/* Metrics */}
          <AnimatedItem>
            <div className="glass-panel rounded-2xl px-6 py-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-5">
                Key Metrics
              </p>

              <MetricsGrid result={latestBacktest} />
            </div>
          </AnimatedItem>

          {/* Recent Backtests */}
          <AnimatedItem>
            <RecentBacktests backtests={backtests.slice(0, 5)} />
          </AnimatedItem>
        </div>
      )}
    </AnimatedPage>
  );
}