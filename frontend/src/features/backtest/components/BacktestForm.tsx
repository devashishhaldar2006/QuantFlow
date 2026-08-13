"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createBacktest } from "@/lib/api/backtests";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { backtestConfigSchema, type BacktestConfig } from "../schema";

const initialForm: BacktestConfig = {
  strategy: "",
  csvFile: "",
  initialCash: 100000,
  commission: 0.001,
  stopLossPercent: 0.02,
  takeProfitPercent: 0.05,
  shortMAPeriod: 10,
  longMAPeriod: 20,
};

export default function BacktestForm() {
  const [form, setForm] = useState<BacktestConfig>(initialForm);

  const router = useRouter();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const result = backtestConfigSchema.safeParse(form);

    if (!result.success) {
      setError(result.error.issues[0].message);
      setIsSubmitting(false);
      return;
    }

    try {
      await createBacktest(result.data);

      router.push("/backtests/results");
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error ? error.message : "Failed to create backtest.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border bg-card p-6"
    >
      {/* Strategy */}
      <div className="space-y-2">
        <Label htmlFor="strategy">Strategy</Label>

        <Select
          value={form.strategy}
          onValueChange={(value) => {
            if (!value) return;

            setForm((current) => ({
              ...current,
              strategy: value,
            }));
          }}
        >
          <SelectTrigger id="strategy">
            <SelectValue placeholder="Select a strategy" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="MovingAverageCross">SMA Crossover</SelectItem>

            <SelectItem value="EMACross">EMA Crossover</SelectItem>

            <SelectItem value="RSI">RSI Mean Reversion</SelectItem>

            <SelectItem value="Bollinger">Bollinger Bands</SelectItem>

            <SelectItem value="MACD">MACD Strategy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* CSV File */}
      <div className="space-y-2">
        <Label htmlFor="csvFile">CSV File</Label>

        <Input
          id="csvFile"
          placeholder="e.g. data/sample.csv"
          value={form.csvFile}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              csvFile: event.target.value,
            }))
          }
        />
      </div>

      {/* Initial Capital */}
      <div className="space-y-2">
        <Label htmlFor="initialCash">Initial Capital</Label>

        <Input
          id="initialCash"
          type="number"
          min="0"
          value={form.initialCash}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              initialCash: Number(event.target.value),
            }))
          }
        />
      </div>

      {/* Commission */}
      <div className="space-y-2">
        <Label htmlFor="commission">Commission</Label>

        <Input
          id="commission"
          type="number"
          min="0"
          step="0.0001"
          value={form.commission}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              commission: Number(event.target.value),
            }))
          }
        />
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
              setForm((current) => ({
                ...current,
                stopLossPercent: Number(event.target.value) / 100,
              }))
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
              setForm((current) => ({
                ...current,
                takeProfitPercent: Number(event.target.value) / 100,
              }))
            }
          />
        </div>
      </div>

      {/* Moving Average Periods */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="shortMAPeriod">Short MA Period</Label>

          <Input
            id="shortMAPeriod"
            type="number"
            min="1"
            step="1"
            value={form.shortMAPeriod}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                shortMAPeriod: Number(event.target.value),
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="longMAPeriod">Long MA Period</Label>

          <Input
            id="longMAPeriod"
            type="number"
            min="1"
            step="1"
            value={form.longMAPeriod}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                longMAPeriod: Number(event.target.value),
              }))
            }
          />
        </div>
      </div>

      {/* Feedback */}
      {error && <p className="text-sm text-destructive">{error}</p>}

      {success && <p className="text-sm text-emerald-600">{success}</p>}

      {/* Submit */}
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Running..." : "Run Backtest"}
        </Button>
      </div>
    </form>
  );
}
