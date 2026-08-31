"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

/**
 * MetricCard — Premium metric display component.
 *
 * Used across Dashboard, Portfolio, Analytics, and Backtest detail
 * pages for a consistent, data-dense metric presentation.
 */

type MetricCardProps = {
  label: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  positive?: boolean;
  negative?: boolean;
  change?: string;
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function MetricCard({
  label,
  value,
  description,
  icon: Icon,
  positive = false,
  negative = false,
  change,
}: MetricCardProps) {
  const valueColor = positive
    ? "text-[#4edea3]"
    : negative
      ? "text-[#ffb4ab]"
      : "text-foreground";

  return (
    <motion.div
      variants={cardVariants}
      className="group relative overflow-hidden rounded-lg border border-border bg-card p-5 transition-colors hover:border-[#adc6ff]/30"
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#adc6ff]/0 to-[#adc6ff]/0 transition-all duration-500 group-hover:from-[#adc6ff]/[0.02] group-hover:to-transparent" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
            {label}
          </p>

          {Icon && (
            <Icon className="size-4 text-muted-foreground/60" />
          )}
        </div>

        <p
          className={[
            "mt-3 font-financial text-2xl font-semibold tracking-tight",
            valueColor,
          ].join(" ")}
        >
          {value}
        </p>

        <div className="mt-1.5 flex items-center gap-2">
          {description && (
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          )}

          {change && (
            <span
              className={[
                "inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                positive
                  ? "bg-[#4edea3]/10 text-[#4edea3]"
                  : negative
                    ? "bg-[#ffb4ab]/10 text-[#ffb4ab]"
                    : "bg-muted text-muted-foreground",
              ].join(" ")}
            >
              {change}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
