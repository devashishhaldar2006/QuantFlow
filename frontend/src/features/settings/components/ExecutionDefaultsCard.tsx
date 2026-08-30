"use client";

import React from "react";
import { Sliders } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { SettingRow } from "./SettingRow";
import { NumberInput } from "./NumberInput";
import { EngineConfig } from "../types";

export function ExecutionDefaultsCard({
  config,
  onUpdate,
}: {
  config: EngineConfig;
  onUpdate: <K extends keyof EngineConfig>(key: K, value: EngineConfig[K]) => void;
}) {
  return (
    <SectionCard
      title="Default Capital & Execution"
      icon={Sliders}
      description="These values pre-fill every new backtest form. They also update config.json on disk."
    >
      <SettingRow label="Initial Capital" description="Starting portfolio value (₹)">
        <NumberInput
          id="initialCash"
          value={config.initialCash}
          min={1}
          step={1000}
          onChange={(v) => onUpdate("initialCash", v)}
        />
      </SettingRow>

      <SettingRow label="Commission Rate" description="e.g. 0.001 = 0.1%">
        <NumberInput
          id="commission"
          value={config.commission}
          min={0}
          step={0.0001}
          onChange={(v) => onUpdate("commission", v)}
        />
      </SettingRow>

      <SettingRow label="Slippage" description="e.g. 0.001 = 0.1% market impact">
        <NumberInput
          id="slippage"
          value={config.slippage}
          min={0}
          step={0.0001}
          onChange={(v) => onUpdate("slippage", v)}
        />
      </SettingRow>
    </SectionCard>
  );
}
