import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function InspirationCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-5 shadow-xl flex flex-col justify-between"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2.5 text-indigo-400">
          <Heart className="size-5 fill-current" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider">Project Mindset</span>
        </div>
        <h3 className="text-xl font-extrabold text-slate-100">Inspiration: &quot;Just Curious&quot;</h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          QuantFlow was born out of pure engineering curiosity — an urge to answer: <em>&quot;How fast can a web application backtest millions of candles if powered by a dedicated compiled C++ engine?&quot;</em>
        </p>
        <p className="text-xs text-slate-400 leading-relaxed">
          Driven by first-principles problem solving rather than simple mock interfaces, every component reflects a pursuit of technical mastery.
        </p>
      </div>

      <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>Vision: Institutional Quality</span>
        <Sparkles className="size-4 text-indigo-400" />
      </div>
    </motion.div>
  );
}
