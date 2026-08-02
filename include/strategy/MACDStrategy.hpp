#pragma once

#include "indicators/MACD.hpp"
#include "strategy/Strategy.hpp"

#include <vector>

class MACDStrategy : public Strategy
{
public:
    explicit MACDStrategy(
        std::size_t fastPeriod = 12,
        std::size_t slowPeriod = 26,
        std::size_t signalPeriod = 9);
    Signal onCandle(
        const Candle &candle) override;

private:
    MACD macd_;

    std::size_t fastPeriod_;
    std::size_t slowPeriod_;
    std::size_t signalPeriod_;

    std::vector<double> closes_;

    bool wasMACDAboveSignal_;
    bool hasPreviousState_;
};