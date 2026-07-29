#pragma once

#include "execution/ExecutionEngine.hpp"
#include "market/MarketData.hpp"
#include "portfolio/Portfolio.hpp"
#include "strategy/Strategy.hpp"
#include "engine/MarketIterator.hpp"
#include "risk/RiskManager.hpp"
class BacktestEngine
{
public:
    BacktestEngine(
        const MarketData& marketData,
        Strategy& strategy,
        ExecutionEngine& executionEngine,
        Portfolio& portfolio,
        RiskManager& riskManager);

    void run();

private:
    MarketIterator iterator_;
    Strategy& strategy_;
    ExecutionEngine& executionEngine_;
    Portfolio& portfolio_;
    RiskManager& riskManager_;
};