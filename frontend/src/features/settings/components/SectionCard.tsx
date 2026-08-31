"use client";

import React from "react";

export function SectionCard({
  title,
  icon: Icon,
  description,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
      <div className="flex items-start gap-4 border-b border-white/10 p-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10">
          <Icon className="size-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}
