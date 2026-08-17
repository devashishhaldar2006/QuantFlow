import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

import type { PersistedBacktest } from "../types";
import { Badge } from "@/components/ui/badge";

type BacktestDetailsHeaderProps = {
  backtest: PersistedBacktest;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function BacktestDetailsHeader({
  backtest,
}: BacktestDetailsHeaderProps) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link
            href="/backtests"
            className="transition-colors hover:text-foreground"
          >
            Backtests
          </Link>

          <ChevronRight className="size-3" />

          <span className="font-financial">
            #{backtest.id.slice(0, 8)}
          </span>
        </div>

        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">
                {backtest.strategy}
              </h1>

              <Badge
                variant="secondary"
                className="rounded border border-[#4edea3]/30 bg-[#4edea3]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#4edea3]"
              >
                {backtest.status}
              </Badge>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-3.5" />
                {formatDate(backtest.createdAt)}
              </span>

              <span className="font-financial">
                ID: {backtest.id}
              </span>
            </div>
          </div>

          <Link
            href="/backtests"
            className="inline-flex h-9 items-center gap-2 border border-border px-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            <ArrowLeft className="size-4" />
            Backtests
          </Link>
        </div>
      </div>
    </section>
  );
}