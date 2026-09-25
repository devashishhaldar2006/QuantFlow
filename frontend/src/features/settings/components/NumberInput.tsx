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
      className="h-9 w-40 rounded border border-zinc-200 bg-white px-3 text-sm text-zinc-900 font-mono outline-none transition-all focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed text-right"
    />
  );
}
