"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, AlertCircle, Loader2, Cpu, Database, TrendingUp, Shield } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { backtestConfigSchema, type BacktestConfig } from "../schema";
import type { QuantEngineStrategy } from "@/services/quantEngine/types";
import { HttpQuantEngineClient } from "@/services/quantEngine/HttpQuantEngineClient";

const quantEngine = new HttpQuantEngineClient(
  process.env.NEXT_PUBLIC_QUANT_ENGINE_URL ?? "http://localhost:8080",
);

const initialForm: BacktestConfig = {
  strategy: "",
  csvFile: "data/sample.csv",
  initialCash: 100000,
  commission: 0.001,
  stopLossPercent: 0.02,
  takeProfitPercent: 0.05,
  shortMAPeriod: 10,
  longMAPeriod: 20,
  rsiPeriod: 14,
  oversold: 30,
  overbought: 70,
  fastEMAPeriod: 10,
  slowEMAPeriod: 20,
  macdFastPeriod: 12,
  macdSlowPeriod: 26,
  macdSignalPeriod: 9,
  bollingerPeriod: 20,
  bollingerMultiplier: 2,
  atrPeriod: 14,
  minimumATR: 1,
};

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
      {children}
    </label>
  );
}

function FieldInput({
  id, type = "text", value, onChange, placeholder, min, max, step, disabled,
}: {
  id: string; type?: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; min?: number | string; max?: number | string; step?: number | string; disabled?: boolean;
}) {
  return (
    <input
      id={id} type={type} value={value} onChange={onChange} placeholder={placeholder}
      min={min} max={max} step={step} disabled={disabled}
      className="w-full h-10 rounded-lg border border-slate-700/50 bg-slate-900/60 px-3 text-sm text-slate-100 placeholder:text-slate-600 transition-all outline-none focus:border-indigo-500/70 focus:bg-slate-900 focus:ring-1 focus:ring-indigo-500/30 shadow-inner disabled:cursor-not-allowed disabled:opacity-40 font-mono"
    />
  );
}

