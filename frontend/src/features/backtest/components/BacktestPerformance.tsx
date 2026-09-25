import PerformanceChart from "@/components/charts/PerformanceChart";
import { formatCurrency, formatSignedPercent } from "@/lib/format";
import type { PersistedBacktest } from "../types";

type BacktestPerformanceProps = {
  backtest: PersistedBacktest;
};

function MetricRow({ label, value, valueClass = "text-zinc-900" }: { label: string; value: string | number; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-zinc-200 last:border-0">
      <span className="text-sm text-zinc-600">{label}</span>
      <span className={`font-mono text-sm font-semibold ${valueClass}`}>{value}</span>
    </div>
  );
}

export default function BacktestPerformance({ backtest }: BacktestPerformanceProps) {
  const returnPositive = backtest.totalReturnPercent >= 0;
  const profitPositive = backtest.netProfit >= 0;

  return (
    <section className="space-y-6">
      {/* Final Equity Summary */}
      <div className="rounded border border-zinc-200 bg-white p-5">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">FINAL_EQUITY_SUMMARY</span>
        <div className="mt-3 space-y-0">
          <MetricRow label="Initial Capital" value={formatCurrency(backtest.initialCapital)} />
          <MetricRow label="Final Equity" value={formatCurrency(backtest.finalEquity)} />
          <MetricRow
            label="Net Profit"
            value={formatCurrency(backtest.netProfit)}
            valueClass={profitPositive ? "text-emerald-600" : "text-red-600"}
          />
          <MetricRow
            label="Total Return"
            value={formatSignedPercent(backtest.totalReturnPercent)}
            valueClass={returnPositive ? "text-emerald-600" : "text-red-600"}
          />
        </div>
      </div>

      {/* Equity Curve */}
      <div className="rounded border border-zinc-200 bg-white p-5">
        <div className="mb-4">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">EQUITY_CURVE</span>
        </div>
        <div className="h-[340px]">
          <PerformanceChart data={backtest.equityCurve} height={340} />
        </div>
      </div>
    </section>
  );
}
