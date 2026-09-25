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
  TrendingUp,
  TrendingDown,
  Terminal,
} from "lucide-react";

import { getCurrentUser } from "@/services/auth/currentUser";

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
        title="Terminal Overview"
        description="Low-latency execution telemetry, risk vectors, and portfolio performance."
        icon={Terminal}
        action={{
          label: "Execute New Model",
          href: "/backtests/new",
        }}
      />

      {!latestBacktest ? (
        <div className="space-y-4">
          <AnimatedItem>
            <div className="border border-zinc-200 bg-white flex flex-col items-center justify-center py-16 px-4 text-center space-y-3">
              <div className="flex size-10 items-center justify-center border border-zinc-900 bg-zinc-950 text-white shadow-sm">
                <Terminal className="size-4" />
              </div>
              <div className="space-y-1 max-w-md">
                <h2 className="text-sm font-bold text-zinc-900 font-mono">
                  QUANTFLOW_EXECUTION_STATION
                </h2>
                <p className="text-xs text-zinc-500 font-mono">
                  No backtest instances compiled yet. Ingest market tick data and simulate your algorithmic models against historical order books.
                </p>
              </div>
              <Link
                href="/backtests/new"
                className="inline-flex items-center gap-2 border border-zinc-900 bg-zinc-950 px-4 py-2 text-xs font-mono font-medium text-white hover:bg-zinc-800 transition-colors"
              >
                Launch First Execution
              </Link>
            </div>
          </AnimatedItem>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Hero: Portfolio Value + Chart */}
          <AnimatedItem>
            <div className="border border-zinc-200 bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-zinc-200 bg-zinc-50/60">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-0.5">
                    NET_ASSET_VALUE
                  </span>

                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-mono text-2xl font-bold tracking-tight text-zinc-950">
                      {formatCurrency(latestBacktest.finalEquity)}
                    </span>

                    <div
                      className={`flex items-center gap-1 font-mono text-xs font-bold ${
                        latestBacktest.totalReturnPercent >= 0
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {latestBacktest.totalReturnPercent >= 0 ? (
                        <TrendingUp className="size-3" />
                      ) : (
                        <TrendingDown className="size-3" />
                      )}
                      <span>
                        {latestBacktest.totalReturnPercent >= 0 ? "+" : ""}
                        {formatCurrency(latestBacktest.netProfit)} (
                        {formatSignedPercent(latestBacktest.totalReturnPercent)})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-zinc-600 font-mono flex items-center gap-2">
                  <span className="text-zinc-400">MODEL:</span>
                  <span className="text-zinc-950 font-bold border border-zinc-200 bg-white px-2 py-0.5">
                    {latestBacktest.strategy}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <PerformanceChart data={latestBacktest.equityCurve} height={280} />
              </div>
            </div>
          </AnimatedItem>

          {/* Key Financial Telemetry Metrics */}
          <AnimatedItem>
            <MetricsGrid result={latestBacktest} />
          </AnimatedItem>

          {/* Execution History Table */}
          <AnimatedItem>
            <RecentBacktests backtests={backtests.slice(0, 5)} />
          </AnimatedItem>
        </div>
      )}
    </AnimatedPage>
  );
}