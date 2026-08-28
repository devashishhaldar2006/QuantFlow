"use client";

import { useMemo } from "react";

import PageLayout from "@/components/layout/PageLayout";
import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";

import BacktestToolbar from "./BacktestToolbar";
import BacktestTable from "./BacktestTable";

import type {
  BacktestStatus,
  BacktestSummary,
} from "../types";

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
    return Array.from(
      new Set(
        backtests.map((backtest) => backtest.strategy),
      ),
    );
  }, [backtests]);

  return (
    <AnimatedPage>
      <PageLayout
        eyebrow="Research & Analysis"
        title="Backtests"
        description="Create, run, and analyze your trading strategies against historical market data."
      >
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
      </PageLayout>
    </AnimatedPage>
  );
}