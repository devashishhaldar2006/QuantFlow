"use client";

import { useDatasets } from "../hooks/useDatasets";
import { DatasetCard } from "./DatasetCard";
import { Database, Search, Layers, FileUp, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { SYSTEM_DATASET_LIBRARY } from "../constants";
import { Dataset } from "../types";

interface DatasetLibraryProps {
  onNewDatasetClick: () => void;
}

const CLIENT_SYSTEM_DATASETS: Dataset[] = SYSTEM_DATASET_LIBRARY.map((item) => ({
  id: item.id,
  name: item.name,
  symbol: item.symbol,
  assetClass: item.assetClass,
  timeframe: item.timeframe,
  source: "SYSTEM_LIBRARY",
  filePath: item.samplePath,
  fileSize: item.rowCount * 64,
  rowCount: item.rowCount,
  startDate: item.startDate,
  endDate: item.endDate,
  version: "v1.0.0",
  status: "VALIDATED",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}));

export function DatasetLibrary({ onNewDatasetClick }: DatasetLibraryProps) {
  const { datasets: apiDatasets, isLoading, refresh } = useDatasets();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"ALL" | "USER" | "SYSTEM">("ALL");

  const allDatasets = useMemo<Dataset[]>(() => {
    // Collect user synced datasets
    const userSymbolsTimeframes = new Set(
      apiDatasets.map((d) => `${d.symbol.toUpperCase()}_${d.timeframe}`)
    );

    // Filter out default static system entries if user has a synced live version of the same symbol and timeframe
    const dedupedSystemDatasets = CLIENT_SYSTEM_DATASETS.filter(
      (d) => !userSymbolsTimeframes.has(`${d.symbol.toUpperCase()}_${d.timeframe}`)
    );

    return [...apiDatasets, ...dedupedSystemDatasets];
  }, [apiDatasets]);

  const userCount = allDatasets.filter((d) => d.source !== "SYSTEM_LIBRARY").length;
  const systemCount = allDatasets.filter((d) => d.source === "SYSTEM_LIBRARY").length;

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this dataset?")) return;
    try {
      const res = await fetch(`/api/datasets/${id}`, { method: "DELETE" });
      if (res.ok) {
        refresh();
      } else {
        alert("Failed to delete dataset.");
      }
    } catch (err) {
      console.error("Delete dataset failed:", err);
    }
  };

  const filteredDatasets = allDatasets.filter((d) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      d.name.toLowerCase().includes(q) ||
      d.symbol.toLowerCase().includes(q);
    const matchesFilter =
      activeFilter === "ALL" ||
      (activeFilter === "USER" && d.source === "CSV_UPLOAD") ||
      (activeFilter === "SYSTEM" && d.source === "SYSTEM_LIBRARY");
    return matchesSearch && matchesFilter;
  });

  const tabs: { key: "ALL" | "USER" | "SYSTEM"; label: string; count: number; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: "ALL", label: "All Datasets", count: allDatasets.length, icon: Layers },
    { key: "USER", label: "My Uploads", count: userCount, icon: FileUp },
    { key: "SYSTEM", label: "QuantFlow Library", count: systemCount, icon: Sparkles },
  ];

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-zinc-200 p-2.5 rounded">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <Input
            id="dataset-search"
            placeholder="Search datasets by symbol or name…"
            className="pl-8 text-xs h-8 bg-zinc-50 border-zinc-200 focus:border-black text-zinc-900 placeholder:text-zinc-400 rounded font-mono"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-1 bg-zinc-50 p-0.5 rounded border border-zinc-200 text-xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                id={`dataset-filter-${tab.key.toLowerCase()}`}
                onClick={() => setActiveFilter(tab.key)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                  isActive
                    ? "bg-zinc-950 text-white shadow-none"
                    : "text-zinc-600 hover:text-black hover:bg-zinc-200/50"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{tab.label}</span>
                <span
                  className={`text-[9px] px-1 rounded font-mono font-bold ${
                    isActive
                      ? "bg-zinc-800 text-white"
                      : "bg-zinc-200 text-zinc-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {isLoading && userCount === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-44 rounded bg-zinc-100 animate-pulse border border-zinc-200"
            />
          ))}
        </div>
      ) : filteredDatasets.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-14 rounded border border-zinc-200 bg-white text-center space-y-3 shadow-sm">
          <div className="size-14 rounded border border-zinc-900 bg-zinc-950 flex items-center justify-center text-white shadow-sm">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-1">
            <h4 className="font-mono font-bold text-zinc-950 text-sm uppercase tracking-tight">NO_DATASETS_FOUND</h4>
            <p className="text-xs text-zinc-600 max-w-sm font-mono leading-relaxed">
              {activeFilter === "USER"
                ? 'You haven\'t uploaded any custom CSV datasets yet. Click "Import CSV Dataset" above to get started.'
                : "No datasets match your search filter. Try clearing your search query."}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDatasets.map((dataset) => (
            <DatasetCard
              key={dataset.id}
              dataset={dataset}
              onSyncSuccess={refresh}
              onDelete={dataset.source !== "SYSTEM_LIBRARY" ? handleDelete : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
