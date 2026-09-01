"use client";

import { useState } from "react";
import { Dataset } from "../types";
import {
  Calendar,
  BarChart3,
  Clock,
  Trash2,
  Play,
  Globe,
  TrendingUp,
  Coins,
  LineChart,
  ShieldCheck,
  RefreshCw,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface DatasetCardProps {
  dataset: Dataset;
  onDelete?: (id: string) => void;
  onSyncSuccess?: () => void;
}

export function DatasetCard({ dataset, onDelete, onSyncSuccess }: DatasetCardProps) {
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");

  const formatDate = (iso: string | null) => {
    if (!iso) return "N/A";
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isSystem = dataset.source === "SYSTEM_LIBRARY";

  const handleSyncData = async () => {
    setSyncing(true);
    setSyncMessage("");
    try {
      const cleanName = dataset.name.replace(/\s*\(Live Sync\)/g, "").trim();
      const res = await fetch("/api/datasets/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: dataset.symbol,
          name: cleanName,
          assetClass: dataset.assetClass,
          timeframe: dataset.timeframe,
          provider: dataset.assetClass === "CRYPTO" ? "BINANCE" : "YAHOO",
        }),
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.error || "Sync failed");
      }

      setSyncMessage("Live market data updated!");
      if (onSyncSuccess) onSyncSuccess();
      setTimeout(() => setSyncMessage(""), 4000);
    } catch (err) {
      console.error("Sync error:", err);
      setSyncMessage(err instanceof Error ? err.message : "Sync error");
      setTimeout(() => setSyncMessage(""), 4000);
    } finally {
      setSyncing(false);
    }
  };

  const getAssetBadge = (assetClass: string) => {
    switch (assetClass) {
      case "CRYPTO":
        return {
          icon: Coins,
          color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
        };
      case "FOREX":
        return {
          icon: Globe,
          color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
        };
      case "INDEX":
        return {
          icon: LineChart,
          color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
        };
      default:
        return {
          icon: TrendingUp,
          color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
        };
    }
  };

  const assetInfo = getAssetBadge(dataset.assetClass);
  const AssetIcon = assetInfo.icon;

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/40 hover:bg-slate-900/90 hover:shadow-2xl hover:shadow-indigo-500/10">
      {/* Header Info */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold tracking-tight text-slate-100 group-hover:text-indigo-300 transition-colors">
                {dataset.name}
              </h3>
              {isSystem && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  SYSTEM
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-indigo-400 font-semibold">{dataset.symbol}</span>
              <span className="text-[10px] text-slate-500">•</span>
              <span className="font-mono text-[11px] text-slate-400 uppercase">{dataset.timeframe}</span>
            </div>
          </div>

          <Badge variant="outline" className={`text-[10px] font-mono tracking-wider shrink-0 gap-1 ${assetInfo.color}`}>
            <AssetIcon className="w-3 h-3" />
            {dataset.assetClass}
          </Badge>
        </div>

        {/* Status Pills */}
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className={`text-[10px] font-mono tracking-wider shrink-0 gap-1 ${
              dataset.status === "VALIDATED"
                ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                : "text-rose-400 border-rose-500/30 bg-rose-500/10"
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            {dataset.status}
          </Badge>

          {syncMessage && (
            <span className="text-[10px] font-mono text-indigo-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              {syncMessage}
            </span>
          )}
        </div>

        {/* Metadata Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/60 font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-indigo-400/80 shrink-0" />
            <span className="truncate text-[11px]">
              {formatDate(dataset.startDate)} → {formatDate(dataset.endDate)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <BarChart3 className="w-3.5 h-3.5 text-indigo-400/80 shrink-0" />
            <span className="text-[11px]">{dataset.rowCount.toLocaleString()} candles</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-indigo-400/80 shrink-0" />
            <span className="text-[11px]">Ver: {dataset.version}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Globe className="w-3.5 h-3.5 text-indigo-400/80 shrink-0" />
            <span className="text-[11px] truncate">{dataset.source}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-800/60">
        <Link href={`/backtests/new?datasetId=${dataset.id}`} className="flex-1">
          <Button
            size="sm"
            className="w-full text-xs gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Run Backtest
          </Button>
        </Link>

        {/* Live Provider Sync Button */}
        <Button
          size="sm"
          variant="outline"
          disabled={syncing}
          onClick={handleSyncData}
          title="Fetch latest live market candles from API provider"
          className="text-xs border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-800 hover:text-white gap-1 px-2.5"
        >
          {syncing ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
          ) : (
            <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
          )}
          <span className="hidden sm:inline text-[11px]">Sync</span>
        </Button>
      </div>
    </div>
  );
}
