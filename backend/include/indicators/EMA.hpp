#pragma once

#include <vector>
#include <cstddef>

class EMA
{
public:
    explicit EMA(std::size_t period = 20);

    std::vector<double> calculate(
    const std::vector<double>& values) const;

private:
    std::size_t period_;
};