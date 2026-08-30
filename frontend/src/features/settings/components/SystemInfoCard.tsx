"use client";

import React from "react";
import { Info } from "lucide-react";
import { SectionCard } from "./SectionCard";
import { SettingRow } from "./SettingRow";

export function SystemInfoCard() {
  const SYSTEM_DETAILS = [
    ["Platform", "QuantFlow Institutional Terminal"],
    ["Engine Protocol", "HTTP/JSON — C++ httplib"],
    ["Auth Provider", "Clerk (JWT)"],
    ["Database", "PostgreSQL via Prisma ORM"],
    ["Frontend", "Next.js 15 · React 19 · TypeScript"],
    ["Backend", "C++17 · nlohmann/json · httplib"],
  ];

  return (
    <SectionCard
      title="System Information"
      icon={Info}
      description="Runtime environment and version details"
    >
      {SYSTEM_DETAILS.map(([label, value]) => (
        <SettingRow key={label} label={label}>
          <span className="font-mono text-xs text-slate-400">{value}</span>
        </SettingRow>
      ))}
    </SectionCard>
  );
}