function FormSection({
  title, icon: Icon, children,
}: {
  title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode;
}) {
  return (
    <div className="glass-panel rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-2.5 pb-3 border-b border-slate-700/40">
        <div className="size-7 rounded-md bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
          <Icon className="size-3.5 text-indigo-400" />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">{title}</span>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function NumberField({
  id, label, value, step = 1, min = 1, onChange,
}: {
  id: string; label: string; value: number; step?: number; min?: number; onChange: (value: number) => void;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <FieldInput
        id={id} type="number" min={min} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export default function BacktestForm() {
  const router = useRouter();
  const [form, setForm] = useState<BacktestConfig>(initialForm);
  const [strategies, setStrategies] = useState<QuantEngineStrategy[]>([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [engineOnline, setEngineOnline] = useState<boolean | null>(null);

  useEffect(() => {
    async function loadStrategies() {
      try {
        const result = await quantEngine.getStrategies();
        setStrategies(result);
        setEngineOnline(result.length > 0);
      } catch (err) {
        console.error(err);
        setEngineOnline(false);
        setError("Unable to connect to the QuantFlow engine. Please ensure it is running on port 8080.");
      }
    }
    loadStrategies();
  }, []);

  const updateField = <K extends keyof BacktestConfig>(field: K, value: BacktestConfig[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = backtestConfigSchema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0].message);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/backtests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Failed to create backtest.");
      router.push(`/backtests/${data.id}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to create backtest.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const strategy = strategies.find((item) => item.name === form.strategy);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Engine Status Banner */}
      {engineOnline === false && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-400">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <div>
            <p className="font-medium">Engine Offline</p>
            <p className="mt-0.5 text-xs text-amber-400/70">Start the C++ engine on port 8080 to load strategies and run backtests.</p>
          </div>
        </div>
      )}
      {error && !engineOnline === false && (
        <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* STRATEGY & DATA */}
      <FormSection title="Strategy & Data" icon={Cpu}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="strategy">Strategy Model</FieldLabel>
            <Select
              value={form.strategy}
              onValueChange={(value) => { if (value) updateField("strategy", value); }}
            >
              <SelectTrigger
                id="strategy"
                className="h-10 w-full rounded-lg border border-slate-700/50 bg-slate-900/60 px-3 text-sm text-slate-100 outline-none focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/30 font-mono"
              >
                <SelectValue placeholder="Select a strategy..." />
              </SelectTrigger>
              <SelectContent className="rounded-lg border border-slate-700/50 bg-slate-900 shadow-2xl backdrop-blur-xl">
                {strategies.map((item) => (
                  <SelectItem
                    key={item.name} value={item.name}
                    className="text-sm text-slate-200 font-mono hover:bg-slate-800 focus:bg-slate-800 cursor-pointer"
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {strategy && (
              <div className="mt-3 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3">
                <p className="text-xs font-semibold text-indigo-300">{strategy.name}</p>
                <p className="mt-0.5 text-xs text-slate-400">{strategy.description}</p>
              </div>
            )}
          </div>
          <div>
            <FieldLabel htmlFor="csvFile">Market Data (CSV Path)</FieldLabel>
            <FieldInput
              id="csvFile"
              placeholder="e.g. data/sample.csv"
              value={form.csvFile}
              onChange={(e) => updateField("csvFile", e.target.value)}
            />
            <p className="mt-1.5 text-[10px] text-slate-600">Relative to engine working directory</p>
          </div>
        </div>

        {/* Dynamic Strategy Parameters */}
        {form.strategy === "MovingAverageCross" && (
          <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-slate-800/60">
            <NumberField id="shortMAPeriod" label="Short MA Period" value={form.shortMAPeriod} onChange={(v) => updateField("shortMAPeriod", v)} />
            <NumberField id="longMAPeriod" label="Long MA Period" value={form.longMAPeriod} onChange={(v) => updateField("longMAPeriod", v)} />
          </div>
        )}
        {form.strategy === "EMACross" && (
          <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-slate-800/60">
            <NumberField id="fastEMAPeriod" label="Fast EMA Period" value={form.fastEMAPeriod} onChange={(v) => updateField("fastEMAPeriod", v)} />
            <NumberField id="slowEMAPeriod" label="Slow EMA Period" value={form.slowEMAPeriod} onChange={(v) => updateField("slowEMAPeriod", v)} />
          </div>
        )}
        {form.strategy === "RSI" && (
          <div className="grid gap-4 sm:grid-cols-3 pt-2 border-t border-slate-800/60">
            <NumberField id="rsiPeriod" label="RSI Period" value={form.rsiPeriod} onChange={(v) => updateField("rsiPeriod", v)} />
            <NumberField id="oversold" label="Oversold" value={form.oversold} min={0} onChange={(v) => updateField("oversold", v)} />
            <NumberField id="overbought" label="Overbought" value={form.overbought} min={0} onChange={(v) => updateField("overbought", v)} />
          </div>
        )}
        {form.strategy === "MACD" && (
          <div className="grid gap-4 sm:grid-cols-3 pt-2 border-t border-slate-800/60">
            <NumberField id="macdFastPeriod" label="Fast Period" value={form.macdFastPeriod} onChange={(v) => updateField("macdFastPeriod", v)} />
            <NumberField id="macdSlowPeriod" label="Slow Period" value={form.macdSlowPeriod} onChange={(v) => updateField("macdSlowPeriod", v)} />
            <NumberField id="macdSignalPeriod" label="Signal Period" value={form.macdSignalPeriod} onChange={(v) => updateField("macdSignalPeriod", v)} />
          </div>
        )}
        {form.strategy === "Bollinger" && (
          <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-slate-800/60">
            <NumberField id="bollingerPeriod" label="Period" value={form.bollingerPeriod} onChange={(v) => updateField("bollingerPeriod", v)} />
            <NumberField id="bollingerMultiplier" label="Std Dev Multiplier" value={form.bollingerMultiplier} step={0.1} min={0} onChange={(v) => updateField("bollingerMultiplier", v)} />
          </div>
        )}
        {form.strategy === "ATRFilter" && (
          <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-slate-800/60">
            <NumberField id="atrPeriod" label="ATR Period" value={form.atrPeriod} onChange={(v) => updateField("atrPeriod", v)} />
            <NumberField id="minimumATR" label="ATR Threshold" value={form.minimumATR} step={0.1} min={0} onChange={(v) => updateField("minimumATR", v)} />
          </div>
        )}
        {form.strategy === "AlwaysHold" && (
          <p className="text-xs text-slate-500 rounded-lg border border-slate-800/60 bg-slate-900/30 px-3 py-2.5 pt-2 border-t border-slate-800/60">
            No additional parameters required for Always Hold strategy.
          </p>
        )}
      </FormSection>

      {/* CAPITAL & EXECUTION */}
      <FormSection title="Capital & Execution" icon={Database}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="initialCash">Initial Capital (₹)</FieldLabel>
            <FieldInput
              id="initialCash" type="number" min={1}
              value={form.initialCash}
              onChange={(e) => updateField("initialCash", Number(e.target.value))}
            />
          </div>
          <div>
            <FieldLabel htmlFor="commission">Commission Rate</FieldLabel>
            <FieldInput
              id="commission" type="number" min={0} step={0.0001}
              value={form.commission}
              onChange={(e) => updateField("commission", Number(e.target.value))}
            />
            <p className="mt-1.5 text-[10px] text-slate-600">e.g. 0.001 = 0.1%</p>
          </div>
        </div>
      </FormSection>

      {/* RISK MANAGEMENT */}
      <FormSection title="Risk Management" icon={Shield}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="stopLossPercent">Stop Loss (%)</FieldLabel>
            <FieldInput
              id="stopLossPercent" type="number" min={0} max={100} step={0.1}
              value={form.stopLossPercent * 100}
              onChange={(e) => updateField("stopLossPercent", Number(e.target.value) / 100)}
            />
          </div>
          <div>
            <FieldLabel htmlFor="takeProfitPercent">Take Profit (%)</FieldLabel>
            <FieldInput
              id="takeProfitPercent" type="number" min={0} max={100} step={0.1}
              value={form.takeProfitPercent * 100}
              onChange={(e) => updateField("takeProfitPercent", Number(e.target.value) / 100)}
            />
          </div>
        </div>
      </FormSection>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="h-10 rounded-lg border border-slate-700/50 bg-transparent px-5 text-sm font-medium text-slate-300 transition-all hover:bg-slate-800/60 hover:text-slate-100 hover:border-slate-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || strategies.length === 0}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-indigo-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <TrendingUp className="size-4" />
              Run Backtest
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
