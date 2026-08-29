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
    <section className="glass-panel rounded-2xl p-6">
      <div className="mb-6 flex items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          Portfolio Performance
        </span>
        <div className="h-px flex-1 bg-slate-800/60" />
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-5">
        <Stat label="Backtests Run" value={portfolio.totalBacktests} />
        <Stat label="Initial Capital" value={formatCurrency(portfolio.initialCapital)} />
        <Stat label="Final Equity" value={formatCurrency(portfolio.finalEquity)} />
        <Stat
          label="Net P&L"
          value={formatCurrency(portfolio.netProfit)}
          valueClass={portfolio.netProfit >= 0 ? "text-profit" : "text-loss"}
        />
        <Stat
          label="Total Return"
          value={formatSignedPercent(portfolio.returnPercent)}
          valueClass={positive ? "text-profit" : "text-loss"}
        />
      </div>
    </section>
  );
}