import type { PersistedBacktest } from "../types";
import BacktestMetricCard from "./BacktestMetricCard";

type BacktestRiskMetricsProps = {
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

export default function BacktestRiskMetrics({
  backtest,
}: BacktestRiskMetricsProps) {
  return (
    <section>
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Risk Analysis
        </p>

        <h2 className="mt-1 text-lg font-semibold tracking-tight">
          Risk Metrics
        </h2>
      </div>

      <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
        <BacktestMetricCard
          label="Sharpe Ratio"
          value={formatNumber(backtest.sharpeRatio)}
          description="Risk-adjusted return"
        />

        <BacktestMetricCard
          label="Maximum Drawdown"
          value={formatPercent(backtest.maximumDrawdown)}
          description="Largest peak-to-trough decline"
          negative={backtest.maximumDrawdown < 0}
        />

        <BacktestMetricCard
          label="Annualized Return"
          value={formatPercent(backtest.annualizedReturn * 100)}
          description="Annualized performance"
          positive={backtest.annualizedReturn >= 0}
          negative={backtest.annualizedReturn < 0}
        />

        <BacktestMetricCard
          label="Annualized Volatility"
          value={formatPercent(backtest.annualizedVolatility * 100)}
          description="Annualized standard deviation"
        />

        <BacktestMetricCard
          label="Profit Factor"
          value={formatNumber(backtest.profitFactor)}
          description="Gross profit / gross loss"
        />

        <BacktestMetricCard
          label="Expectancy"
          value={formatNumber(backtest.expectancy)}
          description="Expected result per trade"
        />
      </div>
    </section>
  );
}