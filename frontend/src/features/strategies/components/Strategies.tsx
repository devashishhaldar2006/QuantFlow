import Link from "next/link";
import { LineChart } from "lucide-react";
import type { StrategyWithPerformance } from "../types";
import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";
import PageHeader from "@/components/common/PageHeader";
import StrategyCard from "./StrategyCard";

type StrategiesProps = {
  strategies: StrategyWithPerformance[];
};

export default function Strategies({ strategies }: StrategiesProps) {
  return (
    <AnimatedPage>
      <PageHeader
        title="Strategies"
        description="Explore available trading strategies and their historical backtest performance."
        icon={LineChart}
        action={{ label: "New Backtest", href: "/backtests/new" }}
      />

      <AnimatedItem>
        <div className="space-y-3">
          {strategies.length > 0 ? (
            strategies.map((strategy) => (
              <StrategyCard key={strategy.name} strategy={strategy} />
            ))
          ) : (
            <div className="glass-panel rounded-xl p-12 flex flex-col items-center justify-center text-center">
              <div className="size-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                <svg className="size-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-200">Engine Offline</h3>
              <p className="mt-2 text-sm text-slate-400 max-w-sm">
                The QuantFlow backend engine is currently unreachable. Start the C++ engine to view and backtest strategies.
              </p>
            </div>
          )}
        </div>
      </AnimatedItem>
    </AnimatedPage>
  );
}