#pragma once

#include "indicators/ATR.hpp"
#include "strategy/Strategy.hpp"

#include <vector>
#include <cstddef>

class ATRFilterStrategy : public Strategy
{
public:
    explicit ATRFilterStrategy(
        std::size_t period = 14,
        double minimumATR = 1.0);

    Signal onCandle(
        const Candle& candle) override;

private:
    ATR atr_;

    std::size_t period_;
    double minimumATR_;

    std::vector<double> highs_;
    std::vector<double> lows_;
    std::vector<double> closes_;
};