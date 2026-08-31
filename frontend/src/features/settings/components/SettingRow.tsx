"use client";

import React from "react";

export function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</p>
        {description && (
          <p className="mt-0.5 text-[10px] text-slate-600">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
