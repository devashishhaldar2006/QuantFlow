"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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

export default function BacktestForm() {
  const router = useRouter();

  const [form, setForm] = useState<BacktestConfig>(initialForm);

  const [strategies, setStrategies] = useState<QuantEngineStrategy[]>([]);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadStrategies() {
      try {
        const result = await quantEngine.getStrategies();

        setStrategies(result);
      } catch (error) {
        console.error(error);

        setError("Unable to load strategies from the QuantFlow engine.");
      }
    }

    loadStrategies();
  }, []);

  const updateField = <K extends keyof BacktestConfig>(
    field: K,
    value: BacktestConfig[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to create backtest.");
      }

      router.push(`/backtests/${data.id}`);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "Failed to create backtest.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const strategy = strategies.find((item) => item.name === form.strategy);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border bg-card p-6"
    >
      {error && (
        <div className="border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Strategy */}

      <div className="space-y-2">
        <Label htmlFor="strategy">Strategy</Label>

        <Select
          value={form.strategy}
          onValueChange={(value) => {
            if (value === null) {
              return;
            }

            updateField("strategy", value);
          }}
        >
          <SelectTrigger id="strategy">
            <SelectValue placeholder="Select a strategy" />
          </SelectTrigger>

          <SelectContent>
            {strategies.map((item) => (
              <SelectItem key={item.name} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {strategy && (
          <p className="text-xs text-muted-foreground">
            {strategy.description}
          </p>
        )}
      </div>

      {/* CSV */}

      <div className="space-y-2">
        <Label htmlFor="csvFile">CSV File</Label>

        <Input
          id="csvFile"
          placeholder="e.g. data/sample.csv"
          value={form.csvFile}
          onChange={(event) => updateField("csvFile", event.target.value)}
        />
      </div>

      {/* Capital + Commission */}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="initialCash">Initial Capital</Label>

          <Input
            id="initialCash"
            type="number"
            min="1"
            value={form.initialCash}
            onChange={(event) =>
              updateField("initialCash", Number(event.target.value))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="commission">Commission</Label>

          <Input
            id="commission"
            type="number"
            min="0"
            step="0.0001"
            value={form.commission}
            onChange={(event) =>
              updateField("commission", Number(event.target.value))
            }
          />
        </div>
      </div>

      {/* Stop Loss / Take Profit */}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="stopLossPercent">Stop Loss (%)</Label>

          <Input
            id="stopLossPercent"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={form.stopLossPercent * 100}
            onChange={(event) =>
              updateField("stopLossPercent", Number(event.target.value) / 100)
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="takeProfitPercent">Take Profit (%)</Label>

          <Input
            id="takeProfitPercent"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={form.takeProfitPercent * 100}
            onChange={(event) =>
              updateField("takeProfitPercent", Number(event.target.value) / 100)
            }
          />
        </div>
      </div>

      {/* Strategy Parameters */}

      {form.strategy === "MovingAverageCross" && (
        <div className="grid gap-6 sm:grid-cols-2">
          <NumberField
            id="shortMAPeriod"
            label="Short MA Period"
            value={form.shortMAPeriod}
            onChange={(value) => updateField("shortMAPeriod", value)}
          />

          <NumberField
            id="longMAPeriod"
            label="Long MA Period"
            value={form.longMAPeriod}
            onChange={(value) => updateField("longMAPeriod", value)}
          />
        </div>
      )}

      {form.strategy === "EMACross" && (
        <div className="grid gap-6 sm:grid-cols-2">
          <NumberField
            id="fastEMAPeriod"
            label="Fast EMA Period"
            value={form.fastEMAPeriod}
            onChange={(value) => updateField("fastEMAPeriod", value)}
          />

          <NumberField
            id="slowEMAPeriod"
            label="Slow EMA Period"
            value={form.slowEMAPeriod}
            onChange={(value) => updateField("slowEMAPeriod", value)}
          />
        </div>
      )}

      {form.strategy === "RSI" && (
        <div className="grid gap-6 sm:grid-cols-3">
          <NumberField
            id="rsiPeriod"
            label="RSI Period"
            value={form.rsiPeriod}
            onChange={(value) => updateField("rsiPeriod", value)}
          />

          <NumberField
            id="oversold"
            label="Oversold"
            value={form.oversold}
            onChange={(value) => updateField("oversold", value)}
          />

          <NumberField
            id="overbought"
            label="Overbought"
            value={form.overbought}
            onChange={(value) => updateField("overbought", value)}
          />
        </div>
      )}

      {form.strategy === "MACD" && (
        <div className="grid gap-6 sm:grid-cols-3">
          <NumberField
            id="macdFastPeriod"
            label="Fast MACD Period"
            value={form.macdFastPeriod}
            onChange={(value) => updateField("macdFastPeriod", value)}
          />

          <NumberField
            id="macdSlowPeriod"
            label="Slow MACD Period"
            value={form.macdSlowPeriod}
            onChange={(value) => updateField("macdSlowPeriod", value)}
          />

          <NumberField
            id="macdSignalPeriod"
            label="Signal Period"
            value={form.macdSignalPeriod}
            onChange={(value) => updateField("macdSignalPeriod", value)}
          />
        </div>
      )}

      {form.strategy === "Bollinger" && (
        <div className="grid gap-6 sm:grid-cols-2">
          <NumberField
            id="bollingerPeriod"
            label="Bollinger Period"
            value={form.bollingerPeriod}
            onChange={(value) => updateField("bollingerPeriod", value)}
          />

          <NumberField
            id="bollingerMultiplier"
            label="Standard Deviation Multiplier"
            value={form.bollingerMultiplier}
            step={0.1}
            onChange={(value) => updateField("bollingerMultiplier", value)}
          />
        </div>
      )}

      {form.strategy === "ATRFilter" && (
        <div className="grid gap-6 sm:grid-cols-2">
          <NumberField
            id="atrPeriod"
            label="ATR Period"
            value={form.atrPeriod}
            onChange={(value) => updateField("atrPeriod", value)}
          />

          <NumberField
            id="minimumATR"
            label="ATR Threshold"
            value={form.minimumATR}
            step={0.1}
            onChange={(value) => updateField("minimumATR", value)}
          />
        </div>
      )}

      {form.strategy === "AlwaysHold" && (
        <div className="border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          Always Hold does not require any strategy-specific parameters.
        </div>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting || strategies.length === 0}
        >
          {isSubmitting ? "Running..." : "Run Backtest"}
        </Button>
      </div>
    </form>
  );
}

type NumberFieldProps = {
  id: string;
  label: string;
  value: number;
  step?: number;
  onChange: (value: number) => void;
};

function NumberField({
  id,
  label,
  value,
  step = 1,
  onChange,
}: NumberFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      <Input
        id={id}
        type="number"
        min="1"
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}
