#include "indicators/EMA.hpp"

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
    const std::vector<double>& prices) const
{
    const double NaN =
        std::numeric_limits<double>::quiet_NaN();

    // Create a vector filled with NaN values.
    std::vector<double> ema(
        prices.size(),
        NaN);

    // Not enough data to calculate even the first EMA.
    if (prices.size() < period_)
    {
        return ema;
    }

    // Calculate the smoothing multiplier.
    const double multiplier =
        2.0 /
        (static_cast<double>(period_) + 1.0);

    // Compute the first EMA using the SMA of the first 'period' prices.
    double sum = 0.0;

    for (std::size_t i = 0; i < period_; ++i)
    {
        sum += prices[i];
    }

    const double firstEMA =
        sum / static_cast<double>(period_);

    // Store the first EMA at index period - 1.
    ema[period_ - 1] = firstEMA;

    // Calculate the remaining EMA values.
    for (std::size_t i = period_; i < prices.size(); ++i)
    {
        ema[i] =
            ema[i - 1] +
            multiplier *
            (prices[i] - ema[i - 1]);
    }

    return ema;
}