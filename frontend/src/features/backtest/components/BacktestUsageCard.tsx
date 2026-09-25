"use client";

import { useEffect, useState } from "react";
import { Crown, Loader2, Zap } from "lucide-react";
import axios from "axios";

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

        const response = await axios.get<UsageResponse>(
          "/api/backtests/usage",
        );

        setUsage(response.data);
      } catch (err) {
        console.error(err);

        if (axios.isAxiosError(err) && err.response?.data?.error) {
          setError(err.response.data.error);
        } else {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load backtest usage.",
          );
        }
      }
    }

    loadUsage();
  }, [refreshKey]);

  if (error) {
    return (
      <div className="rounded border border-amber-200 bg-amber-50/50 p-3 flex items-center justify-between text-xs text-amber-800 font-mono">
        <span>QUOTA_STATUS: OFFLINE (Standard 5 backtests/day permitted)</span>
        <span className="font-semibold">5 / 5 REMAINING</span>
      </div>
    );
  }

  if (!usage) {
    return (
      <div className="rounded border border-zinc-200 bg-white p-3">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <Loader2 className="size-3.5 animate-spin text-zinc-900" />
          <span>QUERYING_ENTITLEMENT_DATABASE...</span>
        </div>
      </div>
    );
  }

  if (usage.unlimited) {
    return (
      <div className="rounded border border-zinc-200 bg-white p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded border border-zinc-200 bg-zinc-50 text-zinc-900">
              <Crown className="size-4" />
            </div>

            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                ACTIVE_PLAN
              </p>

              <p className="mt-0.5 text-xs font-mono font-bold text-zinc-900">
                ENTERPRISE_PRO
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-mono text-zinc-500 uppercase">
              QUOTA
            </p>

            <p className="mt-0.5 font-mono text-xs font-bold text-emerald-600">
              UNLIMITED_ACCESS
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
    <div className="rounded border border-zinc-200 bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded border border-zinc-200 bg-zinc-50 text-zinc-900">
            <Zap className="size-4" />
          </div>

          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
              FREE_TIER
            </p>

            <p className="mt-0.5 text-xs font-mono font-semibold text-zinc-900">
              Daily Compute Quota
            </p>
          </div>
        </div>

        <div className="text-right font-mono">
          <p className="text-xs font-bold text-zinc-900">
            {usage.used} / {usage.limit}
          </p>

          <p className="mt-0.5 text-[10px] text-zinc-500 uppercase">
            UTC_DAY_CYCLE
          </p>
        </div>
      </div>

      <div className="mt-3.5">
        <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100 border border-zinc-200/60">
          <div
            className="h-full bg-zinc-900 transition-all duration-300"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-3 font-mono text-[11px]">
        <p
          className={
            limitReached
              ? "text-red-600 font-medium"
              : "text-zinc-600"
          }
        >
          {limitReached
            ? "Daily allocation exhausted."
            : `${usage.remaining} ${
                usage.remaining === 1
                  ? "execution"
                  : "executions"
              } remaining today.`}
        </p>

        {limitReached && (
          <button
            type="button"
            className="text-[11px] font-bold text-zinc-900 underline underline-offset-2 transition-colors hover:text-black"
          >
            Upgrade to Pro →
          </button>
        )}
      </div>
    </div>
  );
}