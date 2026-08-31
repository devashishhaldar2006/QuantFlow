import type { PortfolioStrategy } from "@/services/portfolio/portfolioService";
import { formatCurrency, formatSignedPercent } from "@/lib/format";

type StrategyAllocationProps = {
  strategies: PortfolioStrategy[];
};

export default function StrategyAllocation({ strategies }: StrategyAllocationProps) {
  return (
    <section className="w-full">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Strategy Breakdown
        </span>
        <div className="h-px flex-1 bg-slate-800/60" />
      </div>
      <p className="mb-4 text-sm text-slate-400">
        How different strategies contribute to your overall portfolio.
      </p>

      <div className="overflow-x-auto rounded-xl glass-panel">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="bg-slate-900/40 backdrop-blur-md text-xs uppercase font-semibold text-slate-400 border-b border-slate-700/50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Strategy</th>
              <th className="px-4 py-3 text-right font-semibold">Backtests</th>
              <th className="px-4 py-3 text-right font-semibold">Capital</th>
              <th className="px-4 py-3 text-right font-semibold">Final Equity</th>
              <th className="px-4 py-3 text-right font-semibold">Net P&L</th>
              <th className="px-4 py-3 text-right font-semibold">Return</th>
            </tr>
          </thead>
          <tbody>
            {strategies.map((strategy) => (
              <tr
                key={strategy.strategy}
                className="border-b border-slate-700/50 transition-colors last:border-0 hover:bg-slate-800/30"
              >
                <td className="px-4 py-3 font-medium text-slate-100">{strategy.strategy}</td>
                <td className="px-4 py-3 text-right font-mono text-slate-300">{strategy.backtestCount}</td>
                <td className="px-4 py-3 text-right font-mono text-slate-300">{formatCurrency(strategy.initialCapital)}</td>
                <td className="px-4 py-3 text-right font-mono text-slate-300">{formatCurrency(strategy.finalEquity)}</td>
                <td className={`px-4 py-3 text-right font-mono ${strategy.netProfit >= 0 ? "text-profit" : "text-loss"}`}>
                  {formatCurrency(strategy.netProfit)}
                </td>
                <td className={`px-4 py-3 text-right font-mono font-semibold ${strategy.returnPercent >= 0 ? "text-profit" : "text-loss"}`}>
                  {formatSignedPercent(strategy.returnPercent)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}