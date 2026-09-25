import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Code2, Server } from "lucide-react";

export default function SystemPillarsCard() {
  const pillars = [
    {
      title: "Sub-Millisecond Execution",
      desc: "Compiled C++ core processing market tick iterations in native binary memory without garbage collection overhead.",
      icon: Cpu,
    },
    {
      title: "Modular Service Architecture",
      desc: "Isolated REST endpoints, transaction boundaries, and schema parsing split cleanly across Next.js API routes.",
      icon: Server,
    },
    {
      title: "Strict Type & Security Invariants",
      desc: "End-to-end TypeScript validation with Zod schema parsing and path traversal sanitization on all strategy parameters.",
      icon: ShieldCheck,
    },
    {
      title: "Institutional Terminal UX",
      desc: "High-density clean terminal interface engineered for professional clarity, fast keyboard shortcuts, and responsiveness.",
      icon: Code2,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded border border-zinc-200 bg-white p-7 space-y-6"
    >
      <div className="space-y-1">
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">Engineering Standard</span>
        <h3 className="text-xl font-bold font-mono text-zinc-900">QuantFlow Architectural Principles</h3>
        <p className="text-xs text-zinc-500 font-sans">The core technical pillars guiding every line of code in the platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="p-4 rounded border border-zinc-200 bg-zinc-50/60 space-y-2 hover:border-zinc-400 transition-colors"
          >
            <div className="size-8 rounded border border-zinc-200 bg-white flex items-center justify-center text-zinc-900">
              <pillar.icon className="size-4" />
            </div>
            <h4 className="text-xs font-bold font-mono text-zinc-900">{pillar.title}</h4>
            <p className="text-xs text-zinc-600 leading-relaxed font-sans">{pillar.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
