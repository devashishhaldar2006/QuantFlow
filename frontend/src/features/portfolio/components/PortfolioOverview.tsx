import type { PortfolioSummary } from "@/services/portfolio/portfolioService";
import { formatCurrency, formatSignedPercent } from "@/lib/format";

type PortfolioOverviewProps = {
  portfolio: PortfolioSummary;
};

function Stat({
  label,
  value,
  valueClass = "text-slate-100",
  sub,
}: {
  label: string;
  value: string | number;
  valueClass?: string;
  sub?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </span>
      <span className={`font-mono text-xl font-semibold tabular-nums ${valueClass}`}>
        {value}
      </span>
      {sub && <span className="text-[10px] text-slate-500">{sub}</span>}
    </div>
  );
}

export default function PortfolioOverview({ portfolio }: PortfolioOverviewProps) {
  const positive = portfolio.returnPercent >= 0;

  return (
    <section className="rounded border border-zinc-200 bg-white p-6">
      <div className="mb-5 flex items-center gap-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
          PORTFOLIO_AGGREGATE_METRICS
        </span>
        <div className="h-px flex-1 bg-zinc-200" />
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-5">
        <Stat label="EXECUTIONS" value={portfolio.totalBacktests} valueClass="text-zinc-900" />
        <Stat label="INITIAL_CAPITAL" value={formatCurrency(portfolio.initialCapital)} valueClass="text-zinc-900" />
        <Stat label="NET_EQUITY" value={formatCurrency(portfolio.finalEquity)} valueClass="text-zinc-900" />
        <Stat
          label="NET_PNL"
          value={formatCurrency(portfolio.netProfit)}
          valueClass={portfolio.netProfit >= 0 ? "text-emerald-600 font-bold" : "text-red-600 font-bold"}
        />
        <Stat
          label="CUMULATIVE_RETURN"
          value={formatSignedPercent(portfolio.returnPercent)}
          valueClass={positive ? "text-emerald-600 font-bold" : "text-red-600 font-bold"}
        />
      </div>
    </section>
  );
}