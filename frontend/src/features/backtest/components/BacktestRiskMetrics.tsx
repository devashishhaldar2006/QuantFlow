import { formatNumber, formatPercent, formatProfitFactor } from "@/lib/format";
import type { PersistedBacktest } from "../types";

type BacktestRiskMetricsProps = {
  backtest: PersistedBacktest;
};

function MetricRow({
  label,
  value,
  description,
  valueClass = "text-zinc-900",
}: {
  label: string;
  value: string | number;
  description?: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-zinc-200 last:border-0">
      <div>
        <span className="text-sm text-zinc-600">{label}</span>
        {description && <p className="text-[10px] text-zinc-400 mt-0.5">{description}</p>}
      </div>
      <span className={`font-mono text-sm font-semibold ${valueClass}`}>{value}</span>
    </div>
  );
}

export default function BacktestRiskMetrics({ backtest }: BacktestRiskMetricsProps) {
  return (
    <section className="rounded border border-zinc-200 bg-white p-5">
      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">RISK_AND_PERFORMANCE_METRICS</span>
      <div className="mt-3">
        <MetricRow label="Sharpe Ratio" value={formatNumber(backtest.sharpeRatio)} description="Risk-adjusted return" valueClass={backtest.sharpeRatio >= 1 ? "text-emerald-600" : "text-zinc-900"} />
        <MetricRow label="Maximum Drawdown" value={`-${formatPercent(backtest.maximumDrawdown)}`} description="Largest peak-to-trough decline" valueClass={backtest.maximumDrawdown > 5 ? "text-red-600" : "text-zinc-900"} />
        <MetricRow label="Annualized Return" value={formatPercent(backtest.annualizedReturn * 100)} description="Annualized performance" valueClass={backtest.annualizedReturn >= 0 ? "text-emerald-600" : "text-red-600"} />
        <MetricRow label="Annualized Volatility" value={formatPercent(backtest.annualizedVolatility * 100)} description="Annualized std deviation" />
        <MetricRow label="Profit Factor" value={formatProfitFactor(backtest.profitFactor)} description="Gross profit / gross loss" valueClass={backtest.profitFactor > 1 || backtest.profitFactor === -1 ? "text-emerald-600" : "text-red-600"} />
        <MetricRow label="Expectancy" value={`₹${formatNumber(backtest.expectancy)}`} description="Expected return per trade" valueClass={backtest.expectancy > 0 ? "text-emerald-600" : "text-red-600"} />
      </div>
    </section>
  );
}