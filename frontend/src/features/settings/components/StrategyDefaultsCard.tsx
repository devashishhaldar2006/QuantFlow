"use client";

import React from "react";
import { Cpu } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { SettingRow } from "./SettingRow";
import { NumberInput } from "./NumberInput";
import { EngineConfig } from "../types";

export function StrategyDefaultsCard({
  config,
  onUpdate,
}: {
  config: EngineConfig;
  onUpdate: <K extends keyof EngineConfig>(key: K, value: EngineConfig[K]) => void;
}) {
  return (
    <SectionCard
      title="Strategy Parameter Defaults"
      icon={Cpu}
      description="Default indicator periods written to config.json on the C++ engine side"
    >
      {/* SMA */}
      <div className="space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400/70">
          Moving Average Cross (SMA)
        </p>
        <SettingRow label="Short MA Period">
          <NumberInput id="shortMA" value={config.shortMAPeriod} min={1} onChange={(v) => onUpdate("shortMAPeriod", v)} />
        </SettingRow>
        <SettingRow label="Long MA Period">
          <NumberInput id="longMA" value={config.longMAPeriod} min={1} onChange={(v) => onUpdate("longMAPeriod", v)} />
        </SettingRow>
      </div>

      {/* EMA */}
      <div className="border-t border-white/5 pt-4 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400/70">
          EMA Cross
        </p>
        <SettingRow label="Fast EMA Period">
          <NumberInput id="fastEMA" value={config.fastEMAPeriod} min={1} onChange={(v) => onUpdate("fastEMAPeriod", v)} />
        </SettingRow>
        <SettingRow label="Slow EMA Period">
          <NumberInput id="slowEMA" value={config.slowEMAPeriod} min={1} onChange={(v) => onUpdate("slowEMAPeriod", v)} />
        </SettingRow>
      </div>

      {/* RSI */}
      <div className="border-t border-white/5 pt-4 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400/70">
          RSI
        </p>
        <SettingRow label="RSI Period">
          <NumberInput id="rsiPeriod" value={config.rsiPeriod} min={2} onChange={(v) => onUpdate("rsiPeriod", v)} />
        </SettingRow>
        <SettingRow label="Oversold Threshold">
          <NumberInput id="oversold" value={config.oversold} min={0} max={100} onChange={(v) => onUpdate("oversold", v)} />
        </SettingRow>
        <SettingRow label="Overbought Threshold">
          <NumberInput id="overbought" value={config.overbought} min={0} max={100} onChange={(v) => onUpdate("overbought", v)} />
        </SettingRow>
      </div>

      {/* MACD */}
      <div className="border-t border-white/5 pt-4 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400/70">
          MACD
        </p>
        <SettingRow label="Fast Period">
          <NumberInput id="macdFast" value={config.macdFastPeriod} min={1} onChange={(v) => onUpdate("macdFastPeriod", v)} />
        </SettingRow>
        <SettingRow label="Slow Period">
          <NumberInput id="macdSlow" value={config.macdSlowPeriod} min={1} onChange={(v) => onUpdate("macdSlowPeriod", v)} />
        </SettingRow>
        <SettingRow label="Signal Period">
          <NumberInput id="macdSignal" value={config.macdSignalPeriod} min={1} onChange={(v) => onUpdate("macdSignalPeriod", v)} />
        </SettingRow>
      </div>

      {/* Bollinger Bands */}
      <div className="border-t border-white/5 pt-4 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400/70">
          Bollinger Bands
        </p>
        <SettingRow label="Period">
          <NumberInput id="bollPeriod" value={config.bollingerPeriod} min={2} onChange={(v) => onUpdate("bollingerPeriod", v)} />
        </SettingRow>
        <SettingRow label="Std Dev Multiplier">
          <NumberInput id="bollMult" value={config.bollingerMultiplier} min={0.1} step={0.1} onChange={(v) => onUpdate("bollingerMultiplier", v)} />
        </SettingRow>
      </div>

      {/* ATR Filter */}
      <div className="border-t border-white/5 pt-4 space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400/70">
          ATR Filter
        </p>
        <SettingRow label="ATR Period">
          <NumberInput id="atrPeriod" value={config.atrPeriod} min={1} onChange={(v) => onUpdate("atrPeriod", v)} />
        </SettingRow>
        <SettingRow label="Minimum ATR Threshold">
          <NumberInput id="minATR" value={config.minimumATR} min={0} step={0.1} onChange={(v) => onUpdate("minimumATR", v)} />
        </SettingRow>
      </div>
    </SectionCard>
  );
}
