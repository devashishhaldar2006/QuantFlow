import { formatNumber, formatPercent } from "@/lib/format";
import type { PersistedBacktest } from "../types";

type BacktestTradeStatsProps = {
  backtest: PersistedBacktest;
};

function MetricRow({
  label,
  value,
  valueClass = "text-zinc-900",
}: {
  label: string;
  value: string | number;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-zinc-200 last:border-0">
      <span className="text-sm text-zinc-600">{label}</span>
      <span className={`font-mono text-sm font-semibold ${valueClass}`}>{value}</span>
    </div>
  );
}

export default function BacktestTradeStats({ backtest }: BacktestTradeStatsProps) {
  return (
    <section className="rounded border border-zinc-200 bg-white p-5">
      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">TRADE_STATISTICS</span>
      <div className="mt-3">
        <MetricRow label="Total Trades" value={backtest.totalTrades} />
        <MetricRow label="Winning Trades" value={backtest.winningTrades} valueClass="text-emerald-600" />
        <MetricRow label="Losing Trades" value={backtest.losingTrades} valueClass={backtest.losingTrades > 0 ? "text-red-600" : "text-zinc-900"} />
        <MetricRow label="Win Rate" value={formatPercent(backtest.winRatePercent)} valueClass={backtest.winRatePercent >= 50 ? "text-emerald-600" : "text-red-600"} />
        <MetricRow label="Average Win" value={backtest.averageWin > 0 ? `₹${formatNumber(backtest.averageWin)}` : "—"} valueClass="text-emerald-600" />
        <MetricRow label="Average Loss" value={backtest.averageLoss < 0 ? `₹${formatNumber(backtest.averageLoss)}` : "—"} valueClass={backtest.averageLoss < 0 ? "text-red-600" : "text-zinc-900"} />
        <MetricRow label="Largest Win" value={backtest.largestWin > 0 ? `₹${formatNumber(backtest.largestWin)}` : "—"} valueClass="text-emerald-600" />
        <MetricRow label="Largest Loss" value={backtest.largestLoss < 0 ? `₹${formatNumber(backtest.largestLoss)}` : "—"} valueClass={backtest.largestLoss < 0 ? "text-red-600" : "text-zinc-900"} />
      </div>
    </section>
  );
}