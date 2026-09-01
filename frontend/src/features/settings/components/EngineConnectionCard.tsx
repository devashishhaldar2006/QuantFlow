"use client";

import React, { useState } from "react";
import { Server, Info, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { SettingRow } from "./SettingRow";

export function EngineConnectionCard({
  engineUrl,
  onEngineUrlChange,
}: {
  engineUrl: string;
  onEngineUrlChange: (url: string) => void;
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <SectionCard
      title="Engine Connection"
      icon={Server}
      description="C++ QuantFlow calculation node status and cloud bridge configuration"
    >
      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs">
        <div className="flex items-center gap-2.5 text-slate-200">
          <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold">QuantFlow Cloud C++ Engine</span>
        </div>
        <span className="inline-flex items-center gap-1 text-emerald-400 font-mono text-[11px] font-semibold">
          <CheckCircle2 className="size-3.5" />
          Operational
        </span>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 transition-colors"
        >
          <span>Advanced: Custom Engine Endpoint</span>
          {showAdvanced ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
        </button>

        {showAdvanced && (
          <div className="mt-3 space-y-3 pt-3 border-t border-white/5">
            <SettingRow
              label="Custom Node URL"
              description="Override default cloud node with a local or self-hosted C++ engine container"
            >
              <input
                type="url"
                value={engineUrl}
                onChange={(e) => onEngineUrlChange(e.target.value)}
                placeholder="http://localhost:8080"
                className="h-9 w-64 rounded-lg border border-slate-700/50 bg-slate-900/60 px-3 text-sm text-slate-100 font-mono outline-none transition-all focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/30"
              />
            </SettingRow>

            <div className="flex items-start gap-2 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3 text-xs text-indigo-400">
              <Info className="size-3.5 mt-0.5 shrink-0" />
              <span>
                Default backtest calculations route automatically through the compiled C++ Docker daemon.
              </span>
            </div>
          </div>
        )}
      </div>
    </SectionCard>
  );
}
