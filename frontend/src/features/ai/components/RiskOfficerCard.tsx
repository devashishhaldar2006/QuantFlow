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
      return { label: "INSTITUTIONAL GRADE", color: "text-emerald-700 border-emerald-300 bg-emerald-50" };
    }
    if (score >= 55) {
      return { label: "SPECULATIVE GRADE", color: "text-amber-800 border-amber-300 bg-amber-50" };
    }
    return { label: "ELEVATED TAIL RISK", color: "text-rose-700 border-rose-300 bg-rose-50" };
  };

  return (
    <div className="rounded border border-zinc-200 bg-white p-5 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded border border-zinc-900 bg-zinc-950 text-white shrink-0">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-zinc-900 font-mono tracking-tight uppercase">
                AUTONOMOUS_RISK_COMMITTEE_AUDIT
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-zinc-900 bg-zinc-950 text-white tracking-wider">
                LANGGRAPH • MISTRAL SMALL 2506
              </span>
            </div>
            <p className="text-xs text-zinc-600 mt-0.5">
              Continuous multi-node stress audit: luck concentration detector → macro regime test → CRO synthesized memo.
            </p>
          </div>
        </div>

        {!verdict && (
          <button
            type="button"
            disabled={isLoading}
            onClick={handleRunAudit}
            className="inline-flex h-8 items-center gap-1.5 rounded bg-zinc-950 px-3.5 text-xs font-mono font-semibold text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>AUDITING_STRATEGY...</span>
              </>
            ) : (
              <>
                <Sparkles className="size-3.5" />
                <span>RUN_AUTONOMOUS_AUDIT</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Error View */}
      {error && (
        <div className="p-3 rounded border border-red-200 bg-red-50 text-xs text-red-700 flex items-center gap-2 font-mono">
          <AlertOctagon className="size-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Initial Callout (Before Running) */}
      {!verdict && !isLoading && !error && (
        <div className="rounded border border-zinc-200 bg-zinc-50 p-6 text-center space-y-2">
          <p className="text-xs text-zinc-900 font-mono font-semibold uppercase tracking-wide">
            SUBJECT THIS BACKTEST TO HEDGE-FUND GRADE RISK SCREENING
          </p>
          <p className="text-xs text-zinc-600 max-w-lg mx-auto">
            The LangGraph agent inspects trade distribution to flag curve-fitting anomalies, verifies sample size significance, and tests drawdowns under liquidity shock regimes.
          </p>
        </div>
      )}

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="p-6 rounded border border-zinc-200 bg-zinc-50/60 animate-pulse space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded border border-zinc-200 bg-zinc-200" />
            <div className="space-y-1.5 flex-1">
              <div className="h-4 w-48 rounded bg-zinc-200" />
              <div className="h-3 w-80 rounded bg-zinc-200/70" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="h-20 rounded border border-zinc-200 bg-zinc-200/60" />
            <div className="h-20 rounded border border-zinc-200 bg-zinc-200/60" />
          </div>
        </div>
      )}

      {/* Audit Verdict Results */}
      {verdict && (
        <div className="space-y-5">
          {/* Health Score & Classification */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded border border-zinc-200 bg-zinc-50/60 p-4 text-center flex flex-col justify-center items-center">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-500">
                INSTITUTIONAL_SCORE
              </span>
              <div className="text-4xl font-extrabold text-zinc-950 font-mono mt-1">
                {verdict.overallHealthScore}
                <span className="text-sm font-normal text-zinc-400">/100</span>
              </div>
              <div className="mt-2.5">
                <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${getScoreBadge(verdict.overallHealthScore).color}`}>
                  {verdict.classification.replace(/_/g, " ")}
                </span>
              </div>
            </div>

            <div className="rounded border border-zinc-200 bg-zinc-50/60 p-4 sm:col-span-2 space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-900 flex items-center gap-1.5">
                <FileText className="size-3.5 text-zinc-900" />
                CRO_COMMITTEE_DECISION_MEMO
              </span>
              <p className="text-xs text-zinc-700 leading-relaxed">
                {verdict.summary}
              </p>
            </div>
          </div>

          {/* Sub-node Analyses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Overfitting Node */}
            <div className="rounded border border-zinc-200 bg-white p-4 space-y-2.5">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                <span className="text-xs font-bold text-zinc-900 font-mono uppercase tracking-wide">
                  OVERFITTING_&_CURVE_FITTING
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  {verdict.overfittingAnalysis.score}/100 ROBUST
                </span>
              </div>
              <p className="text-xs text-zinc-600">
                Single Outlier Concentration: <strong className="text-zinc-950 font-mono">{verdict.overfittingAnalysis.luckConcentrationPercent}%</strong> of net profit.
              </p>
              <ul className="space-y-1.5 pt-1 text-xs text-zinc-600">
                {verdict.overfittingAnalysis.observations.map((obs, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-zinc-950 font-bold leading-tight mt-0.5">•</span>
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regime Stress Node */}
            <div className="rounded border border-zinc-200 bg-white p-4 space-y-2.5">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                <span className="text-xs font-bold text-zinc-900 font-mono uppercase tracking-wide">
                  MACRO_REGIME_RESILIENCE
                </span>
                <span className="text-xs font-mono font-bold text-zinc-900 bg-zinc-100 border border-zinc-300 px-2 py-0.5 rounded">
                  {verdict.regimeStressAnalysis.score}/100 RESILIENCE
                </span>
              </div>
              <p className="text-xs text-zinc-700">
                {verdict.regimeStressAnalysis.stressTestSummary}
              </p>
              <ul className="space-y-1.5 pt-1 text-xs text-zinc-600">
                {verdict.regimeStressAnalysis.vulnerableConditions.map((cond, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold leading-tight">⚠</span>
                    <span>{cond}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actionable Risk Limits */}
          <div className="rounded border border-zinc-200 bg-zinc-50/60 p-4 space-y-2.5">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-900 flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-zinc-900" />
              MANDATED_EXECUTION_LIMITS_&_CONTROLS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {verdict.actionableRecommendations.map((rec, idx) => (
                <div key={idx} className="rounded border border-zinc-200 bg-white p-3 text-xs text-zinc-700 font-mono shadow-none">
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
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-950 transition-colors"
            >
              <RefreshCw className="size-3" />
              <span>RE_RUN_AUDIT</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
