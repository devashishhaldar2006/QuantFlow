"use client";

import Link from "next/link";
import { ArrowLeft, FlaskConical } from "lucide-react";

import type { PersistedBacktest } from "../types";

import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";
import BacktestDetailsHeader from "./BacktestDetailsHeader";
import BacktestPerformance from "./BacktestPerformance";
import BacktestRiskMetrics from "./BacktestRiskMetrics";
import BacktestTradeHistory from "./BacktestTradeHistory";
import BacktestTradeStats from "./BacktestTradeStats";
import EmptyState from "@/components/common/EmptyState";

type BacktestDetailsProps = {
  backtest: PersistedBacktest;
};

export default function BacktestDetails({
  backtest,
}: BacktestDetailsProps) {
  return (
    <AnimatedPage className="min-h-[calc(100vh-56px)]">
      <BacktestDetailsHeader backtest={backtest} />

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        <AnimatedItem>
          <BacktestPerformance backtest={backtest} />
        </AnimatedItem>

        <div className="grid gap-8 xl:grid-cols-2">
          <AnimatedItem>
            <BacktestRiskMetrics backtest={backtest} />
          </AnimatedItem>

          <AnimatedItem>
            <BacktestTradeStats backtest={backtest} />
          </AnimatedItem>
        </div>

        <AnimatedItem>
          <BacktestTradeHistory backtest={backtest} />
        </AnimatedItem>
      </main>
    </AnimatedPage>
  );
}

export function BacktestNotFound() {
  return (
    <AnimatedPage className="mx-auto flex min-h-[calc(100vh-56px)] max-w-7xl items-center justify-center px-6">
      <EmptyState
        icon={FlaskConical}
        title="Backtest Not Found"
        description="The requested backtest does not exist or is no longer available."
        action={
          <Link
            href="/backtests"
            className="inline-flex h-9 items-center gap-2 rounded-md bg-[#7da2e0] px-4 text-sm font-semibold text-[#0a1120] transition-colors hover:bg-[#9bb8e8]"
          >
            <ArrowLeft className="size-4" />
            Back to Backtests
          </Link>
        }
      />
    </AnimatedPage>
  );
}