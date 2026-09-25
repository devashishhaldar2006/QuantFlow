import React from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Award } from "lucide-react";

export default function DeveloperProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="md:col-span-2 rounded border border-zinc-200 bg-white p-7 space-y-6 flex flex-col justify-between"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-900">
            <Terminal className="size-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-mono tracking-tight text-zinc-900">Devashish Haldar</h2>
            <p className="text-xs font-mono text-zinc-500">Full-Stack Developer & C++ Systems Architect</p>
          </div>
        </div>

        <p className="text-xs text-zinc-700 leading-relaxed font-sans">
          Architected and engineered <strong className="text-zinc-950 font-semibold">QuantFlow</strong> end-to-end as a single developer with an unyielding focus on performance engineering, clean MVC architecture, low-latency C++ compilation, and institutional financial UX. 
        </p>

        <p className="text-xs text-zinc-500 leading-relaxed font-sans">
          Currently pursuing B.Tech in CS & Engineering (AI & ML) at PSIT Kanpur (CGPA: 8.1 / 10.0), specializing in high-performance web systems, real-time data streaming, and full-stack software development.
        </p>
      </div>

      <div className="space-y-4 pt-2">
        <div className="p-3.5 rounded border border-zinc-200 bg-zinc-50 flex items-center gap-3">
          <Award className="size-4 text-zinc-700 shrink-0" />
          <div>
            <p className="text-xs font-bold font-mono text-zinc-900">Deviathon National Hackathon Winner</p>
            <p className="text-[11px] text-zinc-600 font-sans">
              Won 1st place in the problem statement category at Deviathon (GLA University) for building an AI-powered meeting analysis platform.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded border border-zinc-200 bg-zinc-50/70 space-y-0.5">
            <p className="text-[10px] text-zinc-500 font-mono font-bold uppercase">LOCATION</p>
            <p className="text-xs font-mono font-semibold text-zinc-900">Lucknow, UP, India</p>
          </div>
          <div className="p-3 rounded border border-zinc-200 bg-zinc-50/70 space-y-0.5">
            <p className="text-[10px] text-zinc-500 font-mono font-bold uppercase">LEETCODE RATING</p>
            <p className="text-xs font-bold text-emerald-700 font-mono">1562 (400+ Solved)</p>
          </div>
          <div className="p-3 rounded border border-zinc-200 bg-zinc-50/70 space-y-0.5">
            <p className="text-[10px] text-zinc-500 font-mono font-bold uppercase">CODECHEF</p>
            <p className="text-xs font-bold text-zinc-900 font-mono">3-Star (Rating 1602)</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
