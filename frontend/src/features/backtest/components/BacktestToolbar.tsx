"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { BacktestStatus } from "../types";

type BacktestToolbarProps = {
  search: string;
  status: BacktestStatus | "all";
  strategy: string;
  strategies: string[];
};

export default function BacktestToolbar({
  search,
  status,
  strategy,
  strategies,
}: BacktestToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentSearch =
        searchParams.get("search") ?? "";

      if (searchInput === currentSearch) {
        return;
      }

      const params = new URLSearchParams(
        searchParams.toString(),
      );

      if (searchInput.trim()) {
        params.set("search", searchInput.trim());
      } else {
        params.delete("search");
      }

      params.delete("page");

      const query = params.toString();

      router.push(
        query
          ? `${pathname}?${query}`
          : pathname,
      );
    }, 400);

    return () => clearTimeout(timeout);
  }, [
    searchInput,
    searchParams,
    pathname,
    router,
  ]);

  function updateFilter(
    key: string,
    value: string,
  ) {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    if (!value || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.delete("page");

    const query = params.toString();

    router.push(
      query
        ? `${pathname}?${query}`
        : pathname,
    );
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Search backtests..."
          className="max-w-sm"
          value={searchInput}
          onChange={(event) =>
            setSearchInput(event.target.value)
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
              updateFilter("status", value);
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
              updateFilter("strategy", value);
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

            {strategies.map((strategy) => (
              <SelectItem
                key={strategy}
                value={strategy}
              >
                {strategy}
              </SelectItem>
            ))}
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