import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

import type { PersistedBacktest } from "../types";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";

type BacktestDetailsHeaderProps = {
  backtest: PersistedBacktest;
};

const statusStyles: Record<string, string> = {
  completed:
    "border-[#56c79d]/20 bg-[#56c79d]/10 text-[#56c79d]",
  running:
    "border-[#7da2e0]/20 bg-[#7da2e0]/10 text-[#7da2e0]",
  failed:
    "border-[#d97b72]/20 bg-[#d97b72]/10 text-[#d97b72]",
};

export default function BacktestDetailsHeader({
  backtest,
}: BacktestDetailsHeaderProps) {
  return (
    <section className="border-b border-border bg-gradient-to-b from-[#0f1729]/50 to-transparent">
      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* Breadcrumb */}
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
                className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusStyles[backtest.status] ?? ""}`}
              >
                {backtest.status}
              </Badge>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-3.5" />
                {formatDate(backtest.createdAt)}
              </span>

              <span className="font-financial text-[10px]">
                ID: {backtest.id}
              </span>
            </div>
          </div>

          <Link
            href="/backtests"
            className="inline-flex h-8 items-center gap-2 rounded-md border border-border px-3 text-xs font-medium transition-colors hover:bg-accent"
          >
            <ArrowLeft className="size-3.5" />
            Backtests
          </Link>
        </div>
      </div>
    </section>
  );
}