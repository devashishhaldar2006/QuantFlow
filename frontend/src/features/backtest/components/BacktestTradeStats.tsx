import SectionHeader from "@/components/common/SectionHeader";
import { formatNumber, formatPercent } from "@/lib/format";

import type { PersistedBacktest } from "../types";
import BacktestMetricCard from "./BacktestMetricCard";

type BacktestTradeStatsProps = {
  backtest: PersistedBacktest;
};

export default function BacktestTradeStats({
  backtest,
}: BacktestTradeStatsProps) {
  return (
    <section>
      <SectionHeader
        eyebrow="Trade Analysis"
        title="Trade Statistics"
      />

      <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
        <BacktestMetricCard
          label="Total Trades"
          value={backtest.totalTrades}
          description="Completed round-trip trades"
        />

        <BacktestMetricCard
          label="Win Rate"
          value={formatPercent(backtest.winRatePercent)}
          description={`${backtest.winningTrades} winning · ${backtest.losingTrades} losing`}
          positive={backtest.winRatePercent >= 50}
        />

        <BacktestMetricCard
          label="Average Win"
          value={`₹${formatNumber(backtest.averageWin)}`}
          description="Average profitable trade"
          positive={backtest.averageWin > 0}
        />

        <BacktestMetricCard
          label="Average Loss"
          value={`₹${formatNumber(backtest.averageLoss)}`}
          description="Average losing trade"
          negative={backtest.averageLoss < 0}
        />

        <BacktestMetricCard
          label="Largest Win"
          value={`₹${formatNumber(backtest.largestWin)}`}
          description="Best individual trade"
          positive={backtest.largestWin > 0}
        />

        <BacktestMetricCard
          label="Largest Loss"
          value={`₹${formatNumber(backtest.largestLoss)}`}
          description="Worst individual trade"
          negative={backtest.largestLoss < 0}
        />
      </div>
    </section>
  );
}