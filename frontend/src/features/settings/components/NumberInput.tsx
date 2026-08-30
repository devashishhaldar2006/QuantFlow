"use client";

import React from "react";

export function NumberInput({
  id,
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled,
}: {
  id: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}) {
  return (
    <input
      id={id}
      type="number"
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(Number(e.target.value))}
      className="h-9 w-40 rounded-lg border border-slate-700/50 bg-slate-900/60 px-3 text-sm text-slate-100 font-mono outline-none transition-all focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/30 disabled:opacity-40 disabled:cursor-not-allowed text-right"
    />
  );
}
