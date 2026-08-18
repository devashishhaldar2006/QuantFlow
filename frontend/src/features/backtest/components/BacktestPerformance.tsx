import PerformanceChart from "@/components/charts/PerformanceChart";

import type { PersistedBacktest } from "../types";
import BacktestMetricCard from "./BacktestMetricCard";

type BacktestPerformanceProps = {
  backtest: PersistedBacktest;
};

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}

export default function BacktestPerformance({
  backtest,
}: BacktestPerformanceProps) {
  const returnIsPositive = backtest.totalReturnPercent >= 0;
  const profitIsPositive = backtest.netProfit >= 0;

  return (
    <section>
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Performance
        </p>

        <h2 className="mt-1 text-lg font-semibold tracking-tight">
          Performance Summary
        </h2>
      </div>

      <div className="grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-4">
        <BacktestMetricCard
          label="Initial Capital"
          value={formatCurrency(backtest.initialCapital)}
          description="Starting capital"
        />

        <BacktestMetricCard
          label="Final Equity"
          value={formatCurrency(backtest.finalEquity)}
          description="Ending portfolio value"
        />

        <BacktestMetricCard
          label="Net Profit"
          value={formatCurrency(backtest.netProfit)}
          description="Total realized result"
          positive={profitIsPositive}
          negative={!profitIsPositive}
        />

        <BacktestMetricCard
          label="Total Return"
          value={formatPercent(backtest.totalReturnPercent)}
          description="Return on initial capital"
          positive={returnIsPositive}
          negative={!returnIsPositive}
        />
      </div>

      <div className="mt-8">
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Performance Analysis
          </p>

          <h2 className="mt-1 text-lg font-semibold tracking-tight">
            Equity Curve
          </h2>
        </div>

        <div className="border border-border bg-card p-5">
          <PerformanceChart data={backtest.equityCurve} />
        </div>
      </div>
    </section>
  );
}
