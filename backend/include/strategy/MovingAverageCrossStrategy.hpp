#pragma once

#include "indicators/SMA.hpp"
#include "strategy/Strategy.hpp"

#include <vector>

class MovingAverageCrossStrategy : public Strategy
{
public:
    MovingAverageCrossStrategy(
        int fastPeriod,
        int slowPeriod);

    Signal onCandle(
        const Candle& candle) override;

private:
    SMA fastSMA_;
    SMA slowSMA_;

    std::vector<double> closes_;

    bool wasFastAboveSlow_;
    bool hasPreviousState_;
};