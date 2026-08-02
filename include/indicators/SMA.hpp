#pragma once

#include <cstddef>
#include <vector>

class SMA
{
public:
    explicit SMA(std::size_t period = 20);

    std::vector<double> calculate(
        const std::vector<double>& prices) const;

private:
    std::size_t period_;
};