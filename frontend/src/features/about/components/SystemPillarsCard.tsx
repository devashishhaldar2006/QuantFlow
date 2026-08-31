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
      desc: "High-density dark terminal interface engineered for professional clarity, fast keyboard shortcuts, and responsiveness.",
      icon: Code2,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-6 shadow-xl"
    >
      <div className="space-y-1">
        <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">Engineering Standard</span>
        <h3 className="text-xl font-bold text-slate-100">QuantFlow Architectural Principles</h3>
        <p className="text-xs text-slate-400">The core technical pillars guiding every line of code in the platform</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2 hover:border-indigo-500/30 transition-colors"
          >
            <div className="size-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <pillar.icon className="size-4.5" />
            </div>
            <h4 className="text-sm font-bold text-slate-200">{pillar.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
