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
            <div className="rounded border border-zinc-200 bg-white p-16 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="size-14 rounded border border-zinc-900 bg-zinc-950 flex items-center justify-center mb-4 text-white shadow-sm">
                <LineChart className="size-6 text-white" />
              </div>
              <h3 className="text-base font-bold font-mono tracking-tight text-zinc-950 uppercase">
                ENGINE_OFFLINE
              </h3>
              <p className="mt-1.5 text-xs text-zinc-600 max-w-sm font-mono leading-relaxed">
                The QuantFlow computation engine is currently unreachable. Start the backend engine to compile and backtest quantitative models.
              </p>
            </div>
          )}
        </div>
      </AnimatedItem>
    </AnimatedPage>
  );
}