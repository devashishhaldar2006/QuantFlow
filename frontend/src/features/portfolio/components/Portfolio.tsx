import Link from "next/link";
import { Folder, Plus, Briefcase } from "lucide-react";
import type { PortfolioSummary } from "@/services/portfolio/portfolioService";
import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";
import PageHeader from "@/components/common/PageHeader";
import PortfolioOverview from "./PortfolioOverview";
import StrategyAllocation from "./StrategyAllocation";
import PortfolioActivity from "./PortfolioActivity";

type PortfolioProps = {
  portfolio: PortfolioSummary;
};

export default function Portfolio({ portfolio }: PortfolioProps) {
  const hasData = portfolio.totalBacktests > 0;

  return (
    <AnimatedPage>
      <PageHeader
        title="Portfolio"
        description="Consolidated performance and execution activity across all completed backtests."
        icon={Briefcase}
        action={{ label: "New Backtest", href: "/backtests/new" }}
      />

      {!hasData ? (
        <AnimatedItem>
          <div className="glass-panel flex flex-col items-center justify-center py-24 rounded-xl text-center">
            <div className="flex size-14 items-center justify-center rounded-full border border-slate-700/50 bg-slate-800/30 mb-4 shadow-inner">
              <Folder className="size-6 text-slate-400" />
            </div>
            <h2 className="text-lg font-semibold text-slate-200">No Portfolio Data</h2>
            <p className="mt-1.5 max-w-sm text-sm text-slate-500">
              Complete a backtest to populate the research portfolio with performance metrics and activity.
            </p>
            <Link
              href="/backtests/new"
              className="mt-5 inline-flex h-9 items-center gap-2 rounded-md bg-indigo-500 px-4 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
            >
              Create Backtest
            </Link>
          </div>
        </AnimatedItem>
      ) : (
        <div className="space-y-8">
          <AnimatedItem><PortfolioOverview portfolio={portfolio} /></AnimatedItem>
          <AnimatedItem><StrategyAllocation strategies={portfolio.strategies} /></AnimatedItem>
          <AnimatedItem><PortfolioActivity activities={portfolio.activities} /></AnimatedItem>
        </div>
      )}
    </AnimatedPage>
  );
}