import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { BacktestStatus } from "../types";
import Link from "next/link";

type BacktestToolbarProps = {
  search: string;
  status: BacktestStatus | "all";
  strategy: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: BacktestStatus | "all") => void;
  onStrategyChange: (value: string) => void;
};

export default function BacktestToolbar({
  search,
  status,
  strategy,
  onSearchChange,
  onStatusChange,
  onStrategyChange,
}: BacktestToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Search backtests..."
          className="max-w-sm"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
        />

        <Select
          value={status}
          onValueChange={(value) => {
            if (
              value === "all" ||
              value === "completed" ||
              value === "running" ||
              value === "failed"
            ) {
              onStatusChange(value);
            }
          }}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All Statuses
            </SelectItem>

            <SelectItem value="completed">
              Completed
            </SelectItem>

            <SelectItem value="running">
              Running
            </SelectItem>

            <SelectItem value="failed">
              Failed
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={strategy}
          onValueChange={(value) => {
            if (value) {
              onStrategyChange(value);
            }
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Strategy" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All Strategies
            </SelectItem>

            <SelectItem value="MovingAverageCross">
              SMA Crossover
            </SelectItem>

            <SelectItem value="EMACross">
              EMA Crossover
            </SelectItem>

            <SelectItem value="RSI">
              RSI Mean Reversion
            </SelectItem>

            <SelectItem value="Bollinger">
              Bollinger Bands
            </SelectItem>

            <SelectItem value="MACD">
              MACD Strategy
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Link
        href="/backtests/new"
        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        New Backtest
      </Link>
    </div>
  );
}