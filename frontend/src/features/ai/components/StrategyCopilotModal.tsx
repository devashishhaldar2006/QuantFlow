"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Bot, Loader2, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import { BacktestConfig } from "@/features/backtest/schema";

interface StrategyCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyConfig: (config: Partial<BacktestConfig>) => void;
}

export function StrategyCopilotModal({ isOpen, onClose, onApplyConfig }: StrategyCopilotModalProps) {
  const [hypothesis, setHypothesis] = useState("");
  const [assetClass, setAssetClass] = useState("INDEX");
  const [timeframe, setTimeframe] = useState("1d");
  const [isLoading, setIsLoading] = useState(false);
  const [stepStatus, setStepStatus] = useState<string>("");
  const [resultData, setResultData] = useState<any>(null);
  const [error, setError] = useState("");

  const samplePrompts = [
    "Conservative trend-following strategy on NIFTY with EMA crossovers and low drawdown",
    "High-frequency mean-reversion with Bollinger Bands and tight stop loss for crypto",
    "Volatility breakout filter using 14-period ATR on Daily Equities",
  ];

  const handleRunArchitect = async () => {
    if (!hypothesis.trim()) return;
    setIsLoading(true);
    setError("");
    setResultData(null);
    setStepStatus("Initializing LangGraph State Graph & Mistral Small 2506...");

    try {
      setTimeout(() => setStepStatus("Node 1: Parsing hypothesis & selecting C++ algorithm..."), 1200);
      setTimeout(() => setStepStatus("Node 2: Validating mathematical boundaries & parameter constraints..."), 2500);
      setTimeout(() => setStepStatus("Node 3: Executing high-frequency backtest via C++ engine tool..."), 4500);
      setTimeout(() => setStepStatus("Node 4: Reflecting on Sharpe / Drawdown & generating Executive Memo..."), 7000);

      const res = await fetch("/api/ai/strategy-architect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hypothesis,
          preferredAssetClass: assetClass,
          timeframe,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to execute Strategy Architect.");
      }

      setResultData(data);
    } catch (err: any) {
      setError(err?.message || "Failed to contact Strategy Architect.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-blue-500/30 bg-[#0B1120] p-4 sm:p-6 shadow-2xl space-y-4 sm:space-y-5 text-slate-100 scrollbar-hide"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 sm:pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
              <Bot className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Autonomous Strategy Architect
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  LangGraph + Mistral Small 2506
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Agentic reasoning loop: parse hypothesis ➔ validate bounds ➔ execute C++ engine ➔ reflect & calibrate.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-sm px-2 py-1 rounded-lg hover:bg-slate-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Input Form */}
        <div className="space-y-3">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Investment Thesis or Strategy Hypothesis
          </label>
          <textarea
            rows={3}
            value={hypothesis}
            onChange={(e) => setHypothesis(e.target.value)}
            placeholder="e.g. Design a low-drawdown breakout strategy that buys on MACD momentum crossovers with strict 2% stop-loss..."
            className="w-full rounded-xl border border-slate-700/80 bg-slate-900/90 p-3 text-xs text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
          />

          {/* Preset Prompts */}
          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setHypothesis(p)}
                className="text-[10px] bg-slate-800/80 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 transition"
              >
                {p}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">Asset Class</label>
              <select
                value={assetClass}
                onChange={(e) => setAssetClass(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200"
              >
                <option value="INDEX">Index Benchmark</option>
                <option value="CRYPTO">Cryptocurrency Spot</option>
                <option value="EQUITY">Single Equity</option>
                <option value="FOREX">Foreign Exchange</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase font-semibold text-slate-500 block mb-1">Timeframe</label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200"
              >
                <option value="1d">Daily (1D)</option>
                <option value="1h">1-Hour (1H)</option>
                <option value="15m">15-Minute (15M)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
            <AlertTriangle className="size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Agentic Progress State */}
        {isLoading && (
          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 space-y-2">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-blue-300">
              <Loader2 className="size-4 animate-spin text-blue-400" />
              <span>{stepStatus}</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full w-2/3 animate-pulse" />
            </div>
          </div>
        )}

        {/* Results Card */}
        {resultData && resultData.config && (
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs max-h-60 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="size-4" />
                <span>Strategy Configured: {resultData.config.strategy}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Iterations: {resultData.iterationCount || 1}
              </span>
            </div>

            {resultData.strategyMemo && (
              <div className="text-slate-300 whitespace-pre-line leading-relaxed text-[11px] font-mono bg-black/40 p-3 rounded-lg border border-white/5">
                {resultData.strategyMemo}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">
                Ready to apply parameters to your QuantFlow backtest form?
              </span>
              <button
                type="button"
                onClick={() => {
                  onApplyConfig(resultData.config);
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 transition"
              >
                <span>Apply to Form</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Actions Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-800 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isLoading || !hypothesis.trim()}
            onClick={handleRunArchitect}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-500 transition disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>Reasoning...</span>
              </>
            ) : (
              <>
                <Sparkles className="size-3.5" />
                <span>Launch Agentic Architect</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
