import Link from "next/link";
import { ArrowRight, Settings2 } from "lucide-react";

import type { StrategyWithPerformance } from "../types";
import { formatPercent, formatNumber } from "@/lib/format";

type StrategyCardProps = {
  strategy: StrategyWithPerformance;
};

export default function StrategyCard({
  strategy,
}: StrategyCardProps) {
  const hasPerformance = strategy.performance.backtestCount > 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-[#7da2e0]/50 hover:shadow-lg hover:shadow-[#7da2e0]/5">
      <div className="flex-1 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-[#d8dfef] transition-colors group-hover:text-[#7da2e0]">
                {strategy.displayName}
              </h2>

              <span className="rounded-md border border-[#283148] bg-[#141d30] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em] text-[#7d8599]">
                {strategy.category}
              </span>
            </div>

            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              {strategy.description}
            </p>
          </div>

          <span
            className={[
              "shrink-0 rounded-md border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide",
              hasPerformance
                ? "border-[#56c79d]/20 bg-[#56c79d]/10 text-[#56c79d]"
                : "border-border bg-muted text-muted-foreground",
            ].join(" ")}
          >
            {hasPerformance ? "Tested" : "Untested"}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Settings2 className="size-3.5" />
            <span>Parameters:</span>
          </div>
          {strategy.parameters.length === 0 ? (
            <span className="text-xs text-muted-foreground/60">
              None
            </span>
          ) : (
            strategy.parameters.map((parameter) => (
              <span
                key={parameter}
                className="rounded-md border border-[#283148] bg-[#0f1729] px-2 py-0.5 text-[10px] text-muted-foreground"
              >
                {parameter}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 divide-x divide-border border-t border-border bg-muted/20">
        <div className="p-4 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
            Tests
          </p>
          <p className="mt-1 font-financial text-sm font-semibold">
            {strategy.performance.backtestCount}
          </p>
        </div>

        <div className="p-4 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
            Avg Return
          </p>
          <p
            className={[
              "mt-1 font-financial text-sm font-semibold",
              strategy.performance.averageReturn > 0
                ? "text-[#56c79d]"
                : strategy.performance.averageReturn < 0
                  ? "text-[#d97b72]"
                  : "",
            ].join(" ")}
          >
            {formatPercent(strategy.performance.averageReturn)}
          </p>
        </div>

        <div className="p-4 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
            Avg Sharpe
          </p>
          <p className="mt-1 font-financial text-sm font-semibold">
            {formatNumber(strategy.performance.averageSharpe)}
          </p>
        </div>

        <div className="p-4 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
            Best
          </p>
          <p
            className={[
              "mt-1 font-financial text-sm font-semibold",
              strategy.performance.bestReturn > 0
                ? "text-[#56c79d]"
                : strategy.performance.bestReturn < 0
                  ? "text-[#d97b72]"
                  : "",
            ].join(" ")}
          >
            {formatPercent(strategy.performance.bestReturn)}
          </p>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <Link
          href={`/backtests?strategy=${encodeURIComponent(
            strategy.name,
          )}`}
          className="group/link flex items-center justify-center gap-2 rounded-md bg-[#1c2640] py-2 text-xs font-medium text-[#d8dfef] transition-colors hover:bg-[#283148] hover:text-white"
        >
          View Results
          <ArrowRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}