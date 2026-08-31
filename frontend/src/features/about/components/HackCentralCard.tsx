import React from "react";
import { motion } from "framer-motion";
import { Rocket, ExternalLink, Globe } from "lucide-react";
import { GithubLogo } from "@/components/icons/BrandLogos";

export default function HackCentralCard() {
  const stack = ["MERN Stack", "Socket.IO", "Docker", "AWS EC2", "Gemini API", "JWT Auth", "Google OAuth", "RESTful APIs"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-md">
            <Rocket className="size-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">Featured Full-Stack Platform</span>
            <h3 className="text-2xl font-extrabold text-slate-100">HackCentral</h3>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="https://hackcentral.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-500 hover:to-indigo-500 transition-all shrink-0"
          >
            <Globe className="size-3.5" />
            <span>Live Web App</span>
            <ExternalLink className="size-3.5" />
          </a>

          <a
            href="https://github.com/devashishhaldar2006/HackCentral"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-all shrink-0"
          >
            <GithubLogo className="size-3.5 text-slate-300" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
        A scalable MERN-stack ecosystem designed for discovering hackathons, coding contests, workshops, and tech conferences. Features advanced search, organizer dashboards, AI-powered evaluation, real-time communications, Docker containerization, and AWS EC2 cloud deployment.
      </p>

      <div className="flex flex-wrap gap-2 pt-2">
        {stack.map((tech) => (
          <span
            key={tech}
            className="rounded-lg bg-slate-950/80 border border-slate-800 px-3 py-1 text-[11px] font-mono text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
