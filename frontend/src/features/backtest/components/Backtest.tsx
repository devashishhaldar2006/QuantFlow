"use client";

import { useMemo } from "react";

import PageHeader from "@/components/common/PageHeader";

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
    <div className="space-y-6 p-6">
      <PageHeader
        title="Backtests"
        description="Create, run, and analyze your trading strategies."
      />

      <BacktestToolbar
        search={search}
        status={status}
        strategy={strategy}
        strategies={strategies}
      />

      <BacktestTable
        backtests={backtests}
        page={page}
        pageSize={pageSize}
        total={total}
        totalPages={totalPages}
      />
    </div>
  );
}