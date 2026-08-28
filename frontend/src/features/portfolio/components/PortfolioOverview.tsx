import type { PortfolioSummary } from "@/services/portfolio/portfolioService";
import MetricCard from "@/components/common/MetricCard";
import SectionHeader from "@/components/common/SectionHeader";
import { formatCurrency, formatPercent, formatSignedPercent } from "@/lib/format";
import { DollarSign, TrendingUp, BarChart3, Activity, Briefcase } from "lucide-react";

type PortfolioOverviewProps = {
  portfolio: PortfolioSummary;
};

export default function PortfolioOverview({
  portfolio,
}: PortfolioOverviewProps) {
  return (
    <section>
      <SectionHeader
        eyebrow="Overview"
        title="Portfolio Performance"
        description="Aggregate performance across all your completed backtests."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Backtests"
          value={portfolio.totalBacktests}
          description="Completed simulations"
          icon={Activity}
        />

        <MetricCard
          label="Initial Capital"
          value={formatCurrency(portfolio.initialCapital)}
          description="Combined starting capital"
          icon={Briefcase}
        />

        <MetricCard
          label="Final Equity"
          value={formatCurrency(portfolio.finalEquity)}
          description="Combined final equity"
          icon={DollarSign}
        />

        <MetricCard
          label="Net P&L"
          value={formatCurrency(portfolio.netProfit)}
          description="Combined result"
          icon={TrendingUp}
          positive={portfolio.netProfit >= 0}
          negative={portfolio.netProfit < 0}
        />

        <MetricCard
          label="Return"
          value={formatSignedPercent(portfolio.returnPercent)}
          description="Portfolio-level return"
          icon={BarChart3}
          positive={portfolio.returnPercent >= 0}
          negative={portfolio.returnPercent < 0}
        />
      </div>
    </section>
  );
}