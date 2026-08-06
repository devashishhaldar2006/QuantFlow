#include "indicators/EMA.hpp"

#include <cmath>
#include <limits>
#include <stdexcept>

EMA::EMA(std::size_t period)
    : period_(period)
{
    if (period_ == 0)
    {
        throw std::invalid_argument(
            "EMA period must be greater than zero.");
    }
}

std::vector<double> EMA::calculate(
    const std::vector<double>& values) const
{
    const double NaN =
        std::numeric_limits<double>::quiet_NaN();

    std::vector<double> ema(
        values.size(),
        NaN);

    if (values.empty())
    {
        return ema;
    }

    // Find the first valid (non-NaN) value.
    std::size_t start = 0;

    while (start < values.size() &&
           std::isnan(values[start]))
    {
        ++start;
    }

    // Not enough valid values.
    if (values.size() - start < period_)
    {
        return ema;
    }

    const double multiplier =
        2.0 /
        (static_cast<double>(period_) + 1.0);

    // First EMA = SMA of the first 'period_' valid values.
    double sum = 0.0;

    for (std::size_t i = start;
         i < start + period_;
         ++i)
    {
        sum += values[i];
    }

    ema[start + period_ - 1] =
        sum / static_cast<double>(period_);

    // Remaining EMA values.
    for (std::size_t i = start + period_;
         i < values.size();
         ++i)
    {
        if (std::isnan(values[i]))
        {
            continue;
        }

        ema[i] =
            ema[i - 1] +
            multiplier *
            (values[i] - ema[i - 1]);
    }

    return ema;
}