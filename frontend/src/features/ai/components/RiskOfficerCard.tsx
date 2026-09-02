"use client";

import { useState } from "react";
import { ShieldCheck, AlertOctagon, CheckCircle2, RefreshCw, Loader2, Sparkles, FileText, ChevronRight } from "lucide-react";
import { RiskOfficerVerdict } from "@/services/ai/types";

interface RiskOfficerCardProps {
  backtestId: string;
}

export function RiskOfficerCard({ backtestId }: RiskOfficerCardProps) {
  const [verdict, setVerdict] = useState<RiskOfficerVerdict | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRunAudit = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/ai/risk-officer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ backtestId }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to execute Risk Officer Audit.");
      }

      setVerdict(data.verdict);
    } catch (err: any) {
      setError(err?.message || "Failed to conduct Risk Committee audit.");
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 78) {
      return { label: "INSTITUTIONAL GRADE", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" };
    }
    if (score >= 55) {
      return { label: "SPECULATIVE GRADE", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" };
    }
    return { label: "ELEVATED TAIL RISK", color: "text-rose-400 border-rose-500/30 bg-rose-500/10" };
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0B1120] p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 shadow-sm">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Autonomous Risk Committee Audit
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                LangGraph + Mistral Small 2506
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Continuous multi-node stress audit: luck concentration detector ➔ macro regime test ➔ CRO synthesized memo.
            </p>
          </div>
        </div>

        {!verdict && (
          <button
            type="button"
            disabled={isLoading}
            onClick={handleRunAudit}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 transition disabled:opacity-50 shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>Auditing Strategy...</span>
              </>
            ) : (
              <>
                <Sparkles className="size-3.5" />
                <span>Run Autonomous Audit</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Error View */}
      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
          <AlertOctagon className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Initial Callout (Before Running) */}
      {!verdict && !isLoading && !error && (
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 text-center space-y-2">
          <p className="text-xs text-slate-300 font-medium">
            Subject this backtest to hedge-fund grade risk screening.
          </p>
          <p className="text-[11px] text-slate-500 max-w-lg mx-auto">
            The LangGraph agent inspects trade distribution to flag curve-fitting anomalies, verifies sample size significance, and tests drawdowns under liquidity shock regimes.
          </p>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 animate-pulse space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-xl bg-slate-800" />
            <div className="space-y-1.5 flex-1">
              <div className="h-4 w-48 rounded bg-slate-800" />
              <div className="h-3 w-80 rounded bg-slate-800/60" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="h-20 rounded-lg bg-slate-800/50" />
            <div className="h-20 rounded-lg bg-slate-800/50" />
          </div>
        </div>
      )}

      {/* Audit Verdict Results */}
      {verdict && (
        <div className="space-y-5">
          {/* Health Score & Classification */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Institutional Score</span>
              <div className="text-3xl font-extrabold text-white mt-1">
                {verdict.overallHealthScore}<span className="text-sm font-normal text-slate-500">/100</span>
              </div>
              <div className="mt-2">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${getScoreBadge(verdict.overallHealthScore).color}`}>
                  {verdict.classification.replace(/_/g, " ")}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 sm:col-span-2 space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 flex items-center gap-1.5">
                <FileText className="size-3 text-blue-400" />
                CRO Committee Decision Memo
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {verdict.summary}
              </p>
            </div>
          </div>

          {/* Sub-node Analyses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Overfitting Node */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Overfitting & Curve-Fitting Check</span>
                <span className="text-[11px] font-mono text-emerald-400">
                  {verdict.overfittingAnalysis.score}/100 Robust
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Single Outlier Concentration: <strong className="text-slate-200">{verdict.overfittingAnalysis.luckConcentrationPercent}%</strong> of net profit.
              </p>
              <ul className="space-y-1 pt-1 text-[11px] text-slate-400">
                {verdict.overfittingAnalysis.observations.map((obs, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regime Stress Node */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Macro Regime Stress Resilience</span>
                <span className="text-[11px] font-mono text-blue-400">
                  {verdict.regimeStressAnalysis.score}/100 Resilience
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                {verdict.regimeStressAnalysis.stressTestSummary}
              </p>
              <ul className="space-y-1 pt-1 text-[11px] text-slate-400">
                {verdict.regimeStressAnalysis.vulnerableConditions.map((cond, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-400 mt-0.5">⚠</span>
                    <span>{cond}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actionable Risk Limits */}
          <div className="rounded-xl border border-blue-500/20 bg-blue-950/20 p-4 space-y-2">
            <span className="text-[11px] uppercase font-mono font-semibold tracking-wider text-blue-300 flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-blue-400" />
              Mandated Execution Limits & Controls
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {verdict.actionableRecommendations.map((rec, idx) => (
                <div key={idx} className="rounded-lg bg-black/40 border border-white/5 p-2.5 text-[11px] text-slate-300 font-mono">
                  {rec}
                </div>
              ))}
            </div>
          </div>

          {/* Re-run Button */}
          <div className="flex justify-end pt-1">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleRunAudit}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
            >
              <RefreshCw className="size-3" />
              <span>Re-run Audit</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
