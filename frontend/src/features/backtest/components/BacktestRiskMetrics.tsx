import { formatNumber, formatPercent, formatProfitFactor } from "@/lib/format";
import type { PersistedBacktest } from "../types";

type BacktestRiskMetricsProps = {
  backtest: PersistedBacktest;
};

function MetricRow({
  label,
  value,
  description,
  valueClass = "text-slate-200",
}: {
  label: string;
  value: string | number;
  description?: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-800 last:border-0">
      <div>
        <span className="text-sm text-slate-300">{label}</span>
        {description && <p className="text-[10px] text-slate-500 mt-0.5">{description}</p>}
      </div>
      <span className={`font-mono text-sm font-medium ${valueClass}`}>{value}</span>
    </div>
  );
}

export default function BacktestRiskMetrics({ backtest }: BacktestRiskMetricsProps) {
  return (
    <section className="rounded-md border border-slate-700 bg-slate-900/50 p-5">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Performance Metrics</span>
      <div className="mt-3">
        <MetricRow label="Sharpe Ratio" value={formatNumber(backtest.sharpeRatio)} description="Risk-adjusted return" valueClass={backtest.sharpeRatio >= 1 ? "text-emerald-500" : "text-slate-200"} />
        <MetricRow label="Maximum Drawdown" value={`-${formatPercent(backtest.maximumDrawdown)}`} description="Largest peak-to-trough decline" valueClass={backtest.maximumDrawdown > 5 ? "text-red-400" : "text-slate-200"} />
        <MetricRow label="Annualized Return" value={formatPercent(backtest.annualizedReturn * 100)} description="Annualized performance" valueClass={backtest.annualizedReturn >= 0 ? "text-emerald-500" : "text-red-500"} />
        <MetricRow label="Annualized Volatility" value={formatPercent(backtest.annualizedVolatility * 100)} description="Annualized std deviation" />
        <MetricRow label="Profit Factor" value={formatProfitFactor(backtest.profitFactor)} description="Gross profit / gross loss" valueClass={backtest.profitFactor > 1 || backtest.profitFactor === -1 ? "text-emerald-500" : "text-red-400"} />
        <MetricRow label="Expectancy" value={`₹${formatNumber(backtest.expectancy)}`} description="Expected return per trade" valueClass={backtest.expectancy > 0 ? "text-emerald-500" : "text-red-400"} />
      </div>
    </section>
  );
}