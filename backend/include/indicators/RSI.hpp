#pragma once

#include <vector>
#include <cstddef>

class RSI
{
public:
    explicit RSI(std::size_t period = 14);

    std::vector<double> calculate(
        const std::vector<double>& prices) const;

private:
    std::size_t period_;
};