"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";
import { useEngineConfig } from "@/features/settings/hooks/useEngineConfig";
import { EngineConnectionCard } from "@/features/settings/components/EngineConnectionCard";
import { ExecutionDefaultsCard } from "@/features/settings/components/ExecutionDefaultsCard";
import { RiskDefaultsCard } from "@/features/settings/components/RiskDefaultsCard";
import { StrategyDefaultsCard } from "@/features/settings/components/StrategyDefaultsCard";
import { SystemInfoCard } from "@/features/settings/components/SystemInfoCard";

export default function SettingsPage() {
  const {
    config,
    update,
    loading,
    saving,
    saveStatus,
    saveMsg,
    engineUrl,
    setEngineUrl,
    handleSave,
    handleReset,
  } = useEngineConfig();

  return (
    <AnimatedPage className="w-full space-y-6 p-4 md:p-8 max-w-4xl mx-auto">
      {/* Page Header */}
      <AnimatedItem>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <Settings className="size-5 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-100">
                System Settings
              </h1>
              <p className="text-xs text-slate-500">
                Configure default backtest parameters and engine preferences
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <button
              type="button"
              onClick={handleReset}
              disabled={saving || loading}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-700/50 bg-transparent px-4 text-xs font-medium text-slate-400 transition hover:border-slate-600 hover:bg-slate-800/60 hover:text-slate-200 disabled:opacity-40"
            >
              <RotateCcw className="size-3.5" />
              Reset Defaults
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || loading}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-indigo-600 px-5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Save className="size-3.5" />
              )}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </AnimatedItem>

      {/* Save Status Banner */}
      {saveStatus !== "idle" && (
        <AnimatedItem>
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
              saveStatus === "success"
                ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                : "border-red-500/20 bg-red-500/5 text-red-400"
            }`}
          >
            {saveStatus === "success" ? (
              <CheckCircle2 className="size-4 shrink-0" />
            ) : (
              <AlertCircle className="size-4 shrink-0" />
            )}
            {saveMsg}
          </motion.div>
        </AnimatedItem>
      )}

      {loading ? (
        <AnimatedItem>
          <div className="flex items-center justify-center py-20 text-slate-500">
            <Loader2 className="mr-3 size-5 animate-spin" />
            <span className="text-sm">Loading configuration…</span>
          </div>
        </AnimatedItem>
      ) : (
        <div className="space-y-5">
          <AnimatedItem>
            <EngineConnectionCard
              engineUrl={engineUrl}
              onEngineUrlChange={setEngineUrl}
            />
          </AnimatedItem>

          <AnimatedItem>
            <ExecutionDefaultsCard config={config} onUpdate={update} />
          </AnimatedItem>

          <AnimatedItem>
            <RiskDefaultsCard config={config} onUpdate={update} />
          </AnimatedItem>

          <AnimatedItem>
            <StrategyDefaultsCard config={config} onUpdate={update} />
          </AnimatedItem>

          <AnimatedItem>
            <SystemInfoCard />
          </AnimatedItem>
        </div>
      )}
    </AnimatedPage>
  );
}
