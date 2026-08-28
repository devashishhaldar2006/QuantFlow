"use client";

import type { PortfolioSummary } from "@/services/portfolio/portfolioService";

import PageLayout from "@/components/layout/PageLayout";
import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";
import EmptyState from "@/components/common/EmptyState";
import { Folder } from "lucide-react";

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
    <AnimatedPage>
      <PageLayout
        eyebrow="Research Portfolio"
        title="Portfolio"
        description="Consolidated performance and execution activity across completed backtests."
      >
        {!hasData ? (
          <AnimatedItem>
            <EmptyState
              icon={Folder}
              title="No Portfolio Data"
              description="Complete a backtest to populate the research portfolio with performance metrics and activity."
            />
          </AnimatedItem>
        ) : (
          <>
            <AnimatedItem>
              <PortfolioOverview portfolio={portfolio} />
            </AnimatedItem>

            <AnimatedItem>
              <StrategyAllocation strategies={portfolio.strategies} />
            </AnimatedItem>

            <AnimatedItem>
              <PortfolioActivity activities={portfolio.activities} />
            </AnimatedItem>
          </>
        )}
      </PageLayout>
    </AnimatedPage>
  );
}