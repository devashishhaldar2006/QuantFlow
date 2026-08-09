"use client";

import { useState } from "react";

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
  symbol: "",
  timeframe: "",
  startDate: "",
  endDate: "",
  initialCapital: 100000,
};

export default function BacktestForm() {
  const [form, setForm] = useState<BacktestConfig>(initialForm);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

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
      const backtest = await createBacktest(result.data);

      console.log("Backtest created:", backtest);

      setSuccess(`Backtest ${backtest.id} started successfully.`);
    } catch (error) {
      console.error(error);
      setError("Failed to create backtest.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border bg-card p-6"
    >
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
            <SelectItem value="EMA Crossover">EMA Crossover</SelectItem>

            <SelectItem value="RSI Mean Reversion">
              RSI Mean Reversion
            </SelectItem>

            <SelectItem value="Bollinger Bands">Bollinger Bands</SelectItem>

            <SelectItem value="MACD Strategy">MACD Strategy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="symbol">Symbol</Label>

        <Input
          id="symbol"
          placeholder="e.g. NIFTY 50"
          value={form.symbol}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              symbol: event.target.value,
            }))
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeframe">Timeframe</Label>

        <Select
          value={form.timeframe}
          onValueChange={(value) => {
            if (!value) return;

            setForm((current) => ({
              ...current,
              timeframe: value,
            }));
          }}
        >
          <SelectTrigger id="timeframe">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="1D">1 Day</SelectItem>
            <SelectItem value="4H">4 Hours</SelectItem>
            <SelectItem value="1H">1 Hour</SelectItem>
            <SelectItem value="30m">30 Minutes</SelectItem>
            <SelectItem value="15m">15 Minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>

          <Input
            id="startDate"
            type="date"
            value={form.startDate}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                startDate: event.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>

          <Input
            id="endDate"
            type="date"
            value={form.endDate}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                endDate: event.target.value,
              }))
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="initialCapital">Initial Capital</Label>

        <Input
          id="initialCapital"
          type="number"
          min="0"
          value={form.initialCapital}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              initialCapital: Number(event.target.value),
            }))
          }
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}

      {success && <p className="text-sm text-emerald-600">{success}</p>}

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Starting..." : "Run Backtest"}
        </Button>
      </div>
    </form>
  );
}
