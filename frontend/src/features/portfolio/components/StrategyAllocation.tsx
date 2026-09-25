import type { PortfolioStrategy } from "@/services/portfolio/portfolioService";
import { formatCurrency, formatSignedPercent } from "@/lib/format";

type StrategyAllocationProps = {
  strategies: PortfolioStrategy[];
};

export default function StrategyAllocation({ strategies }: StrategyAllocationProps) {
  return (
    <section className="w-full">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
          STRATEGY_ALLOCATION_BREAKDOWN
        </span>
        <div className="h-px flex-1 bg-zinc-200" />
      </div>

      <div className="overflow-x-auto rounded border border-zinc-200 bg-white">
        <table className="w-full min-w-[700px] text-xs">
          <thead className="bg-zinc-50 text-[10px] uppercase font-bold font-mono text-zinc-500 border-b border-zinc-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">MODEL</th>
              <th className="px-4 py-3 text-right font-semibold">EXECUTIONS</th>
              <th className="px-4 py-3 text-right font-semibold">CAPITAL</th>
              <th className="px-4 py-3 text-right font-semibold">FINAL_EQUITY</th>
              <th className="px-4 py-3 text-right font-semibold">NET_PNL</th>
              <th className="px-4 py-3 text-right font-semibold">RETURN</th>
            </tr>
          </thead>
          <tbody>
            {strategies.map((strategy) => (
              <tr
                key={strategy.strategy}
                className="border-b border-zinc-200 transition-colors last:border-0 hover:bg-zinc-50"
              >
                <td className="px-4 py-3 font-mono font-medium text-zinc-900">{strategy.strategy}</td>
                <td className="px-4 py-3 text-right font-mono text-zinc-700">{strategy.backtestCount}</td>
                <td className="px-4 py-3 text-right font-mono text-zinc-700">{formatCurrency(strategy.initialCapital)}</td>
                <td className="px-4 py-3 text-right font-mono text-zinc-700">{formatCurrency(strategy.finalEquity)}</td>
                <td className={`px-4 py-3 text-right font-mono font-semibold ${strategy.netProfit >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {formatCurrency(strategy.netProfit)}
                </td>
                <td className={`px-4 py-3 text-right font-mono font-bold ${strategy.returnPercent >= 0 ? "text-emerald-600" : "text-red-600"}`}>
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