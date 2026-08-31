import PerformanceChart from "@/components/charts/PerformanceChart";
import { formatCurrency, formatSignedPercent } from "@/lib/format";
import type { PersistedBacktest } from "../types";

type BacktestPerformanceProps = {
  backtest: PersistedBacktest;
};

function MetricRow({ label, value, valueClass = "text-slate-200" }: { label: string; value: string | number; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-800 last:border-0">
      <span className="text-sm text-slate-400">{label}</span>
      <span className={`font-mono text-sm font-medium ${valueClass}`}>{value}</span>
    </div>
  );
}

export default function BacktestPerformance({ backtest }: BacktestPerformanceProps) {
  const returnPositive = backtest.totalReturnPercent >= 0;
  const profitPositive = backtest.netProfit >= 0;

  return (
    <section className="space-y-6">
      {/* Final Equity Summary */}
      <div className="rounded-md border border-slate-700 bg-slate-900/50 p-5">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Final Equity</span>
        <div className="mt-3 space-y-0">
          <MetricRow label="Initial Capital" value={formatCurrency(backtest.initialCapital)} />
          <MetricRow label="Final Equity" value={formatCurrency(backtest.finalEquity)} />
          <MetricRow
            label="Net Profit"
            value={formatCurrency(backtest.netProfit)}
            valueClass={profitPositive ? "text-emerald-500" : "text-red-500"}
          />
          <MetricRow
            label="Total Return"
            value={formatSignedPercent(backtest.totalReturnPercent)}
            valueClass={returnPositive ? "text-emerald-500" : "text-red-500"}
          />
        </div>
      </div>

      {/* Equity Curve */}
      <div className="rounded-md border border-slate-700 bg-slate-900/50 p-5">
        <div className="mb-4">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Equity Curve</span>
        </div>
        <div className="h-[340px]">
          <PerformanceChart data={backtest.equityCurve} height={340} />
        </div>
      </div>
    </section>
  );
}
