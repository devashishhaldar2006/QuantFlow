import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function InspirationCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded border border-zinc-200 bg-white p-7 space-y-5 flex flex-col justify-between"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 font-mono text-xs font-bold uppercase tracking-wider">
          <Heart className="size-4 fill-zinc-900 text-zinc-900" />
          <span>PROJECT_MINDSET</span>
        </div>
        <h3 className="text-xl font-bold font-mono text-zinc-900">Inspiration: &quot;Just Curious&quot;</h3>
        <p className="text-xs text-zinc-600 leading-relaxed font-sans">
          QuantFlow was born out of pure engineering curiosity — an urge to answer: <em>&quot;How fast can a web application backtest millions of candles if powered by a dedicated compiled C++ engine?&quot;</em>
        </p>
        <p className="text-xs text-zinc-500 leading-relaxed font-sans">
          Driven by first-principles problem solving rather than simple mock interfaces, every component reflects a pursuit of technical mastery.
        </p>
      </div>

      <div className="pt-3 border-t border-zinc-200 flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <span>VISION: INSTITUTIONAL_QUALITY</span>
        <Sparkles className="size-3.5 text-zinc-700" />
      </div>
    </motion.div>
  );
}
