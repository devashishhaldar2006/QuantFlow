#pragma once

#include <cstddef>
#include <vector>

struct BollingerBandsResult
{
    std::vector<double> upper;
    std::vector<double> middle;
    std::vector<double> lower;
};

class BollingerBands
{
public:
    explicit BollingerBands(
        std::size_t period = 20,
        double multiplier = 2.0);

    BollingerBandsResult calculate(
        const std::vector<double>& prices) const;

private:
    std::size_t period_;
    double multiplier_;
};