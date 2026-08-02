#pragma once

#include "indicators/EMA.hpp"

#include <vector>
#include <cstddef>

struct MACDResult
{
    std::vector<double> macd;
    std::vector<double> signal;
    std::vector<double> histogram;
};

class MACD
{
public:
    explicit MACD(
        std::size_t fastPeriod=12,
        std::size_t slowPeriod=26,
        std::size_t signalPeriod=9);
    MACDResult calculate(
        const std::vector<double>& prices) const;
private:
    std::size_t fastPeriod_;
    std::size_t slowPeriod_;
    std::size_t signalPeriod_;
};