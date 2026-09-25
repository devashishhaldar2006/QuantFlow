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
      className="rounded border border-zinc-200 bg-white p-7 space-y-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-900">
            <Rocket className="size-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">Featured Full-Stack Platform</span>
            <h3 className="text-xl font-bold font-mono text-zinc-900">HackCentral</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://hackcentral.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded bg-zinc-950 px-3.5 py-1.5 text-xs font-mono font-medium text-white hover:bg-zinc-800 transition-all shrink-0"
          >
            <Globe className="size-3.5" />
            <span>Live Web App</span>
            <ExternalLink className="size-3" />
          </a>

          <a
            href="https://github.com/devashishhaldar2006/HackCentral"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded border border-zinc-200 bg-white px-3 py-1.5 text-xs font-mono font-medium text-zinc-700 hover:bg-zinc-50 hover:text-black transition-all shrink-0"
          >
            <GithubLogo className="size-3.5 text-zinc-700" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      <p className="text-xs text-zinc-600 leading-relaxed font-sans">
        A scalable MERN-stack ecosystem designed for discovering hackathons, coding contests, workshops, and tech conferences. Features advanced search, organizer dashboards, AI-powered evaluation, real-time communications, Docker containerization, and AWS EC2 cloud deployment.
      </p>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {stack.map((tech) => (
          <span
            key={tech}
            className="rounded border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-mono text-zinc-700"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
