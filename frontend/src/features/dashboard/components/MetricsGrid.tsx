"use client";

import { motion } from "framer-motion";
import { formatPercent, formatNumber } from "@/lib/format";
import type { PersistedBacktest } from "@/features/backtest/types";

type MetricsGridProps = {
  result: PersistedBacktest | null;
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const } },
};

function MetricCard({
  label,
  value,
  positive,
  neutral = false,
}: {
  label: string;
  value: string | number;
  positive: boolean;
  neutral?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-slate-800/60 bg-slate-900/40 px-4 py-3 hover:border-slate-700/60 transition-colors">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </span>
      <span className={`font-mono text-xl font-bold tabular-nums tracking-tight ${neutral ? "text-slate-200" : positive ? "text-profit" : "text-loss"}`}>
        {value}
      </span>
    </div>
  );
}

export default function MetricsGrid({ result }: MetricsGridProps) {
  if (!result) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-xl border border-slate-800/60 bg-slate-900/30 h-[68px]" />
        ))}
      </div>
    );
  }

  const metrics = [
    { label: "Total Return", value: `${result.totalReturnPercent >= 0 ? "+" : ""}${formatPercent(result.totalReturnPercent)}`, positive: result.totalReturnPercent >= 0 },
    { label: "Sharpe Ratio", value: formatNumber(result.sharpeRatio), positive: result.sharpeRatio >= 1 },
    { label: "Max Drawdown", value: `-${formatPercent(result.maximumDrawdown)}`, positive: false, neutral: false },
    { label: "Win Rate", value: formatPercent(result.winRatePercent), positive: result.winRatePercent >= 50 },
    { label: "Total Trades", value: result.totalTrades, positive: true, neutral: true },
    { label: "Profit Factor", value: formatNumber(result.profitFactor), positive: result.profitFactor >= 1 },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
    >
      {metrics.map((metric, i) => (
        <motion.div key={i} variants={itemVariants}>
          <MetricCard
            label={metric.label}
            value={metric.value}
            positive={metric.positive}
            neutral={metric.neutral}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}