"use client";

import { useCallback, useState, Suspense } from "react";

import AnimatedPage, {
  AnimatedItem,
} from "@/components/common/AnimatedPage";

import PageHeader from "@/components/common/PageHeader";

import BacktestForm from "./BacktestForm";
import BacktestUsageCard from "./BacktestUsageCard";

import { FlaskConical } from "lucide-react";

export type BacktestUsage = {
  plan: "FREE" | "PRO";
  used: number;
  limit: number | null;
  remaining: number | null;
  unlimited: boolean;
};

export default function NewBacktest() {
  const [usageRefreshKey, setUsageRefreshKey] =
    useState(0);

  const handleBacktestCreated = useCallback(() => {
    setUsageRefreshKey((current) => current + 1);
  }, []);

  return (
    <AnimatedPage>
      <PageHeader
        title="New Backtest"
        description="Configure and run a strategy against historical market data."
        icon={FlaskConical}
      />

      <div className="w-full max-w-4xl space-y-5">
        <AnimatedItem>
          <BacktestUsageCard
            refreshKey={usageRefreshKey}
          />
        </AnimatedItem>

        <AnimatedItem>
          <div className="w-full rounded border border-zinc-200 bg-white p-6 shadow-sm">
            <Suspense fallback={<div className="h-64 flex items-center justify-center font-mono text-xs text-zinc-500">LOADING_BACKTEST_COMPILER...</div>}>
              <BacktestForm
                onBacktestCreated={handleBacktestCreated}
              />
            </Suspense>
          </div>
        </AnimatedItem>
      </div>
    </AnimatedPage>
  );
}