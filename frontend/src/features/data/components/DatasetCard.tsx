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
          color: "text-zinc-800 border-zinc-200 bg-zinc-50",
        };
      case "FOREX":
        return {
          icon: Globe,
          color: "text-zinc-800 border-zinc-200 bg-zinc-50",
        };
      case "INDEX":
        return {
          icon: LineChart,
          color: "text-zinc-800 border-zinc-200 bg-zinc-50",
        };
      default:
        return {
          icon: TrendingUp,
          color: "text-zinc-800 border-zinc-200 bg-zinc-50",
        };
    }
  };

  const assetInfo = getAssetBadge(dataset.assetClass);
  const AssetIcon = assetInfo.icon;

  return (
    <div className="group relative flex flex-col justify-between rounded border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-400">
      {/* Header Info */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-mono text-sm font-bold text-zinc-900 group-hover:text-black transition-colors">
                {dataset.name}
              </h3>
              {isSystem && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-zinc-100 text-zinc-700 border border-zinc-200">
                  SYSTEM
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-zinc-900 font-bold">{dataset.symbol}</span>
              <span className="text-[10px] text-zinc-400">•</span>
              <span className="font-mono text-[11px] text-zinc-500 uppercase">{dataset.timeframe}</span>
            </div>
          </div>

          <Badge variant="outline" className={`text-[10px] font-mono tracking-wider shrink-0 gap-1 ${assetInfo.color}`}>
            <AssetIcon className="w-3 h-3 text-zinc-600" />
            {dataset.assetClass}
          </Badge>
        </div>

        {/* Status Pills */}
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className={`text-[10px] font-mono tracking-wider shrink-0 gap-1 ${
              dataset.status === "VALIDATED"
                ? "text-emerald-700 border-emerald-200 bg-emerald-50"
                : "text-red-700 border-red-200 bg-red-50"
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            {dataset.status}
          </Badge>

          {syncMessage && (
            <span className="text-[10px] font-mono text-emerald-700 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              {syncMessage}
            </span>
          )}
        </div>

        {/* Metadata Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-zinc-200 font-mono">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="truncate text-[11px]">
              {formatDate(dataset.startDate)} → {formatDate(dataset.endDate)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-500">
            <BarChart3 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="text-[11px]">{dataset.rowCount.toLocaleString()} candles</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="text-[11px]">Ver: {dataset.version}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Globe className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="text-[11px] truncate">{dataset.source}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-2 pt-3 mt-3 border-t border-zinc-200">
        <Link href={`/backtests/new?datasetId=${dataset.id}`} className="flex-1">
          <Button
            size="sm"
            className="w-full text-xs gap-1.5 bg-zinc-950 hover:bg-zinc-800 text-white font-mono font-semibold shadow-sm transition-all"
          >
            <Play className="w-3 h-3 fill-current" />
            RUN_BACKTEST
          </Button>
        </Link>

        {/* Live Provider Sync Button */}
        <Button
          size="sm"
          variant="outline"
          disabled={syncing}
          onClick={handleSyncData}
          title="Fetch latest live market candles from API provider"
          className="text-xs border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 hover:text-black gap-1 px-2.5 font-mono"
        >
          {syncing ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-900" />
          ) : (
            <RefreshCw className="w-3.5 h-3.5 text-zinc-600" />
          )}
          <span className="hidden sm:inline text-[11px]">Sync</span>
        </Button>
      </div>
    </div>
  );
}
