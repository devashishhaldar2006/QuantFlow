import { useMemo } from "react";
import { Activity } from "lucide-react";
import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";
import PageHeader from "@/components/common/PageHeader";
import BacktestToolbar from "./BacktestToolbar";
import BacktestTable from "./BacktestTable";
import type { BacktestStatus, BacktestSummary } from "../types";

type BacktestsProps = {
  backtests: BacktestSummary[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  search?: string;
  status?: BacktestStatus | "all";
  strategy?: string;
};

export default function Backtests({
  backtests,
  page,
  pageSize,
  total,
  totalPages,
  search = "",
  status = "all",
  strategy = "all",
}: BacktestsProps) {
  const strategies = useMemo(() => {
    return Array.from(new Set(backtests.map((b) => b.strategy)));
  }, [backtests]);

  return (
    <AnimatedPage>
      <PageHeader
        title="Backtests"
        description="Create, run, and analyze strategies against historical market data."
        icon={Activity}
        badge={total > 0 ? `${total} runs` : undefined}
        action={{ label: "New Backtest", href: "/backtests/new" }}
      />

      <div className="space-y-4">
        <AnimatedItem>
          <BacktestToolbar
            search={search}
            status={status}
            strategy={strategy}
            strategies={strategies}
          />
        </AnimatedItem>

        <AnimatedItem>
          <BacktestTable
            backtests={backtests}
            page={page}
            pageSize={pageSize}
            total={total}
            totalPages={totalPages}
          />
        </AnimatedItem>
      </div>
    </AnimatedPage>
  );
}