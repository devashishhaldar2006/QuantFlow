#pragma once

#include "engine/MarketIterator.hpp"
#include "strategy/Strategy.hpp"
#include "portfolio/Portfolio.hpp"
class BacktestEngine
{
private:
    MarketIterator iterator_;
    Strategy& strategy_;
    Portfolio& portfolio_;

public:
    BacktestEngine(const MarketData& marketData,
                   Strategy& strategy,
                   Portfolio& portfolio);

    void run();
};