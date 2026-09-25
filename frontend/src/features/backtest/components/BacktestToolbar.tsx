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
        <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          placeholder="SEARCH_EXECUTIONS..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="h-8 w-full rounded border border-zinc-200 bg-white pl-8 pr-3 text-xs font-mono text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black"
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
        <SelectTrigger className="h-8 w-[140px] rounded border border-zinc-200 bg-white px-3 text-xs font-mono text-zinc-800">
          <SelectValue placeholder="STATUS" />
        </SelectTrigger>
        <SelectContent className="rounded border border-zinc-200 bg-white shadow-xl">
          <SelectItem value="all" className="text-xs font-mono text-zinc-900">ALL_STATUSES</SelectItem>
          <SelectItem value="completed" className="text-xs font-mono text-zinc-900">COMPLETED</SelectItem>
          <SelectItem value="running" className="text-xs font-mono text-zinc-900">RUNNING</SelectItem>
          <SelectItem value="failed" className="text-xs font-mono text-zinc-900">FAILED</SelectItem>
        </SelectContent>
      </Select>

      {/* Strategy Filter */}
      <Select
        value={strategy}
        onValueChange={(value) => {
          if (value) updateFilter("strategy", value);
        }}
      >
        <SelectTrigger className="h-8 w-[180px] rounded border border-zinc-200 bg-white px-3 text-xs font-mono text-zinc-800">
          <SelectValue placeholder="STRATEGY" />
        </SelectTrigger>
        <SelectContent className="rounded border border-zinc-200 bg-white shadow-xl">
          <SelectItem value="all" className="text-xs font-mono text-zinc-900">ALL_STRATEGIES</SelectItem>
          {strategies.map((s) => (
            <SelectItem key={s} value={s} className="text-xs font-mono text-zinc-900">{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}