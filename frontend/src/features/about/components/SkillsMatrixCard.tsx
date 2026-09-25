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
      className="rounded border border-zinc-200 bg-white p-7 space-y-6"
    >
      <div className="flex items-center gap-3">
        <div className="size-10 rounded border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-900">
          <Code2 className="size-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold font-mono text-zinc-900">Technical Skillset Matrix</h3>
          <p className="text-xs text-zinc-500 font-sans">Core engineering competencies applied across QuantFlow & HackCentral</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="space-y-2">
          <p className="font-mono text-zinc-500 font-bold uppercase text-[10px] tracking-wider">LANGUAGES</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.languages.map((s) => (
              <span key={s} className="px-2.5 py-1 rounded border border-zinc-200 bg-zinc-50 font-mono text-[11px] text-zinc-800">{s}</span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-zinc-500 font-bold uppercase text-[10px] tracking-wider">FRAMEWORKS & WEB</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.frameworks.concat(skills.web).map((s) => (
              <span key={s} className="px-2.5 py-1 rounded border border-zinc-200 bg-zinc-50 font-mono text-[11px] text-zinc-800">{s}</span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-zinc-500 font-bold uppercase text-[10px] tracking-wider">DATABASES & CLOUD</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.databasesTools.map((s) => (
              <span key={s} className="px-2.5 py-1 rounded border border-zinc-200 bg-zinc-50 font-mono text-[11px] text-zinc-800">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
