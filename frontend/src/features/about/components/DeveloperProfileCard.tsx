import React from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Award } from "lucide-react";

export default function DeveloperProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="md:col-span-2 rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-2xl space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-5">
        <Cpu className="size-48 text-indigo-400" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-md">
            <Terminal className="size-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-100">Devashish Haldar</h2>
            <p className="text-xs font-mono text-indigo-400">Full-Stack Developer & C++ Systems Architect</p>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Architected and engineered <strong>QuantFlow</strong> end-to-end as a single developer with an unyielding focus on performance engineering, clean MVC architecture, low-latency C++ compilation, and institutional financial UX. 
        </p>

        <p className="text-xs text-slate-400 leading-relaxed">
          Currently pursuing B.Tech in CS & Engineering (AI & ML) at PSIT Kanpur (CGPA: 8.1 / 10.0), specializing in high-performance web systems, real-time data streaming, and full-stack software development.
        </p>
      </div>

      <div className="space-y-4 pt-2">
        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-3">
          <Award className="size-5 text-indigo-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-slate-100">Deviathon National Hackathon Winner</p>
            <p className="text-[11px] text-slate-300">
              Won 1st place in the problem statement category at Deviathon (GLA University) for building an AI-powered meeting analysis platform.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <p className="text-xs text-slate-400 font-mono">LOCATION</p>
            <p className="text-xs font-bold text-slate-200">Lucknow, UP, India</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <p className="text-xs text-slate-400 font-mono">LEETCODE RATING</p>
            <p className="text-xs font-bold text-emerald-400 font-mono">1562 (400+ Solved)</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <p className="text-xs text-slate-400 font-mono">CODECHEF</p>
            <p className="text-xs font-bold text-indigo-400 font-mono">3-Star (Rating 1602)</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
