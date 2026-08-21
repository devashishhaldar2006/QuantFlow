import Link from "next/link";

import type { StrategyWithPerformance } from "../types";

type StrategyCardProps = {
  strategy: StrategyWithPerformance;
};

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}

function formatNumber(value: number) {
  return value.toFixed(2);
}

export default function StrategyCard({
  strategy,
}: StrategyCardProps) {
  const hasPerformance =
    strategy.performance.backtestCount > 0;

  return (
    <article className="border border-border bg-card">
      <div className="border-b border-border p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-semibold">
                {strategy.displayName}
              </h2>

              <span className="border border-border bg-muted px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                {strategy.category}
              </span>
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {strategy.description}
            </p>
          </div>

          <span
            className={
              hasPerformance
                ? "shrink-0 border border-[#4edea3]/30 bg-[#4edea3]/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-[#4edea3]"
                : "shrink-0 border border-border bg-muted px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground"
            }
          >
            {hasPerformance ? "Tested" : "Not Tested"}
          </span>
        </div>
      </div>

      <div className="grid gap-px border-b border-border bg-border sm:grid-cols-4">
        <div className="bg-card p-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Backtests
          </p>

          <p className="mt-2 font-financial text-lg">
            {strategy.performance.backtestCount}
          </p>
        </div>

        <div className="bg-card p-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Avg Return
          </p>

          <p
            className={`mt-2 font-financial text-lg ${
              strategy.performance.averageReturn >= 0
                ? "text-profit"
                : "text-loss"
            }`}
          >
            {formatPercent(
              strategy.performance.averageReturn,
            )}
          </p>
        </div>

        <div className="bg-card p-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Avg Sharpe
          </p>

          <p className="mt-2 font-financial text-lg">
            {formatNumber(
              strategy.performance.averageSharpe,
            )}
          </p>
        </div>

        <div className="bg-card p-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Best Return
          </p>

          <p className="mt-2 font-financial text-lg text-profit">
            {formatPercent(
              strategy.performance.bestReturn,
            )}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 p-4">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Parameters
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {strategy.parameters.length === 0 ? (
              <span className="text-xs text-muted-foreground">
                No configurable parameters
              </span>
            ) : (
              strategy.parameters.map((parameter) => (
                <span
                  key={parameter}
                  className="border border-border px-2 py-1 text-[10px] text-muted-foreground"
                >
                  {parameter}
                </span>
              ))
            )}
          </div>
        </div>

        <Link
          href={`/backtests?strategy=${encodeURIComponent(
            strategy.name,
          )}`}
          className="inline-flex h-9 items-center border border-border px-4 text-xs font-medium transition-colors hover:bg-accent"
        >
          View Backtests
        </Link>
      </div>
    </article>
  );
}