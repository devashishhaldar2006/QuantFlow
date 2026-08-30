"use client";

import React from "react";
import { Server, Info } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { SettingRow } from "./SettingRow";

export function EngineConnectionCard({
  engineUrl,
  onEngineUrlChange,
}: {
  engineUrl: string;
  onEngineUrlChange: (url: string) => void;
}) {
  return (
    <SectionCard
      title="Engine Connection"
      icon={Server}
      description="C++ QuantFlow engine endpoint and connection settings"
    >
      <SettingRow
        label="Engine URL"
        description="Base URL where the C++ backtest server is running"
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
          The engine URL is stored locally in your browser. Changes apply to new backtest
          submissions. Default CSV data is served from the engine&apos;s working directory.
        </span>
      </div>
    </SectionCard>
  );
}
