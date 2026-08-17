import type { PersistedBacktest } from "../types";
import BacktestMetricCard from "./BacktestMetricCard";

type BacktestTradeStatsProps = {
  backtest: PersistedBacktest;
};

function formatNumber(value: number) {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}

export default function BacktestTradeStats({
  backtest,
}: BacktestTradeStatsProps) {
  return (
    <section>
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Trade Analysis
        </p>

        <h2 className="mt-1 text-lg font-semibold tracking-tight">
          Trade Statistics
        </h2>
      </div>

      <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
        <BacktestMetricCard
          label="Total Trades"
          value={backtest.totalTrades}
          description="Completed trades"
        />

        <BacktestMetricCard
          label="Win Rate"
          value={formatPercent(backtest.winRatePercent)}
          description={`${backtest.winningTrades} winning trades`}
          positive={backtest.winRatePercent >= 50}
        />

        <BacktestMetricCard
          label="Winning Trades"
          value={backtest.winningTrades}
          description="Profitable trades"
          positive={backtest.winningTrades > 0}
        />

        <BacktestMetricCard
          label="Losing Trades"
          value={backtest.losingTrades}
          description="Unprofitable trades"
          negative={backtest.losingTrades > 0}
        />

        <BacktestMetricCard
          label="Average Win"
          value={formatNumber(backtest.averageWin)}
          description="Average profitable trade"
          positive={backtest.averageWin > 0}
        />

        <BacktestMetricCard
          label="Average Loss"
          value={formatNumber(backtest.averageLoss)}
          description="Average losing trade"
          negative={backtest.averageLoss < 0}
        />

        <BacktestMetricCard
          label="Largest Win"
          value={formatNumber(backtest.largestWin)}
          description="Best individual trade"
          positive={backtest.largestWin > 0}
        />

        <BacktestMetricCard
          label="Largest Loss"
          value={formatNumber(backtest.largestLoss)}
          description="Worst individual trade"
          negative={backtest.largestLoss < 0}
        />
      </div>
    </section>
  );
}