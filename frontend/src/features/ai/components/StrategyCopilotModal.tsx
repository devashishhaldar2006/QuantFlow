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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded border border-zinc-200 bg-white p-5 sm:p-6 shadow-xl space-y-4 sm:space-y-5 text-zinc-900 scrollbar-hide"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-3 sm:pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded border border-zinc-900 bg-zinc-950 text-white shrink-0">
              <Bot className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-zinc-900 font-mono tracking-tight uppercase">
                  AUTONOMOUS_STRATEGY_ARCHITECT
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-zinc-900 bg-zinc-950 text-white tracking-wider">
                  LANGGRAPH • MISTRAL SMALL 2506
                </span>
              </div>
              <p className="text-xs text-zinc-600 mt-0.5">
                Agentic reasoning loop: parse hypothesis → validate bounds → execute C++ engine → reflect & calibrate.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-950 text-sm p-1.5 rounded transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Input Form */}
        <div className="space-y-3">
          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
            INVESTMENT_THESIS_OR_STRATEGY_HYPOTHESIS
          </label>
          <textarea
            rows={3}
            value={hypothesis}
            onChange={(e) => setHypothesis(e.target.value)}
            placeholder="e.g. Design a low-drawdown breakout strategy that buys on MACD momentum crossovers with strict 2% stop-loss..."
            className="w-full rounded border border-zinc-200 bg-zinc-50/50 p-3 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none transition-colors"
          />

          {/* Preset Prompts */}
          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setHypothesis(p)}
                className="text-[11px] bg-zinc-100 hover:bg-zinc-200 text-zinc-700 px-2.5 py-1 rounded border border-zinc-200 font-sans transition-colors text-left"
              >
                {p}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-[10px] uppercase font-mono font-bold text-zinc-500 block mb-1">ASSET_CLASS</label>
              <select
                value={assetClass}
                onChange={(e) => setAssetClass(e.target.value)}
                className="w-full rounded border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-900 font-mono focus:border-zinc-950 focus:outline-none"
              >
                <option value="INDEX">Index Benchmark</option>
                <option value="CRYPTO">Cryptocurrency Spot</option>
                <option value="EQUITY">Single Equity</option>
                <option value="FOREX">Foreign Exchange</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase font-mono font-bold text-zinc-500 block mb-1">TIMEFRAME</label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full rounded border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-900 font-mono focus:border-zinc-950 focus:outline-none"
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
          <div className="p-3 rounded border border-red-200 bg-red-50 text-xs text-red-700 flex items-center gap-2 font-mono">
            <AlertTriangle className="size-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Agentic Progress State */}
        {isLoading && (
          <div className="p-4 rounded border border-zinc-200 bg-zinc-50 space-y-2">
            <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-zinc-950">
              <Loader2 className="size-4 animate-spin text-zinc-950" />
              <span>{stepStatus}</span>
            </div>
            <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-zinc-950 h-full w-2/3 animate-pulse" />
            </div>
          </div>
        )}

        {/* Results Card */}
        {resultData && resultData.config && (
          <div className="p-4 rounded border border-zinc-200 bg-zinc-50/60 space-y-3 text-xs max-h-60 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
              <div className="flex items-center gap-2 text-emerald-700 font-mono font-bold">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span>STRATEGY_CONFIGURED: {resultData.config.strategy}</span>
              </div>
              <span className="text-[10px] font-mono font-semibold text-zinc-500">
                ITERATIONS: {resultData.iterationCount || 1}
              </span>
            </div>

            {resultData.strategyMemo && (
              <div className="text-zinc-800 whitespace-pre-line leading-relaxed text-xs font-mono bg-white p-3.5 rounded border border-zinc-200">
                {resultData.strategyMemo}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-zinc-600 font-mono">
                Apply parameters to your QuantFlow backtest form?
              </span>
              <button
                type="button"
                onClick={() => {
                  onApplyConfig(resultData.config);
                  onClose();
                }}
                className="inline-flex h-8 items-center gap-1.5 rounded bg-zinc-950 px-3 text-xs font-mono font-semibold text-white transition-colors hover:bg-zinc-800"
              >
                <span>APPLY_TO_FORM</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Actions Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-zinc-200 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="h-8 px-3.5 text-xs font-mono font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            CANCEL
          </button>
          <button
            type="button"
            disabled={isLoading || !hypothesis.trim()}
            onClick={handleRunArchitect}
            className="inline-flex h-8 items-center gap-2 rounded bg-zinc-950 px-4 text-xs font-mono font-semibold text-white transition-colors hover:bg-zinc-800 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>REASONING...</span>
              </>
            ) : (
              <>
                <Sparkles className="size-3.5" />
                <span>LAUNCH_AGENTIC_ARCHITECT</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
