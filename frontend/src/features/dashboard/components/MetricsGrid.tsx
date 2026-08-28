"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  BarChart3,
  TrendingDown,
  Target,
  Percent,
} from "lucide-react";

import MetricCard from "@/components/common/MetricCard";
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  formatSignedPercent,
  formatProfitFactor,
} from "@/lib/format";

import type { PersistedBacktest } from "@/features/backtest/types";

type MetricsGridProps = {
  result: PersistedBacktest | null;
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export default function MetricsGrid({
  result,
}: MetricsGridProps) {
  if (!result) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[120px] animate-pulse rounded-lg border border-border bg-card"
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6"
    >
      <MetricCard
        label="Portfolio Value"
        value={formatCurrency(result.finalEquity)}
        icon={DollarSign}
        change={formatSignedPercent(result.totalReturnPercent)}
        positive={result.totalReturnPercent >= 0}
        negative={result.totalReturnPercent < 0}
      />

      <MetricCard
        label="Net Profit"
        value={formatCurrency(result.netProfit)}
        icon={TrendingUp}
        description="Total realized P&L"
        positive={result.netProfit >= 0}
        negative={result.netProfit < 0}
      />

      <MetricCard
        label="Sharpe Ratio"
        value={formatNumber(result.sharpeRatio)}
        icon={BarChart3}
        description="Risk-adjusted return"
      />

      <MetricCard
        label="Max Drawdown"
        value={`-${formatPercent(result.maximumDrawdown)}`}
        icon={TrendingDown}
        description="Largest peak-to-trough"
        negative={result.maximumDrawdown > 0}
      />

      <MetricCard
        label="Win Rate"
        value={formatPercent(result.winRatePercent)}
        icon={Target}
        description={`${result.winningTrades}W / ${result.losingTrades}L`}
        positive={result.winRatePercent >= 50}
      />

      <MetricCard
        label="Profit Factor"
        value={formatProfitFactor(result.profitFactor)}
        icon={Percent}
        description="Gross profit / loss"
        positive={result.profitFactor > 1 || result.profitFactor === -1}
      />
    </motion.div>
  );
}