"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
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

export default function BacktestToolbar({ search, status, strategy, strategies }: BacktestToolbarProps) {
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
      const currentSearch = searchParams.get("search") ?? "";
      if (searchInput === currentSearch) return;
      const params = new URLSearchParams(searchParams.toString());
      if (searchInput.trim()) {
        params.set("search", searchInput.trim());
      } else {
        params.delete("search");
      }
      params.delete("page");
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchInput, searchParams, pathname, router]);

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search backtests..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="h-9 w-full rounded-md border border-slate-700 bg-slate-900/70 pl-8 pr-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      {/* Status Filter */}
      <Select
        value={status}
        onValueChange={(value) => {
          if (value === "all" || value === "completed" || value === "running" || value === "failed") {
            updateFilter("status", value);
          }
        }}
      >
        <SelectTrigger className="h-9 w-[140px] rounded-md border border-slate-700 bg-slate-900/70 px-3 text-sm text-slate-300">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="rounded-md border border-slate-700 bg-slate-900">
          <SelectItem value="all" className="text-sm text-slate-200">All Statuses</SelectItem>
          <SelectItem value="completed" className="text-sm text-slate-200">Completed</SelectItem>
          <SelectItem value="running" className="text-sm text-slate-200">Running</SelectItem>
          <SelectItem value="failed" className="text-sm text-slate-200">Failed</SelectItem>
        </SelectContent>
      </Select>

      {/* Strategy Filter */}
      <Select
        value={strategy}
        onValueChange={(value) => {
          if (value) updateFilter("strategy", value);
        }}
      >
        <SelectTrigger className="h-9 w-[180px] rounded-md border border-slate-700 bg-slate-900/70 px-3 text-sm text-slate-300">
          <SelectValue placeholder="Strategy" />
        </SelectTrigger>
        <SelectContent className="rounded-md border border-slate-700 bg-slate-900">
          <SelectItem value="all" className="text-sm text-slate-200">All Strategies</SelectItem>
          {strategies.map((s) => (
            <SelectItem key={s} value={s} className="text-sm text-slate-200">{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}