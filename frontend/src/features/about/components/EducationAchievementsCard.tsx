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
        className="rounded border border-zinc-200 bg-white p-7 space-y-5"
      >
        <div className="flex items-center gap-3">
          <div className="size-10 rounded border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-900">
            <GraduationCap className="size-5" />
          </div>
          <h3 className="text-lg font-bold font-mono text-zinc-900">Education & Background</h3>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded border border-zinc-200 bg-zinc-50/70 space-y-1">
            <div className="flex justify-between items-center text-zinc-500 font-mono text-[11px]">
              <span>Sep 2024 – Apr 2028</span>
              <span className="text-emerald-700 font-bold font-mono">CGPA: 8.1 / 10.0</span>
            </div>
            <p className="text-sm font-bold text-zinc-900">Pranveer Singh Institute of Technology</p>
            <p className="text-zinc-600 font-sans">B.Tech in CS & Engineering (AI & Machine Learning) — Kanpur, UP</p>
          </div>

          <div className="p-3.5 rounded border border-zinc-200 bg-zinc-50/70 space-y-1">
            <div className="flex justify-between items-center text-zinc-500 font-mono text-[11px]">
              <span>Apr 2023 – Mar 2024</span>
              <span className="text-zinc-900 font-bold font-mono">Percentage: 88.2%</span>
            </div>
            <p className="text-sm font-bold text-zinc-900">Vishwanath Academy</p>
            <p className="text-zinc-600 font-sans">Senior Secondary (Class XII, CBSE Science Stream) — Lucknow, UP</p>
          </div>
        </div>
      </motion.div>

      {/* Achievements & Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded border border-zinc-200 bg-white p-7 space-y-5"
      >
        <div className="flex items-center gap-3">
          <div className="size-10 rounded border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-900">
            <Award className="size-5" />
          </div>
          <h3 className="text-lg font-bold font-mono text-zinc-900">Achievements</h3>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded border border-zinc-200 bg-zinc-50/70 space-y-1.5">
            <div className="flex items-center gap-2 font-bold font-mono text-zinc-900">
              <Award className="size-4 text-zinc-700 shrink-0" />
              <span>Deviathon National Hackathon Winner</span>
            </div>
            <p className="text-zinc-600 text-xs leading-relaxed font-sans">
              Won the problem statement category at Deviathon (GLA University) for developing an AI-powered meeting analysis platform.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
