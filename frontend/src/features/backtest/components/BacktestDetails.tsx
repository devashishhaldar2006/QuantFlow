import Link from "next/link";
import { ArrowLeft, FlaskConical } from "lucide-react";

import type { PersistedBacktest } from "../types";

import BacktestDetailsHeader from "./BacktestDetailsHeader";
import BacktestPerformance from "./BacktestPerformance";
import BacktestRiskMetrics from "./BacktestRiskMetrics";
import BacktestTradeHistory from "./BacktestTradeHistory";
import BacktestTradeStats from "./BacktestTradeStats";

type BacktestDetailsProps = {
  backtest: PersistedBacktest;
};

export default function BacktestDetails({
  backtest,
}: BacktestDetailsProps) {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      <BacktestDetailsHeader backtest={backtest} />

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        <BacktestPerformance backtest={backtest} />

        <div className="grid gap-8 xl:grid-cols-2">
          <BacktestRiskMetrics backtest={backtest} />

          <BacktestTradeStats backtest={backtest} />
        </div>

        <BacktestTradeHistory backtest={backtest} />
      </main>
    </div>
  );
}

export function BacktestNotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center justify-center px-6">
      <div className="max-w-md border border-border bg-card p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center border border-border bg-muted">
          <FlaskConical className="size-5 text-muted-foreground" />
        </div>

        <h1 className="mt-5 text-xl font-semibold">
          Backtest Not Found
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          The requested backtest does not exist or is no longer
          available.
        </p>

        <Link
          href="/backtests"
          className="mt-6 inline-flex h-9 items-center gap-2 border border-border px-4 text-sm font-medium transition-colors hover:bg-accent"
        >
          <ArrowLeft className="size-4" />
          Back to Backtests
        </Link>
      </div>
    </div>
  );
}