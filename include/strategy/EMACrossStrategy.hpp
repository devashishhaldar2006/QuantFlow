#pragma once

#include "indicators/EMA.hpp"
#include "strategy/Strategy.hpp"

#include <cstddef>
#include <vector>

class EMACrossStrategy : public Strategy
{
public:
    explicit EMACrossStrategy(
        std::size_t fastPeriod = 10,
        std::size_t slowPeriod = 20);

    Signal onCandle(
        const Candle &candle) override;

private:
    EMA fastEMA_;
    EMA slowEMA_;

    std::size_t fastPeriod_;
    std::size_t slowPeriod_;

    std::vector<double> closes_;

    bool wasFastAboveSlow_;
    bool hasPreviousState_;
};