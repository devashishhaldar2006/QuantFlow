#pragma once

#include <cstddef>
#include <vector>

class ATR
{
public:
    explicit ATR(std::size_t period = 14);

    std::vector<double> calculate(
        const std::vector<double>& highs,
        const std::vector<double>& lows,
        const std::vector<double>& closes) const;

private:
    std::size_t period_;
};