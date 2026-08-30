"use client";

import React from "react";
import { Shield } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { SettingRow } from "./SettingRow";
import { NumberInput } from "./NumberInput";
import { EngineConfig } from "../types";

export function RiskDefaultsCard({
  config,
  onUpdate,
}: {
  config: EngineConfig;
  onUpdate: <K extends keyof EngineConfig>(key: K, value: EngineConfig[K]) => void;
}) {
  return (
    <SectionCard
      title="Default Risk Parameters"
      icon={Shield}
      description="Default stop-loss and take-profit values for new backtest configurations"
    >
      <SettingRow label="Stop Loss (%)" description="Fraction: 0.05 = 5%">
        <NumberInput
          id="stopLoss"
          value={config.stopLossPercent}
          min={0}
          max={1}
          step={0.01}
          onChange={(v) => onUpdate("stopLossPercent", v)}
        />
      </SettingRow>

      <SettingRow label="Take Profit (%)" description="Fraction: 0.10 = 10%">
        <NumberInput
          id="takeProfit"
          value={config.takeProfitPercent}
          min={0}
          max={1}
          step={0.01}
          onChange={(v) => onUpdate("takeProfitPercent", v)}
        />
      </SettingRow>
    </SectionCard>
  );
}
