"use client";

import type { StrategyWithPerformance } from "../types";

import PageLayout from "@/components/layout/PageLayout";
import AnimatedPage, { AnimatedItem } from "@/components/common/AnimatedPage";
import SectionHeader from "@/components/common/SectionHeader";
import StrategyCard from "./StrategyCard";

type StrategiesProps = {
  strategies: StrategyWithPerformance[];
};

export default function Strategies({
  strategies,
}: StrategiesProps) {
  return (
    <AnimatedPage>
      <PageLayout
        eyebrow="Strategy Engine"
        title="Strategies"
        description="Explore the trading strategies available in the QuantFlow engine and review their historical backtest performance."
      >
        <AnimatedItem>
          <section>
            <SectionHeader
              eyebrow="Strategy Library"
              title="Available Strategies"
              description="A curated list of built-in models and execution strategies."
            />

            <div className="space-y-4">
              {strategies.map((strategy) => (
                <StrategyCard key={strategy.name} strategy={strategy} />
              ))}
            </div>
          </section>
        </AnimatedItem>
      </PageLayout>
    </AnimatedPage>
  );
}