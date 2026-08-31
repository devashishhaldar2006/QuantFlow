import React from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

export default function SkillsMatrixCard() {
  const skills = {
    languages: ["C++", "C", "Python", "JavaScript", "TypeScript", "SQL"],
    web: ["HTML5", "CSS3", "Tailwind CSS", "REST APIs", "JWT Auth", "Google OAuth"],
    frameworks: ["React.js", "Next.js", "Node.js", "Express.js", "Socket.IO", "Clerk", "Stream.io"],
    databasesTools: ["MongoDB", "MongoDB Atlas", "Git", "GitHub", "Docker", "AWS EC2", "PostgreSQL", "Prisma"],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-6 shadow-xl"
    >
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
          <Code2 className="size-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-100">Technical Skillset Matrix</h3>
          <p className="text-xs text-slate-400">Core engineering competencies applied across QuantFlow & HackCentral</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="space-y-2.5">
          <p className="font-mono text-slate-400 font-bold uppercase text-[11px]">Languages</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.languages.map((s) => (
              <span key={s} className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-200">{s}</span>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          <p className="font-mono text-slate-400 font-bold uppercase text-[11px]">Frameworks & Web</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.frameworks.concat(skills.web).map((s) => (
              <span key={s} className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-200">{s}</span>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          <p className="font-mono text-slate-400 font-bold uppercase text-[11px]">Databases & Cloud</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.databasesTools.map((s) => (
              <span key={s} className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-200">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
