#pragma once

#include "indicators/BollingerBands.hpp"
#include "strategy/Strategy.hpp"

#include <cstddef>
#include <vector>

class BollingerStrategy : public Strategy
{
public:
    explicit BollingerStrategy(
        std::size_t period = 20,
        double multiplier = 2.0);
    Signal onCandle(
        const Candle &candle) override;

private:
    BollingerBands bollingerBands_;

    std::size_t period_;
    double multiplier_;

    std::vector<double> closes_;
};