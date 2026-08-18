import type { PortfolioSummary } from "@/services/portfolio/portfolioService";

type PortfolioOverviewProps = {
  portfolio: PortfolioSummary;
};

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}

export default function PortfolioOverview({
  portfolio,
}: PortfolioOverviewProps) {
  const positive = portfolio.netProfit >= 0;

  return (
    <section>
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Overview
        </p>

        <h2 className="mt-1 text-lg font-semibold tracking-tight">
          Portfolio Performance
        </h2>
      </div>

      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-5">
        <Metric
          label="Backtests"
          value={portfolio.totalBacktests}
          description="Completed simulations"
        />

        <Metric
          label="Initial Capital"
          value={formatCurrency(portfolio.initialCapital)}
          description="Combined starting capital"
        />

        <Metric
          label="Final Equity"
          value={formatCurrency(portfolio.finalEquity)}
          description="Combined final equity"
        />

        <Metric
          label="Net P&L"
          value={formatCurrency(portfolio.netProfit)}
          description="Combined result"
          positive={positive}
          negative={!positive}
        />

        <Metric
          label="Return"
          value={formatPercent(portfolio.returnPercent)}
          description="Portfolio-level return"
          positive={portfolio.returnPercent > 0}
          negative={portfolio.returnPercent < 0}
        />
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  description,
  positive,
  negative,
}: {
  label: string;
  value: string | number;
  description: string;
  positive?: boolean;
  negative?: boolean;
}) {
  return (
    <div className="bg-card p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </p>

      <p
        className={[
          "mt-3 font-financial text-xl font-semibold",
          positive ? "text-profit" : "",
          negative ? "text-loss" : "",
        ].join(" ")}
      >
        {value}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  );
}