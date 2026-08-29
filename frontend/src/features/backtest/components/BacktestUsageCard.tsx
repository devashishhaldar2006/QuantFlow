"use client";

import { useEffect, useState } from "react";
import { Crown, Loader2, Zap } from "lucide-react";

type UsageResponse = {
  plan: "FREE" | "PRO";
  used: number;
  limit: number | null;
  remaining: number | null;
  unlimited: boolean;
};

type BacktestUsageCardProps = {
  refreshKey?: number;
};

export default function BacktestUsageCard({
  refreshKey = 0,
}: BacktestUsageCardProps) {
  const [usage, setUsage] =
    useState<UsageResponse | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadUsage() {
      try {
        setError(null);

        const response = await fetch(
          "/api/backtests/usage",
          {
            method: "GET",
            cache: "no-store",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ??
              "Failed to load backtest usage.",
          );
        }

        setUsage(data);
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load backtest usage.",
        );
      }
    }

    loadUsage();
  }, [refreshKey]);

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
        <p className="text-sm text-red-400">
          {error}
        </p>
      </div>
    );
  }

  if (!usage) {
    return (
      <div className="glass-panel rounded-xl p-4">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Loader2 className="size-4 animate-spin" />
          Loading backtest usage...
        </div>
      </div>
    );
  }

  if (usage.unlimited) {
    return (
      <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/10">
              <Crown className="size-4 text-indigo-400" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Plan
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-100">
                Pro
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-500">
              Backtests
            </p>

            <p className="mt-1 font-mono text-sm font-semibold text-indigo-300">
              Unlimited
            </p>
          </div>
        </div>
      </div>
    );
  }

  const percentage =
    usage.limit && usage.limit > 0
      ? Math.min(
          100,
          (usage.used / usage.limit) * 100,
        )
      : 0;

  const limitReached =
    usage.remaining === 0;

  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-900/40 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg border border-slate-700/50 bg-slate-800/60">
            <Zap className="size-4 text-slate-400" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Free Plan
            </p>

            <p className="mt-1 text-sm font-medium text-slate-200">
              Daily Backtests
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-mono text-sm font-semibold text-slate-200">
            {usage.used} / {usage.limit}
          </p>

          <p className="mt-1 text-[10px] text-slate-500">
            UTC day
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-300"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p
          className={`text-xs ${
            limitReached
              ? "text-red-400"
              : "text-slate-500"
          }`}
        >
          {limitReached
            ? "Daily limit reached."
            : `${usage.remaining} ${
                usage.remaining === 1
                  ? "backtest"
                  : "backtests"
              } remaining today.`}
        </p>

        {limitReached && (
          <button
            type="button"
            className="text-xs font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
          >
            Upgrade to Pro
          </button>
        )}
      </div>
    </div>
  );
}