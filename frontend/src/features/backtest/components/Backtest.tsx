"use client";

import { useMemo, useState } from "react";

import PageHeader from "@/components/common/PageHeader";

import BacktestToolbar from "./BacktestToolbar";
import BacktestTable from "./BacktestTable";

import type { BacktestStatus, PersistedBacktest } from "../types";

type BacktestsProps = {
  backtests: PersistedBacktest[];
};

export default function Backtests({
  backtests,
}: BacktestsProps) {
  const [search, setSearch] = useState("");

  const [status, setStatus] =
    useState<BacktestStatus | "all">("all");

  const [strategy, setStrategy] = useState("all");

  const filteredBacktests = useMemo(() => {
    return backtests.filter((backtest) => {
      const matchesSearch =
        backtest.strategy
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "all" ||
        backtest.status === status;

      const matchesStrategy =
        strategy === "all" ||
        backtest.strategy === strategy;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesStrategy
      );
    });
  }, [backtests, search, status, strategy]);

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
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onStrategyChange={setStrategy}
      />

      <BacktestTable
        backtests={filteredBacktests}
      />
    </div>
  );
}