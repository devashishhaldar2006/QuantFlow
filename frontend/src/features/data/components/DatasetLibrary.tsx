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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-3 rounded-2xl">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            id="dataset-search"
            placeholder="Search datasets by symbol or name…"
            className="pl-10 text-xs h-9 bg-slate-950/70 border-slate-800 focus:border-indigo-500/70 text-slate-100 placeholder:text-slate-500 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                id={`dataset-filter-${tab.key.toLowerCase()}`}
                onClick={() => setActiveFilter(tab.key)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-800 text-slate-400"
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
              className="h-48 rounded-2xl bg-slate-900/40 animate-pulse border border-slate-800/60"
            />
          ))}
        </div>
      ) : filteredDatasets.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-14 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 text-center space-y-3">
          <div className="p-3 rounded-full bg-slate-800/60 text-slate-400 border border-slate-700/50">
            <Database className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-slate-200 text-sm">No Datasets Found</h4>
            <p className="text-xs text-slate-400 max-w-sm">
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
