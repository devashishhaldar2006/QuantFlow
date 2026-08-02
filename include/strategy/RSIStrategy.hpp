#pragma once

#include "indicators/RSI.hpp"
#include "strategy/Strategy.hpp"

#include <cstddef>
#include <vector>

class RSIStrategy : public Strategy
{
public:
    explicit RSIStrategy(
        std::size_t period = 14,
        double oversold = 30.0,
        double overbought = 70.0);

    Signal onCandle(
        const Candle& candle) override;

private:
    RSI rsi_;

    std::size_t period_;

    double oversold_;
    double overbought_;

    std::vector<double> closes_;
};