#pragma once

#include "engine/MarketIterator.hpp"
#include "strategy/Strategy.hpp"

class BacktestEngine
{
private:
    MarketIterator iterator_;
    Strategy& strategy_;

public:
    BacktestEngine(const MarketData& marketData,
                   Strategy& strategy);

    void run();
};