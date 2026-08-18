import type { PortfolioSummary } from "@/services/portfolio/portfolioService";

import PortfolioOverview from "./PortfolioOverview";
import StrategyAllocation from "./StrategyAllocation";
import PortfolioActivity from "./PortfolioActivity";

type PortfolioProps = {
  portfolio: PortfolioSummary;
};

export default function Portfolio({
  portfolio,
}: PortfolioProps) {
  const hasData = portfolio.totalBacktests > 0;

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Research Portfolio
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Portfolio
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Consolidated performance and execution activity
            across completed backtests.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        {!hasData ? (
          <EmptyPortfolioState />
        ) : (
          <>
            <PortfolioOverview portfolio={portfolio} />

            <StrategyAllocation
              strategies={portfolio.strategies}
            />

            <PortfolioActivity
              activities={portfolio.activities}
            />
          </>
        )}
      </main>
    </div>
  );
}

function EmptyPortfolioState() {
  return (
    <section className="border border-border bg-card p-10 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        No Data
      </p>

      <h2 className="mt-2 text-lg font-semibold">
        No completed backtests yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Complete a backtest to populate the research portfolio.
      </p>
    </section>
  );
}