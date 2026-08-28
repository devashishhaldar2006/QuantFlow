import { formatNumber, formatPercent } from "@/lib/format";
import type { PersistedBacktest } from "../types";

type BacktestTradeStatsProps = {
  backtest: PersistedBacktest;
};

function MetricRow({
  label,
  value,
  valueClass = "text-slate-200",
}: {
  label: string;
  value: string | number;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-800 last:border-0">
      <span className="text-sm text-slate-300">{label}</span>
      <span className={`font-mono text-sm font-medium ${valueClass}`}>{value}</span>
    </div>
  );
}

export default function BacktestTradeStats({ backtest }: BacktestTradeStatsProps) {
  return (
    <section className="rounded-md border border-slate-700 bg-slate-900/50 p-5">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Trade Statistics</span>
      <div className="mt-3">
        <MetricRow label="Total Trades" value={backtest.totalTrades} />
        <MetricRow label="Winning Trades" value={backtest.winningTrades} valueClass="text-emerald-500" />
        <MetricRow label="Losing Trades" value={backtest.losingTrades} valueClass={backtest.losingTrades > 0 ? "text-red-400" : "text-slate-200"} />
        <MetricRow label="Win Rate" value={formatPercent(backtest.winRatePercent)} valueClass={backtest.winRatePercent >= 50 ? "text-emerald-500" : "text-red-400"} />
        <MetricRow label="Average Win" value={backtest.averageWin > 0 ? `₹${formatNumber(backtest.averageWin)}` : "—"} valueClass="text-emerald-500" />
        <MetricRow label="Average Loss" value={backtest.averageLoss < 0 ? `₹${formatNumber(backtest.averageLoss)}` : "—"} valueClass={backtest.averageLoss < 0 ? "text-red-400" : "text-slate-200"} />
        <MetricRow label="Largest Win" value={backtest.largestWin > 0 ? `₹${formatNumber(backtest.largestWin)}` : "—"} valueClass="text-emerald-500" />
        <MetricRow label="Largest Loss" value={backtest.largestLoss < 0 ? `₹${formatNumber(backtest.largestLoss)}` : "—"} valueClass={backtest.largestLoss < 0 ? "text-red-400" : "text-slate-200"} />
      </div>
    </section>
  );
}