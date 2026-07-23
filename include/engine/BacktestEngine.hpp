#pragma once

#include "engine/MarketIterator.hpp"
#include "strategy/Strategy.hpp"
#include "portfolio/Portfolio.hpp"
#include "risk/PositionSizer.hpp"
class BacktestEngine
{
private:
    MarketIterator iterator_;
    Strategy& strategy_;
    Portfolio& portfolio_;
    PositionSizer positionSizer_;

public:
    BacktestEngine(const MarketData& marketData,
                   Strategy& strategy,
                   Portfolio& portfolio);

    void run();
};