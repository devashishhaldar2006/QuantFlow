import SectionHeader from "@/components/common/SectionHeader";
import {
  formatNumber,
  formatPercent,
  formatProfitFactor,
} from "@/lib/format";

import type { PersistedBacktest } from "../types";
import BacktestMetricCard from "./BacktestMetricCard";

type BacktestRiskMetricsProps = {
  backtest: PersistedBacktest;
};

export default function BacktestRiskMetrics({
  backtest,
}: BacktestRiskMetricsProps) {
  return (
    <section>
      <SectionHeader
        eyebrow="Risk Analysis"
        title="Risk Metrics"
      />

      <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
        <BacktestMetricCard
          label="Sharpe Ratio"
          value={formatNumber(backtest.sharpeRatio)}
          description="Risk-adjusted return"
        />

        <BacktestMetricCard
          label="Maximum Drawdown"
          value={`-${formatPercent(backtest.maximumDrawdown)}`}
          description="Largest peak-to-trough decline"
          negative={backtest.maximumDrawdown > 0}
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
          value={formatProfitFactor(backtest.profitFactor)}
          description="Gross profit / gross loss"
          positive={backtest.profitFactor > 1 || backtest.profitFactor === -1}
        />

        <BacktestMetricCard
          label="Expectancy"
          value={formatNumber(backtest.expectancy)}
          description="Expected result per trade"
          positive={backtest.expectancy > 0}
          negative={backtest.expectancy < 0}
        />
      </div>
    </section>
  );
}