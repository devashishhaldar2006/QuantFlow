import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

export default function EducationAchievementsCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-7 space-y-5 shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <GraduationCap className="size-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Education & Background</h3>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60 space-y-1">
            <div className="flex justify-between items-center text-slate-400 font-mono text-[11px]">
              <span>Sep 2024 – Apr 2028</span>
              <span className="text-emerald-400 font-bold font-mono">CGPA: 8.1 / 10.0</span>
            </div>
            <p className="text-sm font-bold text-slate-100">Pranveer Singh Institute of Technology</p>
            <p className="text-slate-400">B.Tech in CS & Engineering (AI & Machine Learning) — Kanpur, UP</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/60 space-y-1">
            <div className="flex justify-between items-center text-slate-400 font-mono text-[11px]">
              <span>Apr 2023 – Mar 2024</span>
              <span className="text-indigo-400 font-bold font-mono">Percentage: 88.2%</span>
            </div>
            <p className="text-sm font-bold text-slate-100">Vishwanath Academy</p>
            <p className="text-slate-400">Senior Secondary (Class XII, CBSE Science Stream) — Lucknow, UP</p>
          </div>
        </div>
      </motion.div>

      {/* Achievements & Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-7 space-y-5 shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
            <Award className="size-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-100">Achievements</h3>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-100">
              <Award className="size-4 text-indigo-400 shrink-0" />
              <span>Deviathon National Hackathon Winner</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Won the problem statement category at Deviathon (GLA University) for developing an AI-powered meeting analysis platform.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
